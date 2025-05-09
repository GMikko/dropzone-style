
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = [
    { name: 'NEW', path: '/category/new' },
    { name: 'CAMISETAS', path: '/category/camisetas' },
    { name: 'MOLETONS', path: '/category/moletons' },
    { name: 'ACESSÓRIOS', path: '/category/acessorios' },
    { name: 'CALÇAS', path: '/category/calcas' },
  ];

  return (
    <header className="bg-white border-b border-dropzone-gray-light sticky top-0 z-50">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-heading font-bold tracking-wider"
          >
            DropZone
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="text-sm font-medium hover:text-dropzone-accent transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              className="hidden md:flex items-center" 
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link to="/account" className="hidden md:block" aria-label="My Account">
              <User size={20} />
            </Link>
            
            <Link to="/cart" className="relative" aria-label="Shopping Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dropzone-accent text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 bg-white border-t border-dropzone-gray-light animate-slideUp">
            <div className="flex items-center mb-4">
              <Search size={18} className="mr-2" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full p-2 bg-dropzone-gray-light rounded-sm"
              />
            </div>
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.path}
                  className="text-base font-medium py-1"
                  onClick={toggleMenu}
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                to="/account" 
                className="text-base font-medium py-1 flex items-center"
                onClick={toggleMenu}
              >
                <User size={18} className="mr-2" />
                Minha Conta
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
