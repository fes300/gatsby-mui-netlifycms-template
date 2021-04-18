import React, { ReactElement } from "react"
import PageLayout from "../components/layouts/PageLayout"
import Section from "../components/layouts/SectionLayout"
import CookieBanner from "../components/CookieBanner"
import Header from "../components/Header"
import Column from "../components/Column"
import { Typography } from "@material-ui/core"
import { graphql } from "gatsby"
import BackgroundImageDiv from "../components/BackroundImageDiv"

export type Section = keyof typeof Sections
export const Sections = {
  "what-do-i-do": "What do I do?",
}

function Profile({ data }: any): ReactElement {
  console.log(data)

  return (
    <>
      <Header sections={Sections} />
      <PageLayout>
        <CookieBanner />

        <Section>
          <Column centered style={{ padding: "80px 0", minHeight: "120vh" }}>
            __template__website__name
          </Column>
        </Section>

        <BackgroundImageDiv imageData={data.image}>ciao</BackgroundImageDiv>

        <Section id={"what-do-i-do"}>
          <Column
            centered
            style={{
              backgroundColor: "red",
              padding: "80px 0",
              minHeight: "120vh",
            }}
          >
            <Typography variant={"h1"}>what I do</Typography>
          </Column>
        </Section>

        <Column centered style={{ padding: "80px 0", minHeight: "220vh" }}>
          padding bottom
        </Column>
      </PageLayout>
    </>
  )
}

export default Profile

export const profileQuery = graphql`
  query Profile {
    image: file(relativePath: { eq: "img/batman.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`
