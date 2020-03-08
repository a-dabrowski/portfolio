import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const PhotographyIndex = ({ data, location}) => {
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div>
        Hello PhotographyIndex
      </div>
    </Layout>
  )
}
export default PhotographyIndex
