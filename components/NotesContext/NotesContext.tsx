'use client';

import {
  createContext, useContext, useState, ReactNode,
} from 'react';
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

/**
 * NotesContextProvider component that provides the notes context to its children.
 * @param {NotesProps} props - The properties for the NotesContextProvider component.
 * @returns {JSX.Element} The rendered NotesContextProvider component.
 */
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

/**
 * Custom hook to use the notes context.
 * @returns {NotesContextProps} The notes context.
 * @throws Will throw an error if used outside of a NotesContextProvider.
 */
export const useNotesContext = (): NotesContextProps => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotesContext must be used within a NotesContextProvider');
  }

  return context;
};
