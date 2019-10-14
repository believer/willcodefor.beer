import React from 'react'

const Blob = () => {
  return (
    <>
      <div className="block lg:hidden h-4 bg-pink-300" />

      <svg
        className="blob hidden lg:block"
        width="684"
        height="646"
        viewBox="0 0 684 646"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M73.2766 342.858C-65.0688 276.898 32.3295 149.741 98.3219 94.408C130.921
          55.5647 160.065 -112.814 483.5 136.5C579.5 210.5 746.5 136.5 653.35
          443.998C512.375 909.373 246.208 425.309 73.2766 342.858Z"
          stroke="#FBB6CE"
          strokeWidth="5"
        />
        <path
          d="M100.153 340.788C-24.1692 281.482 63.3566 167.151 122.66 117.399C151.954
          82.4736 178.145 -68.9206 468.795 155.245C555.065 221.781 705.137 155.245
          621.429 431.726C494.743 850.159 255.556 414.922 100.153 340.788Z"
          stroke="#FED7E2"
          strokeWidth="5"
        />
        <path
          d="M122.346 339.652C9.45552 285.802 88.933 181.991 142.783 136.817C169.384
          105.105 193.166 -32.3585 457.09 171.181C535.427 231.594 671.699 171.181
          595.689 422.222C480.652 802.153 263.459 406.964 122.346 339.652Z"
          stroke="#FFF5F7"
          strokeWidth="5"
        />
      </svg>
    </>
  )
}

export default Blob

