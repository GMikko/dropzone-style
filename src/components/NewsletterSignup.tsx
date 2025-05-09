
import React, { useState } from 'react';
import { Button } from './ui/button';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Add actual newsletter signup logic here
      setSubscribed(true);
      setEmail('');
      // Reset the subscribed state after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  
  return (
    <section className="bg-dropzone-gray-light py-12 md:py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading mb-4">
            JUNTE-SE AO DROPZONE COLLECTIVE
          </h2>
          <p className="text-dropzone-gray mb-6">
            Receba em primeira mão as novidades, drops exclusivos e promoções especiais
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 border border-dropzone-gray focus:outline-none focus:border-dropzone-black"
              required
            />
            <Button 
              type="submit" 
              className="btn-primary md:w-auto"
              disabled={subscribed}
            >
              {subscribed ? 'INSCRITO!' : 'INSCREVER-SE'}
            </Button>
          </form>
          
          <p className="text-xs text-dropzone-gray mt-4">
            Ao se inscrever, você concorda em receber emails de marketing da DropZone. 
            Você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
