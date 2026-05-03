'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [coverFees, setCoverFees] = useState(true);
  const [consent, setConsent] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const presets = [500, 1000, 2500, 5000];
  const fee = coverFees ? Math.round(amount * 0.05) : 0;
  const total = amount + fee;

  const handlePreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustom = (val: string) => {
    setCustomAmount(val);
    const num = parseInt(val) || 0;
    if (num >= 100) setAmount(num);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    // Здесь будет создание платежа через ЮKassa
    console.log('💳 Donation:', { amount, total, name: anonymous ? 'Аноним' : name, email });
    
    // Имитация успешного платежа
    setStep('success');
    
    setTimeout(() => {
      onClose();
      setStep('form');
      setAmount(1000);
      setCustomAmount('');
      setName('');
      setEmail('');
      setAnonymous(false);
      setCoverFees(true);
      setConsent(false);
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
                {step === 'success' ? '✅ Спасибо за помощь!' : 'Хочу помочь ❤️'}
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
              {step === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-text-primary dark:text-text-dark mb-2">
                    Ваше пожертвование принято!
                  </p>
                  <p className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                    {total.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-text-secondary dark:text-text-darkSec text-sm">
                    Чек отправлен на {email || 'вашу почту'}<br />
                    Спасибо, что делаете мир лучше! 🙏
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Выбор суммы */}
                  <div>
                    <p className="text-sm font-medium text-text-secondary dark:text-text-darkSec mb-3">Выберите сумму</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {presets.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePreset(p)}
                          className={`py-3 rounded-xl font-semibold transition-all ${
                            amount === p && !customAmount
                              ? 'bg-brand-600 text-white shadow-lg scale-[1.02]'
                              : 'bg-surface-100 dark:bg-slate-700 text-text-secondary dark:text-text-darkSec hover:bg-surface-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {p.toLocaleString('ru-RU')} ₽
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">₽</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => handleCustom(e.target.value)}
                        placeholder="Другая сумма"
                        min={100}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                      />
                    </div>
                    <p className="text-xs text-text-muted dark:text-slate-500 mt-1">Минимальная сумма: 100 ₽</p>
                  </div>

                  {/* Итоговая сумма */}
                  <div className="bg-brand-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-secondary dark:text-text-darkSec">Сумма помощи</span>
                      <span className="font-semibold text-text-primary dark:text-text-dark">{amount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {coverFees && (
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-text-secondary dark:text-text-darkSec">+ комиссия за обработку (5%)</span>
                        <span className="text-text-secondary dark:text-text-darkSec">{fee.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 dark:border-slate-600 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-text-primary dark:text-text-dark">К оплате</span>
                        <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{total.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </div>

                  {/* Опции */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-sm text-text-secondary dark:text-text-darkSec group-hover:text-text-primary transition-colors">Анонимное пожертвование</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={coverFees}
                        onChange={(e) => setCoverFees(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-sm text-text-secondary dark:text-text-darkSec group-hover:text-text-primary transition-colors">
                        Добавить 5% на покрытие комиссий → 100% помощи дойдёт до подопечного
                      </span>
                    </label>
                  </div>

                  {/* Контакты (если не анонимно) */}
                  {!anonymous && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">Ваше имя</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Иван"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">Email для чека *</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mail@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Согласие */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      required
                    />
                    <span className="text-sm text-text-secondary dark:text-text-darkSec">
                      Я соглашаюсь с{' '}
                      <a href="/terms" className="text-brand-600 hover:underline" target="_blank">офертой</a>{' '}
                      и{' '}
                      <a href="/privacy" className="text-brand-600 hover:underline" target="_blank">политикой конфиденциальности</a>
                    </span>
                  </label>

                  {/* Кнопка */}
                  <button
                    type="submit"
                    disabled={!consent || (!anonymous && !email)}
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    Перейти к оплате 💳
                  </button>

                  <p className="text-xs text-center text-text-muted dark:text-slate-500 flex items-center justify-center gap-1">
                    🔒 Безопасный платёж через ЮKassa • Чек по 54-ФЗ • Возврат в течение 14 дней
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