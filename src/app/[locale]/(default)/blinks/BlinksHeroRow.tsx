'use client'

import {
  OPOSCompressedCoil,
  SolanaBlinksImg,
  SolanaLogoHorizontal,
  SolanaLogoInvertHorizontal
} from '@/assets/img'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useTheme } from '@/hooks/utils/useTheme'
import { Link } from '@/navigation'

const logos = [
  {
    title: 'Solana',
    logo: SolanaLogoHorizontal,
    logoInvert: SolanaLogoInvertHorizontal,
    href: 'https://solana.com/solutions/actions'
  }
]

export default function BlinksHeroRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <>
      <div className="relative mx-auto max-w-7xl p-3">
        <div className="absolute left-0 top-0 -z-10 opacity-20 dark:opacity-40">
          <Image
            src={OPOSCompressedCoil}
            alt="Background"
            className="h-56 w-56 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[512px] lg:w-[512px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="relative mx-auto grid items-center gap-8 py-24 md:grid-cols-2 md:py-48">
          <div className="grid w-full gap-4 p-4">
            <h2
              className={cn(
                'py-2 text-5xl font-bold tracking-tighter sm:text-7xl lg:text-8xl',
                mainShardGradation
              )}
            >
              {t('blinks.title')}
            </h2>
            <p
              className={cn(
                'max-w-96 text-lg font-medium tracking-tight sm:max-w-lg sm:text-xl lg:-mt-2 lg:max-w-xl lg:text-2xl',
                'text-zinc-500 dark:text-zinc-300'
              )}
            >
              {t('blinks.description')}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
              {logos.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={theme === 'light' ? item.logo : item.logoInvert}
                    alt="Background"
                    className="w-20 sm:w-24 md:w-28"
                    unoptimized
                    width={256}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full p-4">
            <Image
              src={SolanaBlinksImg}
              alt="Solana Actions & Blinks"
              className="w-full"
              unoptimized
              width={256}
              height={256}
            />
          </div>
        </div>
      </div>
    </>
  )
}
