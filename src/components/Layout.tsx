import React from 'react'
import PropTypes from 'prop-types'
import './layout.css'
import BlobSvg from './BlobSvg'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <BlobSvg />
      <Nav />

      <main className="grid grid-template-main mt-8 mb-12 lg:my-32">
        <div className="grid-column-main">{children}</div>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
