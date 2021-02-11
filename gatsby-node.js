const Promise = require("bluebird")
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  urlPath
                  title
                  tags
                  post {
                    json
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          console.log(post)
          createPage({
            path: `/blog/${post.node.urlPath}/`,
            component: blogPost,
            context: post.node,
          })
        })
      })
    )
  })
}
