
import React from 'react';

interface ProductSortProps {
  productCount: number;
  sortOrder: string;
  onSortChange: (sortOrder: string) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ productCount, sortOrder, onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };
  
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <p className="text-dropzone-gray mb-3 sm:mb-0">
        Mostrando {productCount} produtos
      </p>
      
      <select 
        className="border border-dropzone-gray-light p-2 bg-white"
        value={sortOrder}
        onChange={handleSortChange}
      >
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
