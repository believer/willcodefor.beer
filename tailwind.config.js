module.exports = {
  mode: 'jit',
  purge: ['./**/*.njk'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        github: '#181717',
        linkedin: '#0077B5',
        twitter: '#1DA1F2',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.700'),
                textDecoration: 'none',
              },
            },
            'h2 a': {
              color: theme('colors.gray.900'),
              textDecoration: 'none',
            },
            '.tag a': {
              textDecoration: 'none',
            },
          },
        },

        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.400'),
              },
              code: {
                color: theme('colors.indigo.300'),
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
              color: theme('colors.indigo.300'),
            },
            pre: {
              backgroundColor: theme('colors.gray.200'),
              color: theme('colors.gray.800'),
            },
            blockquote: {
              backgroundColor: theme('colors.gray.700'),
              borderColor: theme('colors.indigo.300'),
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
