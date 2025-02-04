'use client';

import deleteNote from '@/app/api/deleteNote';
import upsertNotes from '@/app/api/upsertNotes';
import NoteType from '@/types/note';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import Checkbox from '../inputs/Checkbox/Checkbox';
import styles from './Note.module.scss';
import { FiMenu } from "react-icons/fi";
import { useNotesContext } from "../NotesContext/NotesContext";
import { useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * Note component properties.
 * @typedef {Object} NoteProps
 * @property {NoteType} note - The note object.
 * @property {number} index - The index of the note.
 */

interface NoteProps {
  note: NoteType;
  index: number;
}

/**
 * Note component that displays a note with a checkbox and a menu dropdown.
 * @param {NoteProps} props - The properties for the Note component.
 * @returns {JSX.Element} The rendered Note component.
 */
export default function Note(props: NoteProps) {
  const { note, index } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const context = useNotesContext();

  /**
   * Handles the deletion of a note from the menu.
   * @param {Object} event - The event object.
   * @param {string} event.value - The ID of the note to be deleted.
   */
  const handleMenuDelete = (event: HTMLButtonElement) => {
    deleteNote(event.value);
    const updatedNotes = context.notes?.filter((note) => note.id != event.value);
    context.setNotes(updatedNotes);
  }

  /**
   * Handles the editing of a note from the menu.
   * @param {Object} event - The event object.
   * @param {string} event.value - The ID of the note to be edited.
   */
  const handleMenuEdit = (event: HTMLButtonElement) => {
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

  /**
   * Handles the change event of the checkbox.
   * @param {Object} event - The event object.
   * @param {boolean} event.target.checked - The checked state of the checkbox.
   * @param {string} event.target.id - The ID of the note.
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    const id: string = event.target.id;
    const checkedNote = context.notes?.find((note) => note.id == id);

    if (checkedNote) {
      const updatedNotes = context.notes?.map((note: NoteType) => {
        if (note.id == id) {
          note.checked = checked;
        }
        return note;
      });
  
      const reorderedNotes = arrayMove(updatedNotes, checkedNote.index, checked ? updatedNotes.length - 1 : 0);
      // Change each item's variable 'index' to match the new order
      for (let i = 0; i < reorderedNotes.length; i++) {
        reorderedNotes[i].index = i;
      }
  
      context.setNotes(reorderedNotes);
      upsertNotes(reorderedNotes);
    }
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={styles.note}
    >
      <Checkbox id={note.id} label={note.name} isChecked={note.checked} onChange={handleCheckboxChange} />
      <div className={styles.dropdownContainer}>
        <MenuDropdown attr={attributes} list={listeners} id={note.id} menuButton={<FiMenu />} menuItems={menuItems} />
      </div>
    </div>
  );
}
