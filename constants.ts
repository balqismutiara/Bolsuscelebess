import { Product, Testimonial, ContactInfo } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bolu Cokelat Black Forest',
    shortDescription: 'Perpaduan cokelat hitam premium dengan sensasi black forest yang mewah.',
    description: 'Varian spesial Bolu Susu dengan basis cokelat hitam yang kaya (dark chocolate), dipadukan dengan krim lembut dan sentuhan aroma cherry khas Black Forest (Blak Hutan). Pilihan tepat untuk momen istimewa.',
    price: 55000,
    category: 'Special',
    // Menggunakan link Google Drive dengan format lh3 agar bisa diakses publik tanpa error
    image: 'https://lh3.googleusercontent.com/d/16JR_sPh3iy2ytNGjgHSJH_3xHZ8BsTwM=w1000', 
  },
  {
    id: '2',
    name: 'Bolu Cokelat Pandan',
    shortDescription: 'Harmoni wangi pandan alami dan lapisan cokelat yang legit.',
    description: 'Kombinasi dua rasa favorit nusantara. Wangi pandan asli yang menenangkan bertemu dengan manisnya cokelat susu. Tekstur lembut dengan dua lapisan warna yang cantik.',
    price: 50000,
    category: 'Special',
    // Link Google Drive untuk Bolu Cokelat Pandan
    image: 'https://lh3.googleusercontent.com/d/1GTUv6iyn4yRBV9yicpWCVH0DJGTibtXo=w1000',
  },
  {
    id: '3',
    name: 'Bolu Susu Double Keju',
    shortDescription: 'Bolu susu lembut dengan double keju melimpah, rasanya creamy, gurih, dan manisnya pas. Camilan enak yang selalu bikin nagih.',
    description: 'Bolu Susu Double Keju dari Bolsus Celebes menghadirkan tekstur bolu yang lembut, moist, dan wangi susu segar. Dipadukan dengan dua lapisan keju topping keju parut yang tebal serta keju di dalam adonan setiap potongan memberikan rasa creamy dan gurih yang seimbang. Tidak terlalu manis, cocok untuk dinikmati sendiri, disajikan untuk keluarga, ataupun dijadikan hantaran. Enak, lembut, dan kejunya puas.',
    price: 45000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1LkKwulAYo9qfaACKkgwYssLnuiJgYKbU=w1000', 
  },
  {
    id: '4',
    name: 'Bolu Susu Double Keju',
    shortDescription: 'Bolu susu lembut dengan keju berlimpah ganda, rasanya creamy, gurih, dan manisnya pas. Camilan enak yang selalu bikin nagih.',
    description: 'Bolu Susu Double Keju dari Bolsus Celebes menghadirkan tekstur bolu yang lembut, lembab, dan susu segar yang wangi. Dipadukan dengan dua lapisan keju topping keju parut yang tebal serta keju di dalam adonan setiap potongan memberikan rasa creamy dan gurih yang seimbang. Tidak terlalu manis, cocok untuk dinikmati sendiri, disajikan untuk keluarga, ataupun dijadikan hantaran. Enak, lembut, dan kejunya puas.',
    price: 45000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1LkKwulAYo9qfaACKkgwYssLnuiJgYKbU=w1000', 
  },
  {
    id: '5',
    name: 'Bakpia Coklat',
    shortDescription: 'Bakpia kulit lembut berisi coklat yang manisnya pas. Harum, lembut, dan nikmat di setiap gigitan.',
    description: 'Bakpia Coklat dari Bolsus Celebes dibuat dengan kulit tipis yang lembut dan isian coklat yang halus serta manisnya seimbang. Teksturnya empuk, aromanya harum, dan rasa coklatnya terasa rich tanpa berlebihan. Cocok sebagai camilan harian, oleh-oleh, atau teman minum teh dan kopi. Setiap potong menghadirkan kelezatan sederhana yang selalu bikin ingin lagi.',
    price: 35000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1YYBc5dukdrL83uG1m2MHfOvBv9kC9RI2=w1000',
  },
  {
    id: '6',
    name: 'Bakpia Keju',
    shortDescription: 'Bakpia lembut dengan isian keju gurih. Rasanya ringan, wangi, dan bikin nagih.',
    description: 'Bakpia Keju dari Bolsus Celebes menghadirkan perpaduan kulit bakpia yang lembut dengan isian keju yang gurih dan manisnya seimbang. Teksturnya empuk, aromanya wangi, dan rasa kejunya terasa lembut namun tetap kaya. Cocok untuk camilan santai, oleh-oleh, ataupun teman ngopi. Setiap gigitannya memberikan sensasi keju yang halus dan memuaskan.',
    price: 30000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1KIz3HSqGJlLvY1mNns81I9tXswphLRPW=w1000',
  },
  {
    id: '7',
    name: 'Bakpia Pandan',
    shortDescription: 'Bakpia lembut dengan isian pandan manis-aromatik. Wangi, lembut, dan nyaman di lidah.',
    description: 'Bakpia Pandan dari Bolsus Celebes memiliki kulit lembut dengan isian pandan yang manisnya pas dan aromanya khas. Teksturnya empuk, aroma pandannya wangi dan segar, memberikan rasa yang ringan namun tetap nikmat di setiap gigitan. Cocok untuk camilan harian, oleh-oleh, atau teman minum teh. Kelezatannya sederhana namun selalu bikin rindu.',
    price: 30000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1J4T7KDE1rU2UF8Pp01OUPh6VBIZJA7Sd=w1000',
  },
  {
    id: '8',
    name: 'Bakpia Red Velvet',
    shortDescription: 'Bakpia lembut dengan isian red velvet manis-aromatik dan sentuhan creamy. Unik, wangi, dan memanjakan lidah.',
    description: 'Bakpia Red Velvet dari Bolsus Celebes menawarkan kombinasi kulit bakpia yang lembut dengan isian red velvet yang manis, aromatik, dan sedikit creamy. Warnanya cantik, rasanya modern, dan tetap ringan sehingga nyaman dinikmati kapan saja. Cocok sebagai camilan kekinian, oleh-oleh spesial, atau pelengkap minum kopi. Setiap gigitan menghadirkan rasa red velvet yang lembut dan memikat.',
    price: 30000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1hvGlI4PIT6LIhs83FeY3pEwmlHd4KkTr=w1000',
  },
  {
    id: '9',
    name: 'Bakpia Taro',
    shortDescription: 'Bakpia lembut dengan isian taro manis-gurih yang creamy. Wangi, lembut, dan penuh rasa.',
    description: 'Bakpia Taro dari Bolsus Celebes menghadirkan perpaduan kulit bakpia yang lembut dengan isian taro bertekstur creamy, manisnya seimbang, dan aromanya khas. Rasa talasnya halus namun tetap rich, memberikan sensasi camilan yang modern dan memuaskan. Cocok untuk oleh-oleh, teman minum teh, atau camilan santai kapan saja.',
    price: 30000,
    category: 'Khusus',
    image: 'https://lh3.googleusercontent.com/d/1gmi8tF6Ftq1MB8KDEUoWtdsJrzLKmPI-=w1000',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rini', text: 'Tekstur lembut, rasa susu seimbang—benar-benar nagih.' },
  { id: '2', name: 'Andi', text: 'Varian keju kaya rasa, cocok untuk semua umur.' },
  { id: '3', name: 'Fajar', text: 'Pelayanan cepat, kualitas konsisten. Recommended.' },
];

export const CONTACT_INFO: ContactInfo = {
  address: 'Jl. Tamangapa Raya No.5, Kassi-Kassi, Kec. Manggala, Kabupaten Gowa, Sulawesi Selatan',
  phone: '+62 831-3161-7855',
  email: 'info@bolsuscelebes.com',
  hours: '07:00 – 21:00 WITA (Setiap Hari)',
  instagram: '@bolsuscelebes',
  instagramUrl: 'https://www.instagram.com/bolsuscelebes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
};