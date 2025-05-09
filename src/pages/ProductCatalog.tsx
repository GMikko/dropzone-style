
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import ProductCatalogHeader from '@/components/ProductCatalogHeader';
import ProductSort from '@/components/ProductSort';
import { useProductFilters } from '@/hooks/useProductFilters';
import { allProducts, filterOptions } from '@/data/productData';

const ProductCatalog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [sortOrder, setSortOrder] = useState<string>('latest');
  
  const { 
    loading, 
    activeFilters, 
    filteredProducts, 
    handleFilterChange, 
    handleClearFilters 
  } = useProductFilters({
    products: allProducts,
    category
  });
  
  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };
  
  // Apply sorting to filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'latest':
      default:
        // For "latest", assuming new items are marked with isNew
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
    }
  });

  return (
    <>
      <Navbar />
      <main>
        <ProductCatalogHeader category={category} />
        
        {/* Product Catalog */}
        <div className="py-8 md:py-12">
          <div className="container-custom">
            <div className="md:grid md:grid-cols-4 lg:grid-cols-5 gap-6">
              {/* Sidebar Filters */}
              <div className="md:col-span-1">
                <ProductFilters 
                  filters={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
              
              {/* Product Grid */}
              <div className="md:col-span-3 lg:col-span-4">
                <ProductSort 
                  productCount={sortedProducts.length} 
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
                <ProductGrid products={sortedProducts} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductCatalog;
