import React from 'react';
import Image from "next/image";
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden w-80 mx-auto mb-8">
    <div className="relative w-full h-64">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="p-4 flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-black mb-2">
          {product.name}
        </h2>
        <p className="text-black mb-4 ml-auto">{product.price}€</p>
      </div>
      <button
        onClick={() => console.log(product)}
        className="w-12 bg-pink-300 text-white px-4 py-2 ml-auto rounded-lg hover:bg-blue-400 transition"
      >
        <svg
          className="w-4 h-4 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
        </svg>
      </button>
    </div>
  </div>
);

export default ProductCard;
