'use client';

import {
  createContext, useContext, useState, ReactNode,
} from 'react';
// import NoteType from types/note in root directory
import NoteType from '@/types/note';

export interface NotesContextProps {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  noteToEdit: string | null;
  setNoteToEdit: (note: string | null) => void;
}

export interface NotesProps {
  children: ReactNode
}

const initialNotes: NoteType[] = [];

const NotesContext = createContext<NotesContextProps | null>(null);

export function NotesContextProvider(props: NotesProps) {
  const { children } = props;
  const [notes, setNotes] = useState(initialNotes);
  const [noteToEdit, setNoteToEdit] = useState<string | null>(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotesContext.Provider value={ { notes, setNotes, noteToEdit, setNoteToEdit } }>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotesContext must be used within a NotesContextProvider');
  }

  return context;
};
