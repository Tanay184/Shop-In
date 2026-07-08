from flask import Blueprint, request, jsonify
from models import db, Product

products_bp = Blueprint('products', __name__)


@products_bp.route('', methods=['GET'])
def get_products():
    query = Product.query

    # Search
    search = request.args.get('search', '').strip()
    if search:
        query = query.filter(Product.name.ilike(f'%{search}%') | Product.description.ilike(f'%{search}%'))

    # Category filter
    category = request.args.get('category', '').strip()
    if category:
        query = query.filter(Product.category.ilike(category))

    # In stock filter
    in_stock = request.args.get('in_stock', '').strip()
    if in_stock == 'true':
        query = query.filter(Product.in_stock == True)

    # Price range
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    # Featured filter
    featured = request.args.get('featured', '').strip()
    if featured == 'true':
        query = query.filter(Product.is_featured == True)

    # Sort
    sort = request.args.get('sort', 'newest')
    if sort == 'price_asc':
        query = query.order_by(Product.price.asc())
    elif sort == 'price_desc':
        query = query.order_by(Product.price.desc())
    elif sort == 'rating':
        query = query.order_by(Product.rating.desc())
    elif sort == 'popular':
        query = query.order_by(Product.review_count.desc())
    else:  # newest
        query = query.order_by(Product.created_at.desc())

    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'products': [p.to_dict() for p in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page,
        'per_page': per_page
    }), 200


@products_bp.route('/categories', methods=['GET'])
def get_categories():
    results = db.session.query(Product.category, db.func.count(Product.id)).group_by(Product.category).all()
    categories = [{'name': r[0], 'count': r[1]} for r in results]
    return jsonify({'categories': categories}), 200


@products_bp.route('/featured', methods=['GET'])
def get_featured():
    products = Product.query.filter_by(is_featured=True).order_by(Product.rating.desc()).limit(8).all()
    return jsonify({'products': [p.to_dict() for p in products]}), 200


@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    # Also return related products (same category)
    related = Product.query.filter(
        Product.category == product.category,
        Product.id != product.id
    ).order_by(Product.rating.desc()).limit(4).all()

    return jsonify({
        'product': product.to_dict(),
        'related': [p.to_dict() for p in related]
    }), 200
