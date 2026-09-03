import { supabase } from './supabase.js'

export const signIn  = (email, password) =>
  supabase.auth.signInWithPassword({ email, password }).then(({ data, error }) => {
    if (error) throw error; return data
  })

export const signOut = () => supabase.auth.signOut()

export const getSession = () =>
  supabase.auth.getSession().then(({ data }) => data.session)

export const onAuthChange = (cb) =>
  supabase.auth.onAuthStateChange((_e, session) => cb(session))
