import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const image = images[currentIndex]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Content */}
      <div
        className="relative max-w-5xl w-full max-h-screen flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute -top-10 right-0 text-warm-white/70 hover:text-warm-white transition-colors"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={image.imageUrl}
            alt={image.caption}
            className="w-full max-h-[75vh] object-contain"
          />

          {/* Nav arrows */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-white/10 hover:bg-warm-white/20 flex items-center justify-center text-warm-white transition-colors"
            onClick={onPrev}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-white/10 hover:bg-warm-white/20 flex items-center justify-center text-warm-white transition-colors"
            onClick={onNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Caption */}
        <div className="mt-4 space-y-1 px-1">
          <p className="font-serif text-warm-white text-lg">{image.caption}</p>
          <div className="flex items-center gap-4">
            {image.location && (
              <p className="flex items-center gap-1 font-sans text-warm-white/50 text-sm">
                <MapPin size={13} />
                {image.location}
              </p>
            )}
            {image.category && (
              <span className="tag bg-sage/20 text-sage border-0">{image.category}</span>
            )}
          </div>
        </div>

        {/* Counter */}
        <p className="text-center font-sans text-warm-white/30 text-xs mt-4">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}
