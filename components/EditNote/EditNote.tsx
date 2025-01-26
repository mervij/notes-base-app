'use client';

import PopUp from '../PopUp/PopUp';
import styles from './../AddNote/addnote.module.scss';
import { useState } from 'react';
import TextField from '../inputs/TextField/TextField';
import updateNote from '@/app/api/updateNote';
import NoteType from '@/types/note';
import { useNotesContext } from '../NotesContext/NotesContext';

export default function EditNote() {
  const [title, setTitle] = useState("");
  
  const context = useNotesContext();

  const note = context.notes.find((note:NoteType) => note.id == context.noteToEdit);

  const onChange = (event: any) => {
    setTitle(event.target.value);
  }

  const handleSaveClick = async () => {
    try {
      if (note) {
        updateNote(note.id, title, note.checked);

        const updatedNotes = context.notes.map((upnote: NoteType) => {
          if (upnote.id === note.id) {
            upnote.name = title;
          }
          return upnote;
        });

        context.setNotes(updatedNotes);
        context.setNoteToEdit(null);
      }
    } catch (error) {
      console.error("Error editingnote: ", error);
    }
  }

  const popUpContent = (
    <TextField 
      id="title"
      value={note?.name}
      placeholder={note?.name}
      onChange={onChange}
    />
  );

  return (
    <div className={styles.addNoteContainer}>
      <PopUp
        title="Edit Note"
        content={popUpContent}
        isOpen={context.noteToEdit !== null}
        setIsOpen={() => context.setNoteToEdit(null)}
        buttonName="Save"
        handleClick={handleSaveClick}
      />
    </div>
  )
}
