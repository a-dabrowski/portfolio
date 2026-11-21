import React, { useEffect, useState } from 'react';

import { useDictionary, useLocale } from '../../i18n';
import { NewsEntry } from '../../types';
import { isoDate, newsDateParts, splitNews } from '../../utils/news';
import { SmartLink } from '../links';
import { RailSection } from '../section';
import { Body, Display, Heading, Label, Numeral } from '../typography';
import * as Styles from './Newsboard.module.scss';

// Rows shown under "recent". Design choice: keeps that column about as tall
// as a typical list of upcoming dates; older entries stay in the JSON file.
const RECENT_COUNT = 4;

const NewsRow = ({ entry }: { entry: NewsEntry }) => {
  const { day, monthAndYear } = newsDateParts(entry.date, useLocale());
  const details = [entry.tag, entry.place, entry.note].filter(Boolean);
  const content = (
    <>
      <span className={Styles.date}>
        <Numeral size="date" tone="accent">
          {day}
        </Numeral>
        <Label size="extraSmall" isStrong>
          {monthAndYear}
        </Label>
      </span>
      <span className={Styles.main}>
        <Heading as="span" size="row" className={Styles.title}>
          {entry.title}
        </Heading>
        {details.length > 0 && (
          <Label size="extraSmall">{details.join(' · ')}</Label>
        )}
      </span>
      {entry.href && <span className={Styles.arrow}>→</span>}
    </>
  );

  return (
    <li>
      {entry.href ? (
        <SmartLink to={entry.href} className={Styles.row}>
          {content}
        </SmartLink>
      ) : (
        <div className={Styles.row}>{content}</div>
      )}
    </li>
  );
};

interface NewsboardProps {
  entries: NewsEntry[];
  // Day of the site build (YYYY-MM-DD); decides upcoming vs recent in the
  // static HTML.
  buildDate: string;
}

// Home page board: upcoming dates on the left, recent news on the right.
export const Newsboard = ({ entries, buildDate }: NewsboardProps) => {
  const { news } = useDictionary();
  const [today, setToday] = useState(buildDate);

  // The site is rebuilt only on deploy, so the visitor's date replaces the
  // build date after load; a show that has passed then moves to "recent".
  useEffect(() => setToday(isoDate(new Date())), []);

  if (entries.length === 0) {
    return null;
  }

  const { upcoming, recent } = splitNews(entries, today);

  return (
    <RailSection id="news" rail={news.rail}>
      <div className={Styles.board}>
        <Display>{news.heading}</Display>
        <div className={Styles.columns}>
          <section>
            <Label as="h3" isStrong className={Styles.columnHead}>
              <span className={Styles.live} /> {news.upcoming}
            </Label>
            {upcoming.length === 0 ? (
              <Body size="large" className={Styles.empty}>
                {news.empty}
              </Body>
            ) : (
              <ul className={Styles.list}>
                {upcoming.map((entry) => (
                  <NewsRow key={entry.date + entry.title} entry={entry} />
                ))}
              </ul>
            )}
          </section>
          {recent.length > 0 && (
            <section>
              <Label as="h3" isStrong className={Styles.columnHead}>
                {news.recent}
              </Label>
              <ul className={Styles.list}>
                {recent.slice(0, RECENT_COUNT).map((entry) => (
                  <NewsRow key={entry.date + entry.title} entry={entry} />
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </RailSection>
  );
};

export default Newsboard;
