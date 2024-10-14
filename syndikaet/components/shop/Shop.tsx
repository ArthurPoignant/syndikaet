"use client";
import { useState } from "react";
import { Product } from '../../types/Product';
import { products } from '../../data/products';
import ShopNavigation from './ShopNavigation';
import AddButton from '../AddButton';
import MerchSection from './MerchSection';
import TracksSection from './TracksSection';

const Shop = () => {
  const [activeSection, setActiveSection] = useState("Merch");

  return (
    <div id="shop" className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="text-xl font-normal text-black sm:text-md mb-6 ml-6 mt-6">
        Shop
      </h1>

      <ShopNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="w-full max-w-full p-4 flex flex-wrap justify-around mx-auto">
        {activeSection === "Merch" ? (
          <MerchSection products={products} />
        ) : (
          <TracksSection products={products} />
        )}
      </div>
    </div>
  );
};

export default Shop;
