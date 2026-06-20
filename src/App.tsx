import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowRight, Phone, CheckCircle2, Car, Home, HeartPulse, 
  Briefcase, TrendingUp, Quote, MapPin, Mail, X, Menu, ChevronRight, 
  Facebook, Instagram, Linkedin, Twitter, MessageCircle, Github, Globe, Send, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Chatbot from './components/Chatbot';
import SimulationForm from './components/SimulationForm';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'history' | 'simulation'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 1000 && !showPopup) {
        // setShowPopup(true); // Temporarily disabled for better UX during dev
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPopup]);

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
        {/* Hero */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="AXA Casablanca" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-axa-blue/90 via-axa-blue/60 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold mb-6 uppercase tracking-widest"
              >
                <ShieldCheck className="text-axa-red w-4 h-4" />
                Votre partenaire de confiance à Casablanca
              </motion.div>
              <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                Votre assurance, <br /><span className="text-white/80">notre engagement.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 font-medium leading-relaxed">
                Protégez ce qui compte vraiment pour vous avec l'expertise d'un agent général AXA dédié.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={navigateToContact}
                  className="bg-axa-red text-white px-8 py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-xl"
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
        </section>

        {/* Agent */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-slate-50 relative overflow-hidden zellig-pattern">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop" 
                  alt="Mme. FATIMA EL OMRANI" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-axa-blue rounded-2xl -z-0 hidden lg:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-axa-red rounded-2xl -z-0 hidden lg:block"></div>
            </div>
            <div>
              <span className="text-axa-red font-bold uppercase tracking-widest text-sm mb-4 block">L'expertise à votre service</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-axa-blue mb-6">
                Mme. FATIMA EL OMRANI <br />
                <span className="text-slate-500 text-xl md:text-2xl font-semibold">Agent Général AXA</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Avec plus de 15 ans d'expérience dans le secteur des assurances à Casablanca, notre agence s'engage à vous offrir un conseil personnalisé et une réactivité exemplaire.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Proximité et écoute active",
                  "Conseils personnalisés selon vos besoins",
                  "Accompagnement dédié en cas de sinistre",
                  "Réactivité et transparence totale"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-axa-red" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveSection('history')}
                className="border-2 border-axa-blue text-axa-blue px-8 py-3 rounded-sm font-bold hover:bg-axa-blue hover:text-white transition-all"
              >
                Découvrir nos valeurs
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
                  onClick={() => setActiveSection('simulation')}
                  className="text-axa-red font-bold flex items-center gap-2 text-sm uppercase"
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
              <form 
                className="bg-white p-8 rounded-2xl shadow-2xl space-y-6" 
                onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    type: formData.get('type'),
                    message: formData.get('message')
                  };
                  
                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    const result = await response.json();
                    if (result.success) {
                      alert('Merci ! Votre demande a été envoyée.');
                      (e.target as HTMLFormElement).reset();
                    } else {
                      alert('Erreur lors de l\'envoi.');
                    }
                  } catch (error) {
                    alert('Erreur réseau.');
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-axa-blue uppercase tracking-wider">Nom Complet</label>
                    <input name="name" type="text" placeholder="Votre nom" className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-axa-blue transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-axa-blue uppercase tracking-wider">Téléphone</label>
                    <input name="phone" type="tel" placeholder="Votre numéro" className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-axa-blue transition-all" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-axa-blue uppercase tracking-wider">Type d'assurance</label>
                  <select name="type" className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-axa-blue transition-all bg-white">
                    <option value="Automobile">Automobile</option>
                    <option value="Habitation">Habitation</option>
                    <option value="Santé">Santé</option>
                    <option value="Professionnelle">Professionnelle</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-axa-blue uppercase tracking-wider">Message (Optionnel)</label>
                  <textarea name="message" rows={4} placeholder="Comment pouvons-nous vous aider ?" className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-axa-blue transition-all"></textarea>
                </div>
                <button type="submit" className="w-full bg-axa-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">
                  Envoyer ma demande
                </button>
              </form>
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
    simulation: (
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
          
          {/* Simulation Tool */}
          <div className="mb-20">
            <SimulationForm />
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
            <button onClick={() => setActiveSection('history')} className={`font-semibold text-sm transition-colors hover:text-axa-red ${isScrolled ? 'text-axa-blue' : 'text-white'}`}>Historique</button>
            <button onClick={() => setActiveSection('simulation')} className={`font-semibold text-sm transition-colors hover:text-axa-red ${isScrolled ? 'text-axa-blue' : 'text-white'}`}>Offres</button>
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
          <span className="text-[10px] font-bold uppercase">Histoire</span>
        </button>
        <button 
          onClick={() => setActiveSection('simulation')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeSection === 'simulation' ? 'text-axa-blue' : 'text-slate-400'}`}
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
              <li><button onClick={() => setActiveSection('history')} className="hover:text-white transition-all">Notre Histoire</button></li>
              <li><button onClick={() => setActiveSection('simulation')} className="hover:text-white transition-all">Offres</button></li>
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
              className="absolute inset-0 bg-axa-blue/60 backdrop-blur-sm" 
              onClick={() => setShowPopup(false)}
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6 md:p-12 text-center zellig-pattern"
            >
              <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-slate-400 hover:text-axa-blue transition-all"><X /></button>
              <div className="w-20 h-20 bg-axa-red/10 text-axa-red rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><Phone size={40} /></div>
              <h2 className="text-3xl font-extrabold text-axa-blue mb-4">Besoin d'un conseil immédiat ?</h2>
              <p className="text-slate-500 mb-10 text-lg">Nos experts sont à votre écoute pour vous guider vers la meilleure protection.</p>
              <div className="flex flex-col gap-4">
                <a href="tel:0522665908" className="block bg-axa-blue text-white py-5 rounded-xl font-bold text-xl shadow-xl shadow-axa-blue/20 hover:bg-blue-900 transition-all flex items-center justify-center gap-3">
                  <Phone /> 05 22 66 59 08
                </a>
                <button onClick={() => setShowPopup(false)} className="text-slate-400 font-bold text-sm uppercase tracking-widest">Peut-être plus tard</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
