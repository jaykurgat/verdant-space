import { useState, useEffect } from 'react'
import { Save, Check, Plus, Trash2 } from 'lucide-react'
import { getSiteContent, updateSiteContent } from '../../lib/dataStore'

const SECTIONS = [
  { id: 'origin',  label: 'Origin Story'        },
  { id: 'vision',  label: 'Vision / Mission'    },
  { id: 'objectives', label: 'Objectives'       },
  { id: 'contact', label: 'Contact & Footer'    },
]

export default function SiteContentEditor() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [tab, setTab]         = useState('origin')

  useEffect(() => {
    getSiteContent().then((c) => { setContent(c); setLoading(false) })
  }, [])

  const update = (field, value) => setContent((c) => ({ ...c, [field]: value }))

  const updateObjective = (i, value) => {
    setContent((c) => {
      const objectives = [...c.objectives]
      objectives[i] = value
      return { ...c, objectives }
    })
  }
  const addObjective = () => setContent((c) => ({ ...c, objectives: [...c.objectives, ''] }))
  const removeObjective = (i) => setContent((c) => ({
    ...c, objectives: c.objectives.filter((_, idx) => idx !== i)
  }))

  const save = async () => {
    setSaving(true)
    await updateSiteContent(content)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading || !content) return <p className="body-text text-sm">Loading…</p>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading-md mb-1">Site Content</h2>
        <p className="body-text text-sm">
          Edit the About page, Vision/Mission, Objectives, and Footer/Contact details.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-sage/20 pb-3">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setTab(s.id)}
            className={`px-3 py-1.5 rounded-sm text-xs font-sans font-medium transition-colors ${
              tab === s.id ? 'bg-forest text-warm-white' : 'bg-sage/15 text-verdant hover:bg-sage/25'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Origin Story ─────────────────────────────────── */}
      {tab === 'origin' && (
        <div className="space-y-5">
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              About Page Intro
            </label>
            <textarea
              value={content.aboutIntro}
              onChange={(e) => update('aboutIntro', e.target.value)}
              rows={3}
              className="textarea-field"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Origin Story Title
            </label>
            <input
              type="text"
              value={content.originStoryTitle}
              onChange={(e) => update('originStoryTitle', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Origin Story (use blank lines between paragraphs)
            </label>
            <textarea
              value={content.originStory}
              onChange={(e) => update('originStory', e.target.value)}
              rows={10}
              className="textarea-field text-sm leading-6"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Origin Story Image URL
            </label>
            <input
              type="url"
              value={content.originStoryImageUrl}
              onChange={(e) => update('originStoryImageUrl', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Pull-quote (shown over the image)
            </label>
            <input
              type="text"
              value={content.originStoryQuote}
              onChange={(e) => update('originStoryQuote', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      )}

      {/* ── Vision / Mission / Purpose ───────────────────── */}
      {tab === 'vision' && (
        <div className="space-y-6">
          {[
            { key: 'vision',  label: 'Vision'  },
            { key: 'mission', label: 'Mission' },
            { key: 'purpose', label: 'Purpose' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-3 p-4 border border-sage/20 rounded-sm">
              <p className="font-serif text-forest text-base">{label}</p>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">
                  {label} Headline
                </label>
                <input
                  type="text"
                  value={content[`${key}Title`]}
                  onChange={(e) => update(`${key}Title`, e.target.value)}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">
                  {label} Description
                </label>
                <textarea
                  value={content[`${key}Text`]}
                  onChange={(e) => update(`${key}Text`, e.target.value)}
                  rows={2}
                  className="textarea-field text-sm"
                />
              </div>
            </div>
          ))}
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Brand Promise
            </label>
            <textarea
              value={content.brandPromise}
              onChange={(e) => update('brandPromise', e.target.value)}
              rows={3}
              className="textarea-field"
            />
          </div>
        </div>
      )}

      {/* ── Objectives ───────────────────────────────────── */}
      {tab === 'objectives' && (
        <div className="space-y-3">
          {content.objectives.map((obj, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-7 h-7 bg-forest text-warm-white rounded-sm flex items-center justify-center text-xs font-serif flex-shrink-0">
                {i + 1}
              </span>
              <input
                type="text"
                value={obj}
                onChange={(e) => updateObjective(i, e.target.value)}
                className="input-field text-sm"
              />
              <button
                onClick={() => removeObjective(i)}
                className="text-light-grey hover:text-red-500 p-1 flex-shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={addObjective}
            className="w-full border border-dashed border-sage/40 rounded-sm py-2.5 flex items-center justify-center gap-2 text-verdant text-xs font-sans hover:bg-sage/5 transition-colors"
          >
            <Plus size={13} /> Add Objective
          </button>
        </div>
      )}

      {/* ── Contact & Footer ─────────────────────────────── */}
      {tab === 'contact' && (
        <div className="space-y-5">
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Contact Page Intro
            </label>
            <textarea
              value={content.contactIntro}
              onChange={(e) => update('contactIntro', e.target.value)}
              rows={3}
              className="textarea-field"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                Contact Email
              </label>
              <input
                type="email"
                value={content.contactEmail}
                onChange={(e) => update('contactEmail', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                Location Line
              </label>
              <input
                type="text"
                value={content.contactLocation}
                onChange={(e) => update('contactLocation', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Footer Tagline
            </label>
            <textarea
              value={content.footerTagline}
              onChange={(e) => update('footerTagline', e.target.value)}
              rows={3}
              className="textarea-field"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Footer Quote
            </label>
            <input
              type="text"
              value={content.footerQuote}
              onChange={(e) => update('footerQuote', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      )}

      <button onClick={save} disabled={saving} className="btn-primary">
        {saved ? (<><Check size={14} /> Saved!</>) : saving ? 'Saving…' : (<><Save size={14} /> Save Changes</>)}
      </button>
    </div>
  )
}
