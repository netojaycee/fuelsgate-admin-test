import { cn } from '@/lib/utils'
import { IconType } from '@fg-icons'
import React from 'react'

const EmailIcon: React.FC<IconType> = ({ color = "#000", height = 20, width = 20, className }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" className={cn('shrink-0', className)} xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66663 7.08335C1.66663 4.16669 3.33329 2.91669 5.83329 2.91669H14.1666C16.6666 2.91669 18.3333 4.16669 18.3333 7.08335V12.9167C18.3333 15.8334 16.6666 17.0834 14.1666 17.0834H5.83329" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M14.1667 7.5L11.5584 9.58333C10.7 10.2667 9.2917 10.2667 8.43337 9.58333L5.83337 7.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M1.66663 13.75H6.66663" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path opacity="0.4" d="M1.66663 10.4167H4.16663" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default EmailIcon