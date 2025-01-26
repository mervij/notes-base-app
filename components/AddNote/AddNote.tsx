'use client';

import PopUp from '../PopUp/PopUp';
import { BsPlusCircle } from 'react-icons/bs';
import styles from './addnote.module.scss';
import { useState } from 'react';
import TextField from '../inputs/TextField/TextField';
import addNote from '@/app/api/addNote';
import { useNotesContext } from '../NotesContext/NotesContext';

export default function AddNote() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const context = useNotesContext();

  const onChange = (event: any) => {
    setTitle(event.target.value);
  }

  const notesLength = context.notes.length;

  const handleAddClick = async () => {
    try {
      const data = await addNote(title, notesLength+1);
      setDialogIsOpen(false);
      context.setNotes([...context.notes, data]);
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  }

  const popUpContent = (
    <TextField 
      id="title"
      placeholder="Enter Note"
      onChange={onChange}
    />
  );

  return (
    <div>
      <button onClick={()=>setDialogIsOpen(true)} className={styles.addButton}><BsPlusCircle className={styles.icon}/></button>
      <div className={styles.addNoteContainer}>
        <PopUp
          title="Add Note"
          content={popUpContent}
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          buttonName="Add"
          handleClick={handleAddClick}
        />
      </div>
    </div>
  )
}


