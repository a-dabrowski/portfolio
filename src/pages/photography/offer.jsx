import React from 'react';
import { Link } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import PhotographyForm from '../../components/photoForm';
import { MinimalButton } from '../../components/buttons';

const OfferPhotography = ({ data, location }) => (
  <Layout location={location} title="Oferta fotograficzna">
    <SEO title="Photography offer" />
    <div>
      <h3>Oferta</h3>
      <p>
        Zapraszam na sesje w studio i plenerze. Jeśli macie jakiś pomysł, który
        marzy Wam się zrobić, napiszcie o nim w formularzu, niezależnie od tego
        czy wiecie wszystko ze szczegółami czy macie tylko zamysł. Jak macie
        jakiś zamysł z jakiegoś zdjęcia lub obrazu, prześlijcie link do niego.
      </p>
      <h4>Jak wygląda proces?</h4>
      <ol className="mx-0">
        <li>Kontakt przez formularz</li>
        <li>
          Omawiamy szczegóły sesji: miejsce, koncepcję, co robimy z makijażem i
          stylizacją, czy będzie potrzeba zmiany ubrań itp.
        </li>
        <li>Ustalamy termin po wpłacie zaliczki</li>
        <li>Tworzymy zdjęcia wspólnie</li>
        <li>
          Dokonuję podstawowej obróbki i selekcji zdjęć, przesyłam je do
          selekcji, wybrane zdjęcia zostaną dokładniej dopieszczone.
        </li>
      </ol>
      <PhotographyForm />
    </div>
  </Layout>
);

export default OfferPhotography;
