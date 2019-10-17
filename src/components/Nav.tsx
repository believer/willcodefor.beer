import { Link } from 'gatsby'
import React from 'react'

const Nav = () => {
  return (
    <div className="p-4">
      <Link className="mr-8" activeClassName="text-pink-700" to="/">
        Home
      </Link>
      <Link className="" activeClassName="text-pink-700" to="/uses">
        What I Use
      </Link>
    </div>
  )
}

export default Nav
