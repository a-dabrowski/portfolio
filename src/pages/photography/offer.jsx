import React from 'react';
import { Link } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import PhotographyForm from '../../components/photoForm';
import { MinimalButton } from '../../components/buttons';

const OfferPhotography = ({ data, location }) => (
  <Layout location={location} title="Photography Offer">
    <SEO title="Photography offer" />
    <div>
      <h3>Offer</h3>
      <h4>How does the process look like?</h4>
      <ol className="mx-0">
        <li>Contact through form</li>
        <li>
          We decide on details: place, concept, make-up and styles. Whether we
          need to acount for clothes change or not etc.
        </li>
        <li>We decide on date of photo session after downpayment</li>
        <li>Photo shoot</li>
        <li>
          I'm making subtle retouch and selection of photographies. Then I send
          them to you for approval. After that I take care of advanced retouch.
        </li>
      </ol>
      <PhotographyForm />
    </div>
  </Layout>
);

export default OfferPhotography;
