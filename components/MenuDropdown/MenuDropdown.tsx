'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import styles from './MenuDropdown.module.scss'
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

/**
 * MenuDropdown component properties
 * 
 * @interface MenuDropdownProps
 * @property {DraggableAttributes} attr - Draggable attributes for the menu button.
 * @property {SyntheticListenerMap | undefined} list - Synthetic event listeners for the menu button.
 * @property {string} id - The id of the menu dropdown.
 * @property {string | React.ReactNode} menuButton - The content of the menu button.
 * @property {{ name: string; handleClick: (event: React.MouseEvent<HTMLElement>) => void; }[]} menuItems - The items in the menu dropdown.
 */
interface MenuDropdownProps {
  attr: DraggableAttributes;
  list: SyntheticListenerMap | undefined;
  id: string;
  menuButton: string | React.ReactNode;
  menuItems: {
    name: string;
    handleClick: (event: any) => void;
  }[];
}

/**
 * MenuDropdown component
 * 
 * @param {MenuDropdownProps} props - The properties for the MenuDropdown component.
 * @returns {JSX.Element} The rendered MenuDropdown component.
 */
export default function MenuDropdown(props: MenuDropdownProps) {
  const { attr, list, id, menuButton, menuItems } = props;

  return (
    <Menu as='div' className={styles.menuContainer}>
      <MenuButton {...attr} {...list} className={styles.menuButton}>{menuButton}</MenuButton>
      <MenuItems className={styles.menuItems}>
        {menuItems.map((item) => (
          <MenuItem key={item.name}>
              <button value={id} onClick={e => item.handleClick(e.target)} >
                {item.name}
              </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

