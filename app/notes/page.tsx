import { createClient } from '@/utils/supabase/server';
import NoteList from '@/components/NoteList/NoteList';
import { NotesContextProvider } from '@/components/NotesContext/NotesContext';
import styles from './page.module.scss';

  export default async function Notes() {
    const supabase = await createClient();
    const { data: notes } = await supabase.from("notes").select();

    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pagetitle}>NOTES</h1>
          <NotesContextProvider>
            <NoteList serverNotes={notes || []}/>
          </NotesContextProvider>
        </div>
      </main>
    )
  }