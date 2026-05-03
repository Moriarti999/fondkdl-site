'use client';
import { useState } from 'react';
import { FadeIn } from '@/components/animations';

export default function DonatePage() {
  const [amount, setAmount] = useState(1000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const presets = [500, 1000, 2500, 5000];

  const handlePay = () => alert(`Переход к оплате: ${amount} ₽`);

  return (
    <FadeIn>
      <section className="py-12 px-4 max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary dark:text-text-dark mb-2">Сделать пожертвование ❤️</h1>
          <p className="text-text-secondary dark:text-text-darkSec">Безопасный платёж. Чек придёт на почту.</p>
        </div>

        <div className="card p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700 dark:shadow-soft-dark">
          <p className="text-sm font-medium text-text-secondary dark:text-text-darkSec mb-3">Выберите сумму</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-3 rounded-xl font-semibold transition-all ${
                  amount === p ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-lg scale-[1.02]' : 'bg-surface-100 dark:bg-slate-700 text-text-secondary dark:text-text-darkSec hover:bg-surface-200 dark:hover:bg-slate-600'
                }`}
              >
                {p.toLocaleString('ru-RU')} ₽
              </button>
            ))}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">Другая сумма</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-lg" />
          </div>

          <div className="space-y-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-5 h-5 rounded border-gray-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500 bg-gray-50 dark:bg-slate-700" />
              <span className="text-text-secondary dark:text-text-darkSec group-hover:text-text-primary dark:group-hover:text-text-dark transition-colors">Анонимное пожертвование</span>
            </label>
            
            {!anonymous && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">Ваше имя</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary dark:text-text-darkSec mb-1.5">Email для чека</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mail@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-text-dark focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none" />
                </div>
              </div>
            )}
          </div>

          <button onClick={handlePay} className="btn-primary w-full text-lg py-4">Перейти к оплате 💳</button>
          <p className="mt-4 text-xs text-center text-text-muted dark:text-slate-500 flex items-center justify-center gap-1">🔒 Платёж защищён по стандарту PCI DSS • ЮKassa • 54-ФЗ</p>
        </div>
      </section>
    </FadeIn>
  )
}