import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { MinimalButton } from "../components/buttons";

const PhotographyIndex = ({ data, location}) => {
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div>
        Hello PhotographyIndex
        <MinimalButton>Hello</MinimalButton>
      </div>
    </Layout>
  )
}
export default PhotographyIndex
