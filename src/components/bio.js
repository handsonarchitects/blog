/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedinIn,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          authors {
            name
            summary
            image
            social {
              twitter
              linkedin
              github
            }
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const authors = data.site.siteMetadata?.authors

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
            alt="Tomasz Michalak"
          /> : <StaticImage
           className="bio-avatar"
           layout="fixed"
           formats={["auto", "webp", "avif"]}
           src="../images/mlaskowski.jpg"
           width={50}
           height={50}
           quality={95}
           alt="Maciej Laskowski"
         />
        return (
          <div className="bio" key={author?.name}>
            {image}
            {author?.name && (
              <p>
                <strong>{author.name}</strong> - {author?.summary || null}
                <br />
                <a href={"https://www.twitter.com/" + author.social.twitter} className="twitter social">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href={"https://www.linkedin.com/in/" + author.social.linkedin} className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href={"https://github.com/" + author.social.github} className="github social">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
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
