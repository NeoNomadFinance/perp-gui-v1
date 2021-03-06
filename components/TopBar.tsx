import { useCallback, useState } from 'react'
import Link from 'next/link'
import { abbreviateAddress } from '../utils/index'
import useLocalStorageState from '../hooks/useLocalStorageState'
import MenuItem from './MenuItem'
import ThemeSwitch from './ThemeSwitch'
import useMangoStore from '../stores/useMangoStore'
import ConnectWalletButton from './ConnectWalletButton'
// import NavDropMenu from './NavDropMenu'
import AccountsModal from './AccountsModal'
import LanguageSwitch from './LanguageSwitch'
import { DEFAULT_MARKET_KEY, initialMarket } from './SettingsModal'
// import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Settings from './Settings'

// const StyledNewLabel = ({ children, ...props }) => (
//    <div style={{ fontSize: '0.5rem', marginLeft: '1px' }} {...props}>
//      {children}
//    </div>
//  )

const TopBar = () => {
  const { t } = useTranslation('common')
  const mangoAccount = useMangoStore((s) => s.selectedMangoAccount.current)
  const wallet = useMangoStore((s) => s.wallet.current)
  const [showAccountsModal, setShowAccountsModal] = useState(false)
  const [defaultMarket] = useLocalStorageState(
    DEFAULT_MARKET_KEY,
    initialMarket
  )

  const handleCloseAccounts = useCallback(() => {
    setShowAccountsModal(false)
  }, [])

  return (
    <>
      <nav className={`bg-th-bkg-2 border-b border-th-bkg-2`}>
        <div className={`px-4 lg:px-10`}>
          <div className={`flex justify-between h-14`}>
            <div className={`flex`}>
              <Link href={defaultMarket.path} shallow={true}>
                <div
                  className={`cursor-pointer flex-shrink-0 flex items-center`}
                >
                  <img
                    className={`h-14 w-auto`}
                    src="/assets/icons/nnilogo.png"
                    alt="next"
                  />
                </div>
              </Link>
              <div
                className={`hidden md:flex md:items-center md:space-x-4 lg:space-x-6 md:ml-4`}
              >
                <MenuItem href="https://neonomad.finance">{t('Home')}</MenuItem>
                {/* <MenuItem href="https://trade.neonomad.exchange/swap">{t('Swap')}</MenuItem>               
                 <MenuItem href="#">{t('Trade')}</MenuItem>
                 <MenuItem href="#">{t('Farm')}</MenuItem>
                 <MenuItem href="#">{t('Staking')}</MenuItem> */}
                 <MenuItem href="https://app.neonomad.exchange/launchpad">{t('Launchpad')}</MenuItem>
                 
                {/* <NavDropMenu
                  menuTitle={t('')}
                  // linksArray: [name: string, href: string, isExternal: boolean]
                  linksArray={[
                    ['Account', 'https://futures.neonomad.exchange/account', true],
                    ['Borrow', 'https://futures.neonomad.exchange/borrow', true],
                    ['Risk Calculator', 'https://futures.neonomad.exchange/risk-calculator', true],
                    ['Stats', 'https://futures.neonomad.exchange/stats', true],
                    ['Docs', 'https://docs.neonomad.finance/', true],
                  ]}
                /> */}
               

                {/* <NavDropMenu
                  menuTitle={t('Dex Tools')}
                 
                  linksArray={[
                    ['Liquidity', '#', true],
                    ['Pools', '#', true],
                    ['Farms', '#', true],
                    ['Staking', '#', true],
                    ['Airdrop Claim', '#', true],
                    ['NFTs', 'https://www.neonomad.finance/nft-market-place', true],
                    ['Data Feed', '#', true],
                    ['Docs', 'https://docs.neonomad.finance/', true],

                  ]}
                 />  */}

                 
                {/* <button
                  onClick={() => {
                    handleLocaleChange('en')
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    handleLocaleChange('zh')
                  }}
                >
                  ????????????
                </button>
                <button
                  onClick={() => {
                    handleLocaleChange('zh_tw')
                  }}
                >
                  ????????????
                </button> */}
              </div>
            </div>
            <div className="flex items-center">
              <div className={`pl-2`}>
                <LanguageSwitch />
              </div>
              <div className={`pl-2`}>
                <ThemeSwitch />
              </div>
              <div className="pl-2">
                <Settings />
              </div>
              {mangoAccount &&
              mangoAccount.owner.toBase58() ===
                wallet?.publicKey?.toBase58() ? (
                <div className="pl-2">
                  <button
                    className="border border-th-bkg-4 py-1 px-2 rounded text-xs focus:outline-none hover:border-th-fgd-4"
                    onClick={() => setShowAccountsModal(true)}
                  >
                    <div className="font-normal text-th-primary text-xs">
                      {t('account')}
                    </div>
                    {mangoAccount.name
                      ? mangoAccount.name
                      : abbreviateAddress(mangoAccount.publicKey)}
                  </button>
                </div>
              ) : null}
              <div className="flex">
                <div className="pl-2">
                  <ConnectWalletButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showAccountsModal ? (
        <AccountsModal
          onClose={handleCloseAccounts}
          isOpen={showAccountsModal}
        />
      ) : null}
    </>
  )
}

export default TopBar
