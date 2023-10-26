import { createTheme, rem } from '@mantine/core'

const theme = createTheme({
  fontFamily: 'source-sans-3, sans-serif',
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  headings: {
    sizes: {
      h2: {
        fontSize: rem(18),
        fontWeight: '400',
      },
    },
  },
})

export default theme
