import React from 'react'
import { cn } from '@/lib/utils'
import { IconType } from '@fg-icons'

const ClockFillIcon: React.FC<IconType> = ({ color = "#000", height = 20, width = 20, className }) => {
  return (
    <svg width={width} height={height} className={cn('shrink-0', className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8.6 8V5H7.4V9.2H11V8H8.6Z" fill={color} />
    </svg>
  )
}

export default ClockFillIcon