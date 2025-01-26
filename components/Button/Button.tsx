import React from 'react';
import styles from './Button.module.scss';

/**
 * Button component properties
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button click event handler
   */
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

/**
 * @param props Button component properties
 * @returns React Button component
 */
export default function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    ...htmlAttributes
  } = props;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      {...htmlAttributes}
    >
      {children}
    </button>
  );
}
