import clsx from 'clsx'
import React, { forwardRef, memo } from 'react'
import { FontWeight, getFontWeight } from '@/lib/utils'

type TextProps = {
  variant: 'pl' | 'pm' | 'ps' | 'pxs' | 'cl' | 'cs' | 'cxs',
  color?: string,
  fontWeight?: FontWeight,
  lineHeight?: string,
  classNames?: string,
  fontFamily?: string,
  children: React.ReactNode
}
// TODO: the way this component is rendered is wrong. Fix this!
const Text = forwardRef<HTMLParagraphElement, TextProps>(({ variant, color, fontFamily, fontWeight = 'regular', lineHeight, classNames, children}, ref) => {
  const _fontWeight = getFontWeight(fontWeight)

  if (variant === 'pl') {
    return (
      <p ref={ref} className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[145%]', 'text-lg tracking-normal', classNames)}>{children}</p>
    )
  } else if (variant === 'pm') {
    return (
      <p ref={ref} className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[145%]', 'text-base tracking-normal', classNames)}>{children}</p>
    )
  } else if (variant === 'ps') {
    return (
      <p ref={ref} className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[145%]', 'text-sm tracking-normal', classNames)}>{children}</p>
    )
  } else if (variant === 'pxs') {
    return (
      <p ref={ref} className={clsx(_fontWeight, color, fontFamily, lineHeight ?? 'leading-[145%]', 'text-xs tracking-normal', classNames)}>{children}</p>
    )
  } else if (variant === 'cl') {
    return (
      <p ref={ref} className={clsx(color, fontFamily, lineHeight ?? 'leading-[120%]', 'text-sm font-semibold tracking-[12%]', classNames)}>{children}</p>
    )
  } else if (variant === 'cs') {
    return (
      <p ref={ref} className={clsx(color, fontFamily, lineHeight ?? 'leading-[120%]', 'text-xs font-semibold tracking-[12%]', classNames)}>{children}</p>
    )
  } else if (variant === 'cxs') {
    return (
      <p ref={ref} className={clsx(color, fontFamily, lineHeight ?? 'leading-[120%]', 'text-[10px] font-semibold tracking-[16%]', classNames)}>{children}</p>
    )
  }
})

Text.displayName = 'Text'

const MemoizedText = memo(Text)

export { MemoizedText as Text, type TextProps }