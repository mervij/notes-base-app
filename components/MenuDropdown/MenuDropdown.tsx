'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import styles from './MenuDropdown.module.scss'

interface MenuDropdownProps {
  id: string;
  menuButton: string | React.ReactNode;
  menuItems: {
    name: string;
    handleClick: (event: any) => void;
  }[]
}

export default function MenuDropdown(props: MenuDropdownProps) {
  const { id, menuButton, menuItems } = props;

  return (
    <Menu as='div' className={styles.menuContainer}>
      <MenuButton className={styles.menuButton}>{menuButton}</MenuButton>
      <MenuItems className={styles.menuItems}>
        {menuItems.map((item) => (
          <MenuItem key={item.name}>
            {({active}) => (
              <button value={id} className={`${active}`} onClick={e => item.handleClick(e.target)} >
                {item.name}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

 