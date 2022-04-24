import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import RenderComponents from "../components/RenderComponents"
import Stack, { onEntryChange } from "../live-preview-sdk"
import * as Utils from "@contentstack/utils"

const Contact = props => {
  const {
    data: { contentstackPage }
  } = props

  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children)
    },
  }

  const [getEntry, setEntry] = useState(contentstackPage)

  async function fetchData() {
    try {
      const entryRes = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: "/contact-us",
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: ['page_components.section_with_html_code.description'],
      });
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

  Utils.jsonToHTML({
    entry: contentstackPage,
    paths: ["page_components.section_with_html_code.description"],
    renderOption,
  })

  return (
    <Layout pageComponent={getEntry}>
      <SEO title={getEntry.title} />
      {getEntry.page_components && (
        <RenderComponents
          components={getEntry.page_components}
          contentTypeUid="page"
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    contentstackPage(title: { eq: "Contact Us" }) {
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
        section_with_html_code {
          title
          html_code_alignment
          html_code
          description
        }
      }
    }
  }
`

export default Contact
