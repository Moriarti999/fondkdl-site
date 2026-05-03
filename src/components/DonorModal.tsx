'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DonorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonorModal({ isOpen, onClose }: DonorModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('familiar'); // familiar | already | new
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    // Здесь данные отправятся на сервер
    console.log('🩸 Заявка донора:', { name, phone, status });
    
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setName(''); setPhone(''); setStatus('familiar'); setConsent(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Стать донором 🩸</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">×</button>
            </div>

            {/* Контент */}
            <div className="p-6">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Заявка отправлена!</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Координатор свяжется с вами в ближайшее время.<br/>Спасибо за ваше желание помогать!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Имя */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ваше имя</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
                      placeholder="Иван Иванов" 
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Номер телефона</label>
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={e => setPhone(e.target.value)} 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
                      placeholder="+7 (999) 000-00-00" 
                    />
                  </div>

                  {/* Выбор статуса (ползунок/селектор) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ваш статус</label>
                    <div className="space-y-2">
                      {[
                        { id: 'familiar', label: 'Я ознакомился(лась) и хочу помочь' },
                        { id: 'already', label: 'Я уже участвую в подобных программах и хочу помочь' },
                        { id: 'new', label: 'Я не ознакомился(лась), но хочу помочь' }
                      ].map((opt) => (
                        <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${status === opt.id ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
                          <input 
                            type="radio" 
                            name="donorStatus" 
                            value={opt.id} 
                            checked={status === opt.id} 
                            onChange={() => setStatus(opt.id)} 
                            className="w-4 h-4 text-red-600 focus:ring-red-500 accent-red-600" 
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Согласие */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={consent} 
                      onChange={e => setConsent(e.target.checked)} 
                      required 
                      className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500 accent-red-600" 
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Даю согласие на обработку персональных данных и обязуюсь предоставить достоверную информацию</span>
                  </label>

                  {/* Кнопка */}
                  <button 
                    type="submit" 
                    disabled={!consent} 
                    className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Отправить заявку 🩸
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}