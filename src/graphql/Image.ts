import { graphql } from "gatsby"

export const ImageFluid = graphql`
  fragment Image on File {
    childImageSharp {
      fluid(maxWidth: 2048, quality: 75) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
