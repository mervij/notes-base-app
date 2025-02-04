'use client';

import styles from './NoteList.module.scss'
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote';
import EditNote from '../EditNote/EditNote';
import NoteType from '@/types/note';
import { useNotesContext } from "../NotesContext/NotesContext";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import upsertNotes from '@/app/api/upsertNotes';

/**
 * NoteRow component that displays a row of notes.
 * @param {NoteRowProps} props - The properties for the NoteRow component.
 * @returns {JSX.Element} The rendered NoteRow component.
 */
export default function NoteRow() {
  const context = useNotesContext();

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01
    }
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    pointerSensor
  );

  /**
   * Handles the drag end event to reorder notes.
   * @param {DragEndEvent} event - The drag end event.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return

    let updatedNotes = context.notes;

    if (active.id !== over.id) {

      const activeElement = updatedNotes.find((element: any) => element.id === active.id);
      const overElement = updatedNotes.find((element: any) => element.id === over.id);

      if (activeElement && overElement) { 
        const oldIndex = updatedNotes.indexOf(activeElement);
        const newIndex = updatedNotes.indexOf(overElement);

        updatedNotes = arrayMove(updatedNotes, oldIndex, newIndex);

        // change each item's variable 'index' to match the new order
        for (let i = 0; i < updatedNotes.length; i++) {
          updatedNotes[i].index = i;
        }

        context.setNotes(updatedNotes);
        upsertNotes(updatedNotes);
      }
    }
  };

  console.log('context.notes', context.notes);

  if (!context.notes || !context.notes.length) {
    return (
      <>
        <AddNote />
        <div className={styles.noteList}>
          <p>No notes found.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <AddNote />
      {context.noteToEdit && <EditNote />}
      <div className={styles.noteList} key='notelist1'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={context.notes} strategy={verticalListSortingStrategy}>
          {context.notes?.map((note: NoteType, index: number) => (
            <Note key={note.id} note={note} index={index} />
          ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}



