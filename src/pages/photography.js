import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import Gallery from '../components/gallery';
import SEO from '../components/seo';
import { MinimalButton } from '../components/buttons';

const PhotographyIndex = ({ location }) => {
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div className="flex flex-col">
        <h2>Galerie zdjęć</h2>
        <Contact />
        <Link
          className="m-auto mt-8 text-center"
          to="/photography/milenia_ania"
        >
          <MinimalButton>Milena i Ania</MinimalButton>
        </Link>
        <Link className="m-auto mt-8 text-center" to="/photography/paulina">
          <MinimalButton>Paulina</MinimalButton>
        </Link>
        <Link className="m-auto mt-8 text-center" to="/photography/studio">
          <MinimalButton>Zdjęcia w studio</MinimalButton>
        </Link>
        <Link className="m-auto mt-8 text-center" to="/photography/offer">
          <MinimalButton>Oferta</MinimalButton>
        </Link>
      </div>
      <div>
        <h5>Oferta</h5>
        <p>
          Zapraszam na sesje w studio i plenerze. Jeśli macie jakiś pomysł,
          który marzy Wam się zrobić, napiszcie o nim w formularzu, niezależnie
          od tego czy wiecie wszystko ze szczegółami czy macie tylko zamysł. Jak
          macie jakiś zamysł z jakiegoś zdjęcia lub obrazu, prześlijcie link do
          niego.
        </p>
        <h6>Jak wygląda proces?</h6>
        <ol>
          <li>Kontakt przez formularz</li>
          <li>
            Omawiamy szczegóły sesji: miejsce, koncepcję, co robimy z makijażem
            i stylizacją, czy będzie potrzeba zmiany ubrań itp.
          </li>
            <li>Ustalamy termin po wpłacie zaliczki</li>
            <li>Tworzymy zdjęcia wspólnie</li>
            <li>Dokonuję podstawowej obróbki i selekcji zdjęć, przesyłam je do selekcji, wybrane zdjęcia zostaną dokładniej dopieszczone (poprawa niesfornych włosów, nie ma mowy o robieniu budyniu na twarzy 😉)</li>
        </ol>
      </div>
      <iframe
        className="m-auto"
        src="https://docs.google.com/forms/d/e/1FAIpQLSeKcTuN83kkpE-owtjrDHiiJXCpa81PNoggL4hGv5NFgGNbIQ/viewform?embedded=true"
        width="640"
        height="1246"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Ładuję…
      </iframe>
    </Layout>
  );
};
export default PhotographyIndex;
