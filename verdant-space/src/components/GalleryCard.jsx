import { MapPin } from 'lucide-react'

export default function GalleryCard({ image, onClick }) {
  return (
    <div
      className="masonry-item group relative overflow-hidden rounded-sm cursor-pointer bg-sage/10"
      onClick={() => onClick && onClick(image)}
    >
      <img
        src={image.imageUrl}
        alt={image.caption}
        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="font-serif text-warm-white text-base leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {image.caption}
        </p>
        {image.location && (
          <p className="flex items-center gap-1 font-sans text-warm-white/70 text-xs mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <MapPin size={11} />
            {image.location}
          </p>
        )}
        {image.category && (
          <span className="mt-2 self-start tag bg-sage/30 text-warm-white border-0">
            {image.category}
          </span>
        )}
      </div>
    </div>
  )
}
