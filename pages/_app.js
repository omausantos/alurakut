import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS <3) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* latin */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/rubik/v14/iJWKBXyIfDnIV7nBrXw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/rubik/v14/iJWKBXyIfDnIV7nBrXw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  body {
    font-family: 'Rubik', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  ${AlurakutStyles}  
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
