import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowRight, Phone, CheckCircle2, Car, Home, HeartPulse, 
  Briefcase, TrendingUp, Quote, MapPin, Mail, X, Menu, ChevronRight, ChevronLeft,
  Facebook, Instagram, Linkedin, Twitter, MessageCircle, Github, Globe, Send, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Chatbot from './components/Chatbot';

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
                  src={ae-logo.svg} 
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
                  href="tel:0522665908" 
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
                  "Assistance médicale et rapatriement sanitaire H24",
                  "Couverture en cas de perte, vol ou détérioration de bagages",
                  "Assistance juridique et responsabilité civile à l'étranger"
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
                    <p className="text-slate-500 text-sm">05 22 66 59 08</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-axa-blue shadow-md"><Mail /></div>
                  <div>
                    <p className="font-bold text-axa-blue">Email</p>
                    <p className="text-slate-500 text-sm">contact@axa-elomrani.ma</p>
                  </div>
                </div>
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
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-axa-blue">Demande Enregistrée !</h3>
                      <p className="text-slate-500 mt-2">Mme ELOMRANI ou un de nos conseillers vous rappellera d'ici quelques minutes.</p>
                    </div>
                    <button 
                      onClick={() => setIsFormSubmitted(false)}
                      className="text-axa-blue font-bold text-sm underline hover:text-blue-900"
                    >
                      Introduire un autre numéro
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    className="space-y-6" 
                    onSubmit={async (e) => { 
                      e.preventDefault(); 
                      setSubmittingPhone(true);
                      const formData = new FormData(e.currentTarget);
                      const rawPhone = formData.get('phone');
                      const data = {
                        name: "Client Mobile",
                        phone: rawPhone,
                        type: "Rappel Téléphonique",
                        message: "Demande de rappel rapide depuis le widget de contact direct"
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
                        alert('Erreur réseau.');
                      } finally {
                        setSubmittingPhone(false);
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <span className="text-axa-red font-bold uppercase tracking-wider text-xs block">Rappel Immédiat & Gratuit</span>
                      <h3 className="text-2xl font-bold text-axa-blue">Entrez votre numéro de mobile</h3>
                      <p className="text-slate-500 text-sm">Pas de formulaires à rallonge. Nous vous contactons directement par téléphone pour étudier vos besoins.</p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-axa-blue uppercase tracking-wider block">Numéro de Mobile</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none border-r border-slate-200 pr-3">+212</span>
                        <input 
                          name="phone" 
                          type="tel" 
                          placeholder="6 12 34 56 78" 
                          className="w-full pl-22 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:border-axa-blue focus:ring-2 focus:ring-axa-blue/10 transition-all font-bold text-slate-700 tracking-wide text-lg" 
                          required 
                        />
                      </div>
                      <p className="text-xs text-slate-400">Exemple: 6 12 34 56 78 ou 7 12 34 56 78</p>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submittingPhone}
                      className="w-full bg-axa-red text-white py-4.5 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                    >
                      {submittingPhone ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Phone size={20} />
                          Demander à être rappelé
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
        className="page-section pt-32 pb-20 zellig-pattern min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">Nos Offres</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-axa-blue mb-6">Des solutions de protection adaptées à vos besoins</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Découvrez nos offres exclusives conçues pour vous offrir la meilleure couverture au meilleur prix.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Pack Auto", 
                img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
                icon: Car,
                features: ["Assistance 24h/24 et 7j/7", "Véhicule de remplacement", "Protection juridique incluse", "Bonus fidélité exclusif"],
                badge: "Populaire"
              },
              { 
                title: "Pack Home", 
                img: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065&auto=format&fit=crop",
                icon: Home,
                features: ["Couverture multirisque totale", "Dépannage d'urgence 2h", "Protection des objets de valeur", "Responsabilité civile famille"]
              },
              { 
                title: "Pack Santé", 
                img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
                icon: HeartPulse,
                features: ["Remboursement rapide sous 48h", "Tiers payant étendu au Maroc", "Accès réseau clinique AXA", "Téléconsultation gratuite"],
                badge: "Essentiel"
              }
            ].map((offer, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
                <div className="h-48 relative">
                  <img src={offer.img} alt={offer.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {offer.badge && (
                    <div className={`absolute top-4 right-4 ${offer.badge === 'Populaire' ? 'bg-axa-red' : 'bg-axa-blue'} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                      {offer.badge}
                    </div>
                  )}
                </div>
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-axa-blue/10 text-axa-blue rounded-lg flex items-center justify-center"><offer.icon /></div>
                    <h3 className="text-2xl font-bold text-axa-blue">{offer.title}</h3>
                  </div>
                  <ul className="space-y-3 mb-8 text-slate-600">
                    {offer.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-axa-red w-4 h-4" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <button onClick={navigateToContact} className="w-full bg-axa-blue text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-all">
                    Demander un devis
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-axa-blue rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <h2 className="text-3xl font-bold mb-6 relative z-10">Vous ne trouvez pas ce que vous cherchez ?</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto relative z-10">Nos conseillers sont à votre disposition pour créer une offre 100% personnalisée selon votre situation unique.</p>
            <button onClick={navigateToContact} className="bg-axa-red text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all relative z-10">Contacter un conseiller expert</button>
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
            <div className="relative">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/AXA_Logo.svg/1200px-AXA_Logo.svg.png" 
                alt="Assurances ELOMRANI" 
                className="h-8 md:h-14 w-auto" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 left-0 text-[8px] font-black text-axa-blue opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">NOW YOU CAN</div>
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
             <a href="tel:0522665908" className={`p-2 rounded-full ${isScrolled ? 'bg-axa-blue text-white' : 'bg-white text-axa-blue'}`}>
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
              <div className="relative group">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/AXA_Logo.svg/1200px-AXA_Logo.svg.png" 
                  alt="Assurances ELOMRANI" 
                  className="h-12 w-auto" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-4 left-0 text-[8px] font-black text-white opacity-60 whitespace-nowrap uppercase tracking-tighter">NOW YOU CAN</div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg uppercase tracking-wider">Assurances ELOMRANI</span>
                <span className="text-[10px] font-medium opacity-60 uppercase">AGENT GÉNÉRALE</span>
              </div>
            </div>
            <p className="text-white/60 max-w-md mb-8 leading-relaxed">Votre agence de proximité à Casablanca, membre du réseau AXA Assurance Maroc. Nous vous accompagnons dans tous vos projets de protection et d'épargne.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="w-11 h-11 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-axa-blue hover:border-white transition-all duration-500 group shadow-lg">
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-11 h-11 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-axa-blue hover:border-white transition-all duration-500 group shadow-lg">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-11 h-11 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-axa-blue hover:border-white transition-all duration-500 group shadow-lg">
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
          <p>© 2026 Assurances ELOMRANI - Agent Général AXA. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-all">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-all">Politique de Confidentialité</a>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />

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
                      href="tel:0522665908" 
                      className="inline-flex items-center gap-2 text-axa-blue font-bold text-sm hover:underline"
                    >
                      <Phone size={14} /> 05 22 66 59 08
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
