# Shop In 🛒

> A full-stack Amazon-inspired e-commerce platform built for a hackathon.

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Frontend | React + Vite + Tailwind CSS v3 |
| Backend  | Python Flask + SQLAlchemy |
| Database | SQLite (auto-seeded) |
| Auth     | JWT (flask-jwt-extended) |

## Features

- 🏪 **34 products** across 8 categories (Electronics, Fashion, Home & Kitchen, Books, Sports, Beauty, Groceries, Toys)
- 🔍 **Search, filter & sort** products by category, price range, rating
- 🛒 **Full cart** with quantity controls and persistent backend storage
- 👤 **JWT Authentication** — register, login, protected routes
- 📦 **Order placement** with order history
- ✨ **Premium UI** — animated buttons, hero carousel, skeleton loaders, cart drawer

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
# Auto-seeds 34 products on first run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

> Or just double-click `start-backend.bat` and `start-frontend.bat`

## Project Structure

```
Amazon_Clone/
├── backend/
│   ├── app.py          # Flask app factory
│   ├── models.py       # SQLAlchemy models
│   ├── seed.py         # Product seed data
│   ├── routes/
│   │   ├── auth.py
│   │   ├── products.py
│   │   ├── cart.py
│   │   └── orders.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/ # Navbar, HeroCarousel, ProductCard, CartDrawer, Footer
│   │   ├── pages/      # Home, ProductListing, ProductDetail, Login, Register, Orders
│   │   ├── context/    # AuthContext, CartContext
│   │   └── api/        # Axios client
│   └── ...
├── start-backend.bat
├── start-frontend.bat
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/products` | List/search/filter products |
| GET | `/api/products/:id` | Product details + related |
| GET/POST | `/api/cart` | View/add to cart |
| PUT/DELETE | `/api/cart/:id` | Update/remove cart item |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | Order history |
