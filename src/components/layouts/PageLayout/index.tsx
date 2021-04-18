import React, { FC } from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { makeStyles } from "@material-ui/core"
import Column from "../../Column"

interface Props {
  pageCanonical?: string
  pageTitle?: string
  pageDescription?: string
}

const websiteTitle = "__template__website__name"
const websiteCanonical = "https://www.__template__website__name.com/"
const websiteDescription = "__template__website__name website"

const useStyles = makeStyles((t) => ({
  layout: {
    marginTop: `${t.constants.mobileHeaderHeight}px`,
    minHeight: `calc(100vh - ${t.constants.mobileHeaderHeight}px)`,

    [t.breakpoints.up("md")]: {
      marginTop: `${t.constants.desktopHeaderHeight}px`,
      minHeight: `calc(100vh - ${t.constants.desktopHeaderHeight}px)`,
    },
  },
}))

const PageLayout: FC<Props> = ({
  children,
  pageCanonical,
  pageTitle,
  pageDescription,
}) => {
  const classes = useStyles()

  return (
    <>
      <GatsbySeo
        title={websiteTitle}
        description={websiteDescription}
        canonical={pageCanonical ?? websiteCanonical}
        openGraph={{
          url: pageCanonical ?? websiteCanonical,
          title: pageTitle ?? websiteTitle,
          description: pageDescription ?? websiteDescription,
          images: [
            {
              url: "https://www.__template__website__name.com/logo.png",
              width: 800,
              height: 600,
              alt: "__template__website__name",
            },
            {
              url: "https://www.__template__website__name.com/logo.png",
              width: 900,
              height: 800,
              alt: "__template__website__name",
            },
            { url: "https://www.__template__website__name.com/logo.png" },
          ],
          site_name: "Global Custodian Solutions",
        }}
        language="en"
      />
      <Column className={classes.layout}>{children}</Column>
    </>
  )
}

export default PageLayout
