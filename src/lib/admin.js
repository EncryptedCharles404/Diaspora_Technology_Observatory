import { supabase } from './supabase.js'

export async function getAllPatents() {
  const { data, error } = await supabase
    .from('patents').select('*')
    .order('sector').order('name')
  if (error) throw error
  return data
}

// Clean entry before sending to Supabase — removes any UI-only fields
function cleanEntry(entry) {
  const { selectedTags, ...rest } = entry
  return rest
}

export async function addPatent(entry) {
  const { data, error } = await supabase
    .from('patents').insert([cleanEntry(entry)]).select().single()
  if (error) throw error
  await logAudit('INSERT', data.id, data.name, data)
  return data
}

export async function updatePatent(id, changes) {
  const { data, error } = await supabase
    .from('patents').update(cleanEntry(changes)).eq('id', id).select().single()
  if (error) throw error
  await logAudit('UPDATE', id, data.name, changes)
  return data
}

export async function deletePatent(id, name) {
  const { error } = await supabase.from('patents').delete().eq('id', id)
  if (error) throw error
  await logAudit('DELETE', id, name, {})
}

export async function togglePublished(id, currentState) {
  const { data, error } = await supabase
    .from('patents').update({ is_published: !currentState }).eq('id', id).select().single()
  if (error) throw error
  return data
}

// Audit log
async function logAudit(action, patentId, patentName, diff) {
  const { data: { user } } = await supabase.auth.getUser()
  await supabase.from('audit_log').insert([{
    action, patent_id: patentId, patent_name: patentName,
    changed_by: user?.email || 'admin',
    diff: JSON.stringify(diff)
  }])
}

export async function getAuditLog(limit = 50) {
  const { data, error } = await supabase
    .from('audit_log').select('*')
    .order('changed_at', { ascending: false }).limit(limit)
  if (error) throw error
  return data
}

// Admin: consultation requests
export async function getConsultations() {
  const { data, error } = await supabase
    .from('consultation_requests').select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateConsultationStatus(id, status) {
  const { error } = await supabase
    .from('consultation_requests').update({ status }).eq('id', id)
  if (error) throw error
}

// Admin: subscribers
export async function getSubscribers() {
  const { data, error } = await supabase
    .from('subscribers').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Admin: most viewed entries
export async function getTopViewed(limit = 10) {
  const { data, error } = await supabase
    .from('patents').select('id, name, sector, view_count')
    .order('view_count', { ascending: false }).limit(limit)
  if (error) throw error
  return data
}
