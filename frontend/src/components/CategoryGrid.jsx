import { Link } from 'react-router-dom'

const CATEGORIES = [
  { name: 'Electronics',   emoji: '📱', color: 'from-blue-500 to-indigo-600',   bg: 'bg-blue-50',   text: 'text-blue-700'   },
  { name: 'Fashion',       emoji: '👗', color: 'from-pink-500 to-rose-500',     bg: 'bg-pink-50',   text: 'text-pink-700'   },
  { name: 'Home & Kitchen',emoji: '🏠', color: 'from-amber-500 to-orange-500',  bg: 'bg-amber-50',  text: 'text-amber-700'  },
  { name: 'Books',         emoji: '📚', color: 'from-emerald-500 to-teal-500',  bg: 'bg-emerald-50',text: 'text-emerald-700'},
  { name: 'Sports',        emoji: '🏋️', color: 'from-cyan-500 to-sky-500',      bg: 'bg-cyan-50',   text: 'text-cyan-700'   },
  { name: 'Beauty',        emoji: '💄', color: 'from-fuchsia-500 to-purple-500',bg: 'bg-fuchsia-50',text: 'text-fuchsia-700'},
  { name: 'Groceries',     emoji: '🛒', color: 'from-lime-500 to-green-500',    bg: 'bg-lime-50',   text: 'text-lime-700'   },
  { name: 'Toys',          emoji: '🎮', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-700' },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.name}
          to={`/products?category=${encodeURIComponent(cat.name)}`}
          className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-gray-100
                     hover:border-amber-200 hover:shadow-md
                     transform hover:-translate-y-1 transition-all duration-200"
        >
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center
                          shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-200`}>
            <span className="text-2xl">{cat.emoji}</span>
          </div>
          <span className="text-xs font-semibold text-gray-600 text-center leading-tight group-hover:text-amber-700 transition-colors">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
