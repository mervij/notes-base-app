'use client';

import { Fragment, JSX } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import Button from '../Button/Button'
import styles from './PopUp.module.scss'
import { useNotesContext } from '../NotesContext/NotesContext';

interface PopUpProps {
  title: string;
  description?: string;
  content: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buttonName?: string;
  handleClick?: () => void;
}

/**
 * PopUp component that displays a modal dialog with a title, description, and content.
 * @param {PopUpProps} props - The properties for the PopUp component.
 * @returns {JSX.Element} The rendered PopUp component.
 */
export default function PopUp(props: PopUpProps): JSX.Element {
  const { title, description, content, isOpen, setIsOpen, buttonName, handleClick } = props;

  const context = useNotesContext();

  return (
    <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.dialog}>
        <DialogPanel className={styles.dialogPanel}>
            <DialogTitle>{title}</DialogTitle>
            <Description>
              {description}
            </Description>
            <div className={styles.contentContainer}>
              {content} 
              <Button onClick={handleClick}>{buttonName}</Button>    
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </DialogPanel>
        </Dialog>
      </Transition>
  )
}