import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import { Hero, AboutSection, TestimonialsSection, ContactSection } from './components/InfoSections';
import { ProductCatalog, ProductDetail } from './components/ProductSection';
import { Cart, Checkout } from './components/CartSection';
import { ViewState, Product, CartItem } from './types';
import { ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToCart = (product: Product, quantity: number, variantSize: string) => {
    const newItem: CartItem = { ...product, quantity, variantSize };
    setCartItems(prev => [...prev, newItem]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(ViewState.PRODUCT_DETAIL);
  };

  const clearCart = () => setCartItems([]);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero setView={setCurrentView} />
            <div className="bg-bolsus-dark pb-16">
              <h3 className="text-center text-bolsus-orange font-archivo text-3xl md:text-4xl pt-16 mb-8 tracking-wide">Produk Unggulan</h3>
              {/* Used isPreview to adjust padding and remove title/min-height */}
              <ProductCatalog onProductClick={handleProductClick} addToCart={addToCart} isPreview={true} />
              
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setCurrentView(ViewState.CATALOG)}
                  className="px-8 py-3 border border-bolsus-orange text-bolsus-orange rounded-full hover:bg-bolsus-orange hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Lihat Semua Katalog <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          </>
        );
      case ViewState.CATALOG:
        return <ProductCatalog onProductClick={handleProductClick} addToCart={addToCart} />;
      case ViewState.PRODUCT_DETAIL:
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setCurrentView(ViewState.CATALOG)} 
            addToCart={addToCart} 
          />
        ) : <ProductCatalog onProductClick={handleProductClick} addToCart={addToCart} />;
      case ViewState.PROFILE:
        return <AboutSection />;
      case ViewState.TESTIMONIALS:
        return <TestimonialsSection />;
      case ViewState.CONTACT:
        return <ContactSection />;
      case ViewState.CART:
        return <Cart items={cartItems} setItems={setCartItems} setView={setCurrentView} />;
      case ViewState.CHECKOUT:
        return <Checkout items={cartItems} clearCart={clearCart} setView={setCurrentView} />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bolsus-dark font-sans text-white">
      <Navbar currentView={currentView} setView={setCurrentView} cartCount={cartItems.length} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;