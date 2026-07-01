import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, ChevronDown } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useScrollFade } from '../hooks/useScrollFade'
import { getPosts } from '../lib/dataStore'
import { CATEGORIES, getSubcategories } from '../lib/categories'

export default function BlogHubPage() {
  const [posts, setPosts]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch]       = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeSubCategory, setActiveSubCategory] = useState(searchParams.get('sub') || '')
  const [expandedCat, setExpandedCat] = useState(searchParams.get('category') || '')
  const headerRef = useScrollFade()
  const gridRef   = useScrollFade()

  useEffect(() => {
    getPosts().then((p) => { setPosts(p); setLoading(false) })
  }, [])

  useEffect(() => {
    const cat = searchParams.get('category') || ''
    const sub = searchParams.get('sub') || ''
    setActiveCategory(cat)
    setActiveSubCategory(sub)
    if (cat) setExpandedCat(cat)
  }, [searchParams])

  const selectCategory = (cat) => {
    if (cat === activeCategory) {
      // toggle off
      setActiveCategory('')
      setActiveSubCategory('')
      setExpandedCat('')
      setSearchParams({})
    } else {
      setActiveCategory(cat)
      setActiveSubCategory('')
      setExpandedCat(cat)
      setSearchParams({ category: cat })
    }
  }

  const selectSub = (sub) => {
    const newSub = sub === activeSubCategory ? '' : sub
    setActiveSubCategory(newSub)
    const params = { category: activeCategory }
    if (newSub) params.sub = newSub
    setSearchParams(params)
  }

  const clearAll = () => {
    setSearch('')
    setActiveCategory('')
    setActiveSubCategory('')
    setExpandedCat('')
    setSearchParams({})
  }

  const filtered = posts.filter((post) => {
    const matchSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase()) ||
      post.subCategory?.toLowerCase().includes(search.toLowerCase())
    const matchCat    = !activeCategory    || post.category    === activeCategory
    const matchSub    = !activeSubCategory || post.subCategory === activeSubCategory
    return matchSearch && matchCat && matchSub
  })

  const subcategories = getSubcategories(expandedCat)
  const isFiltered    = activeCategory || activeSubCategory || search
  const [featured, ...rest] = filtered

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        <div>
          <span className="accent-line">Environmental Writing</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-2">
            <div className="space-y-3">
              <h1 className="heading-xl">The Blog</h1>
              <p className="body-text max-w-xl">
                Long-form essays, field reports, and ecological analysis — exploring the systems, stories, and knowledge that shape our planet.
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-grey" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="input-field pl-10 pr-10"
              />
              {search && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-light-grey hover:text-charcoal" onClick={() => setSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="space-y-3">
          {/* Top-level categories */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={clearAll}
              className={`px-3 py-1.5 rounded-sm text-xs font-sans font-medium transition-all duration-200 ${
                !activeCategory ? 'bg-forest text-warm-white' : 'bg-sage/20 text-verdant hover:bg-sage/30'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.label)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans font-medium transition-all duration-200 ${
                  activeCategory === cat.label
                    ? 'bg-forest text-warm-white'
                    : 'bg-sage/20 text-verdant hover:bg-sage/30'
                }`}
              >
                {cat.label}
                {cat.subcategories.length > 0 && (
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 ${
                      expandedCat === cat.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Sub-category row — visible when a category with subs is expanded */}
          {expandedCat && subcategories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pl-4 border-l-2 border-sage/30">
              <span className="text-xs font-sans text-light-grey mr-1">
                {expandedCat} →
              </span>
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => selectSub(sub)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-sans transition-all duration-200 ${
                    activeSubCategory === sub
                      ? 'bg-verdant text-warm-white'
                      : 'bg-sage/10 text-charcoal/70 hover:bg-sage/25'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Active filters summary */}
          {isFiltered && (
            <div className="flex items-center gap-2 text-xs font-sans text-light-grey">
              <span>Showing:</span>
              {activeCategory && <span className="bg-forest/10 text-forest px-2 py-0.5 rounded-sm">{activeCategory}</span>}
              {activeSubCategory && (
                <>
                  <span>›</span>
                  <span className="bg-verdant/10 text-verdant px-2 py-0.5 rounded-sm">{activeSubCategory}</span>
                </>
              )}
              {search && <span className="bg-sage/20 text-charcoal px-2 py-0.5 rounded-sm">"{search}"</span>}
              <button onClick={clearAll} className="text-light-grey hover:text-red-500 transition-colors ml-1">
                <X size={12} /> clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="font-serif text-2xl text-forest mb-3">No articles found</p>
          <p className="body-text text-sm">Try adjusting your search or clearing the filter.</p>
          <button onClick={clearAll} className="btn-outline mt-6 text-xs">Clear filters</button>
        </div>
      ) : (
        <div ref={gridRef} className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
          {featured && <BlogCard post={featured} featured />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
          <p className="text-center font-sans text-xs text-light-grey pt-8">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
    </div>
  )
}
