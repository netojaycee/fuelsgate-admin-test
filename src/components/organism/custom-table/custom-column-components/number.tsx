import React from 'react';
import { Text } from '@/components/atoms/text';
import NumberHandler from '@/components/atoms/number-hander';

type TableNumberProps = {
  number: string;
  type: 'volume' | 'price';
};

const TableNumber = ({ number, type }: TableNumberProps) => {
  return (
    <Text variant="ps" color="text-dark-gray-350 whitespace-nowrap">
      <NumberHandler
        number={number}
        prefix={type === 'price' ? <>&#8358;</> : null}
        suffix={type === 'volume' ? 'Ltrs' : null}
      />
    </Text>
  );
};

export { TableNumber };
