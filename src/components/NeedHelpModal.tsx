'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NeedHelpModal({ isOpen, onClose }: NeedHelpModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    situation: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Простая валидация
    if (!formData.name.trim() || !formData.phone.trim() || !formData.situation.trim()) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }
    if (!formData.consent) {
      setError('Необходимо согласие на обработку данных');
      return;
    }

    // Здесь будет отправка на бэкенд
    console.log('📩 Заявка на помощь:', formData);
    
    // Имитация отправки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    
    // Закрыть модалку через 3 секунды
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', phone: '', region: '', situation: '', consent: false });
    }, 3000);
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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center z-10">
              <h3 className="font-heading text-xl font-bold text-text-primary dark:text-text-dark">
                {submitted ? '✅ Заявка отправлена!' : 'Нужна помощь? 🤝'}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Контент */}
            <div className="p-6">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-text-primary dark:text-text-dark mb-2">
                    Спасибо за обращение!
                  </p>
                  <p className="text-text-secondary dark:text-text-darkSec">
                    Наш специалист свяжется с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Имя */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Как к вам обращаться?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">
                      Телефон для связи *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Регион */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">
                      Регион проживания
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                    >
                      <option value="">Выберите регион</option>
                      <option value="ingushetia">Республика Ингушетия</option>
                      <option value="chechnya">Чеченская Республика</option>
                      <option value="osetia">Республика Северная Осетия-Алания</option>
                      <option value="other">Другой регион</option>
                    </select>
                  </div>

                  {/* Описание ситуации */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">
                      Опишите вашу ситуацию *
                    </label>
                    <textarea
                      name="situation"
                      value={formData.situation}
                      onChange={handleChange}
                      placeholder="Расскажите, какая помощь вам нужна..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all resize-none"
                      required
                    />
                    <p className="text-xs text-text-muted dark:text-slate-500 mt-1">
                      Мы сохраняем конфиденциальность. Данные не передаются третьим лицам.
                    </p>
                  </div>

                  {/* Согласие */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      required
                    />
                    <span className="text-sm text-text-secondary dark:text-text-darkSec group-hover:text-text-primary transition-colors">
                      Я согласен на{' '}
                      <a href="/privacy" className="text-brand-600 hover:underline" target="_blank">
                        обработку персональных данных
                      </a>
                    </span>
                  </label>

                  {/* Ошибка */}
                  {error && (
                    <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                      {error}
                    </p>
                  )}

                  {/* Кнопка */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    Отправить заявку 📩
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