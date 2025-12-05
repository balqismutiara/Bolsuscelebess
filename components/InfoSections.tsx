import React, { useState } from 'react';
import { ViewState, Product } from '../types';
import { PRODUCTS, TESTIMONIALS, CONTACT_INFO } from '../constants';
import { ArrowRight, Star, Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative h-[80vh] md:h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/d/1H9Bt4Kw4tAx__pDfnA15G27ZFyLIYFDU=w1920")' }} 
      ></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-bolsus-dark via-bolsus-dark/90 to-transparent"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-archivo text-3xl md:text-5xl lg:text-6xl text-bolsus-yellow mb-6 leading-tight shadow-sm tracking-wide">
            Bolsus Celebes — <br/>
            <span className="text-white">Bolu Susunya Sulawesi</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 font-light leading-relaxed">
            Bolu susu khas Sulawesi dengan tekstur lembut dan aroma menggoda—dibuat segar setiap hari.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setView(ViewState.CATALOG)}
              className="px-8 py-3 bg-bolsus-orange text-white font-bold rounded-full hover:bg-bolsus-yellow hover:text-bolsus-dark transition-all duration-300 shadow-lg hover:shadow-bolsus-orange/50 flex items-center justify-center gap-2 group"
            >
              Lihat Produk
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href={`https://wa.me/${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-bolsus-dark transition-all duration-300 flex items-center justify-center"
            >
              Konsultasi Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <div className="py-20 bg-bolsus-dark">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-archivo text-4xl md:text-5xl text-bolsus-orange mb-8 tracking-wide">Profil Kami</h2>
        <p className="text-xl text-gray-300 leading-relaxed mb-12">
          Kami berkomitmen pada kualitas dan konsistensi. Dengan bahan terkurasi dan standar kebersihan tinggi, 
          <span className="text-bolsus-yellow font-bold"> Bolsus Celebes</span> menghadirkan bolu susu dengan tekstur lembut serta cita rasa autentik Sulawesi.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { title: "Segar Setiap Hari", icon: <Clock className="w-8 h-8"/> },
            { title: "Kontrol Kualitas", icon: <CheckCircle className="w-8 h-8"/> },
            { title: "Cita Rasa Autentik", icon: <Star className="w-8 h-8"/> }
          ].map((item, idx) => (
            <div key={idx} className="p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-bolsus-yellow mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  return (
    <div className="py-20 bg-bolsus-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-archivo text-4xl md:text-5xl text-bolsus-yellow mb-12 text-center tracking-wide">Apa Kata Mereka?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-bolsus-dark p-8 rounded-2xl shadow-xl border border-white/5 relative">
              <div className="absolute -top-4 -left-2 text-bolsus-orange opacity-20 text-8xl font-serif">"</div>
              <p className="text-lg text-gray-300 italic mb-6 relative z-10">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bolsus-orange flex items-center justify-center font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <div className="flex text-bolsus-yellow text-xs">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    // Reset after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <div className="py-20 bg-bolsus-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-archivo text-4xl md:text-5xl text-bolsus-orange mb-12 text-center tracking-wide">Hubungi Kami</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Info */}
          <div className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Informasi Bisnis</h3>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-bolsus-yellow mt-1" />
              <div>
                <p className="font-semibold text-white">Alamat</p>
                <p className="text-gray-400">{CONTACT_INFO.address}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-bolsus-yellow" />
              <div>
                <p className="font-semibold text-white">Telepon</p>
                <p className="text-gray-400">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-bolsus-yellow" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <p className="text-gray-400">{CONTACT_INFO.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-bolsus-yellow" />
              <div>
                <p className="font-semibold text-white">Jam Operasional</p>
                <p className="text-gray-400">{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-bolsus-darker p-8 rounded-2xl border border-bolsus-orange/20 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
                <input required type="text" className="w-full bg-bolsus-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolsus-orange focus:ring-1 focus:ring-bolsus-orange transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nomor Telepon / WA</label>
                <input required type="tel" className="w-full bg-bolsus-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolsus-orange focus:ring-1 focus:ring-bolsus-orange transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Pesan</label>
                <textarea required rows={4} className="w-full bg-bolsus-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bolsus-orange focus:ring-1 focus:ring-bolsus-orange transition-all"></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-bolsus-orange hover:bg-bolsus-yellow hover:text-bolsus-dark text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {formStatus === 'success' ? 'Terima Kasih!' : (
                  <>
                    Kirim Pesan
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              {formStatus === 'success' && (
                <p className="text-green-400 text-center text-sm animate-pulse">Pesan Anda telah terkirim.</p>
              )}
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-96 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://maps.google.com/maps?q=Jl.%20Tamangapa%20Raya%20No.5,%20Kassi-Kassi,%20Kec.%20Manggala,%20Kabupaten%20Gowa,%20Sulawesi%20Selatan&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            title="Lokasi Bolsus Celebes"
          ></iframe>
        </div>
      </div>
    </div>
  );
};