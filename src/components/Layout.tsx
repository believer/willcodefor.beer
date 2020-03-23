import React from 'react'
import './layout.css'
import BlobSvg from './BlobSvg'
import Nav from './Nav'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Layout: React.FC = ({ children }) => {
  const [prefersReducedMotion] = useReducedMotion()

  return (
    <>
      {prefersReducedMotion ? null : <BlobSvg />}
      <Nav />

      <main className="grid grid-template-main mt-8 mb-12 lg:my-32">
        <div className="grid-column-main">{children}</div>
      </main>
    </>
  )
}

export default Layout
