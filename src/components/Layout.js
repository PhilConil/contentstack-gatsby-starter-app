/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 */

import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import DevTools from "./Devtools"
import { connect } from "react-redux"

typeof window !== "undefined" && require("bootstrap/dist/css/bootstrap.min.css")
typeof window !== "undefined" && require("bootstrap/dist/js/bootstrap")
require("../styles/style.css")
require("@contentstack/live-preview-utils/dist/main.css")

const mapStateToProps = ({ header, footer, page, blog_post }) => {
  return { header, footer, page, blog_post }
}

const Layout = props => {
  const { header, footer, children, pageComponent, blogPost, banner } = props
  const json = { header, footer }
  pageComponent && (json.page = pageComponent)
  banner && (json.banner = banner)
  blogPost && (json.blog_post = blogPost)

  return (
    <>
      <Header />
      <DevTools response={json} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default connect(mapStateToProps)(Layout)
