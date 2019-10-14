import React from 'react'
import PropTypes from 'prop-types'
import './layout.css'
import BlobSvg from './BlobSvg'

const Layout = ({ children }) => {
  return (
    <>
      <BlobSvg />
      <main className="grid grid-template-main my-12 lg:my-40">
        <div className="grid-column-main">{children}</div>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
