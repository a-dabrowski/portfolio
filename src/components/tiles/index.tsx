import React from 'react';
import classNames from 'classnames';

import * as Styles from './Tiles.module.scss';

interface TileGridProps {
  // Narrowest a column may get before the grid drops a column, in px.
  minColumnWidth?: number;
  lineTone?: 'ink' | 'divider';
  isJoined?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const TileGrid = ({
  minColumnWidth = 240,
  lineTone = 'ink',
  isJoined = false,
  className,
  children,
}: TileGridProps) => (
  <div
    className={classNames(
      Styles.grid,
      lineTone === 'ink' ? Styles.gridInk : Styles.gridDivider,
      isJoined && Styles.joined,
      className
    )}
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumnWidth}px), 1fr))`,
    }}
  >
    {children}
  </div>
);

type TileTone = 'ink' | 'accent' | 'paper';

const toneClasses: Record<TileTone, string> = {
  ink: Styles.tileInk,
  accent: Styles.tileAccent,
  paper: Styles.tilePaper,
};

interface TileProps {
  as?: React.ElementType;
  tone?: TileTone;
  className?: string;
  children: React.ReactNode;
}

export const Tile = ({
  as: Tag = 'div',
  tone = 'paper',
  className,
  children,
}: TileProps) => (
  <Tag className={classNames(Styles.tile, toneClasses[tone], className)}>
    {children}
  </Tag>
);
