'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'New Arrivals',
    subtitle: 'Shop the latest trends',
    image: '/images/slide1.jpg',
    bgColor: 'bg-red-500',
  },
  {
    id: 2,
    title: 'Summer Sale',
    subtitle: 'Up to 50% off selected items',
    image: '/images/slide2.jpg',
    bgColor: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Limited Edition',
    subtitle: 'Exclusive products just for you',
    image: '/images/slide3.jpg',
    bgColor: 'bg-green-500',
  },
];

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={`w-full shrink-0 h-148 ${slide.bgColor} relative`}>
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
              <h1 className="text-5xl font-extrabold mb-2">{slide.title}</h1>
              <p className="text-xl font-medium">{slide.subtitle}</p>
              <button className="mt-6 px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/50 rounded-full text-gray-800 hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/50 rounded-full text-gray-800 hover:bg-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
