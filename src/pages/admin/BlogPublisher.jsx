import { useState, useEffect } from 'react'
import { Save, Check, Eye, EyeOff } from 'lucide-react'
import { createPost, updatePost } from '../../lib/dataStore'
import { seedCategories } from '../../lib/seedData'
import { renderMarkdown } from '../../utils/markdown'

const EMPTY = {
  title: '',
  subtitle: '',
  category: '',
  body: '',
  imageUrl: '',
  author: 'Verdant Space',
}

export default function BlogPublisher({ onPublished, editPost = null }) {
  const [form, setForm] = useState(EMPTY)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Populate form when editing an existing post
  useEffect(() => {
    if (editPost) {
      setForm({
        title:    editPost.title    || '',
        subtitle: editPost.subtitle || '',
        category: editPost.category || '',
        body:     editPost.body     || '',
        imageUrl: editPost.imageUrl || '',
        author:   editPost.author   || 'Verdant Space',
      })
    } else {
      setForm(EMPTY)
    }
  }, [editPost])

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSave = async () => {
    if (!form.title || !form.body || !form.category) {
      setError('Title, Category, and Body are required.')
      return
    }
    setError('')
    setSaving(true)
    try {
      if (editPost) {
        await updatePost(editPost.id, { ...form, published: true })
      } else {
        await createPost({ ...form, published: true })
      }
      setSaved(true)
      if (!editPost) setForm(EMPTY)
      onPublished?.()
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const isEdit = !!editPost

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="heading-md mb-1">{isEdit ? 'Edit Article' : 'Publish Article'}</h2>
          <p className="body-text text-sm">
            {isEdit ? `Editing: "${editPost.title}"` : 'Write and publish a new blog post.'}
          </p>
        </div>
        <button onClick={() => setPreview(!preview)} className="btn-outline text-xs">
          {preview ? <><EyeOff size={13} /> Edit</> : <><Eye size={13} /> Preview</>}
        </button>
      </div>

      {preview ? (
        <div className="border border-sage/20 rounded-sm p-8 bg-warm-white space-y-4">
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="w-full h-52 object-cover rounded-sm" />
          )}
          {form.category && <span className="tag">{form.category}</span>}
          <h1 className="font-serif text-3xl text-forest">{form.title || 'Untitled'}</h1>
          {form.subtitle && (
            <p className="font-serif text-lg text-charcoal/60 italic">{form.subtitle}</p>
          )}
          <div className="border-t border-sage/20 pt-6">
            <article
              className="article-body"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body || '_No content yet._') }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                className="input-field"
                placeholder="Article title…"
              />
            </div>
            <div>
              <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="select-field"
              >
                <option value="">Select category…</option>
                {seedCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Subtitle / Standfirst
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => update('subtitle', e.target.value)}
              className="input-field"
              placeholder="One-sentence description…"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Featured Image URL
            </label>
            {form.imageUrl && (
              <div className="mb-2 h-24 w-40 overflow-hidden rounded-sm border border-sage/20">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => update('imageUrl', e.target.value)}
              className="input-field"
              placeholder="https://images.unsplash.com/…"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Author
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
              Body (Markdown supported) *
            </label>
            <div className="mb-1.5 text-xs font-sans text-light-grey">
              ## Heading &nbsp;|&nbsp; **bold** &nbsp;|&nbsp; *italic* &nbsp;|&nbsp; {'>'} blockquote &nbsp;|&nbsp; - list item
            </div>
            <textarea
              value={form.body}
              onChange={(e) => update('body', e.target.value)}
              rows={18}
              className="textarea-field font-mono text-xs leading-6"
              placeholder={`## Introduction\n\nWrite your article here. Markdown is supported.\n\n> Key quotes look great in blockquotes.\n\n**Bold** and *italic* formatting are supported.`}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saved ? (
            <><Check size={14} /> {isEdit ? 'Updated!' : 'Published!'}</>
          ) : saving ? (
            isEdit ? 'Updating…' : 'Publishing…'
          ) : (
            <><Save size={14} /> {isEdit ? 'Save Changes' : 'Publish Article'}</>
          )}
        </button>
        {isEdit && (
          <button onClick={() => onPublished?.()} className="btn-outline text-xs">
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
