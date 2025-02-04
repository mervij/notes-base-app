import React from 'react';
import styles from './Button.module.scss';

/**
 * Button component properties.
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - The content to be displayed inside the button.
 * @property {React.EventHandler<React.MouseEvent<HTMLButtonElement>>} [onClick] - Button click event handler.
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [htmlAttributes] - Additional HTML attributes for the button element.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

/**
 * Button component.
 * 
 * @component
 * @param {ButtonProps} props - Button component properties.
 * @returns {JSX.Element} The rendered button component.
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
