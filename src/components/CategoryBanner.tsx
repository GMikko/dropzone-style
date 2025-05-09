
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryBannerProps {
  category: {
    name: string;
    description: string;
    imageUrl: string;
    path: string;
  };
  reversed?: boolean;
  className?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ 
  category, 
  reversed = false,
  className
}) => {
  return (
    <div className={cn("py-6 md:py-10", className)}>
      <div className="container-custom">
        <div className={cn(
          "grid md:grid-cols-2 gap-6 items-center",
          reversed ? "md:flex-row-reverse" : ""
        )}>
          {/* Image Side */}
          <div className="overflow-hidden rounded-sm">
            <img 
              src={category.imageUrl} 
              alt={category.name} 
              className="w-full object-cover h-64 md:h-80 hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Content Side */}
          <div className={cn(
            "flex flex-col justify-center",
            reversed ? "md:pr-12" : "md:pl-12"
          )}>
            <h2 className="text-3xl md:text-4xl font-heading mb-4">{category.name}</h2>
            <p className="text-dropzone-gray mb-6">{category.description}</p>
            <div>
              <Link to={category.path}>
                <button className="btn-primary">Comprar Agora</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
