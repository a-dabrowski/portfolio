import React from 'react';
import { render } from '@testing-library/react';
import { Newsboard } from './index';

const entries = [
  { date: '2999-01-01', title: 'Future show', place: 'Warszawa' },
  { date: '2000-01-01', title: 'Old news', href: '/texts/old/' },
];

// The upcoming column is the first <section>, the recent one the second.
const columnText = (container: HTMLElement, index: number) =>
  container.querySelectorAll('section section')[index].textContent;

describe('Newsboard', () => {
  it('lists a future entry in the upcoming column', () => {
    const { container } = render(
      <Newsboard entries={entries} buildDate="2026-11-19" />
    );
    expect(columnText(container, 0)).toContain('Future show');
  });

  it('lists a past entry in the recent column', () => {
    const { container } = render(
      <Newsboard entries={entries} buildDate="2026-11-19" />
    );
    expect(columnText(container, 1)).toContain('Old news');
  });

  it('links an entry that has an address', () => {
    const { getByRole } = render(
      <Newsboard entries={entries} buildDate="2026-11-19" />
    );
    expect(getByRole('link', { name: /Old news/ })).toHaveAttribute(
      'href',
      '/texts/old/'
    );
  });

  it('shows the empty message when nothing is upcoming', () => {
    const { container } = render(
      <Newsboard entries={[entries[1]]} buildDate="2026-11-19" />
    );
    expect(columnText(container, 0)).toContain('Na razie');
  });

  it('renders nothing without entries', () => {
    const { container } = render(
      <Newsboard entries={[]} buildDate="2026-11-19" />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
