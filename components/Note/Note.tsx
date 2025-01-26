'use client';

import deleteNote from '@/app/api/deleteNote';
import updateNote from '@/app/api/updateNote';
import upsertNotes from '@/app/api/upsertNotes';
import NoteType from '@/types/note';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import Checkbox from '../inputs/Checkbox/Checkbox';
import styles from './Note.module.scss';
import { FiMenu } from "react-icons/fi";
import { useNotesContext } from "../NotesContext/NotesContext";

interface NoteProps {
  note: NoteType;
  index: number;
}

export default function Note(props: NoteProps) {
  const { note, index} = props;

  const context = useNotesContext();

  const handleMenuDelete = (event: any) => {
    deleteNote(event.value);
    const updatedNotes = context.notes?.filter((note) => note.id != event.value);
    context.setNotes(updatedNotes);
  }

  const handleMenuEdit = (event: any) => {
    context.setNoteToEdit(event.value);
  }

  const menuItems = [
    {
      name: "Edit",
      handleClick: handleMenuEdit
    },
    {
      name: "Delete",
      handleClick: handleMenuDelete
    }
  ]

  const handleCheckboxChange = (event: any) => {
    const checked = event.target.checked;

    const id: string = event.target.id;
    updateNote(id, undefined, checked, undefined);

    const updatedNotes = context.notes?.map((note: NoteType) => {
      if (note.id == id) {
        note.checked = checked;
      }
      return note;
    });
    
    const reorderedNotes = reorderNotes(updatedNotes, id, checked ? 'last' : 'first');

    context.setNotes(reorderedNotes);
    upsertNotes(reorderedNotes);
  }

  return (
    <div className={styles.note}>
      <Checkbox id={note.id} label={note.name} isChecked={note.checked} onChange={handleCheckboxChange} />
      <div className={styles.dropdownContainer}>
        <MenuDropdown id={note.id} menuButton={<FiMenu />} menuItems={menuItems} />
      </div>
    </div>
  );
}

function reorderNotes(notes: NoteType[], id: string, position: 'first' | 'last' ) {

  const note = notes?.find(note => note.id == id);

  if (!note) {
    console.error("Note not found");
    return [];
  }

  // If the note is already at the top or bottom, do nothing
  if (position === 'first' && note.index === 0 || (position === 'last' && note.index === notes.length - 1)) {
    return notes;
  }

  let updatedNotes: NoteType[] = [];

  // If position is first, go though the notes and give all notes one bigger index than the previous, 
  // except the note with the id, which gets 0
  if (position === 'first') {
    let index = 0;
    updatedNotes = notes.map((note) => {
      if (note.id == id) {
        return { ...note, index: 0 };
      }
      index++;

      return { ...note, index: index };
    });
  // If position is last, go though the notes starting from the note with the id,
  // give the note with the id the index length-1 and all others -1 compared to the current
  } else {
    note.index = notes.length - 1;
    for (let i = note.index + 1; i < notes.length; i++) {
      notes[i].index = notes[i].index - 1; 
    }
    updatedNotes = notes.filter((note) => note.id != id);
    updatedNotes.push(note);
  }

  updatedNotes.sort((a, b) => a.index - b.index);

  return updatedNotes;

}

