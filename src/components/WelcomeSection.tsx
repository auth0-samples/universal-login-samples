// components/WelcomeSection.tsx
import React from 'react';
import { ContinueShopping } from './ContinueShoppingSection';

const recentItems = [
  {
    id: '1',
    name: 'POÄNG Armchair',
    price: 199.99,
    image: 'http://localhost:8080/images/armchair.jpeg',
    category: 'Armchairs'
  },
  {
    id: '2',
    name: 'BILLY Bookcase',
    price: 49.99,
    image: 'http://localhost:8080/images/bookcase.jpeg',
    category: 'Storage'
  },
  {
    id: '3',
    name: 'MALM Bed frame',
    price: 299.99,
    image: 'http://localhost:8080/images/bed.jpeg',
    category: 'Beds'
  }
];

export const WelcomeSection: React.FC = () => (
  <div className="hidden md:flex md:w-1/2 bg-ikeaBlue text-white flex-col justify-between relative">
    {/* Back button */}
    <div className="absolute top-4 left-4 flex items-center">
      <a href="http://localhost:3000" className="text-white hover:text-gray-300 mr-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
    </div>

    {/* Welcome text - added mt-[30vh] to move it down */}
    <div className="p-12 mt-[30vh]">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-yellow-500">IKEAuth</span>
      </h1>
      <p className="text-xl">
        Log in or create an account for a smoother checkout.
      </p>
      <p className="text-lg mt-2">
        Too many passwords? You can now login with a Passkey.
      </p>
    </div>

    {/* Carousel section */}
    <div className="px-8 pb-8">
      <ContinueShopping recentItems={recentItems} />
    </div>
  </div>
);