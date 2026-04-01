import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Star, Menu, X, ChevronRight, CheckCircle2, Scissors, Sparkles, HeartHandshake, Calendar, Paintbrush, Wind, Heart, Award, MessageCircleHeart } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const HairdryerIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 4H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
    <path d="M5 6H3" />
    <path d="M5 8H2" />
    <path d="M5 10H3" />
    <path d="M14 12l-2 7a2 2 0 0 1-2 2H8.5a1 1 0 0 1-1-1.2l2-7.8" />
  </svg>
);

const CombIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="15" width="6" height="7" rx="1" />
    <path d="M5 10h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Z" />
    <path d="M6 10V3" />
    <path d="M10 10V3" />
    <path d="M14 10V3" />
    <path d="M18 10V3" />
  </svg>
);

const REVIEWS = [
  {
    name: "Silvana Manno",
    text: "Personale molto gentile e attento, ambiente pulito e accogliente, risultato impeccabile.",
    rating: 5
  },
  {
    name: "Giuly Vismara",
    text: "Personale gentile e qualificato, capace di consigliare e trattare anche capelli ricci con professionalità.",
    rating: 5
  },
  {
    name: "Paola Bozzelli",
    text: "Denise molto professionale, attenta e sincera nei consigli. Cliente felicissima del risultato.",
    rating: 5
  },
  {
    name: "Silvy",
    text: "Luogo accogliente e pulito, personale qualificato, cortese e pronto ad ascoltare le esigenze.",
    rating: 5
  }
];

const SERVICES = [
  { name: "Taglio", icon: Scissors },
  { name: "Colore", icon: Paintbrush },
  { name: "Piega", icon: HairdryerIcon },
  { name: "Cura dei capelli ricci", icon: CombIcon }
];

const HOURS = [
  { day: "Lunedì", hours: "Chiuso" },
  { day: "Martedì", hours: "09:30 - 18:30" },
  { day: "Mercoledì", hours: "13:00 - 20:00" },
  { day: "Giovedì", hours: "09:30 - 18:30" },
  { day: "Venerdì", hours: "09:30 - 18:30" },
  { day: "Sabato", hours: "09:30 - 18:00" },
  { day: "Domenica", hours: "Chiuso" }
];

const PHONE = "0362 133 6110";
const PHONE_LINK = "tel:+3903621336110";
const ADDRESS = "C.so della Libertà, 37, 20841 Carate Brianza MB";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Parallax for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "20%"]);

  // Parallax for About
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutScrollY } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutY = useTransform(aboutScrollY, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-warm-white font-sans text-anthracite selection:bg-nude selection:text-soft-black">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-serif font-semibold tracking-wider text-soft-black">
            N37
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('chi-siamo')} className="hover:text-soft-gold transition-colors">Chi Siamo</button>
            <button onClick={() => scrollTo('servizi')} className="hover:text-soft-gold transition-colors">Servizi</button>
            <button onClick={() => scrollTo('recensioni')} className="hover:text-soft-gold transition-colors">Recensioni</button>
            <button onClick={() => scrollTo('contatti')} className="hover:text-soft-gold transition-colors">Contatti</button>
            <a 
              href={PHONE_LINK}
              className="bg-soft-black text-white px-6 py-2.5 rounded-full hover:bg-anthracite transition-colors flex items-center gap-2"
            >
              <Phone size={16} />
              <span>Chiama Ora</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-soft-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <button onClick={() => scrollTo('chi-siamo')} className="text-left py-2 border-b border-gray-100">Chi Siamo</button>
              <button onClick={() => scrollTo('servizi')} className="text-left py-2 border-b border-gray-100">Servizi</button>
              <button onClick={() => scrollTo('recensioni')} className="text-left py-2 border-b border-gray-100">Recensioni</button>
              <button onClick={() => scrollTo('contatti')} className="text-left py-2 border-b border-gray-100">Contatti</button>
              <a 
                href={PHONE_LINK}
                className="bg-soft-black text-white px-6 py-4 rounded-xl text-center flex items-center justify-center gap-2 mt-4"
              >
                <Phone size={20} />
                <span>Chiama {PHONE}</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nude/30 text-sm font-medium mb-6">
              <MapPin size={16} className="text-soft-gold shrink-0" />
              <span>Parrucchiere a Carate Brianza</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-soft-black mb-4 md:mb-6">
              Professionalità, accoglienza e cura per i tuoi capelli
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Un ambiente accogliente, personale qualificato e recensioni eccellenti per offrirti un'esperienza di bellezza curata in ogni dettaglio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <a 
                href={PHONE_LINK}
                className="w-full sm:w-auto bg-soft-black text-white px-8 py-4 rounded-full hover:bg-anthracite transition-colors flex items-center justify-center gap-2 text-lg font-medium"
              >
                <Phone size={20} />
                <span>Chiama ora</span>
              </a>
              <button 
                onClick={() => scrollTo('chi-siamo')}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-gray-200 hover:border-soft-gold hover:bg-nude/10 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
              >
                Scopri il salone
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-soft-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <div className="text-sm font-medium">
                <span className="text-soft-black text-base">5,0 su 5</span>
                <span className="text-gray-500 ml-1">(30 recensioni)</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            ref={heroRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[350px] sm:h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-anthracite/10 group border-4 border-white/60 ring-1 ring-black/5 mt-4 md:mt-0"
          >
            <motion.div style={{ y: heroY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <img 
                src="/hero.jpg" 
                alt="Salone N37 Carate Brianza - Postazioni" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop";
                }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-soft-black/40 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-nude/20 to-transparent mix-blend-overlay pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Highlights / Trust Section */}
      <section className="py-12 md:py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Ambiente accogliente", desc: "Un luogo pulito e rilassante dove sentirti a tuo agio.", icon: Heart },
              { title: "Personale qualificato", desc: "Un team gentile, attento e sempre aggiornato.", icon: Award },
              { title: "Consulenza personalizzata", desc: "Ascoltiamo le tue esigenze per un risultato su misura.", icon: MessageCircleHeart },
              { title: "Risultati impeccabili", desc: "Qualità percepita alta e clienti sempre soddisfatte.", icon: Sparkles }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-powder flex items-center justify-center text-soft-gold mb-2">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-serif font-medium text-soft-black">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="chi-siamo" className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            ref={aboutRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl shadow-nude/20 group"
          >
            <motion.div style={{ y: aboutY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
              <img 
                src="/about.jpg" 
                alt="Salone N37 Carate Brianza - Area Accoglienza" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-nude/10 mix-blend-multiply pointer-events-none"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-soft-black mb-4 md:mb-6">
              Un salone dove sentirti ascoltata e valorizzata
            </h2>
            <div className="space-y-4 md:space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              <p>
                N37 non è solo un salone, ma un luogo dove il cliente riceve una vera esperienza di attenzione e qualità. Ci prendiamo cura di te offrendo un ambiente rilassante e risultati che superano le aspettative.
              </p>
              <p>
                Tutto il team ti aspetta per una consulenza su misura. Ascoltiamo le tue esigenze per esaltare la tua bellezza naturale, con grande attenzione alla salute dei tuoi capelli.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servizi" className="py-16 md:py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-soft-black mb-4 md:mb-6">I nostri servizi</h2>
            <p className="text-base md:text-lg text-gray-600">
              Dalla consulenza personalizzata ai trattamenti specifici, offriamo tutto ciò di cui i tuoi capelli hanno bisogno.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-nude hover:shadow-xl hover:shadow-nude/20 transition-all duration-300 hover:-translate-y-2 bg-warm-white group"
              >
                <service.icon size={28} className="text-soft-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-soft-black text-lg">{service.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="recensioni" className="py-16 md:py-24 px-6 bg-powder/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-soft-black mb-4 md:mb-6">Le clienti parlano per noi</h2>
              <p className="text-base md:text-lg text-gray-600">
                La soddisfazione di chi ci sceglie è la nostra migliore garanzia. Leggi le esperienze di chi ha già provato N37.
              </p>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <div className="flex text-soft-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />)}
              </div>
              <div className="text-soft-black font-medium text-base md:text-lg">
                5,0 stelle <span className="text-gray-500 text-sm md:text-base font-normal">su Google</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-nude/10"
              >
                <div className="flex text-soft-gold mb-3 md:mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6 italic">"{review.text}"</p>
                <div className="font-medium text-soft-black text-sm md:text-base">{review.name}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 md:mt-16 text-center">
            <a 
              href={PHONE_LINK}
              className="flex sm:inline-flex w-full sm:w-auto bg-soft-black text-white px-8 py-4 rounded-full hover:bg-anthracite transition-colors items-center justify-center gap-2 text-lg font-medium"
            >
              <Phone size={20} />
              <span>Chiama ora per un appuntamento</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Hours Section */}
      <section id="contatti" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-soft-black mb-8 md:mb-10">Contattaci o vieni a trovarci</h2>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-powder flex items-center justify-center text-soft-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Telefono</h3>
                  <a href={PHONE_LINK} className="text-2xl font-medium text-soft-black hover:text-soft-gold transition-colors">
                    {PHONE}
                  </a>
                  <p className="text-sm text-gray-500 mt-2">Chiamaci per prenotare o per richiedere informazioni.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-powder flex items-center justify-center text-soft-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Indirizzo</h3>
                  <p className="text-lg font-medium text-soft-black">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-powder flex items-center justify-center text-soft-gold shrink-0">
                  <Clock size={24} />
                </div>
                <div className="w-full">
                  <h3 className="text-sm text-gray-500 font-medium mb-3 uppercase tracking-wider">Orari di apertura</h3>
                  <div className="space-y-2">
                    {HOURS.map((schedule, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                        <span className={`font-medium ${schedule.hours === 'Chiuso' ? 'text-gray-400' : 'text-soft-black'}`}>
                          {schedule.day}
                        </span>
                        <span className={`font-bold ${schedule.hours === 'Chiuso' ? 'text-gray-400' : 'text-soft-black'}`}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-auto rounded-2xl overflow-hidden bg-powder flex items-center justify-center border border-gray-100 shadow-xl shadow-nude/10 mt-4 lg:mt-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2787.602013431899!2d9.2363712!3d45.678889399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786bd98eb1aab63%3A0x8ac0532fa2cb7c5a!2sN37!5e0!3m2!1sit!2sit!4v1774967229749!5m2!1sit!2sit" 
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-soft-black text-white pt-12 md:pt-16 pb-24 md:pb-8 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12 mb-8 md:mb-12 border-b border-white/10 pb-8 md:pb-12">
          <div>
            <div className="text-2xl md:text-3xl font-serif font-semibold tracking-wider mb-4 md:mb-6">N37</div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Professionalità, accoglienza e cura per i tuoi capelli nel cuore di Carate Brianza.
            </p>
            <a 
              href={PHONE_LINK}
              className="inline-flex bg-white text-soft-black px-6 py-3 rounded-full hover:bg-nude transition-colors items-center justify-center gap-2 font-medium"
            >
              <Phone size={18} />
              <span>{PHONE}</span>
            </a>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Link Rapidi</h4>
            <nav className="flex flex-col gap-3 text-gray-400">
              <button onClick={() => scrollTo('chi-siamo')} className="text-left hover:text-white transition-colors w-fit">Chi Siamo</button>
              <button onClick={() => scrollTo('servizi')} className="text-left hover:text-white transition-colors w-fit">Servizi</button>
              <button onClick={() => scrollTo('recensioni')} className="text-left hover:text-white transition-colors w-fit">Recensioni</button>
              <button onClick={() => scrollTo('contatti')} className="text-left hover:text-white transition-colors w-fit">Contatti</button>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Contatti</h4>
            <div className="space-y-3 text-gray-400">
              <p>{ADDRESS}</p>
              <p>Tel: {PHONE}</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} N37 Parrucchiere. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-40">
        <a 
          href={PHONE_LINK}
          className="bg-soft-black text-white w-full py-4 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg"
        >
          <Phone size={20} />
          <span>Chiama Ora</span>
        </a>
      </div>
    </div>
  );
}

