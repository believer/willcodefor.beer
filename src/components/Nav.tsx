import { Link } from 'gatsby'
import React from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Nav = () => {
  const { changeTheme, theme } = React.useContext(ThemeContext)
  const isLight = theme === 'light'

  return (
    <div className="p-4">
      <Link
        className="mr-8"
        activeClassName={isLight ? 'text-pink-600' : 'text-pink-300'}
        to="/"
      >
        Home
      </Link>
      <Link
        className="mr-8"
        activeClassName={isLight ? 'text-pink-600' : 'text-pink-300'}
        to="/uses"
      >
        What I Use
      </Link>
      <button onClick={() => changeTheme(isLight ? 'dark' : 'light')}>
        {isLight ? '🌜' : '☀️'}
      </button>
    </div>
  )
}

export default Nav
