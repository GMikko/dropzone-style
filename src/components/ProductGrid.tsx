
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  badge?: string;
  isNew?: boolean;
  isLowStock?: boolean;
  categories: string[];
  colors: string[];
  sizes: string[];
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-dropzone-gray-light aspect-[3/4] mb-3"></div>
            <div className="bg-dropzone-gray-light h-4 w-2/3 mb-2"></div>
            <div className="bg-dropzone-gray-light h-4 w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-dropzone-gray">Nenhum produto encontrado.</p>
        <p className="mt-2 text-dropzone-gray">Tente ajustar seus filtros ou realizar uma nova busca.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          badge={product.badge}
          isNew={product.isNew}
          isLowStock={product.isLowStock}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
