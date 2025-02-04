'use client';

import React from 'react';
import styles from './Checkbox.module.scss';

/**
 * Checkbox component properties
 * 
 * @interface CheckboxProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {string} [id] - The id of the checkbox input.
 * @property {string} [label] - The label text displayed next to the checkbox.
 * @property {boolean} [isChecked] - Determines whether the checkbox is checked.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Callback function to handle change events.
 */
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Checkbox component
 * 
 * @param {CheckboxProps} props - The properties for the Checkbox component.
 * @returns {JSX.Element} The rendered Checkbox component.
 */

export default function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    isChecked,
    onChange,
  } = props;

  return (
    <div className={styles.checkbox}>
      <label className={styles.label}>
        <input type="checkbox" id={id} checked={isChecked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
}
