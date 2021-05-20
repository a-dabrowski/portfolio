import React from 'react';
import { BiMailSend } from 'react-icons/bi';
import { FaGithub, FaInstagram } from 'react-icons/fa';

export const Contact = () => (
  <div className="flex flex-col">
    <h4 className="mx-auto">Kontakt</h4>
    <a
      className="mx-auto"
      href="https://www.instagram.com/adam_dabrowski/"
      target="_blank"
      rel="noopener"
      rel="noreferrer"
    >
      <FaInstagram className="inline-block" /> Instagram
    </a>
    <a
      className="mx-auto"
      href="mailto:adam.dabrowski@outlook.com"
      target="_blank"
      rel="noopener"
      rel="noreferrer"
    >
      <BiMailSend className="inline-block" /> adam.dabrowski@outlook.com
    </a>
    <a
      className="mx-auto"
      href="https://github.com/a-dabrowski"
      target="_blank"
      rel="noopener"
      rel="noreferrer"
    >
      <FaGithub className="inline-block" /> GitHub
    </a>
  </div>
);

export default Contact;
