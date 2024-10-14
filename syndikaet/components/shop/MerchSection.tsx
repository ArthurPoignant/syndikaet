import React from 'react';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

interface MerchSectionProps {
  products: Product[];
}

const MerchSection: React.FC<MerchSectionProps> = ({ products }) => (
  <>
    {products.map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </>
);

export default MerchSection;
