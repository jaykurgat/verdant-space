import { useState } from 'react'
import { Mail, MapPin, Send, Check, Heart, Eye, Globe, Sprout } from 'lucide-react'
import { useScrollFade } from '../hooks/useScrollFade'

const values = [
  {
    icon: Eye,
    title: 'Honest Observation',
    description: 'We look closely and report faithfully — without agenda, without simplification.',
  },
  {
    icon: Heart,
    title: 'Rooted Care',
    description: 'Every piece of writing begins with a genuine love for the living world and the communities embedded within it.',
  },
  {
    icon: Globe,
    title: 'Systems Thinking',
    description: 'Nothing in nature operates in isolation. We explore the connections, not just the components.',
  },
  {
    icon: Sprout,
    title: 'Regenerative Vision',
    description: 'We believe in the possibility of repair — ecological, social, and epistemic.',
  },
]

function ContactForm() {
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
          <p className="body-text">
            Whether you have a story tip, want to collaborate, or simply want to share what's happening in your local ecosystem — Verdant Space is always listening.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
              <Mail size={16} className="text-verdant flex-shrink-0" />
              hello@verdantspace.com
            </div>
            <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
              <MapPin size={16} className="text-verdant flex-shrink-0" />
              Based in East Africa · Writing from everywhere
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
                Thank you for reaching out. I'll be in touch within a few days.
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
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Muriithi"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  required
                  rows={5}
                  className="textarea-field"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center"
              >
                {sending ? 'Sending…' : (
                  <>Send Message <Send size={14} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const heroRef = useScrollFade()
  const storyRef = useScrollFade()
  const valuesRef = useScrollFade()

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div ref={heroRef} className="max-w-6xl mx-auto px-6 py-16">
        <span className="accent-line">Our Story</span>
        <h1 className="heading-xl mt-3 mb-6">About Verdant Space</h1>
        <div className="w-20 h-1 bg-sage" />
      </div>

      {/* Origin Story */}
      <section ref={storyRef} className="py-12 px-6 bg-sage/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="heading-lg">Why I Started Verdant Space</h2>
            <div className="space-y-4 body-text leading-8">
              <p>
                Verdant Space began with a frustration. The environmental stories I most needed to read — rooted in specific places, written with genuine depth, free from the distortions of both doom and false optimism — were hard to find.
              </p>
              <p>
                I had spent years working in conservation, watching how communities understood their landscapes in ways that rarely made it into scientific papers or news cycles. The grandmother who knew which plants signaled soil health. The fisher who could read currents that no instrument measured. The reforestation worker who understood, from watching, that trees planted too close to each other competed rather than cooperated.
              </p>
              <p>
                Verdant Space is an attempt to honor that kind of knowledge. To put it in conversation with ecology, with policy, with the larger stories we tell about our relationship to the living world.
              </p>
              <p>
                It is, in the oldest sense of the word, a field journal.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
                alt="Forest"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-forest p-6 rounded-sm max-w-[200px] hidden md:block">
              <p className="font-accent text-sage text-sm italic">
                "Every forest is a library. You just have to learn to read it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="accent-line">What Guides Us</span>
            <h2 className="heading-lg">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5 p-6 border border-sage/20 rounded-sm hover:border-verdant/30 transition-colors">
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

      <ContactForm />
    </div>
  )
}
