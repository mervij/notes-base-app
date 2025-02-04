'use client';

import React from 'react';
import styles from './TextField.module.scss';

/**
 * TextField component properties 
 * 
 * @interface TextFieldProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {string} [label] - The label text displayed above the text field.
 * @property {'none' | 'error'} [error] - The error state of the text field.
 */
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: 'none' | 'error';
}

/**
 * TextField component
 * 
 * @param {TextFieldProps} props - The properties for the TextField component.
 * @returns {JSX.Element} The rendered TextField component.
 */
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
