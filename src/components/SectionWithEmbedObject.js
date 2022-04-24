import React from "react"
import parser from "html-react-parser"

const SectionWithEmbedObject = ({ data: { section_with_html_code } }) => {
  if (section_with_html_code.html_code_alignment === "Left") {
    return (
      <div className="contact-page-section max-width">
        <div className="contact-page-content">
          {section_with_html_code.title ? (
            <h1>
              {section_with_html_code.title}
            </h1>
          ) : (
            ""
          )}
          {typeof section_with_html_code.description === "string" ? (
            <div>
              {parser(section_with_html_code.description)}
            </div>
          ) : (
            ""
          )}{" "}
        </div>
        <div className="contact-page-form">
          {typeof section_with_html_code.html_code === "string" ? (
            <div>
              {parser(section_with_html_code.html_code)}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="contact-maps-section max-width">
      <div className="maps-details">
        {typeof section_with_html_code.html_code === "string" && (
          <div>
            {parser(section_with_html_code.html_code)}
          </div>
        )}
      </div>
      <div className="contact-maps-content">
        {section_with_html_code.title ? (
          <h2>
            {section_with_html_code.title}
          </h2>
        ) : (
          ""
        )}
        {typeof section_with_html_code.description === "string" ? (
          <div>
            {parser(section_with_html_code.description)}
          </div>
        ) : (
          ""
        )}{" "}
      </div>
    </div>
  )
}

export default SectionWithEmbedObject
