import React, { useState } from 'react';
import { Product, ViewState } from '../types';
import { PRODUCTS } from '../constants';
import { ShoppingCart, ArrowLeft, Plus, Minus, ImageOff } from 'lucide-react';

interface ProductSectionProps {
  onProductClick: (product: Product) => void;
  addToCart: (product: Product, quantity: number, variant: string) => void;
  isPreview?: boolean;
}

export const ProductCatalog: React.FC<ProductSectionProps> = ({ onProductClick, addToCart, isPreview = false }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // prevent infinite loop
    e.currentTarget.src = "https://placehold.co/600x600/2B1B0E/F47C0F?text=Foto+Produk";
  };

  return (
    <div className={`${isPreview ? 'py-4' : 'py-16'} bg-bolsus-dark ${isPreview ? '' : 'min-h-screen'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isPreview && (
          <div className="text-center mb-12">
            <h2 className="font-archivo text-4xl md:text-5xl text-bolsus-yellow mb-4 tracking-wide">Katalog Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pilihan bolu susu terbaik dengan bahan premium. Dibuat segar untuk menemani momen spesial Anda.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-bolsus-darker rounded-2xl overflow-hidden border border-white/5 hover:border-bolsus-orange/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-bolsus-orange/10 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => onProductClick(product)}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow cursor-pointer" onClick={() => onProductClick(product)}>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-bolsus-yellow transition-colors">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <span className="text-xl font-bold text-bolsus-orange">
                    Rp{product.price.toLocaleString('id-ID')}
                  </span>
                  <button 
                    onClick={() => addToCart(product, 1, 'Sedang')}
                    className="p-3 bg-bolsus-orange text-white rounded-full hover:bg-bolsus-yellow hover:text-bolsus-dark transition-all duration-300 shadow-md"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  addToCart: (product: Product, quantity: number, variant: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Sedang');
  const [notification, setNotification] = useState(false);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setNotification(true);
    setTimeout(() => setNotification(false), 3000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/600x600/2B1B0E/F47C0F?text=Foto+Produk";
  };

  const variants = ['Kecil', 'Sedang', 'Besar'];

  return (
    <div className="py-12 bg-bolsus-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-bolsus-orange mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Katalog
        </button>

        <div className="bg-bolsus-darker rounded-3xl overflow-hidden shadow-2xl border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Side */}
            <div className="h-96 lg:h-auto relative bg-bolsus-dark">
              <img 
                src={product.image} 
                alt={product.name} 
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-3xl text-bolsus-orange font-bold mb-6">Rp{product.price.toLocaleString('id-ID')}</p>
              
              <div className="prose prose-invert mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                
                {/* Variant */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Pilih Ukuran</label>
                  <div className="flex gap-4">
                    {variants.map(v => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-6 py-2 rounded-lg border transition-all duration-300 ${
                          selectedVariant === v 
                            ? 'bg-bolsus-yellow text-bolsus-dark border-bolsus-yellow font-bold' 
                            : 'bg-transparent border-gray-600 text-gray-300 hover:border-bolsus-orange'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Jumlah</label>
                  <div className="flex items-center gap-4 bg-bolsus-dark w-max rounded-lg border border-gray-700 p-1">
                    <button onClick={handleDecrement} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md">
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                    <button onClick={handleIncrement} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Action */}
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-bolsus-orange text-white text-lg font-bold py-4 rounded-xl hover:bg-bolsus-yellow hover:text-bolsus-dark transition-all duration-300 shadow-lg mt-4 flex justify-center items-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Tambah ke Keranjang
                </button>

                {notification && (
                  <div className="bg-green-500/20 text-green-400 p-4 rounded-lg text-center animate-fade-in">
                    Produk masuk ke keranjang belanja Anda.
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};