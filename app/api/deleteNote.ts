
import { createClient } from '@/utils/supabase/client';

export default async function deleteNote(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting note: ", error);
  }
}