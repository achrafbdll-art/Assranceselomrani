import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a helpful tooltip after 4 seconds to prompt action
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "212661423455"; // Standard formatted WhatsApp number

  const buildWaLink = (message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const defaultMessage = "Bonjour Assurances ELOMRANI, je souhaite obtenir des informations concernant vos offres.";

  const quickLinks = [
    { text: "🚗 Assurance Automobile", msg: "Bonjour, je souhaite un devis d'Assurance Auto s'il vous plaît." },
    { text: "✈️ Assurance Voyage", msg: "Bonjour, je souhaite obtenir de l'aide pour mon assurance de voyage." },
    { text: "🏠 Assurance Habitation", msg: "Bonjour, je souhaite un devis d'Assurance Habitation s'il vous plaît." },
    { text: "💼 Assurance Professionnelle", msg: "Bonjour, j'aimerais recevoir une proposition d'Assurance Professionnelle." }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-[95] flex flex-col items-end">
      {/* Tooltip hint above button */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2 mb-3.5 mr-1 font-semibold max-w-[200px]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Une question ? Écrivez-nous sur WhatsApp !</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 25 }}
            className="bg-white rounded-2xl shadow-2xl w-[350px] overflow-hidden border border-slate-100 mb-4 flex flex-col"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-5 text-white relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-emerald-100 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-md">
                    <MessageCircle fill="currentColor" size={28} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Assurances ELOMRANI</h4>
                  <p className="text-xs text-emerald-100 mt-0.5">En ligne</p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 space-y-4 bg-slate-50 border-b border-slate-150">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-sm text-slate-700">
                <p className="font-medium text-emerald-800 mb-1">🇲🇦 Agence Casablanca</p>
                Bonjour ! Comment pouvons-nous vous guider aujourd'hui ? Sélectionnez un sujet ci-dessous ou démarrez directement la discussion.
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 block">Sujets fréquents</span>
                {quickLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={buildWaLink(link.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 py-2.5 px-4 rounded-xl text-xs font-semibold border border-slate-200/60 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{link.text}</span>
                    <ChevronRight size={14} className="text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Main Action Call */}
            <div className="p-4 bg-white">
              <a
                href={buildWaLink(defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 text-sm"
              >
                <MessageCircle fill="currentColor" size={18} />
                Démarrer une discussion libre
              </a>
              <div className="text-center mt-2.5">
                <a href="tel:+212661423455" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-axa-blue font-semibold transition-colors">
                  <Phone size={12} /> Ou appelez le +212 661-423455
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border transition-all cursor-pointer text-white relative ${
          isOpen 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-emerald-500 border-emerald-400 hover:bg-emerald-600'
        }`}
        aria-label="Contacter sur WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="wa-icon"
              initial={{ scale: 0.6, rotate: 45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.6, rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle fill="currentColor" size={28} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread dot indicator when tooltip is shown */}
        {showTooltip && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
