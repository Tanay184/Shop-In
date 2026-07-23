import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Globe, MessageCircle, Camera, Tv, Shield, Truck, RotateCcw, CreditCard } from 'lucide-react'

const LINKS = {
  'Get to Know Us':      ['About Shop In', 'Careers', 'Press Releases', 'Shop In Cares'],
  'Make Money With Us': ['Sell on Shop In', 'Become an Affiliate', 'Advertise Your Products'],
  'Let Us Help You':    ['Your Account', 'Returns Centre', 'Order History', 'Help & Support'],
}

const TRUST_BADGES = [
  { icon: Shield, text: 'Secure Payments', subtext: '100% Protected' },
  { icon: Truck, text: 'Free Shipping', subtext: 'On orders ₹499+' },
  { icon: RotateCcw, text: 'Easy Returns', subtext: '30-day guarantee' },
  { icon: CreditCard, text: 'Safe Checkout', subtext: 'SSL Encrypted' },
]

const SOCIAL_LINKS = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Tv, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-20">
      {/* Trust Badges Section */}
      <div className="bg-neutral-800 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.text} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-500/20">
                    <Icon size={24} className="text-amber-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{badge.text}</p>
                    <p className="text-xs text-neutral-400">{badge.subtext}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <div>
                <p className="font-black text-neutral-900 text-lg">Get Exclusive Deals</p>
                <p className="text-sm text-neutral-900/80 font-medium">Free delivery on orders over ₹499</p>
              </div>
            </div>
            <Link to="/products" className="btn-dark text-sm py-3 px-6 bg-neutral-900 hover:bg-neutral-800 shadow-xl">
              Start Shopping →
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-btn">
                <Zap size={22} className="text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Shop<span className="text-gradient">In</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed max-w-sm">
              India's most trusted online marketplace. Shop millions of products at unbeatable prices with fast delivery and easy returns.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Follow Us:</span>
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <a 
                    key={social.label}
                    href={social.href} 
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:scale-110 transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <Icon size={16} className="text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                )
              })}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Subscribe to Newsletter</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <button type="submit" className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-900 font-bold text-sm transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-black text-sm mb-4 text-white uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors inline-flex items-center group">
                      <span>{l}</span>
                      <svg className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-8 py-6 border-t border-white/10 text-sm text-neutral-400">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Mail size={14} className="text-amber-400" />
            </div>
            <span className="font-medium">support@shopin.in</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Phone size={14} className="text-amber-400" />
            </div>
            <span className="font-medium">1800-419-7355</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-amber-400" />
            </div>
            <span className="font-medium">Bengaluru, Karnataka, India</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="text-xs text-neutral-500">
            © 2024 Shop In. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs">
            {['Privacy Policy', 'Terms of Service', 'Cookies', 'Accessibility'].map((t) => (
              <a key={t} href="#" className="text-neutral-500 hover:text-amber-400 transition-colors font-medium">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
