'use client';

import PopUp from '../PopUp/PopUp';
import { BsPlusCircle } from 'react-icons/bs';
import styles from './addnote.module.scss';
import { useState } from 'react';
import TextField from '../inputs/TextField/TextField';
import addNote from '@/app/api/addNote';
import upsertNotes from '@/app/api/upsertNotes';
import { useNotesContext } from '../NotesContext/NotesContext';


/**
 * AddNote component
 * 
 * @component
 * @returns {JSX.Element} The rendered AddNote component
 */
export default function AddNote() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const context = useNotesContext();

  /**
   * Handles the change event for the text field.
   * @param {Object} event - The event object.
   * @param {string} event.target.value - The value of the text field.
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const notesLength = context.notes.length;

  /**
   * Handles the click event for the add button.
   * Adds a new note to the database and context.
   */
  const handleAddClick = async () => {
    try {
      const data = await addNote(title, 0);
      setDialogIsOpen(false);
      const updatedNotes = [data, ...context.notes];
      for (let i = 0; i < updatedNotes.length; i++) {
        updatedNotes[i].index = i;
      }
      context.setNotes(updatedNotes);
      upsertNotes(updatedNotes);

    } catch (error) {
      console.error("Error adding note: ", error);
    }
  }

  /**
   * The content for the PopUp component.
   * 
   * @returns {JSX.Element} The rendered content for the PopUp component.
   */
  const popUpContent = (
    <TextField 
      id="title"
      placeholder="Enter Note"
      onChange={onChange}
    />
  );

  return (
    <div>
      <button onClick={() => setDialogIsOpen(true)} className={styles.addButton}><BsPlusCircle className={styles.icon}/></button>
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


