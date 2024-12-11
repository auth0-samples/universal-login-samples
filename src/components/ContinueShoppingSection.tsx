// components/ContinueShoppingSection.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type FurnitureItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type ContinueShoppingProps = {
  recentItems: FurnitureItem[];
};

const FurnitureCard: React.FC<FurnitureItem> = ({ name, price, category, image }) => (
  <div className="flex-none w-72 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div className="p-4">
      <div className="aspect-square w-full bg-gray-100 rounded-md mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="mt-2">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="mt-1 font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

export const ContinueShopping: React.FC<ContinueShoppingProps> = ({ recentItems }) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Continue where you left off</h3>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        <div 
          ref={scrollContainer}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {recentItems.map((item) => (
            <FurnitureCard key={item.id} {...item} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};