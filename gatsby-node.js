const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve("src/templates/blog-post.js")
  const result = await graphql(`
    query {
      allContentstackBlogPost {
        nodes {
          title
          url
        }
      }
    }
  `)
  const createNewPage = (route, comp, title) => {
    createPage({
      path: `${route}`,
      component: comp,
      context: {
        title: title,
      },
    })
  }
  result.data.allContentstackBlogPost.nodes.forEach(node => {
    createNewPage(node.url, blogPostTemplate, node.title)
  })
}
