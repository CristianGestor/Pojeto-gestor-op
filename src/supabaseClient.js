import { createClient } from '@supabase/supabase-js'

// Lê a URL do projeto do arquivo de ambiente da Vercel.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// Lê a chave pública (anon) do arquivo de ambiente da Vercel.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cria e exporta o cliente Supabase para ser usado em outros lugares do aplicativo.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
