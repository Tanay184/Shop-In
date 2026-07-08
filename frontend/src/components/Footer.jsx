import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Share2, Heart, Globe, MessageCircle } from 'lucide-react'

const LINKS = {
  'Get to Know Us':      ['About Shop In', 'Careers', 'Press Releases', 'Amazon Science'],
  'Make Money With Us': ['Sell on Shop In', 'Sell Under Private Brands', 'Advertise Your Products'],
  'Let Us Help You':    ['Your Account', 'Returns Centre', 'Order History', 'Shop In Assistant', 'Help'],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-16">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-navy-900">🎉 Free delivery on orders over ₹499</p>
          <Link to="/products" className="btn-dark text-sm py-2 px-5 bg-navy-900 text-white hover:bg-navy-800">
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold">Shop<span className="text-gradient">In</span></span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              India's most trusted online marketplace. Shop millions of products at unbeatable prices.
            </p>
            <div className="flex gap-3">
              {[Share2, Heart, Globe, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:scale-110 transition-all duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm mb-4 text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-6 py-6 border-t border-white/10 text-sm text-gray-400">
          <div className="flex items-center gap-2"><Mail size={14} className="text-amber-400" /><span>support@shopin.in</span></div>
          <div className="flex items-center gap-2"><Phone size={14} className="text-amber-400" /><span>1800-419-7355</span></div>
          <div className="flex items-center gap-2"><MapPin size={14} className="text-amber-400" /><span>Bengaluru, Karnataka, India</span></div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/10 text-xs text-gray-500 gap-3">
          <p>© 2024 Shop In — All rights reserved</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((t) => (
              <a key={t} href="#" className="hover:text-amber-400 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
