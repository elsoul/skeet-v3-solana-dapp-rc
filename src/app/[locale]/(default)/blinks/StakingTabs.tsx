'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import StakingBlinks from './StakingBlinks'
import UnstakingBlinks from './UnstakeBlinks'
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
import SwapBlinks from './SwapBlinks'
import StakingFromAccountBlinks from './StakingFromAccountBlinks'

export default function StakingTabs() {
  const t = useTranslations()
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const [tabValue, setTabValue] = useState('staking')

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
          { mint: new PublicKey(ELSOL_TOKEN_MINT) }
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
          <TabsList className="mb-7 grid w-full grid-cols-3">
            <TabsTrigger value="staking">{t('staking.staking')}</TabsTrigger>
            <TabsTrigger value="unstaking">
              {t('staking.unstaking')}
            </TabsTrigger>
            <TabsTrigger value="swap">{t('staking.swap')}</TabsTrigger>
          </TabsList>
          <TabsContent value="staking">
            <StakingBlinks updateCounter={updateCounter} />{' '}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <div className="w-full">
                <p className="text-xs text-green-600 dark:text-green-200">
                  {t('staking.stakingInfo')}
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-center sm:justify-end md:justify-center lg:justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTabValue('stakingFromAccount')
                  }}
                >
                  {t('staking.stakingFromAccount')}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="stakingFromAccount">
            <StakingFromAccountBlinks updateCounter={updateCounter} />
            <div className="mt-5 grid gap-4">
              <div className="flex w-full flex-row items-center justify-center sm:justify-end md:justify-center lg:justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTabValue('staking')
                  }}
                >
                  {t('staking.stakeSOL')}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="unstaking">
            <UnstakingBlinks updateCounter={updateCounter} />
            <div className="mt-5 grid gap-4 sm:grid-cols-7">
              <div className="w-full sm:col-span-5">
                <p className="text-xs text-zinc-500 dark:text-zinc-200">
                  {t('staking.unstakingCaution')}
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-center sm:col-span-2">
                <p className="px-1 pb-2 text-center text-xs text-zinc-500 dark:text-zinc-200">
                  {t('staking.instantUnstaking')}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTabValue('swap')
                  }}
                >
                  {t('staking.swap')}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="swap">
            <SwapBlinks updateCounter={updateCounter} />
            <div className="mt-5 grid gap-4">
              <div className="flex w-full flex-row items-center justify-center sm:justify-end md:justify-center lg:justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTabValue('unstaking')
                  }}
                >
                  {t('staking.unstakingToAccount')}
                </Button>
              </div>
            </div>
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
                      : 'hover:opacity-70'
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
