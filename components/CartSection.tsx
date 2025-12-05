import React, { useState } from 'react';
import { CartItem, ViewState } from '../types';
import { CONTACT_INFO } from '../constants';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, CreditCard, Copy, Check, MessageCircle } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setView: (view: ViewState) => void;
}

export const Cart: React.FC<CartProps> = ({ items, setItems, setView }) => {
  
  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/150x150/2B1B0E/F47C0F?text=Foto";
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-bolsus-dark text-center px-4">
        <ShoppingBag className="w-24 h-24 text-gray-600 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-gray-400 mb-8">Belum ada produk di keranjang.</p>
        <button 
          onClick={() => setView(ViewState.CATALOG)}
          className="px-8 py-3 bg-bolsus-orange text-white rounded-full font-bold hover:bg-bolsus-yellow hover:text-bolsus-dark transition-colors"
        >
          Lanjutkan Belanja
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-bolsus-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Keranjang Belanja</h2>
        
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex flex-col sm:flex-row items-center gap-6 bg-bolsus-darker p-4 rounded-xl border border-white/5 shadow-sm">
              <img 
                src={item.image} 
                alt={item.name} 
                onError={handleImageError}
                className="w-24 h-24 object-cover rounded-md" 
              />
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">Varian: {item.variantSize}</p>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-1">
                <span className="text-gray-400 text-sm">{item.quantity} x Rp{item.price.toLocaleString('id-ID')}</span>
                <span className="text-bolsus-orange font-bold text-lg">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>

              <button 
                onClick={() => removeItem(index)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-bolsus-darker p-8 rounded-xl border border-white/10">
          <div className="flex justify-between items-center text-xl font-bold text-white mb-8">
            <span>Total</span>
            <span className="text-bolsus-yellow text-2xl">Rp{subtotal.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <button 
              onClick={() => setView(ViewState.CATALOG)}
              className="flex-1 px-6 py-4 border border-gray-600 text-gray-300 font-bold rounded-xl hover:border-bolsus-orange hover:text-bolsus-orange transition-colors flex justify-center items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Lanjutkan Belanja
            </button>
            <button 
              onClick={() => setView(ViewState.CHECKOUT)}
              className="flex-1 px-6 py-4 bg-bolsus-orange text-white font-bold rounded-xl hover:bg-bolsus-yellow hover:text-bolsus-dark transition-colors flex justify-center items-center gap-2 shadow-lg shadow-bolsus-orange/20"
            >
              Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Checkout: React.FC<{ items: CartItem[], clearCart: () => void, setView: (v: ViewState) => void }> = ({ items, clearCart, setView }) => {
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('1817247514');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format order items for WhatsApp
    const itemsList = items.map(item => 
      `- ${item.name} (${item.variantSize}) x ${item.quantity}: Rp${(item.price * item.quantity).toLocaleString('id-ID')}`
    ).join('\n');

    // Construct the message
    const message = `Halo Bolsus Celebes, saya ingin memesan:

*Data Pemesan*
Nama: ${formData.name}
No. HP: ${formData.phone}
Alamat: ${formData.address}

*Rincian Pesanan*
${itemsList}

*Total Pembayaran: Rp${total.toLocaleString('id-ID')}*

Saya akan melakukan pembayaran via Transfer Bank BNI ke rekening 1817247514 (a.n A. FAIHA ALYA FAJAR). Mohon diproses. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = CONTACT_INFO.phone.replace(/[^0-9]/g, '');
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

    setSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 5000); // Delay clearing cart to allow user to return if needed, though they are redirected
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bolsus-dark px-4">
        <div className="bg-bolsus-darker p-8 rounded-2xl border border-bolsus-yellow/20 text-center max-w-md w-full animate-fade-in-up">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Mengarahkan ke WhatsApp...</h2>
          <p className="text-gray-300 mb-8">
            Terima kasih! Pesanan Anda telah dibuat. Silakan kirim pesan yang muncul di WhatsApp untuk menyelesaikan pemesanan dan konfirmasi pembayaran.
          </p>
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="w-full py-3 bg-bolsus-orange text-white rounded-lg font-bold hover:bg-bolsus-yellow hover:text-bolsus-dark transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-bolsus-dark min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button onClick={() => setView(ViewState.CART)} className="flex items-center text-gray-400 hover:text-bolsus-orange mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Keranjang
        </button>

        <h2 className="text-3xl font-bold text-white mb-8">Checkout</h2>

        <div className="bg-bolsus-darker p-8 rounded-2xl border border-white/5 shadow-xl">
          <div className="mb-8 pb-8 border-b border-white/10">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Ringkasan Pesanan</h3>
            <div className="space-y-2 mb-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm text-gray-400">
                  <span>{item.name} x {item.quantity} ({item.variantSize})</span>
                  <span>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total Pembayaran</span>
              <span className="text-bolsus-yellow">Rp{total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nama Penerima</label>
              <input 
                required 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-bolsus-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolsus-orange focus:ring-1 focus:ring-bolsus-orange transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nomor Telepon / WhatsApp</label>
              <input 
                required 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-bolsus-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolsus-orange focus:ring-1 focus:ring-bolsus-orange transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Alamat Lengkap</label>
              <textarea 
                required 
                rows={3} 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-bolsus-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolsus-orange focus:ring-1 focus:ring-bolsus-orange transition-all"
              ></textarea>
            </div>

            {/* Payment Info Section */}
            <div className="bg-white/5 p-5 rounded-xl border border-bolsus-yellow/20 mt-8">
              <div className="flex items-center gap-2 mb-3 text-bolsus-yellow">
                <CreditCard className="w-5 h-5" />
                <h4 className="font-bold">Instruksi Pembayaran</h4>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Silakan transfer total pembayaran ke rekening berikut sebelum pesanan diproses:
              </p>
              
              <div className="bg-bolsus-dark p-4 rounded-lg border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-lg">Bank BNI</p>
                  <div className="flex items-center gap-3 my-1">
                    <p className="text-xl font-mono text-bolsus-orange tracking-wider font-bold">1817247514</p>
                    <button 
                      type="button" 
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                      title="Salin Nomor Rekening"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">a.n A. FAIHA ALYA FAJAR</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                *Bukti transfer dapat dikirimkan setelah Anda diarahkan ke WhatsApp.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-bolsus-orange text-white text-lg font-bold rounded-xl hover:bg-bolsus-yellow hover:text-bolsus-dark transition-all duration-300 shadow-lg mt-6 flex justify-center items-center gap-2"
            >
              <MessageCircle className="w-6 h-6" />
              Buat Pesanan via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};