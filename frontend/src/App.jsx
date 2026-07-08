import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <CartDrawer />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/products"      element={<ProductListing />} />
              <Route path="/products/:id"  element={<ProductDetail />} />
              <Route path="/login"         element={<Login />} />
              <Route path="/register"      element={<Register />} />
              <Route path="/orders"        element={<Orders />} />
            </Routes>
          </Layout>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0f172a',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#f59e0b', secondary: '#0f172a' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
