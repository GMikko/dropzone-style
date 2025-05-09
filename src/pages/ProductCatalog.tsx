import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import { ChevronRight } from 'lucide-react';

const ProductCatalog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  
  // Category display names
  const categoryNames: Record<string, string> = {
    'new': 'Novos Produtos',
    'camisetas': 'Camisetas',
    'moletons': 'Moletons',
    'acessorios': 'Acessórios',
    'calcas': 'Calças',
    'best-sellers': 'Mais Vendidos',
  };

  // Filter options
  const filters = [
    {
      id: 'size',
      name: 'Tamanho',
      options: [
        { id: 'p', label: 'P' },
        { id: 'm', label: 'M' },
        { id: 'g', label: 'G' },
        { id: 'gg', label: 'GG' },
        { id: 'xgg', label: 'XGG' },
      ]
    },
    {
      id: 'color',
      name: 'Cor',
      options: [
        { id: 'black', label: 'Preto' },
        { id: 'white', label: 'Branco' },
        { id: 'gray', label: 'Cinza' },
        { id: 'blue', label: 'Azul' },
        { id: 'beige', label: 'Bege' },
      ]
    },
    {
      id: 'price',
      name: 'Preço',
      options: [
        { id: 'under-100', label: 'Até R$ 100' },
        { id: '100-200', label: 'R$ 100 - R$ 200' },
        { id: '200-300', label: 'R$ 200 - R$ 300' },
        { id: 'over-300', label: 'Acima de R$ 300' },
      ]
    },
  ];

  // Example products
  const allProducts = [
    {
      id: '1',
      name: 'Camiseta Chaos DropZone',
      price: 119.90,
      imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      isNew: true,
      categories: ['camisetas', 'new'],
      colors: ['black'],
      sizes: ['p', 'm', 'g', 'gg'],
    },
    {
      id: '2',
      name: 'Moletom DropZone "Signature" Azul Marinho',
      price: 249.90,
      imageUrl: 'https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?auto=format&fit=crop&w=800&q=80',
      isNew: true,
      categories: ['moletons', 'new', 'best-sellers'],
      colors: ['blue'],
      sizes: ['m', 'g', 'gg', 'xgg'],
    },
    {
      id: '3',
      name: 'Bucket DropZone Preto',
      price: 89.90,
      imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW',
      categories: ['acessorios', 'new'],
      colors: ['black'],
      sizes: ['m', 'g'],
    },
    {
      id: '4',
      name: 'Camiseta Sketch DropZone',
      price: 119.90,
      imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80',
      isNew: true,
      categories: ['camisetas', 'new'],
      colors: ['white'],
      sizes: ['p', 'm', 'g'],
    },
    {
      id: '5',
      name: 'Calça DropZone Big Wear',
      price: 229.90,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      isLowStock: true,
      categories: ['calcas', 'best-sellers'],
      colors: ['black'],
      sizes: ['m', 'g', 'gg'],
    },
    {
      id: '6',
      name: 'Camiseta Manga Longa DropZone',
      price: 149.90,
      imageUrl: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&w=800&q=80',
      badge: 'BEST SELLER',
      categories: ['camisetas', 'best-sellers'],
      colors: ['beige', 'blue'],
      sizes: ['p', 'm', 'g', 'gg'],
    },
    {
      id: '7',
      name: 'Moletom DropZone Basic',
      price: 199.90,
      imageUrl: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80',
      categories: ['moletons'],
      colors: ['gray'],
      sizes: ['m', 'g', 'gg'],
    },
    {
      id: '8',
      name: 'Boné DropZone',
      price: 79.90,
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      badge: 'BEST SELLER',
      categories: ['acessorios', 'best-sellers'],
      colors: ['blue'],
      sizes: ['unique'],
    },
  ];

  // Filter products based on category and active filters
  const filteredProducts = allProducts.filter(product => {
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

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
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
        
        {/* Product Catalog */}
        <div className="py-8 md:py-12">
          <div className="container-custom">
            <div className="md:grid md:grid-cols-4 lg:grid-cols-5 gap-6">
              {/* Sidebar Filters */}
              <div className="md:col-span-1">
                <ProductFilters 
                  filters={filters}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
              
              {/* Product Grid */}
              <div className="md:col-span-3 lg:col-span-4">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <p className="text-dropzone-gray mb-3 sm:mb-0">
                    Mostrando {filteredProducts.length} produtos
                  </p>
                  
                  <select className="border border-dropzone-gray-light p-2 bg-white">
                    <option value="latest">Mais recentes</option>
                    <option value="price-low">Menor preço</option>
                    <option value="price-high">Maior preço</option>
                    <option value="name-asc">A-Z</option>
                    <option value="name-desc">Z-A</option>
                  </select>
                </div>
                
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
