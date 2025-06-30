import { cn } from '@/lib/utils'
import { IconType } from '@fg-icons'
import React from 'react'

const CheckCircleIcon: React.FC<IconType> = ({ color = "#000", height = 20, width = 20, className }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 28 28" fill="none" className={cn('shrink-0', className)} xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0.666748C6.65329 0.666748 0.666626 6.65341 0.666626 14.0001C0.666626 21.3467 6.65329 27.3334 14 27.3334C21.3466 27.3334 27.3333 21.3467 27.3333 14.0001C27.3333 6.65341 21.3466 0.666748 14 0.666748ZM20.3733 10.9334L12.8133 18.4934C12.6266 18.6801 12.3733 18.7867 12.1066 18.7867C11.84 18.7867 11.5866 18.6801 11.4 18.4934L7.62663 14.7201C7.23996 14.3334 7.23996 13.6934 7.62663 13.3067C8.01329 12.9201 8.65329 12.9201 9.03996 13.3067L12.1066 16.3734L18.96 9.52008C19.3466 9.13341 19.9866 9.13341 20.3733 9.52008C20.76 9.90675 20.76 10.5334 20.3733 10.9334Z" fill={color}/>
    </svg>
  )
}

export default CheckCircleIcon