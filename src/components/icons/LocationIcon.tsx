import { cn } from '@/lib/utils'
import { IconType } from '@fg-icons'
import React from 'react'

const LocationIcon: React.FC<IconType> = ({ color = "#000", height = 20, width = 20, className }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" className={cn('shrink-0', className)} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_354_5842)">
        <path d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.5333 6.46669L11.7666 11.7667L6.46663 13.5334L8.23329 8.23335L13.5333 6.46669Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_354_5842">
          <rect width={width} height={height} fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default LocationIcon