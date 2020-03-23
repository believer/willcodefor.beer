import React from 'react'

export const External = ({ className = 'w-4 h-4 ml-2' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M19.5 11V21.5H2.5V4.5H13" stroke="currentColor" />
      <path
        d="M7.5 16.5L21.5 2.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M15 2.5H21.5V9" stroke="currentColor" />
    </svg>
  )
}
