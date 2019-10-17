const postQuery = `{
  posts: allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }){
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          background
          category
          date_timestamp: date
          date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
          description
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

// date_timestamp é utilizando pelo algolia para indexar os dados mas ele só é reconhecido
// no formato unix date e essa linha faz essa conversao.
const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    date_timestamp: parseInt(
      (new Date(frontmatter.date_timestamp).getTime() / 1000).toFixed(0)
    ),
    ...rest,
  }))

// Ele pesquisa de 20 em 20
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    settings,
  },
]

module.exports = queries
