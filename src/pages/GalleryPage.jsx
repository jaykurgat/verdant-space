import { useState, useEffect } from 'react'
import { Camera } from 'lucide-react'
import GalleryCard from '../components/GalleryCard'
import Lightbox from '../components/Lightbox'
import LoadingSpinner from '../components/LoadingSpinner'
import { useScrollFade } from '../hooks/useScrollFade'
import { getGallery } from '../lib/dataStore'

const ALL = 'All'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const headerRef = useScrollFade()
  const gridRef = useScrollFade()

  useEffect(() => {
    getGallery().then((g) => {
      setImages(g)
      setLoading(false)
    })
  }, [])

  const categories = [ALL, ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))]

  const filtered = activeCategory === ALL
    ? images
    : images.filter((i) => i.category === activeCategory)

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <span className="accent-line">Environmental Photography</span>
        <div className="space-y-3">
          <h1 className="heading-xl">The Pictorial</h1>
          <p className="body-text max-w-xl">
            A visual field journal — landscapes, ecosystems, and the quiet details of the living world. Each frame is a record of what is still here, and what is worth protecting.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

      {/* Masonry Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <Camera size={32} className="text-sage mx-auto mb-4" />
          <p className="font-serif text-xl text-forest">No images yet</p>
        </div>
      ) : (
        <div ref={gridRef} className="max-w-6xl mx-auto px-6 pb-24">
          <div className="masonry-grid">
            {filtered.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
          <p className="text-center font-sans text-xs text-light-grey pt-8">
            {filtered.length} photograph{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== ALL ? ` in ${activeCategory}` : ''}
          </p>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % filtered.length)}
        />
      )}
    </div>
  )
}
