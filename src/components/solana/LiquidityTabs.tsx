'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { OPOSDeveloperToolkit } from '@/assets/img'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import { useEffect, useState } from 'react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { ELSOL_TOKEN_MINT } from '@/constants/address'
import { UpdateIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import OpenOrcaPositionBlinks from './OpenOrcaPositionBlinks'
import { ELSOL_LP_ORCA_LINK } from '@/constants/links'
import { Link } from '@/navigation'
import CloseOrcaPositionBlinks from './CloseOrcaPositionBlinks'

export default function LiquidityTabs() {
  const t = useTranslations()
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const [tabValue, setTabValue] = useState('openOrca')

  const [solBalance, setSolBalance] = useState(0)
  const [elsolBalance, setElsolBalance] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [updateCounter, setUpdateCounter] = useState(0)
  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number | null>(null)
  const [messageTimeoutId, setMessageTimeoutId] = useState<number | null>(null)

  const fetchBalance = async () => {
    if (isUpdating || isDisabled) {
      return
    }

    setIsUpdating(true)
    setIsDisabled(true)
    try {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey)
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { mint: new PublicKey(ELSOL_TOKEN_MINT) },
        )
        let tokenBalance = 0
        tokenAccounts.value.forEach((tokenAccount) => {
          const balance =
            tokenAccount.account.data.parsed.info.tokenAmount.uiAmount
          tokenBalance += balance
        })

        setSolBalance(balance / LAMPORTS_PER_SOL)
        setElsolBalance(tokenBalance)
        setUpdateCounter((prev) => prev + 1)

        setShowUpdatedMessage(true)
        const messageId = window.setTimeout(() => {
          setShowUpdatedMessage(false)
          setMessageTimeoutId(null)
        }, 2000)
        setMessageTimeoutId(messageId)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsUpdating(false)
      const id = window.setTimeout(() => {
        setIsDisabled(false)
        setTimeoutId(null)
      }, 10000)
      setTimeoutId(id)
    }
  }

  useEffect(() => {
    void fetchBalance()
    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      if (messageTimeoutId !== null) {
        window.clearTimeout(messageTimeoutId)
      }
    }
  }, [publicKey])

  return (
    <>
      <div className="grid gap-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="mb-7 grid w-full grid-cols-2">
            <TabsTrigger value="openOrca">
              {t('common.InstantLiquidityRow.openOrca')}
            </TabsTrigger>
            <TabsTrigger value="closeOrca">
              {t('common.InstantLiquidityRow.closeOrca')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="openOrca">
            <OpenOrcaPositionBlinks updateCounter={updateCounter} />
          </TabsContent>
          <TabsContent value="closeOrca">
            <CloseOrcaPositionBlinks updateCounter={updateCounter} />
          </TabsContent>
        </Tabs>
        {publicKey && (
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center gap-0.5">
                <Image
                  src={OPOSDeveloperToolkit}
                  alt="Wallet"
                  className="h-8 w-8"
                  unoptimized
                  width={32}
                  height={32}
                />
                <p className="text-xs font-light">{t('staking.balance')}</p>
              </div>
              <div className="grid">
                <p className={cn('font-bold', mainShardGradation)}>
                  {solBalance.toLocaleString()} SOL
                </p>
                <p className={cn('font-bold', mainShardGradation)}>
                  {elsolBalance.toLocaleString()} elSOL
                </p>
              </div>
              <div className="grid">
                <button
                  onClick={fetchBalance}
                  disabled={isUpdating || isDisabled}
                  className={cn(
                    'p-1',
                    isUpdating ? 'animate-spin' : '',
                    isDisabled
                      ? 'cursor-not-allowed text-gray-400'
                      : 'hover:opacity-70',
                  )}
                >
                  <UpdateIcon className="h-5 w-5" />
                </button>
              </div>
              {showUpdatedMessage && (
                <p className={cn(mainShardGradation, 'text-xs font-light')}>
                  {t('staking.updated')}
                </p>
              )}
            </div>
            <WalletMultiButton />
          </div>
        )}
      </div>
    </>
  )
}
