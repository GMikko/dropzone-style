
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';

interface FeaturedProductsProps {
  title: string;
  viewAllLink: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    badge?: string;
    isNew?: boolean;
    isLowStock?: boolean;
  }>;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title, 
  viewAllLink, 
  products 
}) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-heading">{title}</h2>
          <Link 
            to={viewAllLink} 
            className="flex items-center text-sm font-medium hover:text-dropzone-accent transition-colors"
          >
            Ver mais <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
