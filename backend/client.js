import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytxacxlxksahsbtpdxjx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGFjeGx4a3NhaHNidHBkeGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNzI2NjMsImV4cCI6MjAzOTc0ODY2M30.64LvBPSju1xwtJSI1CXz_p4Q6yo5NeSHBJCKhUzOFFQ'
export const supabase = createClient(supabaseUrl, supabaseKey)