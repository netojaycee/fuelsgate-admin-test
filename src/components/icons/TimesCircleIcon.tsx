import { cn } from '@/lib/utils'
import { IconType } from '@fg-icons'
import React from 'react'

const TimesCircleIcon: React.FC<IconType> = ({ color = "#000", height = 20, width = 20, className }) => {
  return (
    <svg width={width} height={height} className={cn('shrink-0', className)} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM6 5.1516L4.3032 3.4542L3.4542 4.3032L5.1516 6L3.4542 7.6968L4.3032 8.5458L6 6.8484L7.6968 8.5458L8.5458 7.6968L6.8484 6L8.5458 4.3032L7.6968 3.4542L6 5.1516Z" fill={color}/>
    </svg>
  )
}

export default TimesCircleIcon