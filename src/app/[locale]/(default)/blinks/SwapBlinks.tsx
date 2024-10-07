'use client'

import '@dialectlabs/blinks/index.css'
import { Blink, useAction } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { solanaEndpoint } from '@/components/providers/SolanaWalletProvider'
import { useTheme } from 'next-themes'
import { useWallet } from '@solana/wallet-adapter-react'
import ConnectYourWalletCard from '@/components/common/ConnectYourWalletCard'
import { Skeleton } from '@/components/ui/skeleton'
import { VALIDATORS_BLINKS_BASE_URL } from '@/constants/links'

type Props = {
  updateCounter: number
}

export default function SwapBlinks({ updateCounter }: Props) {
  const { publicKey } = useWallet()
  const { adapter } = useActionSolanaWalletAdapter(solanaEndpoint)
  const { action } = useAction({
    url: `${VALIDATORS_BLINKS_BASE_URL}/v1/swap`,
    adapter,
  })
  const { theme } = useTheme()

  return (
    <>
      {publicKey ? (
        <>
          {action ? (
            <Blink
              key={updateCounter}
              action={action}
              stylePreset={theme === 'light' ? 'x-light' : 'x-dark'}
            />
          ) : (
            <Skeleton className="h-80 w-full sm:h-[512px] lg:h-[720px]" />
          )}
        </>
      ) : (
        <>
          <ConnectYourWalletCard />
        </>
      )}
    </>
  )
}
