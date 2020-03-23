import React from 'react'
import { External } from '../components/Icon'

const SocialMedia: React.FC<{
  className?: string
  href: string
  name: string
}> = ({ className = '', name, href }) => {
  return (
    <a
      className={`flex items-center ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {name}
      <External />
    </a>
  )
}

export default SocialMedia
