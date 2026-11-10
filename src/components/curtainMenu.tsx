import React from 'react';
import { Link } from 'gatsby';

type TransitionType = 'left' | 'top';

// The curtain slides with transform (composited, no layout per frame) instead
// of animating width/height. `invisible` lands after the slide-out finishes
// (visibility transitions discretely at the end when hiding), which takes the
// closed menu's links out of the tab order and accessibility tree.
const style = {
  menu: {
    default: `overflow-x-hidden md:overflow-hidden fixed inset-0 z-10 bg-black transition-[transform,visibility] duration-300 ease-out`,
    transition: {
      left: {
        open: `translate-x-0 visible`,
        close: `-translate-x-full invisible`,
      },
      top: {
        open: `translate-y-0 visible`,
        close: `-translate-y-full invisible`,
      },
    },
  },
  container: `relative top-1/4 w-full text-center mt-8`,
  item: `text-3xl text-gray-400 cursor-pointer hover:text-white`,
};

interface MenuProps {
  children: React.ReactNode;
  open: boolean;
  transition: TransitionType;
}

export function Menu({ children, open, transition }: MenuProps) {
  return (
    <div
      className={`${style.menu.default} ${
        open
          ? style.menu.transition[transition].open
          : style.menu.transition[transition].close
      }`}
    >
      {children}
    </div>
  );
}

interface MenuContainerProps {
  children: React.ReactNode;
}

export function MenuContainer({ children }: MenuContainerProps) {
  return <div className={style.container}>{children}</div>;
}

interface MenuItemProps {
  children: React.ReactNode;
  href: string;
}

/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
export function MenuItem({ children, href }: MenuItemProps) {
  return (
    <div className="p-2">
      <Link className={style.item} to={href}>
        {children}
      </Link>
    </div>
  );
}
