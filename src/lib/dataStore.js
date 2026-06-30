import { isSupabaseConfigured } from './supabase'
import { seedPosts, seedGallery, seedHero, seedSiteContent } from './seedData'

let _sb = null
async function sb() {
  if (_sb) return _sb
  const mod = await import('./supabase')
  _sb = mod.supabase
  return _sb
}

const LS = {
  posts:       'vs_posts',
  gallery:     'vs_gallery',
  hero:        'vs_hero',
  siteContent: 'vs_site_content',
}

function lsGet(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch { return fallback }
}
function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// ── Hero (carousel) ─────────────────────────────────────────────────
export async function getHero() {
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('hero').select('*').single()
    return data || seedHero
  }
  return lsGet(LS.hero, seedHero)
}

export async function updateHero(heroData) {
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('hero').upsert({ id: 1, ...heroData }).select().single()
    return data
  }
  lsSet(LS.hero, heroData)
  return heroData
}

// ── Site Content (About page, Footer, Contact info) ──────────────────
export async function getSiteContent() {
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('site_content').select('*').single()
    return data || seedSiteContent
  }
  return lsGet(LS.siteContent, seedSiteContent)
}

export async function updateSiteContent(content) {
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('site_content').upsert({ id: 1, ...content }).select().single()
    return data
  }
  lsSet(LS.siteContent, content)
  return content
}

// ── Posts ─────────────────────────────────────────────────────────────
export async function getPosts() {
  if (isSupabaseConfigured) {
    const { data } = await (await sb())
      .from('posts').select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
    return data || []
  }
  return lsGet(LS.posts, seedPosts)
}

export async function getPostById(id) {
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('posts').select('*').eq('id', id).single()
    return data
  }
  const posts = lsGet(LS.posts, seedPosts)
  return posts.find((p) => p.id === id) || null
}

export async function getAllPosts() {
  if (isSupabaseConfigured) {
    const { data } = await (await sb())
      .from('posts').select('*')
      .order('published_at', { ascending: false })
    return data || []
  }
  return lsGet(LS.posts, seedPosts)
}

export async function createPost(post) {
  const newPost = {
    ...post,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString(),
    readTime: `${Math.max(1, Math.ceil((post.body || '').split(' ').length / 200))} min read`,
  }
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('posts').insert(newPost).select().single()
    return data
  }
  const posts = lsGet(LS.posts, seedPosts)
  posts.unshift(newPost)
  lsSet(LS.posts, posts)
  return newPost
}

export async function updatePost(id, updates) {
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('posts').update(updates).eq('id', id).select().single()
    return data
  }
  const posts = lsGet(LS.posts, seedPosts)
  const idx = posts.findIndex((p) => p.id === id)
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...updates }
    lsSet(LS.posts, posts)
    return posts[idx]
  }
  return null
}

export async function deletePost(id) {
  if (isSupabaseConfigured) {
    await (await sb()).from('posts').delete().eq('id', id)
    return true
  }
  const posts = lsGet(LS.posts, seedPosts)
  lsSet(LS.posts, posts.filter((p) => p.id !== id))
  return true
}

// ── Gallery ───────────────────────────────────────────────────────────
export async function getGallery() {
  if (isSupabaseConfigured) {
    const { data } = await (await sb())
      .from('gallery').select('*')
      .order('created_at', { ascending: false })
    return data || []
  }
  return lsGet(LS.gallery, seedGallery)
}

export async function addGalleryImage(image) {
  const newImage = { ...image, id: 'g' + Date.now() }
  if (isSupabaseConfigured) {
    const { data } = await (await sb()).from('gallery').insert(newImage).select().single()
    return data
  }
  const gallery = lsGet(LS.gallery, seedGallery)
  gallery.unshift(newImage)
  lsSet(LS.gallery, gallery)
  return newImage
}

export async function deleteGalleryImage(id) {
  if (isSupabaseConfigured) {
    await (await sb()).from('gallery').delete().eq('id', id)
    return true
  }
  const gallery = lsGet(LS.gallery, seedGallery)
  lsSet(LS.gallery, gallery.filter((g) => g.id !== id))
  return true
}
