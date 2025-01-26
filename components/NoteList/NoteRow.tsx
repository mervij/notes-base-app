'use client';

import styles from './NoteList.module.scss'
import { useEffect, useState } from 'react';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import NoteType from '@/types/note';
import { useNotesContext } from "../NotesContext/NotesContext";


interface NoteRowProps {
  serverNotes: NoteType[];
}

export default function NoteRow(props: NoteRowProps) {
  const { serverNotes } = props;

  const context = useNotesContext();

  useEffect(() => {
    context.setNotes(serverNotes)
  }, [serverNotes])

  return (
    <><AddNote />
    <div className={styles.noteList} key='notelist1'>
      {context.notes?.map((note: NoteType, index: number) => (
        <Note key={note.id} note={note} index={index} />
      ))}
    </div>
    </>
  );
}

