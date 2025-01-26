'use client';

import React from 'react';
import styles from './Checkbox.module.scss';

/**
 * Checkbox component properties
 */
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    isChecked,
    onChange,
    ...htmlAttributes
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
