import React from 'react';
import classNames from 'classnames';

import { SmartLink } from '../links';
import * as Styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary: Styles.primary,
  secondary: Styles.secondary,
  ghost: Styles.ghost,
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  // Renders a link instead of a <button>.
  to?: string;
  // Text followed by a trailing arrow pushed to the right edge.
  arrow?: string;
  isIcon?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  'aria-label'?: string;
  rel?: string;
}

const Button = ({
  children,
  variant = 'secondary',
  to,
  arrow,
  isIcon = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const classes = classNames(
    Styles.button,
    variantClasses[variant],
    isIcon && Styles.icon,
    arrow && Styles.spread,
    className
  );
  const content = (
    <>
      {children}
      {arrow && <span>{arrow}</span>}
    </>
  );

  return to ? (
    <SmartLink
      to={to}
      className={classes}
      aria-label={rest['aria-label']}
      rel={rest.rel}
    >
      {content}
    </SmartLink>
  ) : (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
};

export { Button };
export default Button;
