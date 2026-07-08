from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, CartItem, Product

cart_bp = Blueprint('cart', __name__)


@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = int(get_jwt_identity())
    items = CartItem.query.filter_by(user_id=user_id).all()
    total = sum(item.product.price * item.quantity for item in items)
    return jsonify({
        'items': [item.to_dict() for item in items],
        'total': round(total, 2),
        'count': sum(item.quantity for item in items)
    }), 200


@cart_bp.route('', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data or 'product_id' not in data:
        return jsonify({'error': 'product_id is required'}), 400

    product = Product.query.get_or_404(data['product_id'])
    quantity = data.get('quantity', 1)

    # Check if already in cart
    existing = CartItem.query.filter_by(user_id=user_id, product_id=product.id).first()
    if existing:
        existing.quantity += quantity
        db.session.commit()
        return jsonify({'item': existing.to_dict(), 'message': 'Quantity updated'}), 200

    item = CartItem(user_id=user_id, product_id=product.id, quantity=quantity)
    db.session.add(item)
    db.session.commit()
    return jsonify({'item': item.to_dict(), 'message': 'Added to cart'}), 201


@cart_bp.route('/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_id = int(get_jwt_identity())
    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first_or_404()
    data = request.get_json()

    quantity = data.get('quantity', 1)
    if quantity < 1:
        return jsonify({'error': 'Quantity must be at least 1'}), 400

    item.quantity = quantity
    db.session.commit()
    return jsonify({'item': item.to_dict()}), 200


@cart_bp.route('/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    user_id = int(get_jwt_identity())
    item = CartItem.query.filter_by(id=item_id, user_id=user_id).first_or_404()
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item removed'}), 200


@cart_bp.route('/clear', methods=['DELETE'])
@jwt_required()
def clear_cart():
    user_id = int(get_jwt_identity())
    CartItem.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({'message': 'Cart cleared'}), 200
