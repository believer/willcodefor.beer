import * as React from 'react'
import Layout from '../components/Layout'
import { Link, useStaticQuery, graphql } from 'gatsby'

const uses = () => {
  const { markdownRemark } = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "/uses/" }) {
        html
        frontmatter {
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <Link to="/">Home</Link>

      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
    </Layout>
  )
}

export default uses
