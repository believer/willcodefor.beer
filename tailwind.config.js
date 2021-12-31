module.exports = {
  mode: 'jit',
  purge: ['./*.njk', './_includes/*.njk', './*.md', './posts/*.md'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        github: '#181717',
        linkedin: '#0077b5',
        twitter: '#1da1f2',
        polywork: '#66ba8c',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.600'),
                textDecoration: 'underline',
              },
            },
            'h2 a': {
              color: theme('colors.gray.900'),
              textDecoration: 'none',
            },
            '.tag a': {
              textDecoration: 'none',
            },
            code: {
              color: theme('colors.indigo.600'),
            },
          },
        },

        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.400'),
              },
              code: {
                color: theme('colors.blue.300'),
              },
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            thead: {
              th: {
                color: theme('colors.gray.200'),
              },
            },
            h1: {
              color: theme('colors.gray.200'),
            },
            h2: {
              color: theme('colors.gray.200'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            h4: {
              color: theme('colors.gray.200'),
            },
            h5: {
              color: theme('colors.gray.200'),
            },
            h6: {
              color: theme('colors.gray.200'),
            },
            code: {
              color: theme('colors.indigo.400'),
            },
            pre: {
              backgroundColor: theme('colors.gray.200'),
              color: theme('colors.gray.800'),
            },
            blockquote: {
              backgroundColor: theme('colors.gray.700'),
              borderColor: theme('colors.blue.300'),
              color: theme('colors.gray.300'),
            },
            figcaption: {
              color: theme('colors.gray.500'),
            },
            '::selection': {
              backgroundColor: theme('colors.indigo.300'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
