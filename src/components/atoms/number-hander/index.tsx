import React, { ReactNode } from 'react';
import { formatNumber, formatNumberToKMB } from '@/utils/formatNumber';
import { Text } from '../text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NumberHandler: React.FC<{
  number: number | string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}> = ({ number, prefix, suffix }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {prefix} {formatNumberToKMB(number)} {suffix}
        </TooltipTrigger>
        <TooltipContent className="bg-black">
          <Text variant="ps" color="text-white whitespace-nowrap">
            {prefix} {formatNumber(number, true)} {suffix}
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NumberHandler;
