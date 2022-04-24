import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import parser from "html-react-parser"
import moment from "moment"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FromBlog from "../components/FromBlog"
import HeroBanner from "../components/BlogBanner"
import * as Utils from "@contentstack/utils"
import Stack, { onEntryChange } from "../live-preview-sdk/index"

const blogPost = props => {
  const {
    data: { contentstackBlogPost, contentstackPage },
  } = props

  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children)
    },
  }

  Utils.jsonToHTML({
    entry: contentstackBlogPost,
    paths: ["body", "related_post.body"],
    renderOption,
  })

  const [getEntry, setEntry] = useState(contentstackBlogPost)
  const [getBanner, setBanner] = useState(contentstackPage)

  async function fetchData() {
    try {
      const entryRes = await Stack.getEntryByUrl({
        contentTypeUid: "blog_post",
        entryUrl: props.location.pathname,
        referenceFieldPath: ["author", "related_post"],
        jsonRtePath: ["body", "related_post.body"],
      })
      const bannerRes = await Stack.getEntryByUrl({
        contentTypeUid: "page",
        entryUrl: "/blog",
      })
      setEntry(entryRes[0])
      setBanner(bannerRes[0])
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
    <Layout property={props} blogPost={getEntry} banner={getBanner}>
      <SEO title={getEntry.title} />
      <HeroBanner />
      <div
        className="blog-container"
        data-pageref={getEntry.uid}
        data-contenttype="blog_post"
        data-locale={getEntry.locale}
      >
        <div className="blog-detail">
          <h2>{getEntry.title ? getEntry.title : ""}</h2>
          <span>
            <p>
              {moment(getEntry.date).format("ddd, MMM D YYYY")},{" "}
              <strong>
                {getEntry.author[0]?.title}
              </strong>
            </p>
          </span>
          <span>{parser(getEntry.body)}</span>
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {contentstackPage.page_components?.map((component, index) => {
              if (component.widget && index === 2) {
                return (
                  <h2>
                    {component.widget.title_h2}
                  </h2>
                )
              }
            })}
            <FromBlog
              data={getEntry.related_post ? getEntry.related_post : ""}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query ($title: String!) {
    contentstackBlogPost(title: { eq: $title }) {
      url
      title
      body
      uid
      locale
      date
      author {
        title
        bio
        picture {
          url
        }
      }
      related_post {
        body
        url
        title
        date
      }
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
    }
    contentstackPage {
      page_components {
        widget {
          title_h2
          type
        }
      }
    }
  }
`
export default blogPost
