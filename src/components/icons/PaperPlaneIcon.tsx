import { cn } from '@/lib/utils'
import { IconType } from '@fg-icons'
import React from 'react'

const PaperPlaneIcon: React.FC<IconType> = ({ color = "#000", height = 20, width = 20, className }) => {
  return (
    <svg width={width} height={height} className={cn('shrink-0', className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.93917 12.6464L7.69193 11.8974L7.69192 11.8974L7.69192 11.8974C5.33871 11.113 4.16211 10.7208 4.16211 10C4.16211 9.27924 5.33872 8.88703 7.69193 8.10263L16.2051 5.26491C17.8609 4.71298 18.6888 4.43701 19.1258 4.87403C19.5628 5.31104 19.2869 6.13894 18.7349 7.79473L15.8972 16.3079L15.8972 16.3079L15.8972 16.3079C15.1128 18.6611 14.7206 19.8377 13.9998 19.8377C13.2791 19.8377 12.8869 18.6611 12.1025 16.3079L11.3534 14.0607L15.7069 9.7071C16.0975 9.31658 16.0975 8.68341 15.7069 8.29289C15.3164 7.90237 14.6832 7.90237 14.2927 8.29289L9.93917 12.6464Z" fill={color} />
    </svg>
  )
}

export default PaperPlaneIcon