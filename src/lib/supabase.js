import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Public: fetch patents with optional filters
export async function getPatents({ sector, accessType, confidence, search, tags } = {}) {
  let q = supabase
    .from('patents')
    .select('*')
    .eq('is_published', true)
    .order('sector').order('name')

  if (sector)     q = q.eq('sector', sector)
  if (accessType) q = q.eq('access_type', accessType)
  if (confidence) q = q.eq('confidence', confidence)
  if (tags?.length) q = q.contains('tags', tags)
  if (search) {
    q = q.or(
      `name.ilike.%${search}%,description.ilike.%${search}%,countries.ilike.%${search}%,holder.ilike.%${search}%,notes.ilike.%${search}%`
    )
  }
  const { data, error } = await q
  if (error) throw error
  return data
}

// ── Public: get one entry by ID
export async function getPatentById(id) {
  const { data, error } = await supabase
    .from('patents').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

// ── Public: get recently added entries
export async function getRecentPatents(limit = 6) {
  const { data, error } = await supabase
    .from('patents').select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

// ── Public: get library stats
export async function getLibraryStats() {
  const { data, error } = await supabase
    .from('patents').select('sector, access_type, confidence')
    .eq('is_published', true)
  if (error) throw error
  return {
    total:    data.length,
    sectors:  [...new Set(data.map(r => r.sector))].length,
    pd:       data.filter(r => r.access_type === 'Public Domain').length,
    pool:     data.filter(r => r.access_type === 'Patent Pool').length,
    cl:       data.filter(r => r.access_type === 'Compulsory License').length,
  }
}

// ── Public: increment view count
export async function incrementViewCount(id) {
  await supabase.rpc('increment_view_count', { patent_id: id })
}

// ── Public: submit consultation request
export async function submitConsultation(data) {
  const { error } = await supabase.from('consultation_requests').insert([data])
  if (error) throw error
}

// ── Public: subscribe to newsletter
export async function subscribeNewsletter(email, source = 'unknown') {
  const { error } = await supabase.from('subscribers').insert([{ email, source }])
  if (error) {
    if (error.code === '23505') throw new Error('already_subscribed')
    throw error
  }
}
