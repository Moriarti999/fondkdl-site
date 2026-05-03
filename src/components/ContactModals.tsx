'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalsProps {
  isEmailOpen: boolean;
  setIsEmailOpen: (val: boolean) => void;
  isPhoneOpen: boolean;
  setIsPhoneOpen: (val: boolean) => void;
}

export default function ContactModals({ isEmailOpen, setIsEmailOpen, isPhoneOpen, setIsPhoneOpen }: ContactModalsProps) {
  // Состояние формы письма
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📩 Сообщение отправлено:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setIsEmailOpen(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <>
      {/* 🔹 МОДАЛКА: НАПИСАТЬ НАМ (Форма) */}
      <AnimatePresence>
        {isEmailOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEmailOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Написать нам ✉️</h3>
                <button onClick={() => setIsEmailOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="text-5xl mb-3">✅</div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Сообщение отправлено!</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Мы ответим вам на почту {formData.email} в ближайшее время.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ваше имя</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Иван Иванов" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ваш Email *</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none" placeholder="mail@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Сообщение *</label>
                      <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Ваш вопрос или предложение..." />
                    </div>
                    <button type="submit" className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg">Отправить сообщение 🚀</button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 МОДАЛКА: ПОЗВОНИТЬ (Номер телефона) */}
      <AnimatePresence>
        {isPhoneOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPhoneOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📞</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Позвоните нам</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">Мы на связи ежедневно с 9:00 до 18:00</p>
                
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
                  <a href="tel:+79280938613" className="text-2xl md:text-3xl font-bold text-orange-600 hover:text-orange-700 transition-colors block">
                    +7 928 093 86 13
                  </a>
                </div>

                <a 
                  href="tel:+79280938613"
                  className="inline-block w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                  Позвонить сейчас 📱
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}