import React from 'react';

import { Button } from '../buttons';
import { Tile } from '../tiles';
import { Body, Heading, Label, Numeral } from '../typography';
import * as Styles from './TextCard.module.scss';

interface TextCardProps {
  number: string;
  title: string;
  to: string;
  actionLabel: string;
  form?: string | null;
  year?: string | null;
  lede?: string | null;
}

// One text in the home page list.
const TextCard = ({
  number,
  title,
  to,
  actionLabel,
  form,
  year,
  lede,
}: TextCardProps) => (
  <Tile as="article" className={Styles.card}>
    <div className={Styles.top}>
      <Numeral size="small" tone="accent">
        {number}
      </Numeral>
      <Label size="extraSmall" className={Styles.meta}>
        {form}
        <br />
        <Label size="extraSmall" tone="muted">
          {year}
        </Label>
      </Label>
    </div>
    <Heading size="card">{title}</Heading>
    <Body size="medium" className={Styles.lede}>
      {lede}
    </Body>
    <Button to={to} arrow="→" className={Styles.action}>
      {actionLabel}
    </Button>
  </Tile>
);

export default TextCard;
