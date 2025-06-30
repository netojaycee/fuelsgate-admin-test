import React from 'react';
import { cn } from '@/lib/utils';
import { ProductDto } from '@/types/product.types';

const ProductRenderer = ({ product }: { product: ProductDto }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'inline-flex items-center justify-center h-[17px] w-10 text-xs font-medium rounded-sm uppercase text-white',
          product.color,
        )}
      >
        {product.value}
      </span>
    </div>
  );
};

export default ProductRenderer;
