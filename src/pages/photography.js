import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { MinimalButton } from "../components/buttons"
// allFile(filter: { sourceInstanceName: { eq: "photography" }, relativeDirectory: { eq: "alfa"  } }) {
const PhotographyIndex = ({ data, location }) => {
  const photoData = useStaticQuery(graphql`
    query PhotoAlfaQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "photography" }
        }
      ) {
        nodes {
          id
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)
  console.log(photoData)
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div className="">
        {photoData.allFile.nodes.map((el) => (
          <Img key={el.id} fluid={el.childImageSharp.fluid} />
        ))}
      </div>
      <div>
        Hello PhotographyIndex
        <MinimalButton>Hello</MinimalButton>
      </div>
    </Layout>
  )
}
export default PhotographyIndex
