'use client';

import React from 'react';
import styles from './TextField.module.scss';

/**
 * Text field component properties
 */
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: 'none' | 'error';
}

export default function TextField(props: TextFieldProps) {
  const {
    value,
    label,
    id,
    disabled,
    required,
    error = 'none',
    ...htmlAttributes
  } = props;

  return (
    <div>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <div className={styles.textFieldContainer}>
        <input
          className={styles.textField}
          defaultValue={value}
          disabled={disabled}
          {...htmlAttributes}
        />
      </div>
    </div>
  );
}
