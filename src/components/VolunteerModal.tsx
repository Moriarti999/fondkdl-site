'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionId: string | null;
}

export default function VolunteerModal({ isOpen, onClose, actionId }: VolunteerModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const actions: Record<string, { title: string; icon: string }> = {
    delivery: { title: '🚚 Развоз продуктов', icon: '🛒' },
    warehouse: { title: '📦 Помощь на складе', icon: '🏭' },
    events: { title: '🎉 Мероприятия', icon: '🎈' },
    online: { title: '💻 Онлайн-помощь', icon: '🌐' },
    mentoring: { title: '👨‍🏫 Наставничество', icon: '🎓' },
    other: { title: '✨ Другая помощь', icon: '💡' }
  };

  const currentAction = actionId ? actions[actionId] : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Заполните имя и телефон');
      return;
    }

    // Здесь будет отправка на бэкенд
    console.log('🤝 Volunteer joined:', { action: actionId, ...formData });
    
    // Имитация успеха
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', phone: '', comment: '' });
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
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-heading text-xl font-bold text-text-primary dark:text-text-dark">
                {submitted ? '✅ Вы с нами!' : 'Присоединяюсь ✨'}
              </h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    🎉
                  </div>
                  <p className="text-lg font-medium text-text-primary dark:text-text-dark mb-2">
                    Спасибо, {formData.name}!
                  </p>
                  <p className="text-text-secondary dark:text-text-darkSec text-sm">
                    {currentAction?.icon} {currentAction?.title}<br />
                    Координатор свяжется с вами в течение 24 часов по номеру {formData.phone}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Выбранная задача */}
                  {currentAction && (
                    <div className="bg-brand-50 dark:bg-slate-700/50 rounded-xl p-4 flex items-center gap-3">
                      <span className="text-2xl">{currentAction.icon}</span>
                      <div>
                        <p className="text-sm text-text-muted dark:text-slate-400">Вы выбираете:</p>
                        <p className="font-medium text-text-primary dark:text-text-dark">{currentAction.title}</p>
                      </div>
                    </div>
                  )}

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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
                      required
                    />
                  </div>

                  {/* Комментарий */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Есть опыт? Удобное время? Напишите..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none resize-none"
                    />
                  </div>

                  {/* Ошибка */}
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                      {error}
                    </p>
                  )}

                  {/* Кнопка */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Отправить заявку 📩
                  </button>

                  <p className="text-xs text-center text-text-muted dark:text-slate-500">
                    🔒 Ваши данные защищены • Не передаём третьим лицам
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}