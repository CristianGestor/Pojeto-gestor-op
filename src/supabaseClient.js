import { createClient } from '@supabase/supabase-js'

// Pega a URL e a Chave Anon que configuramos na Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cria e exporta o cliente Supabase para ser usado em outras partes do projeto
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
