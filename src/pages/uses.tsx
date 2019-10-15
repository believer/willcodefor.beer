import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

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

  const keyboardTime =
    new Date().getTime() - new Date('2016-09-21T00:00:00.000Z').getTime()
  const keyboardDays = (keyboardTime / (1000 * 60 * 60 * 24 * 365)).toFixed(2)

  return (
    <Layout>
      <SEO title="What I Use" />

      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: markdownRemark.html.replace('{{keyboardDate}}', keyboardDays),
        }}
      />
    </Layout>
  )
}

export default uses
