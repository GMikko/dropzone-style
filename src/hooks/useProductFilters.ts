import { useState, useEffect } from 'react';

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

interface UseProductFiltersProps {
  products: Product[];
  category?: string;
}

export const useProductFilters = ({ products, category }: UseProductFiltersProps) => {
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  
  // Filter products based on category and active filters
  const filteredProducts = products.filter(product => {
    // First filter by category
    if (category && !product.categories.includes(category)) {
      return false;
    }
    
    // Then apply active filters
    for (const [filterKey, selectedOptions] of Object.entries(activeFilters)) {
      if (selectedOptions.length === 0) continue;
      
      if (filterKey === 'size') {
        if (!selectedOptions.some(size => product.sizes.includes(size))) {
          return false;
        }
      }
      
      if (filterKey === 'color') {
        if (!selectedOptions.some(color => product.colors.includes(color))) {
          return false;
        }
      }
      
      if (filterKey === 'price') {
        const matchesPrice = selectedOptions.some(priceRange => {
          if (priceRange === 'under-100' && product.price < 100) return true;
          if (priceRange === '100-200' && product.price >= 100 && product.price <= 200) return true;
          if (priceRange === '200-300' && product.price > 200 && product.price <= 300) return true;
          if (priceRange === 'over-300' && product.price > 300) return true;
          return false;
        });
        
        if (!matchesPrice) return false;
      }
    }
    
    return true;
  });

  // Handle filter changes
  const handleFilterChange = (filterId: string, optionId: string) => {
    setActiveFilters(prev => {
      const currentOptions = prev[filterId] || [];
      
      // If option is already selected, remove it
      if (currentOptions.includes(optionId)) {
        return {
          ...prev,
          [filterId]: currentOptions.filter(id => id !== optionId)
        };
      } 
      // Otherwise add it
      else {
        return {
          ...prev,
          [filterId]: [...currentOptions, optionId]
        };
      }
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({});
  };

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [category, activeFilters]);

  return {
    loading,
    activeFilters,
    filteredProducts,
    handleFilterChange,
    handleClearFilters
  };
};
