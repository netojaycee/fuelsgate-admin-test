import clsx from 'clsx'
import React, { forwardRef, memo } from 'react'
import { FontWeight, getFontWeight } from '@/lib/utils'

type HeadingProps = {
  variant: 'dl' | 'ds' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  fontWeight?: FontWeight
  color?: string,
  lineHeight?: string,
  classNames?: string,
  fontFamily?: string,
  children: React.ReactNode
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({variant, fontWeight = 'regular', fontFamily,  color, lineHeight, classNames, children, ...props}, ref) => {
  const _fontWeight = getFontWeight(fontWeight)

  if (variant === 'dl') {
    return (
      <h1 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[100%]', "text-[56px] tracking-[-4%]", classNames)} {...props} ref={ref}>{children}</h1>
    )
  } else if (variant === 'ds') {
    return (
      <h1 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[100%]', "text-5xl tracking-[-4%]", classNames)} {...props} ref={ref}>{children}</h1>
    )
  } else if (variant === 'h1') {
    return (
      <h1 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[100%]', "text-[40px] tracking-[-4%]", classNames)} {...props} ref={ref}>{children}</h1>
    )
  } else if (variant === 'h2') {
    return (
      <h2 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[100%]', "text-[36px] tracking-[-4%]", classNames)} {...props} ref={ref}>{children}</h2>
    )
  } else if (variant === 'h3') {
    return (
      <h3 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[120%]', "text-[32px] tracking-[-2%]", classNames)} {...props} ref={ref}>{children}</h3>
    )
  } else if (variant === 'h4') {
    return (
      <h4 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[120%]', "text-[28px] tracking-[-2%]", classNames)} {...props} ref={ref}>{children}</h4>
    )
  } else if (variant === 'h5') {
    return (
      <h5 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[120%]', "text-[24px] tracking-[-2%]", classNames)} {...props} ref={ref}>{children}</h5>
    )
  } else if (variant === 'h6') {
    return (
      <h6 className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[120%]', "text-[20px] tracking-[-2%]", classNames)} {...props} ref={ref}>{children}</h6>
    )
  }
})

Heading.displayName = 'Heading'

const MemoizedHeading = memo(Heading)

export { MemoizedHeading as Heading, type HeadingProps }