
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  badge?: string;
  isNew?: boolean;
  isLowStock?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  badge,
  isNew,
  isLowStock,
  className
}) => {
  return (
    <Link to={`/product/${id}`}>
      <div className={cn("product-card group", className)}>
        <div className="relative overflow-hidden aspect-[3/4]">
          {/* Product Image */}
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge (New, Sale, etc) */}
          {badge && (
            <span className="product-badge">{badge}</span>
          )}
          
          {/* "New" Badge */}
          {isNew && !badge && (
            <span className="product-badge">NEW</span>
          )}
          
          {/* Quick Add Button (shows on hover) */}
          <div className="absolute bottom-0 left-0 right-0 bg-dropzone-black bg-opacity-80 text-white py-3 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-sm font-medium">ADICIONAR</span>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="text-sm font-medium truncate">{name}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="font-semibold">R$ {price.toFixed(2)}</p>
            
            {/* Low Stock Indicator */}
            {isLowStock && (
              <p className="text-xs text-red-500 font-medium">
                Últimas peças
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
