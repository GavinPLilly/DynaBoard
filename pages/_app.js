import '../styles/globals.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
const [isDark, setIsDark] = useState(false)

  return(<>
 <Component {...pageProps} />
<style jsx global>{`
  body {
    background: "darkslategray";
  }
`}</style>
</>)
}


export default MyApp
