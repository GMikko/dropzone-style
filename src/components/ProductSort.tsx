
import React from 'react';

interface ProductSortProps {
  productCount: number;
}

const ProductSort: React.FC<ProductSortProps> = ({ productCount }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <p className="text-dropzone-gray mb-3 sm:mb-0">
        Mostrando {productCount} produtos
      </p>
      
      <select className="border border-dropzone-gray-light p-2 bg-white">
        <option value="latest">Mais recentes</option>
        <option value="price-low">Menor preço</option>
        <option value="price-high">Maior preço</option>
        <option value="name-asc">A-Z</option>
        <option value="name-desc">Z-A</option>
      </select>
    </div>
  );
};

export default ProductSort;
