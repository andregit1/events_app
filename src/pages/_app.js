import '@/styles/globals.sass'
import '@/styles/general.sass'
import { Main } from '@/components/layout/Main'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  )
}
