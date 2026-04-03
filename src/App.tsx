import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Flame,
  ShoppingBag,
  Zap,
  Package,
  Utensils,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Category = 'Alles' | 'Kipgerechten' | 'Kapsalons' | 'Burgers & Wraps' | 'Pizza\'s' | 'Salades' | 'Dranken';

interface Product {
  id: number;
  name: string;
  category: Category;
  price: string;
  description: string;
  image: string;
  badge?: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mixor Chickenbox",
    category: "Kipgerechten",
    price: "9,50",
    description: "Onze beroemde box met malse kipstukjes, friet en saus.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop",
    badge: "Populair"
  },
  {
    id: 2,
    name: "Hotwings (6 stuks)",
    category: "Kipgerechten",
    price: "6,95",
    description: "Pittige, krokante vleugels voor de echte liefhebber.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop",
    badge: "Scherpst"
  },
  {
    id: 3,
    name: "Kapsalon Mixor",
    category: "Kapsalons",
    price: "8,75",
    description: "Grote kapsalon met malse kip, kaas, salade en knoflooksaus.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop",
    badge: "Favoriet"
  },
  {
    id: 4,
    name: "Chicken Burger Deluxe",
    category: "Burgers & Wraps",
    price: "7,50",
    description: "Krokante kipburger op een brioche broodje met speciale saus.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=800&auto=format&fit=crop",
    badge: "Nieuw"
  },
  {
    id: 5,
    name: "Wrap Grilled Chicken",
    category: "Burgers & Wraps",
    price: "7,25",
    description: "Gezonde wrap met gegrilde kip en verse groenten.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Margherita Pizza",
    category: "Pizza's",
    price: "8,00",
    description: "Klassieke pizza met tomatensaus en mozzarella.",
    image: "https://images.unsplash.com/photo-1759283391598-83b0ceb0faef?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 7,
    name: "Caesar Salade",
    category: "Salades",
    price: "6,50",
    description: "Frisse salade met gegrilde kip, croutons en dressing.",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Cola 330ml",
    category: "Dranken",
    price: "2,00",
    description: "Verfrissende Coca-Cola Classic.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop"
  }
];

const REVIEWS = [
  {
    name: "Ahmed K.",
    date: "2 weken geleden",
    rating: 5,
    text: "De Chickenbox is absoluut de beste in Venlo! Grote porties, super lekker en snel bezorgd.",
    platform: "Google",
    initials: "AK"
  },
  {
    name: "Lisa M.",
    date: "1 maand geleden",
    rating: 5,
    text: "Kapsalon was heerlijk, ruim en voor een goede prijs. Kom hier zeker vaker terug!",
    platform: "Thuisbezorgd",
    initials: "LM"
  },
  {
    name: "Daan R.",
    date: "3 dagen geleden",
    rating: 5,
    text: "Hotwings zijn fenomenaal! Net zo lekker als de grote ketens maar dan lokaal en verser.",
    platform: "Google",
    initials: "DR"
  }
];

// --- Components ---

const Logo = () => (
  <div className="flex items-center group cursor-pointer">
    <img 
      src="https://www.mixorchicken.nl/foodticket/images/8372/logo-mixor.png" 
      alt="Mixor Chicken Logo" 
      className="h-12 md:h-14 w-auto object-contain rounded-full transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-primary/10"
      referrerPolicy="no-referrer"
    />
  </div>
);

const SectionReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: any }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'active' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('Alles');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = activeCategory === 'Alles' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-accent/95 backdrop-blur-md py-3 shadow-xl' : 'bg-accent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#home"><Logo /></a>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Menu', 'Specials', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-white hover:text-primary font-bebas text-lg tracking-widest transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="bg-primary text-white px-6 py-2 rounded-full font-bebas text-lg tracking-widest hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20">
              Bestel Nu
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-accent z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={40} />
            </button>
            {['Home', 'Menu', 'Specials', 'Reviews', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-4xl font-bebas tracking-widest hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="bg-primary text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-widest mt-4">
              Bestel Nu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-accent overflow-hidden">
        <div className="absolute inset-0 bg-radial-red opacity-50"></div>
        <div className="absolute inset-0 diagonal-stripes opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl leading-none mb-6"
              >
                <span className="text-white block">MIXOR CHICKEN –</span>
                <span className="text-primary block text-glow-red">DE BESTE KIP IN VENLO</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-xl md:text-2xl mb-10 max-w-xl"
              >
                Snel, smaakvol en altijd vers – bestel online of haal af.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <button className="bg-primary text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-widest hover:bg-white hover:text-primary transition-all duration-300 shadow-2xl shadow-primary/30">
                  Bestel Nu
                </button>
                <a href="#menu" className="border-2 border-white text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-widest hover:bg-white hover:text-accent transition-all duration-300">
                  Bekijk Menu
                </a>
              </motion.div>

              <div className="mt-16 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 max-w-lg mx-auto md:mx-0">
                <div>
                  <div className="text-primary font-bebas text-3xl">500+</div>
                  <div className="text-white/60 text-sm uppercase tracking-widest">Reviews</div>
                </div>
                <div>
                  <div className="text-primary font-bebas text-3xl">4.8★</div>
                  <div className="text-white/60 text-sm uppercase tracking-widest">Rating</div>
                </div>
                <div>
                  <div className="text-primary font-bebas text-3xl">10+ Jaar</div>
                  <div className="text-white/60 text-sm uppercase tracking-widest">Ervaring</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] mx-auto">
                {/* Rotating Dotted Ring */}
                <div className="absolute inset-0 border-4 border-dashed border-primary/40 rounded-full animate-rotate-dotted"></div>
                
                {/* Main Food Image */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-8 rounded-full overflow-hidden border-8 border-accent shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop" 
                    alt="Mixor Chicken" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <span className="text-2xl">🔥</span>
                  <span className="font-bebas text-lg tracking-widest">Hotwings</span>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/2 -left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <span className="text-2xl">🍗</span>
                  <span className="font-bebas text-lg tracking-widest">Chickenbox</span>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 right-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                >
                  <span className="text-2xl">🌯</span>
                  <span className="font-bebas text-lg tracking-widest">Kapsalon</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Ribbon */}
      <div className="bg-primary py-4 overflow-hidden border-y-2 border-white/20">
        <div className="animate-infinite-scroll whitespace-nowrap flex items-center gap-12">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white font-bebas text-2xl tracking-widest">VERS BEREID</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-bebas text-2xl tracking-widest">SNELLE BEZORGING</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-bebas text-2xl tracking-widest">GROTE PORTIES</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-bebas text-2xl tracking-widest">AFHALEN & BEZORGEN</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-bebas text-2xl tracking-widest">TOP BEOORDEELD</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-bebas text-2xl tracking-widest">VENLO'S BESTE KIP</span>
              <span className="text-white/40">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-bg-light">
        <div className="container mx-auto px-4">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-primary text-2xl mb-2">ONZE SMAAKMAKERS</h2>
            <h3 className="text-5xl md:text-7xl mb-8">ONTDEK ONS MENU</h3>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {['Alles', 'Kipgerechten', 'Kapsalons', 'Burgers & Wraps', 'Pizza\'s', 'Salades', 'Dranken'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-6 py-2 rounded-full font-bebas text-lg tracking-widest transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-white text-accent hover:bg-primary/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full font-bebas text-sm tracking-widest">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 relative">
                    <h4 className="font-barlow font-black text-xl mb-2 uppercase">{product.name}</h4>
                    <p className="text-accent/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bebas text-3xl">€{product.price}</span>
                      <button className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-110">
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section id="specials" className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-radial-red opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-primary text-2xl mb-2">WEEKELIJKSE DEALS</h2>
            <h3 className="text-white text-5xl md:text-7xl">MIXOR SPECIALS</h3>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Big Card */}
            <SectionReveal className="md:col-span-2 h-full">
              <div className="relative h-full rounded-3xl overflow-hidden group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop" 
                  alt="Mixor Chickenbox" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="bg-primary text-white px-4 py-1 rounded-full font-bebas text-sm tracking-widest mb-4 inline-block">BESTSELLER</span>
                  <h4 className="text-white text-4xl md:text-6xl mb-2">MIXOR CHICKENBOX</h4>
                  <p className="text-primary font-bebas text-3xl">€9,50</p>
                </div>
              </div>
            </SectionReveal>

            {/* Two Smaller Cards */}
            <div className="flex flex-col gap-6 h-full">
              <SectionReveal className="flex-1">
                <div className="relative h-full rounded-3xl overflow-hidden group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop" 
                    alt="Hotwings" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-primary text-white px-3 py-1 rounded-full font-bebas text-xs tracking-widest mb-2 inline-block">HOT</span>
                    <h4 className="text-white text-3xl mb-1">HOTWINGS</h4>
                    <p className="text-primary font-bebas text-2xl">€6,95</p>
                  </div>
                </div>
              </SectionReveal>
              <SectionReveal className="flex-1">
                <div className="relative h-full rounded-3xl overflow-hidden group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop" 
                    alt="Kapsalon" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-primary text-white px-3 py-1 rounded-full font-bebas text-xs tracking-widest mb-2 inline-block">POPULAIR</span>
                    <h4 className="text-white text-3xl mb-1">KAPSALON MIXOR</h4>
                    <p className="text-primary font-bebas text-2xl">€8,75</p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mixor Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <SectionReveal className="flex-1 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop" 
                  alt="Fresh Ingredients" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary w-40 h-40 rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-8 border-white">
                <span className="font-bebas text-4xl leading-none">10+</span>
                <span className="font-bebas text-xl tracking-widest">JAAR</span>
                <span className="font-bebas text-sm tracking-widest">ERVARING</span>
              </div>
            </SectionReveal>

            <div className="flex-1">
              <SectionReveal>
                <h2 className="text-primary text-2xl mb-2">WAAROM KIEZEN VOOR ONS?</h2>
                <h3 className="text-5xl md:text-7xl mb-10">DE KWALITEIT DIE JE PROEFT</h3>
                
                <div className="space-y-8">
                  {[
                    { icon: <Utensils />, title: "Altijd Vers Bereid", desc: "Dagelijks verse ingrediënten en de beste kwaliteit kip." },
                    { icon: <Zap />, title: "Snelle Service", desc: "Binnen 30 minuten bezorgd of direct afhalen in Venlo." },
                    { icon: <Package />, title: "Afhalen & Bezorgen", desc: "Jouw keuze, onze zorg. Altijd warm aan de deur." },
                    { icon: <ShoppingBag />, title: "Grote Porties", desc: "Altijd waar voor je geld. Niemand gaat met honger naar huis." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group p-4 rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                      <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-barlow font-black text-xl mb-1 uppercase">{item.title}</h4>
                        <p className="text-accent/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-bg-light">
        <div className="container mx-auto px-4">
          <SectionReveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-primary font-bebas text-6xl">4.8</span>
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
              </div>
            </div>
            <h3 className="text-4xl md:text-6xl mb-4">WAT ONZE KLANTEN ZEGGEN</h3>
            <p className="text-accent/60 uppercase tracking-widest font-bold">Gebaseerd op 500+ reviews (Google & Thuisbezorgd)</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <SectionReveal key={i} className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-transparent hover:border-primary transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-accent/40 text-xs">{review.date}</div>
                  </div>
                  <div className="ml-auto bg-bg-light px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter text-accent/60">
                    {review.platform}
                  </div>
                </div>
                <div className="flex text-gold mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                </div>
                <p className="text-accent/80 italic">"{review.text}"</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-accent relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <SectionReveal className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center hover:bg-primary/10 transition-colors">
              <MapPin className="text-primary mx-auto mb-4" size={32} />
              <h4 className="text-white text-2xl mb-2">ADRES</h4>
              <p className="text-white/60">Vleesstraat 85, 5911 JD Venlo</p>
            </SectionReveal>
            <SectionReveal className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center hover:bg-primary/10 transition-colors">
              <Phone className="text-primary mx-auto mb-4" size={32} />
              <h4 className="text-white text-2xl mb-2">TELEFOON</h4>
              <p className="text-white/60">+31 77 390 5151</p>
            </SectionReveal>
            <SectionReveal className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center hover:bg-primary/10 transition-colors">
              <Clock className="text-primary mx-auto mb-4" size={32} />
              <h4 className="text-white text-2xl mb-2">OPENINGSTIJDEN</h4>
              <p className="text-white/60 text-sm">Ma–Do 12:00–22:00<br/>Vr–Za 12:00–23:00<br/>Zo 13:00–22:00</p>
            </SectionReveal>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <SectionReveal>
                <h3 className="text-white text-5xl md:text-7xl mb-8">KOM LANGS OF BEL ONS</h3>
                <p className="text-white/60 text-lg mb-10">
                  Heb je een vraag of wil je een grote bestelling plaatsen? Neem gerust contact met ons op of kom gezellig langs in ons restaurant in het hartje van Venlo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-primary text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-widest hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-3">
                    <Phone size={24} /> Bel Ons Nu
                  </button>
                  <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bebas text-2xl tracking-widest hover:bg-white hover:text-accent transition-all duration-300 flex items-center justify-center gap-3">
                    <MapPin size={24} /> Route Plannen
                  </button>
                </div>
              </SectionReveal>
            </div>
            <div className="flex-1">
              <SectionReveal className="h-full min-h-[400px] bg-white/10 rounded-3xl overflow-hidden relative border border-white/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                  <MapPin size={80} className="mb-4" />
                  <span className="font-bebas text-2xl tracking-widest uppercase">Kaart Placeholder</span>
                </div>
                {/* Mock Map Overlay */}
                <div className="absolute inset-0 bg-accent/40 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping"></div>
                    <div className="relative bg-primary p-3 rounded-full shadow-2xl">
                      <Flame className="text-white" size={32} />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent pt-20 pb-10 border-t border-primary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Logo />
              <p className="text-white/40 mt-6 max-w-sm leading-relaxed">
                De beste kip van Venlo. Al meer dan 10 jaar serveren wij de meest malse kipgerechten, kapsalons en burgers met passie en vakmanschap.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white text-2xl mb-6">NAVIGATIE</h4>
              <ul className="space-y-4">
                {['Home', 'Menu', 'Specials', 'Reviews', 'Contact'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-2xl mb-6">BESTELLEN</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Thuisbezorgd.nl</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Uber Eats</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Direct Afhalen</a></li>
                <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Catering Aanvraag</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-white/20 text-sm">
              © 2025 Mixor Chicken Venlo · Alle rechten voorbehouden · Design by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
