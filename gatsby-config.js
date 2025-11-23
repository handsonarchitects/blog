/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Tech notes of hands-on software architects`,
    authors: [{
      name: `Maciej Laskowski`,
      summary: `software architect with deep hands-on experience. Continuous Delivery evangelist, architecture trade offs analyst, cloud-native solutions enthusiast.`,
      image: `${__dirname}/src/images/mlaskowski.jpg`,
      social: {
        twitter: 'ma_laskowski',
        linkedin: 'maciej-laskowski',
        github: 'malaskowski'
      }
    },{
      name: `Tomasz Michalak`,
      summary: `a hands-on software architect interested in TDD and DDD who translates engineering complexity into the language of trade-offs and goals.`,
      image: `../images/tmichalak.jpeg`,
      social: {
        twitter: 'tomichalak',
        linkedin: 'tomaszmichalak',
        github: 'tomaszmichalak'
      }
    }],
    description: `Technical notes of software architects based on their daily work`,
    siteUrl: `https://handsonarchitects.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-mermaid`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Hands-on architects Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tech notes of hands-on software architects`,
        short_name: `hands-on architects blog`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
      
        trackingIds: [
          "G-GE9DCXMY6B",
        ],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: ["/preview/**"]
        },
      },
    },
  ],
}
