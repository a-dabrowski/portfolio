import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import Gallery from '../components/gallery';
import SEO from '../components/seo';
import { ImageButton, MinimalButton } from '../components/buttons';

const RecommendedIndex = ({ data, location }) => (
  <Layout location={location} title="Polecane materiały">
    <SEO title="Recommended Content" />
    <div className="flex flex-row flex-wrap">
      <h1>Sekcja w budowie</h1>
    </div>
    <Contact />
  </Layout>
);

export default RecommendedIndex;
