import { useState, useEffect } from 'react'
import { Mail, MapPin, Send, Check, Shield, Leaf, Users, Lightbulb, Sprout, BookOpen, Target } from 'lucide-react'
import { useScrollFade } from '../hooks/useScrollFade'
import { getSiteContent } from '../lib/dataStore'
import LoadingSpinner from '../components/LoadingSpinner'

const values = [
  { icon: Shield,    title: 'Integrity',      description: 'We uphold honesty, transparency and scientific accuracy in everything we publish.' },
  { icon: Leaf,       title: 'Sustainability', description: 'We promote responsible environmental stewardship for present and future generations.' },
  { icon: BookOpen,   title: 'Knowledge',      description: 'We believe informed people make better decisions for the environment.' },
  { icon: Users,      title: 'Collaboration',  description: 'We value partnerships and diverse perspectives to create meaningful impact.' },
  { icon: Lightbulb,  title: 'Innovation',     description: 'We embrace new ideas and technologies to solve environmental challenges.' },
  { icon: Sprout,     title: 'Stewardship',    description: 'We encourage the responsible management and restoration of forests and ecosystems.' },
]

const focusAreas = [
  'Forestry and Forest Conservation',
  'Climate Change and Adaptation',
  'Ecological Restoration',
  'Environmental Policy and Governance',
  'Community-Based Conservation',
  'Nature-Based Solutions',
  'Green Innovation and Technology',
  'Environmental Research',
  'Environmental Education',
]

function ContactForm({ content }) {
  const ref = useScrollFade()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setSending(false)
  }

  return (
    <section ref={ref} className="py-24 px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <span className="accent-line">Get in Touch</span>
          <h2 className="heading-lg">Start a Conversation</h2>
          <p className="body-text">{content.contactIntro}</p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
              <Mail size={16} className="text-verdant flex-shrink-0" />
              {content.contactEmail}
            </div>
            <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
              <MapPin size={16} className="text-verdant flex-shrink-0" />
              {content.contactLocation}
            </div>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-verdant/10 rounded-full flex items-center justify-center">
                <Check size={24} className="text-verdant" />
              </div>
              <h3 className="heading-sm">Message received</h3>
              <p className="body-text text-sm max-w-xs">
                Thank you for reaching out. We'll be in touch within a few days.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                className="btn-outline text-xs mt-2"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">Your Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" required className="input-field" />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required className="input-field" />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What's on your mind?" required rows={5} className="textarea-field" />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full justify-center">
                {sending ? 'Sending…' : (<>Send Message <Send size={14} /></>)}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const heroRef       = useScrollFade()
  const storyRef       = useScrollFade()
  const missionRef     = useScrollFade()
  const objectivesRef  = useScrollFade()
  const focusRef       = useScrollFade()
  const valuesRef      = useScrollFade()

  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteContent().then((c) => { setContent(c); setLoading(false) })
  }, [])

  if (loading || !content) return <LoadingSpinner />

  return (
    <div className="min-h-screen pt-24">

      {/* ── Header ───────────────────────────────────────── */}
      <div ref={heroRef} className="max-w-6xl mx-auto px-6 py-16">
        <span className="accent-line">Our Story</span>
        <h1 className="heading-xl mt-3 mb-4">About Verdant Space</h1>
        <p className="body-text max-w-2xl text-lg leading-8">{content.aboutIntro}</p>
        <div className="w-20 h-1 bg-sage mt-8" />
      </div>

      {/* ── Origin Story ─────────────────────────────────── */}
      <section ref={storyRef} className="py-16 px-6 bg-sage/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="heading-lg">{content.originStoryTitle}</h2>
            <div className="space-y-4 body-text leading-8">
              {content.originStory.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img src={content.originStoryImageUrl} alt="Forest" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-forest p-6 rounded-sm max-w-[220px] hidden md:block">
              <p className="font-accent text-sage text-sm italic leading-relaxed">"{content.originStoryQuote}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────── */}
      <section ref={missionRef} className="py-24 px-6 bg-forest">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <p className="font-accent text-sage text-base">Our Vision</p>
            <h3 className="font-serif text-2xl text-warm-white leading-snug">{content.visionTitle}</h3>
            <p className="font-sans text-sm text-warm-white/60 leading-7">{content.visionText}</p>
          </div>
          <div className="space-y-4">
            <p className="font-accent text-sage text-base">Our Mission</p>
            <h3 className="font-serif text-2xl text-warm-white leading-snug">{content.missionTitle}</h3>
            <p className="font-sans text-sm text-warm-white/60 leading-7">{content.missionText}</p>
          </div>
          <div className="space-y-4">
            <p className="font-accent text-sage text-base">Our Purpose</p>
            <h3 className="font-serif text-2xl text-warm-white leading-snug">{content.purposeTitle}</h3>
            <p className="font-sans text-sm text-warm-white/60 leading-7">{content.purposeText}</p>
          </div>
        </div>
      </section>

      {/* ── Strategic Objectives ─────────────────────────── */}
      <section ref={objectivesRef} className="py-24 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <span className="accent-line">Strategic Objectives</span>
            <h2 className="heading-lg">What We Set Out to Do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.objectives.map((obj, i) => (
              <div key={i} className="flex gap-4 p-6 border border-sage/20 rounded-sm hover:border-verdant/30 transition-colors">
                <div className="w-9 h-9 bg-forest rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-warm-white text-sm">{i + 1}</span>
                </div>
                <p className="body-text text-sm leading-6 pt-1">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Promise ─────────────────────────────────── */}
      <section className="py-16 px-6 bg-verdant">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Target size={28} className="text-warm-white mx-auto" />
          <p className="font-accent text-warm-white/80 text-base">Our Brand Promise</p>
          <p className="font-serif text-2xl md:text-3xl text-warm-white leading-snug">{content.brandPromise}</p>
        </div>
      </section>

      {/* ── Areas of Focus ───────────────────────────────── */}
      <section ref={focusRef} className="py-24 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="accent-line">What We Cover</span>
              <h2 className="heading-lg">Areas of Focus</h2>
              <p className="body-text">
                Our content spans the full breadth of environmental knowledge — from field-level conservation to policy and governance.
              </p>
            </div>
            <ul className="space-y-3">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-3 font-sans text-sm text-charcoal/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-verdant flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────── */}
      <section ref={valuesRef} className="py-24 px-6 bg-sage/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="accent-line">What Guides Us</span>
            <h2 className="heading-lg">Core Values</h2>
            <p className="body-text max-w-xl mx-auto">
              The principles that guide everything we research, write, and publish.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 p-6 border border-sage/20 bg-warm-white rounded-sm hover:border-verdant/30 transition-colors">
                <div className="w-10 h-10 bg-sage/15 rounded-sm flex items-center justify-center flex-shrink-0">
                  <v.icon size={18} className="text-verdant" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-forest">{v.title}</h3>
                  <p className="body-text text-sm leading-6">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm content={content} />
    </div>
  )
}
