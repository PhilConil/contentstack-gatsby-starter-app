import React from "react"
import parser from "html-react-parser"

const AboutSectionBucket = ({ data }) => {
  function bucketContent(bucket) {
    return (
      <div className="mission-content-section" key={bucket.title_h3}>
        {bucket.icon && (
          <img className="mission-icon" src={bucket.icon.url} alt="art work" />
        )}

        <div className="mission-section-content">
          {bucket.title_h3 && <h3>{bucket.title_h3}</h3>}
          <div>
            {typeof bucket.description === "string" &&
              parser(bucket.description)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="member-main-section">
      <div className="member-head">
        {data.section_with_buckets.title_h2 && (
          <h2>{data.section_with_buckets.title_h2}</h2>
        )}
      </div>
      <div className="mission-section">
        <div className="mission-content-top">
          {data.section_with_buckets.buckets.map(
            (bucket, index) => index < 2 && bucketContent(bucket)
          )}
        </div>
        <div className="mission-content-bottom">
          {data.section_with_buckets.buckets.map(
            (bucket, index) => index >= 2 && bucketContent(bucket)
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutSectionBucket
