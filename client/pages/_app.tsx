import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
// styles & layout
import Head from 'next/head'
import Layout from '../components/layout'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component  {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
