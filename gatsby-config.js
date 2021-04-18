module.exports = {
  siteMetadata: {
    title: "__template__website__name.com",
    description: "__template__website__name.com website",
    author: `@fes300`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Lato\:300,400,400i,700`],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // if you want to import an SVG and use it as a component, you need to rename it `*.inline.svg` (i.e. using SvgIcon)
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `federico sordillo`,
        short_name: `fes300`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "static/favicon-32x32.png",
      },
    },
    `gatsby-plugin-next-seo`,
    `gatsby-theme-material-ui`,
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
        manualInit: true,
      },
    },
  ],
}
