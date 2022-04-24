import { Link } from "gatsby"
import React from "react"
import parser from "html-react-parser"

const BlogSection = ({ data: { from_blog } }) => {
  return (
    <div className="community-section">
      <div className="community-head">
        {from_blog.title_h2 ? (
          <h2>{from_blog.title_h2}</h2>
        ) : (
          ""
        )}
        {from_blog.view_articles ? (
          <Link
            to={from_blog.view_articles.href}
            className="btn secondary-btn article-btn"
          >
            {from_blog.view_articles.title}
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="home-featured-blogs">
        {from_blog.featured_blogs.map((blog, index) => {
          return (
            <div className="featured-blog" key={index}>
              {blog.featured_image ? (
                <img
                  src={blog.featured_image.url}
                  alt={blog.featured_image.title}
                  className="blog-post-img"
                />
              ) : (
                ""
              )}
              <div className="featured-content">
                {blog.title ? <h3>{blog.title}</h3> : ""}
                {typeof blog.body === "string" && (
                  <div> {parser(blog.body.slice(0, 300))}</div>
                )}
                <Link className="blogpost-readmore" to={blog.url}>
                  {"Read More -->"}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogSection
