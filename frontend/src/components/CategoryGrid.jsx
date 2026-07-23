import { Link } from 'react-router-dom'
import {
  Smartphone, Shirt, Home, BookOpen,
  Dumbbell, Sparkles, ShoppingBasket, Gamepad2,
} from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Electronics',
    icon: Smartphone,
    gradient: 'from-blue-500 to-indigo-600',
    hoverBg: 'group-hover:bg-blue-50',
    iconColor: 'text-blue-600',
    ring: 'group-hover:ring-blue-200',
  },
  {
    name: 'Fashion',
    icon: Shirt,
    gradient: 'from-pink-500 to-rose-500',
    hoverBg: 'group-hover:bg-pink-50',
    iconColor: 'text-pink-600',
    ring: 'group-hover:ring-pink-200',
  },
  {
    name: 'Home & Kitchen',
    icon: Home,
    gradient: 'from-amber-500 to-orange-500',
    hoverBg: 'group-hover:bg-amber-50',
    iconColor: 'text-amber-600',
    ring: 'group-hover:ring-amber-200',
  },
  {
    name: 'Books',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    hoverBg: 'group-hover:bg-emerald-50',
    iconColor: 'text-emerald-600',
    ring: 'group-hover:ring-emerald-200',
  },
  {
    name: 'Sports',
    icon: Dumbbell,
    gradient: 'from-cyan-500 to-sky-600',
    hoverBg: 'group-hover:bg-cyan-50',
    iconColor: 'text-cyan-600',
    ring: 'group-hover:ring-cyan-200',
  },
  {
    name: 'Beauty',
    icon: Sparkles,
    gradient: 'from-fuchsia-500 to-purple-500',
    hoverBg: 'group-hover:bg-fuchsia-50',
    iconColor: 'text-fuchsia-600',
    ring: 'group-hover:ring-fuchsia-200',
  },
  {
    name: 'Groceries',
    icon: ShoppingBasket,
    gradient: 'from-lime-500 to-green-600',
    hoverBg: 'group-hover:bg-lime-50',
    iconColor: 'text-lime-600',
    ring: 'group-hover:ring-lime-200',
  },
  {
    name: 'Toys',
    icon: Gamepad2,
    gradient: 'from-violet-500 to-purple-600',
    hoverBg: 'group-hover:bg-violet-50',
    iconColor: 'text-violet-600',
    ring: 'group-hover:ring-violet-200',
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon
        return (
          <Link
            key={cat.name}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group flex flex-col items-center gap-3 py-5 px-3 rounded-2xl
              bg-white border border-neutral-200
              hover:border-transparent hover:shadow-card-hover ${cat.hoverBg}
              transform hover:-translate-y-2 active:translate-y-0
              transition-all duration-200 ease-out`}
          >
            {/* Icon bubble with enhanced hover */}
            <div
              className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient}
                flex items-center justify-center shadow-md
                ring-0 ring-transparent ${cat.ring} ring-offset-2
                group-hover:ring-4 group-hover:scale-110 group-hover:rotate-6
                transition-all duration-200 ease-out`}
            >
              <Icon size={28} className="text-white" strokeWidth={2} />
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* Label with improved typography */}
            <span
              className={`text-xs font-bold text-neutral-600 ${cat.iconColor} text-center leading-tight transition-colors duration-200`}
            >
              {cat.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
