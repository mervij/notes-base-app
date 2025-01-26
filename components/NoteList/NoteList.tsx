
import { createClient } from '@/utils/supabase/server';
import styles from './NoteList.module.scss'
import NoteRow from "./NoteRow";

export default async function NoteList() {

  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select().order('index', { ascending: true }); 
  
  if (!notes) {
    return <p>No notes found.</p>
  }

  return (
    <div className={styles.notesContainer}>
      <NoteRow serverNotes={notes} />
    </div>
  )
}