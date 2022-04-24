import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import Stack, { onEntryChange } from "../live-preview-sdk/index"

const queryBlogBanner = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      contentstackPage(title: { eq: "Blog" }) {
        title
        page_components {
          hero_banner {
            banner_description
            banner_title
          }
        }
      }
    }
  `)
  return data
}

const blogHero = () => {
  const { contentstackPage } = queryBlogBanner()

  const [getBanner, setBanner] = useState(contentstackPage)

  async function getBannerData() {
    const bannerRes = await Stack.getEntryByUrl({
      contentTypeUid: "page",
      entryUrl: "/blog",
    })
    setBanner(bannerRes[0])
  }
  useEffect(() => {
    onEntryChange(getBannerData)
  }, [])

  const banner = getBanner.page_components

  return (
    <>
      <div className="blog-page-banner" style={{"background":`${banner[0]?.hero_banner.bg_color}`}}>
        <div className="blog-page-content">
          {banner[0]?.hero_banner.banner_title ? (
            <h1
              className="hero-title"
            >
              {banner[0]?.hero_banner.banner_title}
            </h1>
          ) : (
            ""
          )}

          {banner[0]?.hero_banner.banner_description ? (
            <p
              className="hero-description"
            >
              {banner[0]?.hero_banner.banner_description}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default blogHero
