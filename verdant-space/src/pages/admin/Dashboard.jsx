import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Trash2, ExternalLink, FileText, Image, Leaf, TrendingUp } from 'lucide-react'
import { getAllPosts, deletePost, getGallery } from '../../lib/dataStore'

export default function Dashboard({ onEditPost, onTabChange }) {
  const [posts, setPosts] = useState([])
  const [galleryCount, setGalleryCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const load = () =>
    Promise.all([getAllPosts(), getGallery()]).then(([p, g]) => {
      setPosts(p)
      setGalleryCount(g.length)
      setLoading(false)
    })

  useEffect(() => { load() }, [])

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await deletePost(id)
    load()
  }

  const stats = [
    { label: 'Published Articles', value: posts.length, icon: FileText, color: 'text-verdant' },
    { label: 'Gallery Images', value: galleryCount, icon: Image, color: 'text-sage' },
    { label: 'Categories', value: new Set(posts.map((p) => p.category)).size, icon: Leaf, color: 'text-forest' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-md mb-1">Dashboard</h2>
        <p className="body-text text-sm">Overview of all content on Verdant Space.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-sage/5 border border-sage/20 rounded-sm p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="font-serif text-2xl text-forest">{s.value}</p>
              <p className="font-sans text-xs text-light-grey">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Posts table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg text-forest">All Articles</h3>
          <button
            onClick={() => onTabChange?.('publish')}
            className="btn-primary text-xs py-2"
          >
            + New Article
          </button>
        </div>

        {loading ? (
          <p className="body-text text-sm">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 border border-sage/20 rounded-sm">
            <TrendingUp size={24} className="text-sage mx-auto mb-3" />
            <p className="font-serif text-lg text-forest">No articles yet</p>
            <p className="body-text text-sm">Publish your first article to get started.</p>
          </div>
        ) : (
          <div className="border border-sage/20 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-sage/10 border-b border-sage/20">
                    <th className="text-left font-sans text-xs text-charcoal/60 uppercase tracking-wider px-4 py-3">Title</th>
                    <th className="text-left font-sans text-xs text-charcoal/60 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
                    <th className="text-left font-sans text-xs text-charcoal/60 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Published</th>
                    <th className="text-right font-sans text-xs text-charcoal/60 uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/10">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-sage/5 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-sans text-sm text-charcoal font-medium line-clamp-1">{post.title}</p>
                        <p className="font-sans text-xs text-light-grey line-clamp-1 mt-0.5 md:hidden">{post.category}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="tag">{post.category}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="font-sans text-xs text-light-grey">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/blog/${post.id}`}
                            target="_blank"
                            className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-sage/20 text-light-grey hover:text-verdant transition-colors"
                          >
                            <ExternalLink size={13} />
                          </Link>
                          <button
                            onClick={() => onEditPost?.(post)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-sage/20 text-light-grey hover:text-verdant transition-colors"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-red-50 text-light-grey hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
