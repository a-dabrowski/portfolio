import React from 'react';

import Layout from '../components/layout';
import Contact from '../components/contact';
import SEO from '../components/seo';

const RecommendedIndex = () => (
  <Layout>
    <div className="flex flex-row flex-wrap">
      <h1>Section in development</h1>
    </div>
    <Contact />
  </Layout>
);

export default RecommendedIndex;

export const Head = () => <SEO title="Recommended Content" />;
