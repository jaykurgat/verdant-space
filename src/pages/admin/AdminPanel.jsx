import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, FileText, Image, Settings, LogOut, Menu, X, ExternalLink } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AdminLogin from './AdminLogin'
import Dashboard from './Dashboard'
import HeroEditor from './HeroEditor'
import BlogPublisher from './BlogPublisher'
import PictorialManager from './PictorialManager'

const tabs = [
  { id: 'dashboard', label: 'Dashboard',       icon: LayoutDashboard },
  { id: 'hero',      label: 'Hero Editor',      icon: Settings        },
  { id: 'publish',   label: 'Publish Article',  icon: FileText        },
  { id: 'gallery',   label: 'Pictorial',        icon: Image           },
]

export default function AdminPanel() {
  const { isAuthenticated, logout, loading } = useAuth()
  const [activeTab, setActiveTab]     = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editPost, setEditPost]       = useState(null)   // post being edited

  // Show nothing while auth state is resolving
  if (loading) return (
    <div className="min-h-screen bg-forest flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-sage/30 border-t-sage rounded-full animate-spin" />
    </div>
  )

  if (!isAuthenticated) return <AdminLogin />

  // Navigate to publish tab pre-loaded with a post for editing
  const handleEditPost = (post) => {
    setEditPost(post)
    setActiveTab('publish')
  }

  // After publish/update, return to dashboard and clear edit state
  const handlePublished = () => {
    setEditPost(null)
    setActiveTab('dashboard')
  }

  const navigate = (tab) => {
    if (tab !== 'publish') setEditPost(null)
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onEditPost={handleEditPost} onTabChange={navigate} />
      case 'hero':      return <HeroEditor />
      case 'publish':   return <BlogPublisher onPublished={handlePublished} editPost={editPost} />
      case 'gallery':   return <PictorialManager />
      default:          return null
    }
  }

  const activeLabel = tabs.find(t => t.id === activeTab)?.label

  return (
    <div className="min-h-screen bg-warm-white flex">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-60 bg-forest flex flex-col
        transition-transform duration-300 md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-warm-white/10 flex items-center gap-2.5">
          <img src="/logo.png" alt="Verdant Space" className="w-7 h-7 object-contain flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-serif text-warm-white text-base leading-none truncate">VerdantSpace</p>
            <p className="font-sans text-warm-white/40 text-[11px] mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-sans
                transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-sage/20 text-sage'
                  : 'text-warm-white/60 hover:text-warm-white hover:bg-warm-white/5'}
              `}
            >
              <tab.icon size={15} className="flex-shrink-0" />
              {tab.label}
              {tab.id === 'publish' && editPost && (
                <span className="ml-auto text-[10px] bg-verdant/30 text-sage px-1.5 py-0.5 rounded-sm">
                  editing
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer links */}
        <div className="px-3 py-4 border-t border-warm-white/10 space-y-0.5">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-sans
                       text-warm-white/50 hover:text-warm-white hover:bg-warm-white/5 transition-all"
          >
            <ExternalLink size={14} />
            View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-sans
                       text-warm-white/50 hover:text-red-300 hover:bg-red-900/20 transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-charcoal/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main area ───────────────────────────────────────── */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-warm-white/95 backdrop-blur-sm border-b border-sage/20
                           px-6 h-14 flex items-center gap-4 flex-shrink-0">
          <button
            className="md:hidden text-charcoal p-1 -ml-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2 text-sm font-sans text-charcoal/60">
            <span>Admin</span>
            <span className="text-light-grey">/</span>
            <span className="text-charcoal font-medium">{activeLabel}</span>
            {editPost && activeTab === 'publish' && (
              <>
                <span className="text-light-grey">/</span>
                <span className="text-verdant truncate max-w-[200px]">{editPost.title}</span>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
