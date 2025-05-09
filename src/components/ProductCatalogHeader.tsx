
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { categoryNames } from '@/data/productData';

interface ProductCatalogHeaderProps {
  category?: string;
}

const ProductCatalogHeader: React.FC<ProductCatalogHeaderProps> = ({ category }) => {
  return (
    <div className="bg-dropzone-gray-light py-12 md:py-16">
      <div className="container-custom text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-2">
          {categoryNames[category || ''] || 'Produtos'}
        </h1>
        <div className="flex items-center justify-center text-sm text-dropzone-gray">
          <a href="/" className="hover:text-dropzone-black">Home</a>
          <ChevronRight size={14} className="mx-2" />
          <span>{categoryNames[category || ''] || 'Produtos'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogHeader;
