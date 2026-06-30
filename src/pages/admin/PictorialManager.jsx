import { useState, useEffect } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { getGallery, addGalleryImage, deleteGalleryImage } from '../../lib/dataStore'
import { seedCategories } from '../../lib/seedData'

const EMPTY = { imageUrl: '', caption: '', location: '', category: '' }

export default function PictorialManager() {
  const [images, setImages] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const load = () => getGallery().then((g) => { setImages(g); setLoading(false) })

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!form.imageUrl || !form.caption) return
    setAdding(true)
    await addGalleryImage(form)
    setForm(EMPTY)
    setAdded(true)
    load()
    setTimeout(() => setAdded(false), 2000)
    setAdding(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    await deleteGalleryImage(id)
    load()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-md mb-1">Pictorial Manager</h2>
        <p className="body-text text-sm">Add and manage gallery photographs.</p>
      </div>

      {/* Add form */}
      <div className="border border-sage/20 rounded-sm p-6 bg-sage/5 space-y-5">
        <h3 className="font-serif text-lg text-forest">Add New Photograph</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Image URL *
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="input-field"
              placeholder="https://images.unsplash.com/…"
            />
            <p className="text-xs font-sans text-light-grey mt-1.5">
              No file upload yet — paste a direct image link. Free options:{' '}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-verdant underline">Unsplash</a>
              {' '}(search → right-click photo → "Copy image address") or{' '}
              <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-verdant underline">Imgur</a>
              {' '}(upload your own photo, copy the direct link). Google Drive links won't work.
            </p>
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Caption *
            </label>
            <input
              type="text"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="input-field"
              placeholder="Ancient Cedar, Waterfall Valley"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input-field"
              placeholder="British Columbia, Canada"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="select-field"
            >
              <option value="">None</option>
              {seedCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {form.imageUrl && (
          <div className="w-full h-32 overflow-hidden rounded-sm border border-sage/20">
            <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <button onClick={handleAdd} disabled={adding} className="btn-primary">
          {added ? (
            <><Check size={14} /> Added!</>
          ) : adding ? 'Adding…' : (
            <><Plus size={14} /> Add to Gallery</>
          )}
        </button>
      </div>

      {/* Image grid */}
      <div>
        <h3 className="font-serif text-lg text-forest mb-4">Gallery ({images.length} images)</h3>
        {loading ? (
          <p className="body-text text-sm">Loading…</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-sm border border-sage/20">
                <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <p className="font-sans text-warm-white text-xs text-center line-clamp-2">{img.caption}</p>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
