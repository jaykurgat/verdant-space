import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'

export default function BlogCard({ post, featured = false }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <article className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-warm-white border border-sage/20 overflow-hidden card-hover rounded-sm">
        <div className="overflow-hidden aspect-video md:aspect-auto">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-8 flex flex-col justify-center space-y-4">
          <span className="tag">{post.category}</span>
          <h3 className="font-serif text-2xl text-forest leading-snug group-hover:text-verdant transition-colors">
            {post.title}
          </h3>
          <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{post.subtitle}</p>
          <div className="flex items-center gap-4 text-light-grey text-xs font-sans">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-verdant text-sm font-sans font-medium transition-all duration-300"
          >
            Read article <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="group bg-warm-white border border-sage/20 rounded-sm overflow-hidden card-hover flex flex-col">
      <div className="overflow-hidden aspect-video">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-1 space-y-3">
        <span className="tag">{post.category}</span>
        <h3 className="font-serif text-xl text-forest leading-snug group-hover:text-verdant transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="font-sans text-sm text-charcoal/65 leading-relaxed line-clamp-2 flex-1">
          {post.subtitle}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-sage/20">
          <div className="flex items-center gap-3 text-light-grey text-xs font-sans">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-1 text-verdant text-xs font-sans font-medium hover:gap-2 transition-all duration-300"
          >
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  )
}
