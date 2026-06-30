import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, X } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useScrollFade } from '../hooks/useScrollFade'
import { getPosts } from '../lib/dataStore'
import { seedCategories } from '../lib/seedData'

export default function BlogHubPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const headerRef = useScrollFade()
  const gridRef = useScrollFade()

  useEffect(() => {
    getPosts().then((p) => {
      setPosts(p)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const cat = searchParams.get('category') || ''
    setActiveCategory(cat)
  }, [searchParams])

  const setCategory = (cat) => {
    setActiveCategory(cat)
    if (cat) {
      setSearchParams({ category: cat })
    } else {
      setSearchParams({})
    }
  }

  const filtered = posts.filter((post) => {
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !activeCategory || post.category === activeCategory
    return matchSearch && matchCategory
  })

  const [featured, ...rest] = filtered

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <span className="accent-line">Environmental Writing</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h1 className="heading-xl">The Blog</h1>
            <p className="body-text max-w-xl">
              Long-form essays, field reports, and ecological analysis — exploring the systems, stories, and knowledge that shape our planet.
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-grey" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="input-field pl-10 pr-10"
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-grey hover:text-charcoal"
                onClick={() => setSearch('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-light-grey text-xs font-sans mr-1">
            <Filter size={12} /> Filter:
          </span>
          <button
            onClick={() => setCategory('')}
            className={`px-3 py-1 rounded-sm text-xs font-sans font-medium transition-all duration-200 ${
              !activeCategory
                ? 'bg-forest text-warm-white'
                : 'bg-sage/20 text-verdant hover:bg-sage/30'
            }`}
          >
            All
          </button>
          {seedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === activeCategory ? '' : cat)}
              className={`px-3 py-1 rounded-sm text-xs font-sans font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-forest text-warm-white'
                  : 'bg-sage/20 text-verdant hover:bg-sage/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="font-serif text-2xl text-forest mb-3">No articles found</p>
          <p className="body-text text-sm">Try adjusting your search or clearing the filter.</p>
          <button
            onClick={() => { setSearch(''); setCategory('') }}
            className="btn-outline mt-6 text-xs"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
          {/* Featured post */}
          {featured && <BlogCard post={featured} featured />}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <p className="text-center font-sans text-xs text-light-grey pt-8">
            Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            {activeCategory ? ` in ${activeCategory}` : ''}
            {search ? ` matching "${search}"` : ''}
          </p>
        </div>
      )}
    </div>
  )
}
