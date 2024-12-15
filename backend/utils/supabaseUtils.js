// utils/supabaseUtils.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Fetch user role by userId from Supabase
export const fetchUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single(); // Expect only one result since userId is unique

    if (error) throw error;

    return data.role; // Returns 'admin', 'moderator', etc.
  } catch (err) {
    console.error('Error fetching user role:', err.message);
    return null;
  }
};
