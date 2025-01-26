import NoteType from '@/types/note';
import { createClient } from '@/utils/supabase/client';

export default async function upsertNotes(notes: NoteType[]) {
  const supabase = createClient();

  const { error } = await supabase
  .from('notes')
  .upsert(notes);

  if (error) {
    console.error("Error updating note: ", error);
  }
}