import React from "react"

import Hero from "./Hero"
import Section from "./Section"
import BlogSection from "./BlogSection"
import CardSection from "./CardSection"
import TeamSection from "./TeamSection"
import SectionBucket from "./SectionBucket"
import AboutSectionBucket from "./AboutSectionBucket"
import SectionWithEmbedObject from "./SectionWithEmbedObject"

const RenderComponents = ({ components, about, entryUid, contentTypeUid, locale }) => {
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {components?.map((component, index) => {
        if (component["hero_banner"]) {
          return (
            <Hero
              data={component}
              title={about ? "about" : ""}
              key={"render" + index}
            />
          )
        }
        if (component["section"]) {
          return <Section data={component} key={"render" + index} />
        }
        if (component["section_with_buckets"]) {
          return about ? (
            <AboutSectionBucket data={component} key={"render" + index} />
          ) : (
            <SectionBucket data={component} key={"render" + index} />
          )
        }
        if (component["from_blog"]) {
          return <BlogSection data={component} key={"render" + index} />
        }
        if (component["section_with_cards"]) {
          return <CardSection data={component} key={"render" + index} />
        }
        if (component["section_with_html_code"]) {
          return <SectionWithEmbedObject data={component} key={"render" + index} />
        }
        if (component["our_team"]) {
          return <TeamSection data={component} key={"render" + index} />
        }
      })}
    </div>
  )
}
export default RenderComponents
