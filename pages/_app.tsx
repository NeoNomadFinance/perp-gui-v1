import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import 'intro.js/introjs.css'
import '../styles/index.css'
import useWallet from '../hooks/useWallet'
import useHydrateStore from '../hooks/useHydrateStore'
import Notifications from '../components/Notification'
import useMangoStore from '../stores/useMangoStore'
import useOraclePrice from '../hooks/useOraclePrice'
import { getDecimalCount } from '../utils'
import { useRouter } from 'next/router'
import { ViewportProvider } from '../hooks/useViewport'
import BottomBar from '../components/mobile/BottomBar'
import { appWithTranslation } from 'next-i18next'
import ErrorBoundary from '../components/ErrorBoundary'
import GlobalNotification from '../components/GlobalNotification'

const MangoStoreUpdater = () => {
  useHydrateStore()
  useWallet()

  return null
}

const PageTitle = () => {
  const router = useRouter()
  const marketConfig = useMangoStore((s) => s.selectedMarket.config)
  const market = useMangoStore((s) => s.selectedMarket.current)
  const oraclePrice = useOraclePrice()
  const selectedMarketName = marketConfig.name
  const marketTitleString =
    marketConfig && router.pathname.includes('market')
      ? `${
          oraclePrice
            ? oraclePrice.toFixed(getDecimalCount(market?.tickSize)) + ' | '
            : ''
        }${selectedMarketName} - `
      : ''

  return (
    <Head>
      <title>{marketTitleString}NeoNomad Exchange</title>
    </Head>
  )
}

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NeoNomad Exchange</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="NeoNomad Exchange" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="NeoNomad, Serum, SRM, Serum DEX, DEFI, Decentralized Finance, Decentralised Finance, Crypto, ERC20, Ethereum, Decentralize, Solana, SOL, SPL, Cross-Chain, Trading, Fastest, Fast, SerumBTC, SerumUSD, SRM Tokens, SPL Tokens"
        />
        <meta
          name="description"
          content="NeoNomad Exchange - Decentralised, cross-margin trading up to 10x leverage with lightning speed and near-zero fees."
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/apple-touch-icon.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NeoNomad Exchange" />
        <meta
          name="twitter:description"
          content="NeoNomad Finance - Decentralised, cross-margin trading up to 10x leverage with lightning speed and near-zero fees."
        />
        <meta name="twitter:image" content="/twitter-image.png" />

        <script src="/datafeeds/udf/dist/polyfills.js"></script>
        <script src="/datafeeds/udf/dist/bundle.js"></script>

        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <ErrorBoundary>
        <ErrorBoundary>
          <PageTitle />
          <MangoStoreUpdater />
        </ErrorBoundary>

        <ThemeProvider defaultTheme="Dark">
          <ViewportProvider>
            <div className="bg-th-bkg-1 min-h-screen">
              <ErrorBoundary>
                <GlobalNotification />
                <Component {...pageProps} />
              </ErrorBoundary>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 w-full z-20">
              <ErrorBoundary>
                <BottomBar />
              </ErrorBoundary>
            </div>

            <Notifications />
          </ViewportProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

export default appWithTranslation(App)
