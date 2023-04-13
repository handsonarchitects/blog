/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          authors {
            name
            summary
            image
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const authors = data.site.siteMetadata?.authors
  const social = data.site.siteMetadata?.social


  return (
    <div>
      <h2>About the authors</h2>
      <div className="bio-container">
      {authors.map(author => {
        var image = author?.name === "Tomasz Michalak" ?
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/tmichalak.jpg"
            width={50}
            height={50}
            quality={95}
            alt="Profile picture"
          /> : <StaticImage
           className="bio-avatar"
           layout="fixed"
           formats={["auto", "webp", "avif"]}
           src="../images/mlaskowski.jpg"
           width={50}
           height={50}
           quality={95}
           alt="Profile picture"
         />
        return (
          <div className="bio">
            {image}
            {author?.name && (
              <p>
                <strong>{author.name}</strong> - {author?.summary || null}
              </p>
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Bio
