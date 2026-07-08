from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, OrderItem, CartItem, Product

orders_bp = Blueprint('orders', __name__)


@orders_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = int(get_jwt_identity())
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify({'orders': [o.to_dict() for o in orders]}), 200


@orders_bp.route('', methods=['POST'])
@jwt_required()
def place_order():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}

    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({'error': 'Cart is empty'}), 400

    total = sum(item.product.price * item.quantity for item in cart_items)
    order = Order(
        user_id=user_id,
        total=round(total, 2),
        shipping_address=data.get('shipping_address', 'Default Address'),
        status='Processing'
    )
    db.session.add(order)
    db.session.flush()

    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price_at_purchase=cart_item.product.price
        )
        db.session.add(order_item)

    # Clear cart after placing order
    CartItem.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    return jsonify({'order': order.to_dict(), 'message': 'Order placed successfully!'}), 201


@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    user_id = int(get_jwt_identity())
    order = Order.query.filter_by(id=order_id, user_id=user_id).first_or_404()
    return jsonify({'order': order.to_dict()}), 200
