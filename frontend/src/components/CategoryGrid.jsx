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
    ring: 'ring-blue-200',
    label: 'text-blue-700',
    bg: 'bg-blue-50',
  },
  {
    name: 'Fashion',
    icon: Shirt,
    gradient: 'from-pink-500 to-rose-500',
    ring: 'ring-pink-200',
    label: 'text-pink-700',
    bg: 'bg-pink-50',
  },
  {
    name: 'Home & Kitchen',
    icon: Home,
    gradient: 'from-amber-500 to-orange-500',
    ring: 'ring-amber-200',
    label: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  {
    name: 'Books',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    ring: 'ring-emerald-200',
    label: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    name: 'Sports',
    icon: Dumbbell,
    gradient: 'from-cyan-500 to-sky-600',
    ring: 'ring-cyan-200',
    label: 'text-cyan-700',
    bg: 'bg-cyan-50',
  },
  {
    name: 'Beauty',
    icon: Sparkles,
    gradient: 'from-fuchsia-500 to-purple-500',
    ring: 'ring-fuchsia-200',
    label: 'text-fuchsia-700',
    bg: 'bg-fuchsia-50',
  },
  {
    name: 'Groceries',
    icon: ShoppingBasket,
    gradient: 'from-lime-500 to-green-600',
    ring: 'ring-lime-200',
    label: 'text-lime-700',
    bg: 'bg-lime-50',
  },
  {
    name: 'Toys',
    icon: Gamepad2,
    gradient: 'from-violet-500 to-purple-600',
    ring: 'ring-violet-200',
    label: 'text-violet-700',
    bg: 'bg-violet-50',
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon
        return (
          <Link
            key={cat.name}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl
              bg-white border border-gray-100
              hover:border-transparent hover:shadow-lg hover:${cat.bg}
              transform hover:-translate-y-1 transition-all duration-200`}
          >
            {/* Icon bubble */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient}
                flex items-center justify-center shadow-sm
                ring-4 ring-transparent group-hover:${cat.ring}
                group-hover:scale-110 transition-all duration-200`}
            >
              <Icon size={26} className="text-white" strokeWidth={1.75} />
            </div>

            {/* Label */}
            <span
              className={`text-[11px] font-semibold text-gray-500 text-center leading-tight
                group-hover:${cat.label} transition-colors duration-200`}
            >
              {cat.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

