import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SimulationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    carType: 'citadine',
    age: '25-40',
    usage: 'prive',
    bonus: '0'
  });
  const [result, setResult] = useState<number | null>(null);

  const calculateQuote = () => {
    let base = 2500;
    if (formData.carType === 'berline') base += 1000;
    if (formData.carType === 'suv') base += 2000;
    if (formData.age === 'moins-25') base *= 1.5;
    if (formData.usage === 'pro') base *= 1.2;
    
    const bonus = parseInt(formData.bonus);
    base = base * (1 - bonus / 100);
    
    setResult(Math.round(base));
    setStep(3);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-w-2xl mx-auto">
      <div className="bg-axa-blue p-6 text-white flex items-center gap-3">
        <Calculator size={24} />
        <h3 className="text-xl font-bold">Simulateur Assurance Auto Express</h3>
      </div>
      
      <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-axa-blue uppercase mb-2">Type de véhicule</label>
                <select 
                  value={formData.carType}
                  onChange={(e) => setFormData({...formData, carType: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-axa-blue bg-white"
                >
                  <option value="citadine">Citadine / Compacte</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV / 4x4</option>
                  <option value="utilitaire">Utilitaire</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-axa-blue uppercase mb-2">Tranche d'âge du conducteur</label>
                <div className="grid grid-cols-2 gap-4">
                  {['moins-25', '25-40', '40-60', 'plus-60'].map((age) => (
                    <button
                      key={age}
                      onClick={() => setFormData({...formData, age})}
                      className={`px-4 py-2 rounded-lg border transition-all text-sm font-semibold ${
                        formData.age === age ? 'bg-axa-blue text-white border-axa-blue' : 'bg-white text-slate-600 border-slate-200 hover:border-axa-blue'
                      }`}
                    >
                      {age === 'moins-25' ? '- 25 ans' : age === '25-40' ? '25 - 40 ans' : age === '40-60' ? '40 - 60 ans' : '+ 60 ans'}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-axa-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
              >
                Continuer <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-axa-blue uppercase mb-2">Usage du véhicule</label>
                <select 
                  value={formData.usage}
                  onChange={(e) => setFormData({...formData, usage: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-axa-blue bg-white"
                >
                  <option value="prive">Privé / Trajet Travail</option>
                  <option value="pro">Professionnel / Commercial</option>
                  <option value="taxi">Taxi / Transport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-axa-blue uppercase mb-2">Bonus / Malus actuel (%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="5"
                  value={formData.bonus}
                  onChange={(e) => setFormData({...formData, bonus: e.target.value})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-axa-blue"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                  <span>0%</span>
                  <span>{formData.bonus}%</span>
                  <span>50%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-slate-200 text-slate-500 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Retour
                </button>
                <button 
                  onClick={calculateQuote}
                  className="flex-2 bg-axa-red text-white py-4 px-8 rounded-xl font-bold hover:bg-red-700 transition-all"
                >
                  Calculer mon tarif
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-xl font-bold text-axa-blue mb-2">Votre tarif estimé</h4>
              <div className="text-5xl font-black text-axa-blue mb-2">
                {result} <span className="text-2xl">MAD/an</span>
              </div>
              <p className="text-slate-500 text-sm mb-8">Ce tarif est une estimation basée sur les informations fournies. Un conseiller vous contactera pour affiner cette offre.</p>
              <button 
                onClick={() => setStep(1)}
                className="w-full bg-axa-blue text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-all"
              >
                Refaire une simulation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SimulationForm;
