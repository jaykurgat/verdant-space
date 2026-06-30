import { useState, useEffect } from 'react'
import { Save, Check, Image, Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react'
import { getHero, updateHero } from '../../lib/dataStore'

const EMPTY_SLIDE = () => ({
  id: 'slide-' + Date.now(),
  title: '',
  tagline: '',
  imageUrl: '',
})

export default function HeroEditor() {
  const [slides, setSlides]     = useState([])
  const [autoplay, setAutoplay] = useState(true)
  const [intervalSeconds, setIntervalSeconds] = useState(6)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [activePreview, setActivePreview] = useState(0)

  useEffect(() => {
    getHero().then((h) => {
      setSlides(h.slides?.length ? h.slides : [EMPTY_SLIDE()])
      setAutoplay(h.autoplay !== false)
      setIntervalSeconds(h.intervalSeconds || 6)
      setLoading(false)
    })
  }, [])

  const updateSlide = (id, field, value) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const addSlide = () => {
    const newSlide = EMPTY_SLIDE()
    setSlides((prev) => [...prev, newSlide])
    setActivePreview(slides.length)
  }

  const removeSlide = (id) => {
    if (slides.length <= 1) return
    setSlides((prev) => prev.filter((s) => s.id !== id))
    setActivePreview(0)
  }

  const moveSlide = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= slides.length) return
    setSlides((prev) => {
      const copy = [...prev]
      ;[copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]
      return copy
    })
  }

  const save = async () => {
    setSaving(true)
    await updateHero({ slides, autoplay, intervalSeconds })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="body-text text-sm">Loading…</p>

  const preview = slides[activePreview] || slides[0]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-md mb-1">Hero Carousel Editor</h2>
        <p className="body-text text-sm">
          Add, reorder, or remove homepage hero slides. They rotate automatically when there's more than one.
        </p>
      </div>

      {/* Live Preview */}
      {preview?.imageUrl && (
        <div className="relative h-44 rounded-sm overflow-hidden border border-sage/20">
          <img src={preview.imageUrl} alt="Hero preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest/55 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="font-serif text-warm-white text-lg leading-tight">
                {(preview.title || 'Untitled slide').split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}
              </p>
              <p className="font-sans text-warm-white/60 text-xs mt-2 line-clamp-2 max-w-md mx-auto">{preview.tagline}</p>
            </div>
          </div>
        </div>
      )}

      {/* Carousel settings */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-sage/5 border border-sage/20 rounded-sm">
        <label className="flex items-center gap-2 text-sm font-sans text-charcoal cursor-pointer">
          <input
            type="checkbox"
            checked={autoplay}
            onChange={(e) => setAutoplay(e.target.checked)}
            className="w-4 h-4 accent-verdant"
          />
          Auto-rotate slides
        </label>
        {autoplay && (
          <label className="flex items-center gap-2 text-sm font-sans text-charcoal">
            Change every
            <input
              type="number"
              min={3}
              max={30}
              value={intervalSeconds}
              onChange={(e) => setIntervalSeconds(Number(e.target.value))}
              className="input-field w-16 py-1.5 text-center"
            />
            seconds
          </label>
        )}
      </div>

      {/* Slides list */}
      <div className="space-y-4">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`border rounded-sm p-5 space-y-4 transition-colors cursor-pointer ${
              activePreview === i ? 'border-verdant bg-sage/5' : 'border-sage/20'
            }`}
            onClick={() => setActivePreview(i)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-light-grey" />
                <span className="font-serif text-forest">Slide {i + 1}</span>
              </div>
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => moveSlide(i, -1)}
                  disabled={i === 0}
                  className="text-xs px-2 py-1 text-light-grey hover:text-verdant disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSlide(i, 1)}
                  disabled={i === slides.length - 1}
                  className="text-xs px-2 py-1 text-light-grey hover:text-verdant disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeSlide(slide.id)}
                  disabled={slides.length <= 1}
                  className="text-xs px-2 py-1 text-light-grey hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="space-y-3">
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">
                  Title (use a line break for a 2-line heading)
                </label>
                <textarea
                  value={slide.title}
                  onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                  rows={2}
                  className="textarea-field text-sm"
                  placeholder={'Connecting People,\nNature & Knowledge'}
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">
                  Tagline
                </label>
                <textarea
                  value={slide.tagline}
                  onChange={(e) => updateSlide(slide.id, 'tagline', e.target.value)}
                  rows={2}
                  className="textarea-field text-sm"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Image size={12} /> Background Image URL
                </label>
                <input
                  type="url"
                  value={slide.imageUrl}
                  onChange={(e) => updateSlide(slide.id, 'imageUrl', e.target.value)}
                  className="input-field text-sm"
                  placeholder="https://images.unsplash.com/…"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addSlide}
          className="w-full border border-dashed border-sage/40 rounded-sm py-3 flex items-center justify-center gap-2 text-verdant text-sm font-sans hover:bg-sage/5 transition-colors"
        >
          <Plus size={15} /> Add Another Slide
        </button>
      </div>

      {/* Image source helper */}
      <div className="bg-sage/5 border border-sage/20 rounded-sm p-4 text-xs font-sans text-charcoal/70 leading-5">
        <strong className="text-forest">Need an image URL?</strong> Free options: search{' '}
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-verdant underline inline-flex items-center gap-0.5">
          unsplash.com <ExternalLink size={10} />
        </a>{' '}
        and right-click → "Copy image address", or upload any photo to{' '}
        <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-verdant underline inline-flex items-center gap-0.5">
          imgur.com/upload <ExternalLink size={10} />
        </a>{' '}
        and copy the direct image link it gives you. Google Drive links won't work directly.
      </div>

      <button onClick={save} disabled={saving} className="btn-primary">
        {saved ? (<><Check size={14} /> Saved!</>) : saving ? 'Saving…' : (<><Save size={14} /> Save Hero Carousel</>)}
      </button>
    </div>
  )
}
