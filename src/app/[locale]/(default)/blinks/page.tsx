import { unstable_setRequestLocale } from 'next-intl/server'
import { getDataForPageByFilename, PageProps } from '@/lib/pages'

import { useTranslations } from 'next-intl'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import BlinksHeroRow from './BlinksHeroRow'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import Why1SOLnot1elSOLRow from './Why1SOLnot1elSOLRow'
import HavingLiquidityRow from './HavingLiquidityRow'
import StakingHeroRow from './StakingHeroRow'
import ElsolMetricsRow from '@/components/rows/ElsolMetricsRow'
import InstantLiquidityRow from '@/components/rows/InstantLiquidityRow'
import DirectStakingRow from './DirectStakingRow'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'

const { generateMetadata } = getDataForPageByFilename(__filename)
export { generateMetadata }

export default function BlinksPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <>
      <BlinksHeroRow />
      <div className="my-8">
        <h3
          className={cn(
            'text-center font-bold tracking-tight',
            'text-4xl sm:text-5xl lg:text-7xl',
            mainShardGradation
          )}
        >
          Blinks Examples
        </h3>
      </div>
      <DirectStakingRow />
      <StakingHeroRow />
      <ElsolMetricsRow />
      <Why1SOLnot1elSOLRow />
      <InstantLiquidityRow />
      <HavingLiquidityRow />
      <VLDAirdropRow />
      <CTARow />
      <ProductsSlideRow />
    </>
  )
}
