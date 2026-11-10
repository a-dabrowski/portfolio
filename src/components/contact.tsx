import React from 'react';

import { useDictionary } from '../i18n';
import { RowLink } from './links';
import { RailSection, Rule } from './section';
import { Accent, Body, Display, Lines } from './typography';
import * as Styles from './contact.module.scss';

export const Contact = () => {
  const { contact } = useDictionary();

  return (
    <RailSection id="contact" rail={contact.rail} railAlign="end">
      <div className={Styles.grid}>
        <div className={Styles.pitch}>
          <Display size="contact">
            <Lines lines={contact.heading} />
            <Accent>.</Accent>
          </Display>
          <div className={Styles.mark}>
            <div className={Styles.square} />
            <Rule width="auto" className={Styles.line} />
          </div>
          <Body size="large" className={Styles.intro}>
            {contact.intro}
          </Body>
        </div>
        <div className={Styles.links}>
          {contact.links.map((link) => (
            <RowLink key={link.href} to={link.href} eyebrow={link.label}>
              {link.value}
            </RowLink>
          ))}
        </div>
      </div>
    </RailSection>
  );
};

export default Contact;
