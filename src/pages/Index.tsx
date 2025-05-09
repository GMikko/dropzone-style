
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryBanner from '@/components/CategoryBanner';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  // Sample product data
  const newArrivalsProducts = [
    {
      id: '1',
      name: 'Camiseta Chaos DropZone',
      price: 119.90,
      imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      isNew: true,
    },
    {
      id: '2',
      name: 'Moletom DropZone "Signature" Azul Marinho',
      price: 249.90,
      imageUrl: 'https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?auto=format&fit=crop&w=800&q=80',
      isNew: true,
    },
    {
      id: '3',
      name: 'Bucket DropZone Preto',
      price: 89.90,
      imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW',
    },
    {
      id: '4',
      name: 'Camiseta Sketch DropZone',
      price: 119.90,
      imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80',
      isNew: true,
    },
  ];

  const bestSellersProducts = [
    {
      id: '5',
      name: 'Calça DropZone Big Wear',
      price: 229.90,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      isLowStock: true,
    },
    {
      id: '6',
      name: 'Camiseta Manga Longa DropZone',
      price: 149.90,
      imageUrl: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&w=800&q=80',
      badge: 'BEST SELLER',
    },
    {
      id: '7',
      name: 'Moletom DropZone Basic',
      price: 199.90,
      imageUrl: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '8',
      name: 'Boné DropZone',
      price: 79.90,
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      badge: 'BEST SELLER',
    },
  ];

  const categoryBanners = [
    {
      name: 'Roupas, Acessórios e muito mais!',
      description: 'A DropZone tem orgulho de ter os produtos mais estilosos e confortáveis do mercado. Conheça nossa coleção completa e encontre seu estilo.',
      imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=80',
      path: '/collections',
    },
    {
      name: 'Moda',
      description: 'Criamos e selecionamos peças que são atuais, confortáveis e estilosas. Nossa coleção é pensada para você expressar sua personalidade.',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      path: '/category/moda',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        <FeaturedProducts 
          title="Novos Items" 
          viewAllLink="/category/new"
          products={newArrivalsProducts} 
        />
        
        <CategoryBanner category={categoryBanners[0]} />
        
        <FeaturedProducts 
          title="Produtos Populares" 
          viewAllLink="/category/best-sellers"
          products={bestSellersProducts} 
        />
        
        <CategoryBanner 
          category={categoryBanners[1]} 
          reversed={true} 
        />
        
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default Index;
