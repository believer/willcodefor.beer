import React from 'react'

const query = '(prefers-reduced-motion: reduce)'

export const useReducedMotion = () => {
  const [state, setState] = React.useState(false)

  React.useEffect(() => {
    if (!window.matchMedia) {
      return
    }

    const update = ({ matches }: MediaQueryListEvent) => {
      setState(matches)
    }

    window.matchMedia(query).addListener(update)

    if (window.matchMedia(query).matches) {
      setState(true)
    }

    return () => window.matchMedia(query).removeListener(update)
  }, [])

  return [state, setState]
}
