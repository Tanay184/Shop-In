import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()

from models import db, bcrypt
from routes.auth import auth_bp
from routes.products import products_bp
from routes.cart import cart_bp
from routes.orders import orders_bp


def create_app():
    app = Flask(__name__)

    # Config
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'shopin-secret-2024')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'shopin-jwt-2024')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///shopin.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Tokens don't expire for dev

    # Extensions
    db.init_app(app)
    bcrypt.init_app(app)
    JWTManager(app)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

    # Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    # Health check
    @app.route('/api/health')
    def health():
        return jsonify({'status': 'ok', 'app': 'Shop In API'}), 200

    # Error handlers
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({'error': 'Bad request'}), 400

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal server error'}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
        # Auto-seed if DB is empty
        from models import Product
        if Product.query.count() == 0:
            print("Seeding database...")
            from seed import seed_products
            seed_products()
            print("Database seeded successfully!")
    app.run(debug=True, port=5000)
