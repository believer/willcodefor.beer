import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const uses = () => {
  const { markdownRemark } = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: { regex: "/iteam/" }) {
        html
        frontmatter {
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Iteam experience" />

      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: markdownRemark.html,
        }}
      />
    </Layout>
  )
}

export default uses
