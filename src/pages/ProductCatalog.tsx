
import React from 'react';
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
                <ProductSort productCount={filteredProducts.length} />
                <ProductGrid products={filteredProducts} loading={loading} />
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
