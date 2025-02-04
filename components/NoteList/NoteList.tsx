
'use client';

import { useEffect } from "react";
import { useNotesContext } from "../NotesContext/NotesContext";
import styles from './NoteList.module.scss'
import NoteRow from "./NoteRow";
import NoteType from '@/types/note';

/**
 * NoteList component properties.
 * @typedef {Object} NoteListProps
 * @property {NoteType[]} notes - The array of note objects.
 */
interface NoteListProps {
  serverNotes: NoteType[];
}

/**
 * NoteList component that displays a list of notes.
 * @param {NoteListProps} props - The properties for the NoteList component.
 * @returns {JSX.Element} The rendered NoteList component.
 */
export default function NoteList(props: NoteListProps) {

  const { serverNotes } = props;

  const context = useNotesContext();

  useEffect(() => {
    context.setNotes(serverNotes)
  }, [serverNotes])

  if (!serverNotes) {
    return <p>No notes found.</p>
  }

  return (
    <div className={styles.notesContainer}>
      <NoteRow />
    </div>
  )
}