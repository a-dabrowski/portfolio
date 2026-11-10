import React from 'react';
import classNames from 'classnames';

import * as Styles from './Section.module.scss';

interface ContainerProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

// Centres content at the page width with the responsive side gutter.
export const Container = ({
  as: Tag = 'div',
  className,
  children,
}: ContainerProps) => (
  <Tag className={classNames(Styles.container, className)}>{children}</Tag>
);

interface RailSectionProps {
  id?: string;
  // Vertical caption that runs along the left rule.
  rail: string;
  railAlign?: 'start' | 'end';
  children: React.ReactNode;
}

// Page section with a top rule and a vertical caption rail on the left.
export const RailSection = ({
  id,
  rail,
  railAlign = 'start',
  children,
}: RailSectionProps) => (
  <section id={id} className={Styles.ruled}>
    <Container className={Styles.rail}>
      <div
        className={classNames(
          Styles.railLabel,
          railAlign === 'end' && Styles.railLabelEnd
        )}
      >
        <div className={Styles.railText}>{rail}</div>
      </div>
      <div>{children}</div>
    </Container>
  </section>
);

interface RuleProps {
  width?: number | string;
  height?: number;
  tone?: 'ink' | 'accent';
  className?: string;
}

// Short bar used as a visual full stop above intros and captions.
export const Rule = ({
  width = 28,
  height = 2,
  tone = 'ink',
  className,
}: RuleProps) => (
  <div
    className={classNames(
      Styles.rule,
      tone === 'accent' && Styles.ruleAccent,
      className
    )}
    style={{ width, height }}
  />
);
