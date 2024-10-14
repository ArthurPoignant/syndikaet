import React from 'react';

interface ShopNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ShopNavigation: React.FC<ShopNavigationProps> = ({ activeSection, setActiveSection }) => (
  <div className="flex space-x-4 mb-8 mx-auto">
    <a
      className={`px-4 py-2 font-semibold text-lg rounded ${
        activeSection === "Merch" ? "text-blue-400" : "text-black"
      }`}
      onClick={() => setActiveSection("Merch")}
    >
      Merch
    </a>
    <a
      className={`px-4 py-2 font-semibold text-lg rounded ${
        activeSection === "Tracks" ? "text-pink-500" : "text-black"
      }`}
      onClick={() => setActiveSection("Tracks")}
    >
      Tracks
    </a>
  </div>
);

export default ShopNavigation;
