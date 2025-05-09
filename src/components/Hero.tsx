
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=1800&h=1000"
          alt="DropZone Streetwear Collection" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      {/* Overlay & Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-heading mb-4 animate-fadeIn">
            DropZone
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 animate-slideUp">
            Oversized is the New Norm
          </p>
          <Link to="/category/featured">
            <button className="btn-primary animate-slideUp">
              Comprar Agora
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
