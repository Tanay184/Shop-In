from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    cart_items = db.relationship('CartItem', backref='user', lazy=True, cascade='all, delete-orphan')
    orders = db.relationship('Order', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float, nullable=True)
    category = db.Column(db.String(100), nullable=False)
    subcategory = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(512), nullable=True)
    rating = db.Column(db.Float, default=4.0)
    review_count = db.Column(db.Integer, default=0)
    in_stock = db.Column(db.Boolean, default=True)
    stock_count = db.Column(db.Integer, default=100)
    badge = db.Column(db.String(50), nullable=True)  # e.g. "Best Seller", "New", "Deal"
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def discount_percent(self):
        if self.original_price and self.original_price > self.price:
            return round((1 - self.price / self.original_price) * 100)
        return 0

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'original_price': self.original_price,
            'category': self.category,
            'subcategory': self.subcategory,
            'image_url': self.image_url,
            'rating': self.rating,
            'review_count': self.review_count,
            'in_stock': self.in_stock,
            'stock_count': self.stock_count,
            'badge': self.badge,
            'is_featured': self.is_featured,
            'discount_percent': self.discount_percent(),
        }


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship('Product')

    def to_dict(self):
        return {
            'id': self.id,
            'product': self.product.to_dict(),
            'quantity': self.quantity,
            'subtotal': round(self.product.price * self.quantity, 2)
        }


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Processing')
    shipping_address = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('OrderItem', backref='order', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'total': self.total,
            'status': self.status,
            'shipping_address': self.shipping_address,
            'created_at': self.created_at.isoformat(),
            'items': [item.to_dict() for item in self.items]
        }


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_at_purchase = db.Column(db.Float, nullable=False)

    product = db.relationship('Product')

    def to_dict(self):
        return {
            'id': self.id,
            'product': self.product.to_dict(),
            'quantity': self.quantity,
            'price_at_purchase': self.price_at_purchase,
            'subtotal': round(self.price_at_purchase * self.quantity, 2)
        }
