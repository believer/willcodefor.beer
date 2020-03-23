import React from 'react'

type Theme = 'light' | 'dark'

interface State {
  changeTheme: (theme: Theme) => void
  theme: Theme
}

interface Action {
  type: string
}

interface ChangeTheme extends Action {
  theme: Theme
}

type Actions = ChangeTheme

export const ThemeContext = React.createContext({
  theme: 'light',
  changeTheme: () => {},
} as State)

const query = '(prefers-color-scheme: dark)'

export const ThemeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state: State, action: Actions) => {
      switch (action.type) {
        case 'ChangeTheme':
          return { theme: action.theme }
        default:
          return state
      }
    },
    { theme: 'light' } as State
  )

  const changeTheme = (theme: Theme) => {
    dispatch({ type: 'ChangeTheme', theme })
  }

  React.useEffect(() => {
    document.body.classList.remove('light')
    document.body.classList.remove('dark')

    document.body.classList.add(state.theme)
  }, [state])

  React.useEffect(() => {
    if (!window.matchMedia) {
      return
    }

    const updateTheme = (event: MediaQueryListEvent) => {
      dispatch({ type: 'ChangeTheme', theme: event.matches ? 'dark' : 'light' })
    }

    window.matchMedia(query).addListener(updateTheme)

    if (window.matchMedia(query).matches) {
      dispatch({ type: 'ChangeTheme', theme: 'dark' })
    }

    return () => window.matchMedia(query).removeListener(updateTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ changeTheme, ...state }}>
      {children}
    </ThemeContext.Provider>
  )
}
