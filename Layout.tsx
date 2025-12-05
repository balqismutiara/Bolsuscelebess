import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ViewState } from '../types';
import { CONTACT_INFO } from '../constants';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', view: ViewState.HOME },
    { label: 'Katalog', view: ViewState.CATALOG },
    { label: 'Profil', view: ViewState.PROFILE },
    { label: 'Testimoni', view: ViewState.TESTIMONIALS },
    { label: 'Hubungi Kami', view: ViewState.CONTACT },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-bolsus-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick(ViewState.HOME)}>
            <img 
              src="https://lh3.googleusercontent.com/d/1KNOBU9wL_26Jnkfs8x0MLJmZL0lJwZz7" 
              alt="Bolsus Celebes" 
              className="h-12 md:h-16 w-auto object-contain hover:opacity-90 transition-opacity duration-300"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`text-sm font-medium transition-colors duration-300 tracking-wide ${
                  currentView === item.view 
                    ? 'text-bolsus-yellow border-b-2 border-bolsus-yellow' 
                    : 'text-gray-300 hover:text-bolsus-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Cart Icon */}
            <button 
              onClick={() => handleNavClick(ViewState.CART)}
              className="relative p-2 text-bolsus-orange hover:text-bolsus-yellow transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-bolsus-dark transform translate-x-1/4 -translate-y-1/4 bg-bolsus-yellow rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button 
              onClick={() => handleNavClick(ViewState.CART)}
              className="relative p-2 mr-4 text-bolsus-orange"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-bolsus-dark transform translate-x-1/4 -translate-y-1/4 bg-bolsus-yellow rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bolsus-darker border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                   currentView === item.view 
                    ? 'text-bolsus-yellow bg-white/5' 
                    : 'text-gray-300 hover:text-bolsus-orange hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

interface FooterProps {
  setView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-bolsus-darker text-gray-300 border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setView(ViewState.HOME)}>
              <img 
                src="https://lh3.googleusercontent.com/d/1KNOBU9wL_26Jnkfs8x0MLJmZL0lJwZz7" 
                alt="Bolsus Celebes" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Bolu susu autentik Sulawesi untuk setiap momen. Dibuat dengan cinta dan bahan berkualitas tinggi.
            </p>
            <a 
              href={CONTACT_INFO.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-bolsus-yellow hover:text-white transition-colors gap-2"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-semibold">@bolsuscelebes</span>
            </a>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-white font-semibold mb-4 border-b border-bolsus-orange inline-block pb-1">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setView(ViewState.HOME)} className="hover:text-bolsus-orange transition-colors">Beranda</button></li>
              <li><button onClick={() => setView(ViewState.CATALOG)} className="hover:text-bolsus-orange transition-colors">Katalog</button></li>
              <li><button onClick={() => setView(ViewState.PROFILE)} className="hover:text-bolsus-orange transition-colors">Profil</button></li>
              <li><button onClick={() => setView(ViewState.CONTACT)} className="hover:text-bolsus-orange transition-colors">Hubungi Kami</button></li>
            </ul>
          </div>

          {/* Kontak Ringkas */}
          <div>
            <h4 className="text-white font-semibold mb-4 border-b border-bolsus-orange inline-block pb-1">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bolsus-orange flex-shrink-0" />
                <span>{CONTACT_INFO.address.split(',')[0]}, Gowa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-bolsus-orange flex-shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-bolsus-orange flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-bolsus-orange flex-shrink-0" />
                <span>{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bolsus Celebes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};