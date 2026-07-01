import { useState, useEffect } from 'react'
import { Save, Check, Image } from 'lucide-react'
import { getHero, updateHero } from '../../lib/dataStore'

export default function HeroEditor() {
  const [hero, setHero] = useState({ title: '', tagline: '', imageUrl: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getHero().then((h) => {
      setHero(h)
      setLoading(false)
    })
  }, [])

  const save = async () => {
    setSaving(true)
    await updateHero(hero)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="body-text text-sm">Loading…</p>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading-md mb-1">Hero Editor</h2>
        <p className="body-text text-sm">Update the main homepage hero section.</p>
      </div>

      {/* Preview */}
      {hero.imageUrl && (
        <div className="relative h-40 rounded-sm overflow-hidden border border-sage/20">
          <img src={hero.imageUrl} alt="Hero preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest/50 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="font-serif text-warm-white text-xl leading-tight">
                {hero.title.split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}
              </p>
              <p className="font-sans text-warm-white/60 text-xs mt-2 line-clamp-2">{hero.tagline}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
            Hero Title (use \n for line break)
          </label>
          <textarea
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            rows={3}
            className="textarea-field"
            placeholder="Connecting People,\nNature & Knowledge"
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
            Tagline / Subtitle
          </label>
          <textarea
            value={hero.tagline}
            onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
            rows={3}
            className="textarea-field"
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider flex items-center gap-1">
            <Image size={12} /> Background Image URL
          </label>
          <input
            type="url"
            value={hero.imageUrl}
            onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })}
            className="input-field"
            placeholder="https://images.unsplash.com/…"
          />
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="btn-primary"
      >
        {saved ? (
          <><Check size={14} /> Saved!</>
        ) : saving ? (
          'Saving…'
        ) : (
          <><Save size={14} /> Save Changes</>
        )}
      </button>
    </div>
  )
}
