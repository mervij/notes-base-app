'use client';

import NoteType from '@/types/note';
import styles from './Note.module.scss';

interface NoteProps {
  note: NoteType;
  index: number;
}

export default function Note(props: NoteProps) {
  const { note, index} = props;

  return (
    <div className={styles.note} key={note.id}>{note.name}</div>
  );
}

