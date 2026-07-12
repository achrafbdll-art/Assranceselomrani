import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowRight, Phone, CheckCircle2, Car, Home, HeartPulse, 
  Briefcase, TrendingUp, Quote, MapPin, Mail, X, Menu, ChevronRight, ChevronLeft,
  Facebook, Instagram, Linkedin, Twitter, MessageCircle, Github, Globe, Send, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Chatbot from './components/Chatbot';
import WhatsAppWidget from './components/WhatsAppWidget';
import AgencyLogo from './components/AgencyLogo';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'history' | 'offers'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittingPhone, setSubmittingPhone] = useState(false);
  const [isPopupSubmitted, setIsPopupSubmitted] = useState(false);
  const [submittingPopupPhone, setSubmittingPopupPhone] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOfferCategory, setSelectedOfferCategory] = useState<'all' | 'auto' | 'home' | 'sante' | 'voyage' | 'pro' | 'epargne'>('all');

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      tagline: "Votre partenaire de confiance à Casablanca",
      title: "Votre assurance, notre engagement.",
      description: "Protégez ce qui compte vraiment pour vous avec l'expertise d'un agent général AXA engagé et proche de vous."
    },
    {
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      tagline: "Assurance Automobile AXA",
      title: "Prenez la route en toute sérénité.",
      description: "Garanties d'assistance exceptionnelles 24/7 and formules flexibles pour rouler l'esprit tranquille."
    },
    {
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      tagline: "Assurance Habitation & Santé",
      title: "Protégez votre foyer et vos proches.",
      description: "Notre accompagnement sur mesure pour assurer votre toit, votre santé et la prévoyance de votre famille."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Auto-trigger the special offer popup after 5 seconds to maximize conversion
    const timer = setTimeout(() => {
      const hasClosed = sessionStorage.getItem('popup_closed');
      const hasSubmitted = sessionStorage.getItem('popup_submitted');
      if (!hasClosed && !hasSubmitted) {
        setShowPopup(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Slideshow automatic rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const navigateToContact = () => {
    setActiveSection('home');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sections = {
    home: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="page-section"
      >
        {/* Hero Slider */}
        <section className="relative h-screen flex items-center overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src={slides[currentSlide].image} 
                  alt="Assurances ELOMRANI" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-axa-blue/95 via-axa-blue/60 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`slide-content-${currentSlide}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold mb-6 uppercase tracking-widest">
                    <ShieldCheck className="text-axa-red w-4 h-4" />
                    {slides[currentSlide].tagline}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-base md:text-lg text-white/95 mb-10 font-medium leading-relaxed">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowPopup(true)}
                  className="bg-axa-red text-white px-8 py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-xl cursor-pointer"
                >
                  Obtenir un devis gratuit <ArrowRight />
                </button>
                <a 
                  href="tel:+212661423455" 
                  className="bg-white text-axa-blue px-8 py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-xl"
                >
                  <Phone /> Être rappelé
                </a>
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="absolute bottom-10 left-6 md:left-12 z-25 flex items-center gap-4">
            <button 
              onClick={handlePrevSlide}
              className="w-10 h-10 border border-white/30 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNextSlide}
              className="w-10 h-10 border border-white/30 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Diapositive suivante"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2 ml-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                  aria-label={`Aller à la diapositive ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Agent */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-slate-50 relative overflow-hidden zellig-pattern">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
                  alt="Assurance Voyage - Vol Avion" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-axa-blue rounded-2xl -z-0 hidden lg:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-axa-red rounded-2xl -z-0 hidden lg:block"></div>
            </div>
            <div>
              <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">L'expertise à votre service</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-axa-blue mb-6">
                Votre Assurance Voyage <br />
                <span className="text-slate-500 text-xl md:text-2xl font-semibold">Voyager l'état d'esprit tranquille.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Bénéficiez d'une couverture complète dans le monde entier pour vos séjours touristiques, professionnels, familiaux ou d'études. Nous prenons soin de vous, où que vous soyez.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Prise en charge des soins médicaux d'urgence à l'étranger",
                  "Assistance médicale et rapatriement sanitaire H24"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-axa-red" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowPopup(true)}
                className="bg-axa-blue text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-950 transition-all cursor-pointer"
              >
                Contactez-nous dès maintenant
              </button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 px-6 md:px-12 lg:px-24 bg-white zellig-pattern">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">Nos Solutions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-axa-blue mb-4">Une protection sur mesure pour chaque étape de votre vie</h2>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Car, title: "Assurance Auto", desc: "Protection complète pour vous et votre véhicule, avec assistance 24/7." },
              { icon: Home, title: "Assurance Habitation", desc: "Sécurisez votre foyer et vos biens contre tous les risques du quotidien.", active: true },
              { icon: HeartPulse, title: "Assurance Santé", desc: "Une couverture flexible et complète pour vous et votre famille." },
              { icon: ShieldCheck, title: "Prévoyance", desc: "Anticipez l'avenir et protégez vos proches des aléas de la vie." },
              { icon: Briefcase, title: "Assurance Pro", desc: "Des solutions dédiées aux entreprises et aux professionnels.", active: true },
              { icon: TrendingUp, title: "Épargne & Retraite", desc: "Préparez vos projets futurs avec nos solutions d'épargne performantes." }
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-xl border border-slate-100 hover:border-axa-blue/20 hover:shadow-2xl transition-all bg-white group">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-all ${service.active ? 'bg-axa-blue text-white' : 'bg-slate-50 text-axa-blue group-hover:bg-axa-blue group-hover:text-white'}`}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-axa-blue mb-3">{service.title}</h3>
                <p className="text-slate-500 mb-6">{service.desc}</p>
                <button 
                  onClick={() => setActiveSection('offers')}
                  className="text-axa-red font-bold flex items-center gap-2 text-sm uppercase cursor-pointer"
                >
                  Découvrir l'offre <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section id="why-us" className="py-20 px-6 md:px-12 lg:px-24 bg-axa-blue text-white relative overflow-hidden zellig-pattern-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">Pourquoi nous choisir ?</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">L'expertise d'un grand groupe mondial, <br />la proximité d'un agent local.</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: "Conseils Personnalisés", desc: "Nous analysons vos besoins réels pour vous proposer des solutions adaptées." },
                  { title: "Solidité AXA", desc: "Leader mondial de l'assurance avec une présence historique au Maroc." },
                  { title: "Réactivité Sinistre", desc: "Un accompagnement dédié pour un règlement rapide de vos dossiers." },
                  { title: "Proximité Locale", desc: "Situé au cœur de Casablanca pour être au plus proche de vous." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-axa-red rounded-full"></div>
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20">
                <Quote className="text-axa-red mb-6" size={40} />
                <p className="text-2xl font-medium italic mb-6">"Un service exceptionnel et une équipe très professionnelle. Mme ELOMRANI a su trouver la meilleure couverture pour mon entreprise."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-axa-red rounded-full flex items-center justify-center font-bold">M</div>
                  <div>
                    <p className="font-bold">Mohammed A.</p>
                    <p className="text-white/60 text-sm">Chef d'entreprise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-slate-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-axa-blue mb-8">Prêt à être mieux protégé ?</h2>
              <p className="text-slate-600 mb-10 text-lg">Contactez-nous pour une étude personnalisée de vos besoins ou rendez-vous directement en agence.</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-axa-blue shadow-md"><MapPin /></div>
                  <div>
                    <p className="font-bold text-axa-blue">Notre Adresse</p>
                    <p className="text-slate-500 text-sm">108 Bd Ali Yaâta, Casablanca 20250</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-axa-blue shadow-md"><Phone /></div>
                  <div>
                    <p className="font-bold text-axa-blue">Téléphone</p>
                    <p className="text-slate-500 text-sm">+212 661-423455</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-axa-blue shadow-md"><Mail /></div>
                  <div>
                    <p className="font-bold text-axa-blue">Email</p>
                    <p className="text-slate-500 text-sm">contact@axa-elomrani.ma</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/212661423455" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-2xl hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-700 flex items-center gap-2">
                      WhatsApp 
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        Direct
                      </span>
                    </p>
                    <p className="text-emerald-900/70 text-sm font-medium mt-0.5">Discuter en direct sur WhatsApp</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-100 relative overflow-hidden">
                {isFormSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                      <CheckCircle2 size={36} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-axa-blue">Votre Demande est Enregistrée !</h3>
                      <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
                        Merci pour votre confiance. Mme FATIMA EL OMRANI ou l'un de nos conseillers experts étudie vos besoins et vous recontactera très rapidement selon vos préférences.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsFormSubmitted(false)}
                      className="bg-axa-blue hover:bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer"
                    >
                      Envoyer une autre demande
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    className="space-y-6 text-left" 
                    onSubmit={async (e) => { 
                      e.preventDefault(); 
                      setSubmittingPhone(true);
                      const formData = new FormData(e.currentTarget);
                      const clientName = formData.get('name') as string;
                      const clientPhone = formData.get('phone') as string;
                      const insuranceType = formData.get('type') as string;
                      const email = formData.get('email') as string;
                      const city = formData.get('city') as string;
                      const pref = formData.get('preference') as string;
                      const userMsg = formData.get('client_message') as string;

                      const detailedMessage = `Email: ${email}\nVille: ${city}\nPréférence: ${pref}\n\nMessage ou besoins détaillés:\n${userMsg || 'Aucun message spécifique fourni.'}`;

                      const data = {
                        name: clientName,
                        phone: clientPhone,
                        type: insuranceType,
                        message: detailedMessage,
                        email: email,
                        city: city,
                        preference: pref,
                        client_message: userMsg
                      };
                      
                      try {
                        const response = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(data)
                        });
                        const result = await response.json();
                        if (result.success) {
                          setIsFormSubmitted(true);
                          (e.target as HTMLFormElement).reset();
                        } else {
                          alert(result.message || 'Erreur lors de l\'envoi.');
                        }
                      } catch (error) {
                        alert('Erreur réseau. Veuillez réessayer.');
                      } finally {
                        setSubmittingPhone(false);
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <span className="text-axa-red font-bold uppercase tracking-wider text-xs block">Formulaire de Contact Détaillé</span>
                      <h3 className="text-2xl font-bold text-axa-blue">Demande de Devis Personnalisé</h3>
                      <p className="text-slate-500 text-sm">Remplissez ces quelques champs afin que nous puissions élaborer la formule optimale pour votre situation.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Nom Complet *</label>
                        <input 
                          name="name" 
                          type="text" 
                          placeholder="Ex: Ahmed El Mansouri" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-semibold text-slate-700 text-sm" 
                          required 
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Adresse E-mail *</label>
                        <input 
                          name="email" 
                          type="email" 
                          placeholder="Ex: ahmed@mail.com" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-semibold text-slate-700 text-sm" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Numéro de Mobile *</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none border-r border-slate-200 pr-3">+212</span>
                          <input 
                            name="phone" 
                            type="tel" 
                            placeholder="6 12 34 56 78" 
                            className="w-full pl-22 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-bold text-slate-700 tracking-wide text-sm" 
                            required 
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Votre Ville *</label>
                        <select 
                          name="city"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-white focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-semibold text-slate-700 text-sm cursor-pointer"
                          required
                        >
                          <option value="Casablanca">Casablanca</option>
                          <option value="Rabat">Rabat</option>
                          <option value="Marrakech">Marrakech</option>
                          <option value="Tanger">Tanger</option>
                          <option value="Fès">Fès</option>
                          <option value="Agadir">Agadir</option>
                          <option value="Autre au Maroc">Autre au Maroc</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Product Type */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Type d'Assurance Souhaité *</label>
                        <select 
                          name="type"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-white focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-semibold text-slate-700 text-sm cursor-pointer"
                          required
                        >
                          <option value="Assurance Automobile">Assurance Automobile 🚗</option>
                          <option value="Assurance Habitation">Assurance Habitation 🏠</option>
                          <option value="Assurance Santé">Assurance Santé ❤️</option>
                          <option value="Assurance Voyage">Assurance Voyage ✈️</option>
                          <option value="Assurance Professionnelle">Assurance Professionnelle & PME 💼</option>
                          <option value="Épargne & Retraite">Épargne & Retraite Active 📈</option>
                        </select>
                      </div>

                      {/* Contact Preference */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Moyen de Contact Préféré *</label>
                        <div className="flex gap-3 pt-2">
                          {[
                            { value: "phone", label: "📞 Téléphone" },
                            { value: "whatsapp", label: "💬 WhatsApp" },
                            { value: "email", label: "✉️ E-mail" }
                          ].map((pref) => (
                            <label key={pref.value} className="flex items-center gap-1.5 text-xs text-slate-600 font-bold cursor-pointer bg-slate-50 hover:bg-slate-100 py-1.5 px-2.5 rounded-lg border border-slate-200/60 select-none">
                              <input type="radio" name="preference" value={pref.value} defaultChecked={pref.value === 'phone'} className="accent-axa-red" />
                              <span>{pref.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Message ou Besoins Spécifiques (Facultatif)</label>
                      <textarea 
                        name="client_message" 
                        rows={3}
                        placeholder="Ex: Je souhaite un devis d'assurance auto tous risques pour ma nouvelle voiture (Peugeot 208, 6 CV, diesel)..." 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-semibold text-slate-700 text-sm"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submittingPhone}
                      className="w-full bg-axa-red text-white py-4 rounded-xl font-bold text-base hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                    >
                      {submittingPhone ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Envoi de votre demande...
                        </>
                      ) : (
                        <>
                          <Phone size={18} />
                          Envoyer ma demande de devis
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[450px] w-full bg-slate-200 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.823932782782!2d-7.5435208!3d33.5976608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd00315039a9%3A0xbd3f59f03e9d1a66!2sAssurances%20ELOMRANI!5e0!3m2!1sfr!2sma!4v1710000000000!5m2!1sfr!2sma" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </motion.div>
    ),
    history: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="page-section pt-32 pb-20 zellig-pattern min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">Notre Histoire</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-axa-blue mb-6">Plus de deux siècles d'engagement et d'innovation</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Découvrez les jalons qui ont façonné le leader mondial de l'assurance.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
            {[
              { val: "50+", label: "Pays", color: "axa-blue" },
              { val: "94M", label: "Clients", color: "axa-red" },
              { val: "200+", label: "Ans d'expertise", color: "axa-blue" },
              { val: "145K", label: "Collaborateurs", color: "axa-red" }
            ].map((stat, idx) => (
              <div key={idx} className={`p-8 bg-white rounded-2xl shadow-xl border-b-4 border-${stat.color}`}>
                <div className={`text-4xl font-black text-${stat.color} mb-2`}>{stat.val}</div>
                <div className="text-slate-500 font-bold uppercase text-xs tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-12 max-w-4xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 hidden md:block"></div>
            
            {[
              { year: "1817", title: "Les Origines", desc: "Création de la Mutuelle de L'assurance contre l'incendie à Rouen, point de départ de l'aventure AXA.", color: "axa-red" },
              { year: "1985", title: "Naissance de la marque AXA", desc: "Claude Bébéar choisit le nom AXA, un nom court, puissant et universel pour porter l'ambition internationale du groupe.", color: "axa-blue" },
              { year: "1996", title: "Leader Mondial", desc: "Acquisition de l'UAP, faisant d'AXA la plus grande entreprise française et un leader mondial de l'assurance.", color: "axa-red" },
              { year: "2000", title: "Expansion au Maroc", desc: "AXA renforce sa présence au Maroc, devenant un acteur majeur du marché national.", color: "axa-blue" },
              { year: "2016", title: "Ambition 2020", desc: "Lancement d'une stratégie axée sur la transformation digitale et l'expérience client.", color: "axa-red" }
            ].map((milestone, idx) => (
              <div key={idx} className={`relative bg-white p-8 rounded-2xl shadow-lg border-t-4 border-${milestone.color} z-10`}>
                <span className={`text-${milestone.color} font-black text-3xl mb-2 block`}>{milestone.year}</span>
                <h3 className="text-xl font-bold text-axa-blue mb-3">{milestone.title}</h3>
                <p className="text-slate-500">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    ),
    offers: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="page-section pt-32 pb-20 zellig-pattern min-h-screen animate-fade-in"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">Nos Offres</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-axa-blue mb-6">Des solutions de protection adaptées à vos besoins</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Découvrez nos offres d'assurance exclusives, inspirées des standards d'excellence d'<b>AXA Maroc</b>, pour vous garantir la meilleure couverture au meilleur prix.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'Toutes les offres', icon: ShieldCheck },
              { id: 'auto', label: 'Automobile 🚗', icon: Car },
              { id: 'home', label: 'Habitation 🏠', icon: Home },
              { id: 'sante', label: 'Santé ❤️', icon: HeartPulse },
              { id: 'voyage', label: 'Voyage ✈️', icon: Globe },
              { id: 'pro', label: 'Professionnels 💼', icon: Briefcase },
              { id: 'epargne', label: 'Épargne & Retraite 📈', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedOfferCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedOfferCategory(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border cursor-pointer select-none ${
                    isActive 
                      ? 'bg-axa-blue text-white border-axa-blue shadow-lg scale-105' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-axa-blue hover:text-axa-blue'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Offers Catalog */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { 
                title: "Assurance Automobile AXA", 
                category: "auto",
                img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
                icon: Car,
                desc: "Profitez d'une assurance auto flexible et sur-mesure au Maroc. Choisissez la formule qui convient le mieux à vos habitudes et roulez l'esprit tranquille.",
                formulas: [
                  { name: "Formule Tiers (Obligatoire +)", details: "Responsabilité Civile indispensable, Défense & Recours, et assistance panne de base." },
                  { name: "Formule Tiers Complet (Intermédiaire)", details: "Ajoute la protection contre le Vol, l'Incendie, le Bris de Glace et les Tempêtes." },
                  { name: "Formule Tous Risques (Sérénité Totale)", details: "Couverture maximale pour tous les dommages de collision, le vandalisme et la Tierce complète." }
                ],
                features: [
                  "Assistance panne et accident 24h/24 et 7j/7 partout au Maroc",
                  "Prise en charge directe des réparations dans notre réseau étendu de Garages Agréés AXA",
                  "Véhicule de remplacement mis à disposition immédiatement (jusqu'à 15 jours)",
                  "Service d'expertise ultra-rapide sur place (AXA Rapide) en cas de sinistre"
                ],
                badge: "Populaire"
              },
              { 
                title: "Multirisque Habitation (My Home)", 
                category: "home",
                img: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop",
                icon: Home,
                desc: "Protégez votre résidence (principale ou secondaire) ainsi que vos biens les plus précieux contre tous les imprévus du quotidien.",
                formulas: [
                  { name: "Option Locataire", details: "Couvre la responsabilité civile locative, les risques d'incendie et de dégâts des eaux." },
                  { name: "Option Propriétaire Occupant", details: "Protection complète des murs, du mobilier de valeur et de tous vos équipements technologiques." },
                  { name: "Option Propriétaire Non-Occupant", details: "Garantit votre patrimoine immobilier contre les sinistres majeurs pendant que le bien est loué ou vide." }
                ],
                features: [
                  "Assistance dépannage d'urgence 24h/24 en moins de 2 heures (Plombier, Serrurier, Électricien)",
                  "Indemnisation en valeur à neuf sur vos équipements multimédias et électroménagers récents",
                  "Responsabilité Civile Chef de Famille incluse pour couvrir tous les membres du foyer",
                  "Garanties complètes : Vol, Incendie, Dégâts des eaux, Bris de vitres et Catastrophes Naturelles"
                ],
                badge: "Garantie 2H"
              },
              { 
                title: "Complémentaire Santé (SEHA)", 
                category: "sante",
                img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
                icon: HeartPulse,
                desc: "Parce que votre santé est primordiale, notre assurance offre un remboursement exceptionnel de vos soins médicaux et d'hospitalisation.",
                formulas: [
                  { name: "SEHA Nationale", details: "Prise en charge optimisée au Maroc avec tiers-payant automatique dans un large réseau médical." },
                  { name: "SEHA Internationale", details: "Couverture mondiale haut de gamme incluant les cliniques de prestige à l'étranger et l'évacuation d'urgence." }
                ],
                features: [
                  "Remboursement ultra-rapide de vos dossiers de maladie sous un délai contractuel de 48h",
                  "Tiers-payant instantané en cas d'hospitalisation ou de chirurgie pour vous éviter toute avance de frais",
                  "Couverture étendue pour la maternité, les soins dentaires, l'optique et les affections de longue durée (ALD)",
                  "Service exclusif de téléconsultation médicale gratuite accessible en continu depuis votre smartphone"
                ],
                badge: "Recommandé"
              },
              { 
                title: "Assurance Voyage & Assistance", 
                category: "voyage",
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
                icon: Globe,
                desc: "Voyagez l'esprit tranquille à l'international grâce à notre assurance d'assistance médicale conforme à 100% aux critères des visas Schengen.",
                formulas: [
                  { name: "Formule Schengen Conforme", details: "Couverture médicale obligatoire de minimum 30 000 € requise pour l'octroi des visas européens." },
                  { name: "Formule Monde Entier", details: "Plafonds rehaussés pour les pays à frais de santé élevés (USA, Canada, Japon, etc.)." }
                ],
                features: [
                  "Prise en charge directe et immédiate des frais d'hospitalisation d'urgence médicale à l'étranger",
                  "Rapatriement sanitaire et médical H24 vers le Maroc géré par l'assistance technique AXA"
                ],
                badge: "Visa Schengen"
              },
              { 
                title: "Multirisque Professionnelle & PME", 
                category: "pro",
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                icon: Briefcase,
                desc: "Protégez l'activité de votre commerce, bureau, atelier ou PME. Sécurisez vos locaux professionnels, vos marchandises et votre responsabilité civile.",
                formulas: [
                  { name: "Option Commerce & Artisanat", details: "Protection ciblée des points de vente physique, stocks, vitrines et responsabilité d'exploitation." },
                  { name: "Option Bureau & Professions Libérales", details: "Couvre les équipements techniques, le matériel informatique, les archives et la RC Professionnelle." },
                  { name: "Option PME & Entreprises de Services", details: "Une couverture sur-mesure pour les parcs machines, flotte auto professionnelle et perte d'exploitation." }
                ],
                features: [
                  "Garantie Perte d'Exploitation : compensation financière en cas d'arrêt d'activité suite à un sinistre",
                  "Responsabilité Civile Professionnelle (RC Pro) protégeant contre toute erreur, omission ou faute professionnelle",
                  "Prise en charge intégrale des dommages électriques ou incendies frappant vos serveurs et machines de production",
                  "Audit personnalisé des risques opérationnels réalisé directement par des ingénieurs préventionnistes d'AXA"
                ],
                badge: "Entreprises"
              },
              { 
                title: "Épargne & Retraite Active", 
                category: "epargne",
                img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop",
                icon: TrendingUp,
                desc: "Valorisez vos économies et préparez activement vos futurs projets de vie ou votre retraite avec des solutions de placement performantes et avantageuses.",
                formulas: [
                  { name: "Plan Retraite Active", details: "Épargnez à votre rythme tout en bénéficiant de la déductibilité fiscale intégrale de vos cotisations au Maroc." },
                  { name: "Plan Épargne Éducation", details: "Constituez un capital progressif et garanti pour financer en toute sérénité les études supérieures de vos enfants." }
                ],
                features: [
                  "Taux de rendement annuel hautement compétitif avec capital net 100% garanti et sécurisé",
                  "Versement d'une flexibilité absolue : optez pour des versements programmés ou des versements libres exceptionnels",
                  "Optimisation fiscale majeure en parfaite conformité avec la réglementation de l'impôt sur le revenu (IR)",
                  "Options de sortie sur-mesure au terme du contrat : capital unique disponible ou rente viagère mensuelle"
                ],
                badge: "Fiscalité Optimisée"
              }
            ]
              .filter(o => selectedOfferCategory === 'all' || o.category === selectedOfferCategory)
              .map((offer, idx) => {
                const IconComponent = offer.icon;
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={offer.title} 
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row text-left group hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Card Image */}
                    <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                      <img 
                        src={offer.img} 
                        alt={offer.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-black/30 md:to-transparent"></div>
                      {offer.badge && (
                        <div className="absolute top-4 left-4 bg-axa-red text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                          {offer.badge}
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 md:hidden text-white font-black text-xs uppercase tracking-widest bg-axa-blue/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {offer.category.toUpperCase()}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                      <div>
                        {/* Title & Icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-axa-blue/10 text-axa-blue rounded-xl flex items-center justify-center group-hover:bg-axa-blue group-hover:text-white transition-all duration-500">
                            <IconComponent size={20} />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-axa-blue leading-tight">{offer.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed font-semibold">
                          {offer.desc}
                        </p>

                        {/* Formulas */}
                        <div className="mb-6">
                          <h4 className="text-xs font-black uppercase tracking-wider text-axa-blue/70 mb-3">Formules Disponibles</h4>
                          <div className="space-y-2.5">
                            {offer.formulas.map((f, i) => (
                              <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                                <div className="text-xs font-bold text-axa-blue flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-axa-red"></span>
                                  {f.name}
                                </div>
                                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal pl-3">{f.details}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-6">
                          <h4 className="text-xs font-black uppercase tracking-wider text-axa-blue/70 mb-3">Garanties de l'offre</h4>
                          <ul className="grid grid-cols-1 gap-2 text-slate-600">
                            {offer.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs font-semibold leading-normal">
                                <CheckCircle2 className="text-axa-red w-4 h-4 shrink-0 mt-0.5" /> 
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Devis Action Button */}
                      <div className="pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            navigateToContact();
                          }} 
                          className="w-full bg-axa-blue hover:bg-blue-900 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer select-none"
                        >
                          Demander un devis personnalisé
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          <div className="mt-20 bg-axa-blue rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <h2 className="text-3xl font-bold mb-6 relative z-10">Vous souhaitez une étude personnalisée ?</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Mme FATIMA EL OMRANI et ses conseillers sont à votre disposition pour créer une offre 100% sur-mesure selon les spécificités de votre situation personnelle ou professionnelle.
            </p>
            <button onClick={navigateToContact} className="bg-axa-red hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all relative z-10 shadow-lg cursor-pointer">
              Contacter nos conseillers experts
            </button>
          </div>
        </div>
      </motion.div>
    )
  };

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-axa-blue selection:text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 md:py-6 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center relative">
          <button onClick={() => setActiveSection('home')} className="flex items-center gap-2 md:gap-3 group">
            <div className="relative flex items-center">
              <AgencyLogo className="h-10 md:h-16 w-auto bg-white p-2 rounded-2xl shadow-md border border-slate-100/50 transition-all duration-300 group-hover:scale-105" />
            </div>
            <div className={`flex flex-col leading-none text-left transition-colors ${isScrolled ? 'text-axa-blue' : 'text-white'}`}>
              <span className="font-bold text-sm md:text-lg uppercase tracking-wider">Assurances ELOMRANI</span>
              <span className="text-[7px] md:text-[10px] font-medium opacity-80 uppercase">AGENT GÉNÉRALE</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveSection('home')} className={`font-semibold text-sm transition-colors hover:text-axa-red ${isScrolled ? 'text-axa-blue' : 'text-white'}`}>Accueil</button>
            <button onClick={() => setActiveSection('history')} className={`font-semibold text-sm transition-colors hover:text-axa-red ${isScrolled ? 'text-axa-blue' : 'text-white'}`}>Historique d'AXA</button>
            <button onClick={() => setActiveSection('offers')} className={`font-semibold text-sm transition-colors hover:text-axa-red ${isScrolled ? 'text-axa-blue' : 'text-white'} cursor-pointer`}>Offres</button>
            <button onClick={navigateToContact} className="bg-axa-red text-white px-6 py-2.5 rounded-sm font-bold text-sm hover:bg-red-700 transition-all shadow-lg">CONTACTER NOUS</button>
          </div>

          {/* Desktop only menu button if needed, otherwise hidden on mobile in favor of bottom nav */}
          <div className="md:hidden flex items-center gap-4">
             <a href="tel:+212661423455" className={`p-2 rounded-full ${isScrolled ? 'bg-axa-blue text-white' : 'bg-white text-axa-blue'}`}>
                <Phone size={18} />
             </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Taskbar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 z-[90] px-6 py-3 flex justify-between items-center shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => setActiveSection('home')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'home' ? 'text-axa-blue' : 'text-slate-400'}`}
        >
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase">Accueil</span>
        </button>
        <button 
          onClick={() => setActiveSection('history')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'history' ? 'text-axa-blue' : 'text-slate-400'}`}
        >
          <ShieldCheck size={20} />
          <span className="text-[10px] font-bold uppercase">Historique d'AXA</span>
        </button>
        <button 
          onClick={() => setActiveSection('offers')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'offers' ? 'text-axa-blue' : 'text-slate-400'} cursor-pointer`}
        >
          <Car size={20} />
          <span className="text-[10px] font-bold uppercase">Offres</span>
        </button>
        <button 
          onClick={navigateToContact} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'home' && window.scrollY > 2000 ? 'text-axa-blue' : 'text-slate-400'}`}
        >
          <Mail size={20} />
          <span className="text-[10px] font-bold uppercase">Contact</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {sections[activeSection]}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-axa-blue text-white py-20 border-t border-white/10 zellig-pattern-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-left">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative group flex items-center">
                <AgencyLogo className="h-14 w-auto bg-white p-2 rounded-2xl shadow-md border border-white/10 transition-transform group-hover:scale-105 duration-300" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg uppercase tracking-wider">Assurances ELOMRANI</span>
                <span className="text-[10px] font-medium opacity-60 uppercase">AGENT GÉNÉRALE</span>
              </div>
            </div>
            <p className="text-white/60 max-w-md mb-8 leading-relaxed">Votre agence de proximité à Casablanca, membre du réseau AXA Assurance Maroc. Nous vous accompagnons dans tous vos projets de protection et d'épargne.</p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61586493536222" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-axa-blue hover:border-white transition-all duration-500 group shadow-lg"
              >
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/assurances.elomrani/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-axa-blue hover:border-white transition-all duration-500 group shadow-lg"
              >
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/fatima-elomrani-39b7a839b/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-axa-blue hover:border-white transition-all duration-500 group shadow-lg"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Liens Rapides</h4>
            <ul className="space-y-4 text-white/60">
              <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-all">Accueil</button></li>
              <li><button onClick={() => setActiveSection('history')} className="hover:text-white transition-all">Historique d'AXA</button></li>
              <li><button onClick={() => setActiveSection('offers')} className="hover:text-white transition-all cursor-pointer">Offres</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Assurances</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-all">Auto</a></li>
              <li><a href="#" className="hover:text-white transition-all">Habitation</a></li>
              <li><a href="#" className="hover:text-white transition-all">Santé</a></li>
              <li><a href="#" className="hover:text-white transition-all">Professionnelle</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p>© 2026 Assurances ELOMRANI - Agent Général AXA. Tous droits réservés.</p>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-xs">By <span className="font-extrabold tracking-wider text-white/50 hover:text-white transition-colors">ASSURLEADCOMMUNICATION</span></p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-all">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-all">Politique de Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />

      {/* WhatsApp Chat Button */}
      <WhatsAppWidget />

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-axa-blue/70 backdrop-blur-sm" 
              onClick={() => {
                sessionStorage.setItem('popup_closed', 'true');
                setShowPopup(false);
              }}
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 text-center zellig-pattern border border-slate-100 z-50"
            >
              <button 
                onClick={() => {
                  sessionStorage.setItem('popup_closed', 'true');
                  setShowPopup(false);
                }} 
                className="absolute top-6 right-6 text-slate-400 hover:text-axa-blue transition-all cursor-pointer"
              >
                <X />
              </button>
              
              {isPopupSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 space-y-6"
                >
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-axa-blue">Demande Enregistrée !</h3>
                    <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                      Merci ! Un conseiller d'Assurances ELOMRANI vous contactera sur votre mobile d'ici quelques minutes pour votre offre spéciale.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      sessionStorage.setItem('popup_submitted', 'true');
                      setShowPopup(false);
                    }}
                    className="w-full bg-axa-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-all cursor-pointer"
                  >
                    Fermer
                  </button>
                </motion.div>
              ) : (
                <form 
                  className="space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmittingPopupPhone(true);
                    const formData = new FormData(e.currentTarget);
                    const rawPhone = formData.get('phone');
                    const data = {
                      name: "Client Offre Spéciale",
                      phone: rawPhone,
                      type: "Offre Spéciale",
                      message: "Demande d'informations sur l'offre spéciale depuis la popup d'appel à l'action"
                    };

                    try {
                      const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      const result = await response.json();
                      if (result.success) {
                        setIsPopupSubmitted(true);
                        sessionStorage.setItem('popup_submitted', 'true');
                      } else {
                        alert(result.message || "Une erreur est survenue.");
                      }
                    } catch (error) {
                      alert("Erreur de connexion. Veuillez réessayer.");
                    } finally {
                      setSubmittingPopupPhone(false);
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-axa-red/10 text-axa-red rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <ShieldCheck size={36} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-axa-red font-bold uppercase tracking-wider text-xs block">Offre Exclusive</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-axa-blue">Offre Spéciale Assurances</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Contactez-nous dès aujourd'hui pour en savoir plus sur votre offre spéciale.
                    </p>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Numéro de Mobile</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none border-r border-slate-200 pr-3">+212</span>
                      <input 
                        name="phone" 
                        type="tel" 
                        placeholder="6 12 34 56 78" 
                        className="w-full pl-22 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-bold text-slate-700 tracking-wide text-lg" 
                        required 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={submittingPopupPhone}
                    className="w-full bg-axa-red text-white py-4 rounded-xl font-bold text-base hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                  >
                    {submittingPopupPhone ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Phone size={18} />
                        Profiter de l'offre spéciale
                      </>
                    )}
                  </button>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-2">Ou contactez notre agence directement :</p>
                    <a 
                      href="tel:+212661423455" 
                      className="inline-flex items-center gap-2 text-axa-blue font-bold text-sm hover:underline"
                    >
                      <Phone size={14} /> +212 661-423455
                    </a>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
