
import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useCart } from '@/hooks/useCart';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartTotal 
  } = useCart();

  return (
    <>
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-heading mb-8">Seu Carrinho</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-dropzone-gray text-lg mb-6">Seu carrinho está vazio</p>
              <Link to="/category/new">
                <Button>Continuar Comprando</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Produto</TableHead>
                      <TableHead className="text-center">Nome</TableHead>
                      <TableHead className="text-center">Preço</TableHead>
                      <TableHead className="text-center">Quantidade</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-[70px] text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="w-20 h-20 bg-dropzone-gray-light">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">R$ {item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col md:flex-row justify-between mt-8 gap-4">
                <div className="flex gap-4">
                  <Button variant="outline" onClick={clearCart}>
                    Limpar Carrinho
                  </Button>
                  <Link to="/category/new">
                    <Button variant="outline">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>

                <div className="bg-dropzone-gray-light p-6 rounded-md md:min-w-[300px]">
                  <h3 className="text-lg font-semibold mb-4">Resumo da Compra</h3>
                  <div className="flex justify-between py-2 border-b">
                    <span>Subtotal</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Frete</span>
                    <span>Calculado no checkout</span>
                  </div>
                  <div className="flex justify-between py-4 font-semibold">
                    <span>Total</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full">
                      Finalizar Compra
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
