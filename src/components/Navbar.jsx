import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/',        label: 'Home'      },
  { to: '/blog',    label: 'Blog'      },
  { to: '/gallery', label: 'Pictorial' },
  { to: '/about',   label: 'About'     },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    // Always solid / glass — never transparent, logo and text always visible
    <nav className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-shadow duration-300 ${
      scrolled ? 'shadow-sm' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo — always full color, always visible */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Verdant Space"
            className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-serif text-xl tracking-wide leading-none text-forest">
            Verdant<span className="text-verdant">Space</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm tracking-wide transition-colors duration-200 relative group ${
                location.pathname === link.to ? 'text-verdant' : 'text-charcoal hover:text-forest'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-verdant transition-all duration-300 ${
                location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          <Link
            to="/blog"
            className="font-sans font-medium text-xs px-4 py-2 rounded-sm bg-forest text-warm-white hover:bg-verdant transition-all duration-300"
          >
            Read Latest
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-forest"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden glass-nav border-t border-sage/20 overflow-hidden transition-all duration-300 ${
        open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm py-2 border-b border-sage/20 transition-colors ${
                location.pathname === link.to ? 'text-verdant' : 'text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/blog" className="btn-primary text-xs text-center justify-center">
            Read Latest
          </Link>
        </div>
      </div>
    </nav>
  )
}
