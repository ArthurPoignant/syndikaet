import React from 'react';
import { Product } from '../../types/Product';
import TrackItem from './TrackItem';

interface TracksSectionProps {
  products: Product[];
}

const TracksSection: React.FC<TracksSectionProps> = ({ products }) => (
  <>
    {products.map((product, index) => (
      <TrackItem key={index} product={product} />
    ))}
  </>
);

export default TracksSection;
