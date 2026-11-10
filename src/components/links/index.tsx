import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import { Label } from '../typography';
import * as Styles from './Links.module.scss';

interface SmartLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  rel?: string;
}

// Site paths go through Gatsby's router. Web addresses open in a new tab;
// anything else (mailto:, #anchor) is a plain anchor.
export const SmartLink = ({ to, children, ...rest }: SmartLinkProps) => {
  if (to.startsWith('/')) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }

  return to.startsWith('http') ? (
    <a href={to} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  ) : (
    <a href={to} {...rest}>
      {children}
    </a>
  );
};

interface ArrowLinkProps {
  to: string;
  children: React.ReactNode;
}

// "→ Teksty" navigation link.
export const ArrowLink = ({ to, children }: ArrowLinkProps) => (
  <SmartLink to={to} className={Styles.arrowLink}>
    → {children}
  </SmartLink>
);

interface RowLinkProps {
  to: string;
  children: React.ReactNode;
  // Small caption above the value ("Występy"). Renders the tall, stacked row.
  eyebrow?: string;
  // Leading cell ("Nr 01"). Renders the compact plate row.
  lead?: string;
  mark?: string;
  isActive?: boolean;
}

export const RowLink = ({
  to,
  children,
  eyebrow,
  lead,
  mark = '↗',
  isActive = false,
}: RowLinkProps) =>
  lead ? (
    <SmartLink
      to={to}
      className={classNames(
        Styles.rowLink,
        Styles.rowPlate,
        isActive && Styles.rowActive
      )}
    >
      <span className={Styles.rowLead}>{lead}</span>
      <span>{children}</span>
      <span>{mark}</span>
    </SmartLink>
  ) : (
    <SmartLink
      to={to}
      className={classNames(Styles.rowLink, Styles.rowStacked)}
    >
      <span>
        {eyebrow && (
          <Label size="extraSmall" tone="muted" className={Styles.rowEyebrow}>
            {eyebrow}
          </Label>
        )}
        <span className={Styles.rowValue}>{children}</span>
      </span>
      <span className={Styles.rowMark}>{mark}</span>
    </SmartLink>
  );
