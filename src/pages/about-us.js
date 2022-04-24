import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import * as Utils from "@contentstack/utils"
import Stack, { onEntryChange } from "../live-preview-sdk/index"
import RenderComponents from "../components/RenderComponents"

const About = props => {
  let {
    data: { contentstackPage },
  } = props

  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children)
    },
  }

  Utils.jsonToHTML({
    entry: contentstackPage,
    paths: ["page_components.section_with_buckets.buckets.description"],
    renderOption,
  })
  const [getEntry, setEntry] = useState(contentstackPage)

  async function fetchData() {
    try {
      const entryRes = await Stack.getEntryByUrl({
        contentTypeUid: "page",
        entryUrl: "/about-us",
        jsonRtePath: [
          "page_components.section_with_buckets.buckets.description",
        ],
      })
      setEntry(entryRes[0])
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    onEntryChange(() => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === "true") {
        return fetchData()
      }
    })
  }, [])

  return (
    <Layout pageComponent={getEntry}>
      <SEO title={getEntry.title} />
      <div className="about">
        {getEntry.page_components && (
          <RenderComponents
            components={getEntry.page_components}
            about
            contentTypeUid="page"
            entryUid={getEntry.uid}
            locale={getEntry.locale}
          />
        )}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    contentstackPage(title: { eq: "About Us" }) {
      title
      url
      uid
      locale
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
      page_components {
        contact_details {
          address
          email
          phone
        }
        from_blog {
          title_h2
          featured_blogs {
            title
            uid
            url
            featured_image {
              url
            }
            body
            author {
              title
              uid
              bio
            }
          }
          view_articles {
            title
            href
          }
        }
        hero_banner {
          banner_description
          banner_title
          bg_color
          banner_image {
            url
          }
          call_to_action {
            title
            href
          }
        }
        our_team {
          title_h2
          description
          employees {
            name
            designation
            image {
              url
            }
          }
        }
        section {
          title_h2
          description
          image {
            url
          }
          image_alignment
          call_to_action {
            title
            href
          }
        }
        section_with_buckets {
          title_h2
          description
          buckets {
            title_h3
            description
            icon {
              url
            }
            call_to_action {
              title
              href
            }
          }
        }
        section_with_cards {
          cards {
            title_h3
            description
            call_to_action {
              title
              href
            }
          }
        }
      }
    }
  }
`

export default About
