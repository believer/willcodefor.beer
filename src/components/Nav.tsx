import { Link } from 'gatsby'
import React from 'react'

const Nav = () => {
  return (
    <div className="p-4">
      <Link className="mr-8" activeClassName="text-pink-300" to="/">
        Home
      </Link>
      <Link className="" activeClassName="text-pink-300" to="/uses">
        What I use
      </Link>
    </div>
  )
}

export default Nav
