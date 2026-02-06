import React from 'react';
import { PageProps } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import SEO from '../components/seo';

const RecommendedIndex = ({ location }: PageProps) => (
  <Layout location={location} title="Recommended materials">
    <SEO title="Recommended Content" />
    <div className="flex flex-row flex-wrap">
      <h1>Section in development</h1>
    </div>
    <Contact />
  </Layout>
);

export default RecommendedIndex;
