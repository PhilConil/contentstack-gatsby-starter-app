import { Link } from "gatsby"
import React from "react"

const Hero = props => {
  const {hero_banner} = props.data
  return (
    <div
      className="hero-banner"
      style={{
        background: hero_banner.bg_color ? hero_banner.bg_color : "",
      }}
    >
      <div className={`${props.title == "about" ? "about" : "home"}-content`}>
        {hero_banner.banner_title && (
          <h1 className="hero-title">{hero_banner.banner_title}</h1>
        )}
        {hero_banner.banner_description ? (
          <p
            className={`hero-description ${
              props.title == "about" && "about-desc"
            }`}
          >
            {hero_banner.banner_description}
          </p>
        ) : (
          ""
        )}
        {hero_banner.call_to_action.title &&
        hero_banner.call_to_action.href ? (
          <Link
            to={hero_banner.call_to_action.href}
            className="btn tertiary-btn"
          >
            {hero_banner.call_to_action.title}
          </Link>
        ) : (
          ""
        )}
      </div>
      {hero_banner.banner_image ? (
        <img
          alt="hero-banner-image"
          src={hero_banner.banner_image.url}
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default Hero
