import { Link } from "gatsby"
import React from "react"

const Section = ({ data }) => {
  function contentSection(dataSection, index) {
    return (
      <div className="home-content" key={index}>
        {dataSection.section.title_h2 && <h2>{dataSection.section.title_h2}</h2>}
        {dataSection.section.description && <p>{dataSection.section.description}</p>}
        {dataSection.section.call_to_action.title &&
        dataSection.section.call_to_action.href ? (
          <Link
            to={dataSection.section.call_to_action.href}
            className="btn secondary-btn"
          >
            {dataSection.section.call_to_action.title}
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  }

  function imageContent(dataImg, index) {
    return (
      <img src={dataImg.section.image.url} alt="section-image" key={index} />
    )
  }

  return (
    <div className="home-advisor-section">
      {data.section.image_alignment === "Left"
        ? [imageContent(data,"left-1"), contentSection(data,"left-2")]
        : [contentSection(data,"right-1"), imageContent(data,"right-2")]}
    </div>
  )
}

export default Section
