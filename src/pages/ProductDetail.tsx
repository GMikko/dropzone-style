
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Minus, 
  Plus, 
  Package, 
  ShoppingCart 
} from 'lucide-react';
import { toast } from "sonner";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCart } from '@/hooks/useCart';
import { allProducts } from '@/data/productData';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Find product by id
  const product = allProducts.find(product => product.id === id);
  
  // State for product options
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  
  // If product is not found, redirect to 404
  useEffect(() => {
    if (!product) {
      navigate('/404');
    } else if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, navigate, selectedSize]);
  
  if (!product) {
    return null;
  }

  // Get related products (same category, exclude current)
  const relatedProducts = allProducts
    .filter(item => 
      item.id !== product.id && 
      item.categories.some(cat => product.categories.includes(cat))
    )
    .slice(0, 4);
  
  // Generate image array (for demo, use same image with different indices)
  const productImages = Array(3).fill(product.imageUrl)
    .map((url, idx) => url + `?v=${idx}`);
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast.error("Por favor, selecione um tamanho", {
        description: "É necessário escolher um tamanho antes de adicionar ao carrinho."
      });
      return;
    }
    
    addToCart(
      { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        imageUrl: product.imageUrl 
      },
      quantity,
      selectedSize
    );
    
    toast.success("Adicionado ao carrinho!", {
      description: `${quantity}x ${product.name} foi adicionado ao seu carrinho.`
    });
  };

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container-custom">
          {/* Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* Product Images */}
            <div className="product-images">
              {/* Main Image */}
              <div className="main-image mb-4 overflow-hidden">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2">
                {productImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`thumbnail border p-1 ${selectedImage === idx ? 'border-dropzone-black' : 'border-dropzone-gray-light hover:border-dropzone-gray'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-16 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info & Actions */}
            <div className="product-info">
              {/* Status Indicators */}
              <div className="mb-4">
                {product.isNew && (
                  <span className="inline-block bg-dropzone-accent text-white text-xs px-3 py-1 mr-2">
                    NOVA CHEGADA
                  </span>
                )}
                {product.badge && (
                  <span className="inline-block bg-dropzone-black text-white text-xs px-3 py-1">
                    {product.badge}
                  </span>
                )}
                {product.isLowStock && (
                  <span className="inline-block bg-destructive text-white text-xs px-3 py-1 ml-2">
                    ÚLTIMAS PEÇAS
                  </span>
                )}
              </div>

              {/* Product Title & Price */}
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">R$ {product.price.toFixed(2)}</p>
              
              {/* Product Description */}
              <div className="mb-8">
                <p className="text-dropzone-gray-dark">
                  O {product.name} é uma peça essencial que combina estilo com conforto. 
                  Feito com materiais de alta qualidade e atenção aos detalhes, 
                  este item é perfeito para o dia a dia ou ocasiões especiais.
                  Design exclusivo da DropZone com acabamento premium.
                </p>
              </div>
              
              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Tamanho
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-btn px-4 py-2 min-w-12 border text-center transition-colors
                          ${selectedSize === size 
                            ? 'bg-dropzone-black text-white border-dropzone-black' 
                            : 'bg-white text-dropzone-black border-dropzone-gray hover:border-dropzone-black'
                          }`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Color Selector */}
              {product.colors && product.colors.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Cor
                  </label>
                  <Select>
                    <SelectTrigger className="w-full max-w-xs bg-white">
                      <SelectValue placeholder="Selecione a cor" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map(color => (
                        <SelectItem key={color} value={color}>
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Quantidade
                </label>
                <div className="flex">
                  <button 
                    onClick={decreaseQuantity} 
                    className="border border-r-0 border-dropzone-gray-light p-2 hover:bg-dropzone-gray-light"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="border border-dropzone-gray-light w-16 text-center focus:outline-none focus:ring-1 focus:ring-dropzone-black"
                  />
                  <button 
                    onClick={increaseQuantity} 
                    className="border border-l-0 border-dropzone-gray-light p-2 hover:bg-dropzone-gray-light"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-dropzone-black text-white hover:bg-dropzone-gray-dark flex items-center justify-center gap-2 mb-6"
              >
                <ShoppingCart size={20} />
                Adicionar ao carrinho
              </Button>
              
              {/* Shipping Info */}
              <div className="border-t border-dropzone-gray-light pt-4">
                <div className="flex items-start gap-3 text-dropzone-gray">
                  <Package className="mt-1" size={20} />
                  <p className="text-sm">
                    <span className="block font-medium text-dropzone-black">Envio estimado:</span>
                    Receba em 3-5 dias úteis. Frete grátis em compras acima de R$ 299,90.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* You May Also Like Section */}
          {relatedProducts.length > 0 && (
            <div className="you-may-also-like">
              <h2 className="text-2xl font-medium mb-6">Você pode gostar também</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map(product => (
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
