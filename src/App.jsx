import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BlogHubPage from './pages/BlogHubPage'
import BlogArticlePage from './pages/BlogArticlePage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import AdminPanel from './pages/admin/AdminPanel'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Hidden admin route - no nav/footer */}
          <Route path="/vs-admin" element={<AdminPanel />} />

          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <PublicLayout>
                <BlogHubPage />
              </PublicLayout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <PublicLayout>
                <BlogArticlePage />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <GalleryPage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <div className="min-h-screen flex items-center justify-center text-center px-6">
                  <div className="space-y-4">
                    <p className="font-serif text-6xl text-sage">404</p>
                    <h1 className="heading-lg">Page not found</h1>
                    <p className="body-text">This path leads nowhere. Let's head back to familiar ground.</p>
                    <a href="/" className="btn-primary inline-flex mt-4">Return home</a>
                  </div>
                </div>
              </PublicLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
