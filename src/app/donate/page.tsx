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
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-2">Сделать пожертвование ❤️</h1>
          <p className="text-gray-600">Безопасный платёж. Чек придёт на почту.</p>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-orange-100">
          <p className="text-sm font-medium text-gray-600 mb-3">Выберите сумму</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {presets.map((p) => (
              <button key={p} onClick={() => setAmount(p)} className={`py-3 rounded-xl font-semibold transition-all ${amount === p ? 'bg-brand-600 text-white shadow-lg scale-[1.02]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {p.toLocaleString('ru-RU')} ₽
              </button>
            ))}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Другая сумма</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-lg" />
          </div>
          <div className="space-y-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 bg-gray-50" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Анонимное пожертвование</span>
            </label>
            {!anonymous && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Ваше имя</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Email для чека</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mail@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 outline-none" />
                </div>
              </div>
            )}
          </div>
          <button onClick={handlePay} className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition">Перейти к оплате 💳</button>
          <p className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center gap-1">🔒 Платёж защищён по стандарту PCI DSS • ЮKassa • 54-ФЗ</p>
        </div>
      </section>
    </FadeIn>
  );
}