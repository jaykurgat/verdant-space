import { Link } from 'react-router-dom'
import { Leaf, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-warm-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-sage rounded-sm flex items-center justify-center">
                <Leaf size={14} className="text-forest" />
              </div>
              <span className="font-serif text-xl text-warm-white">VerdantSpace</span>
            </Link>
            <p className="font-sans text-sm text-warm-white/60 leading-relaxed max-w-xs">
              A living archive of environmental thought, ecological storytelling, and the quiet intelligence of the natural world.
            </p>
            <p className="font-accent text-sage text-base italic">
              "Connecting People, Nature & Knowledge"
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-sage">Explore</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/blog', label: 'Blog' },
                { to: '/gallery', label: 'Pictorial Gallery' },
                { to: '/about', label: 'About & Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm text-warm-white/70 hover:text-sage transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-sage">Topics</h4>
            <ul className="space-y-2">
              {['Forestry', 'Climate Change', 'Ecological Restoration', 'Biodiversity', 'Indigenous Knowledge', 'Marine Ecosystems'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/blog?category=${encodeURIComponent(cat)}`}
                    className="font-sans text-sm text-warm-white/70 hover:text-sage transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-warm-white/40">
            © {new Date().getFullYear()} Verdant Space. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="text-warm-white/40 hover:text-sage transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="text-warm-white/40 hover:text-sage transition-colors">
              <Instagram size={16} />
            </a>
            <a href="mailto:hello@verdantspace.com" aria-label="Email" className="text-warm-white/40 hover:text-sage transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
