'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/animations';
import HelpModal from '@/components/HelpModal';

export default function GoodHeartsPage() {
  const [helpModal, setHelpModal] = useState(false);

  const goals = [
    "Оказание материальной помощи детям, нуждающимся в дорогостоящем медикаментозном лечении, операционном вмешательстве и реабилитации.",
    "Оказание материальной помощи детям из малообеспеченных семей в форме оплаты медикаментов, расходных материалов, лабораторных исследований, медицинского оборудования, а также любых других расходов, необходимых для оказания качественных медицинских услуг.",
    "В исключительных случаях, по решению Директора Фонда, помощь может быть оказана лицам старше 18 лет."
  ];

  const activities = [
    "Организуем акции, мероприятия по сбору пожертвований;",
    "Оказываем содействие детям, нуждающимся в медицинской помощи, детям-сиротам и детям, оставшимся без попечения родителей;",
    "Принимаем участие в совместных программах, проектах и мероприятиях региональных, межрегиональных фондов и организаций, преследующих схожие цели;",
    "Проводим иные мероприятия, способствующие реализации целей данной программы."
  ];

  // Место для 6 фотографий
  const imageSlots = [1, 2, 3, 4, 5, 6];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 px-4 text-center">
          <p className="text-orange-100 text-sm font-medium mb-2 uppercase tracking-wider">БЛАГОТВОРИТЕЛЬНАЯ ПРОГРАММА</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            «Добрые сердца» 🧡
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Программа направлена на оказание материальной помощи детям из малообеспеченных семей и детям со сложными заболеваниями.
          </p>
          <button
            onClick={() => setHelpModal(true)}
            className="px-8 py-4 bg-white text-orange-700 rounded-xl font-bold text-lg hover:bg-yellow-50 hover:scale-105 transition-all shadow-xl"
          >
            Поддержать проект ❤️
          </button>
        </section>
      </FadeIn>

      {/* 📸 Места для фотографий */}
      <FadeIn>
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center text-orange-800 mb-10">Фотографии проекта</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {imageSlots.map((slot) => (
                <div key={slot} className="aspect-video bg-white border-2 border-dashed border-orange-300 rounded-2xl flex flex-col items-center justify-center text-orange-400 hover:border-orange-500 transition-colors group">
                  <svg className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Место для фото {slot}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ЦЕЛИ */}
      <FadeIn>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-8 text-center">ЦЕЛИ ПРОГРАММЫ</h2>
            <div className="space-y-6">
              {goals.map((goal, i) => (
                <div key={i} className="bg-orange-50 rounded-xl p-6 shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow">
                  <p className="text-gray-700 font-medium">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* В рамках программы */}
      <FadeIn>
        <section className="py-16 px-4 bg-orange-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-8 text-center">В рамках программы мы:</h2>
            <ul className="grid md:grid-cols-2 gap-6">
              {activities.map((act, i) => (
                <li key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                  <span className="text-orange-600 mt-1 text-xl font-bold">✓</span>
                  <span className="text-gray-700">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="py-20 px-4 bg-gradient-to-br from-orange-600 to-orange-800 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ваши «Добрые сердца» меняют судьбы</h2>
            <p className="text-xl opacity-95 mb-10">
              Каждое пожертвование — это шанс на лечение и здоровое детство
            </p>
            <button
              onClick={() => setHelpModal(true)}
              className="px-10 py-5 bg-white text-orange-700 rounded-2xl font-bold text-xl hover:bg-yellow-50 hover:scale-105 transition-all shadow-2xl"
            >
              Сделать пожертвование 🧡
            </button>
            <p className="mt-6 text-sm opacity-80">🔒 Безопасный платёж • Чек по 54-ФЗ • 100% на помощь</p>
          </div>
        </section>
      </FadeIn>

      <HelpModal isOpen={helpModal} onClose={() => setHelpModal(false)} />
    </main>
  );
}