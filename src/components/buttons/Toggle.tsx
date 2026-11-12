import React from 'react';

import * as Styles from './Toggle.module.scss';

interface ToggleProps {
  isPressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  // Lighter text after the label, e.g. the number of matches.
  detail?: React.ReactNode;
}

// Two-state button: filter chips and segmented switches.
export const Toggle = ({
  isPressed,
  onClick,
  children,
  detail,
}: ToggleProps) => (
  <button
    type="button"
    className={Styles.toggle}
    aria-pressed={isPressed}
    onClick={onClick}
  >
    <span>{children}</span>
    {detail !== undefined && <span className={Styles.detail}>{detail}</span>}
  </button>
);

interface ToggleGroupProps {
  label: string;
  children: React.ReactNode;
}

export const ToggleGroup = ({ label, children }: ToggleGroupProps) => (
  <div role="group" aria-label={label} className={Styles.group}>
    {children}
  </div>
);
