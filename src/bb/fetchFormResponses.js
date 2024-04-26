import { supabase } from '../supabaseClient'; // Adjust the path as needed

export async function fetchFormResponses() {
  const { data, error } = await supabase
    .from('form_responses')
    .select('name, totalTime')
    .order('totalTime', { ascending: true });

  if (error) {
    console.error('Error fetching form responses:', error);
    return [];
  }

  return data;
}
