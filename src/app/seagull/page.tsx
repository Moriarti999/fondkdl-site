'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/animations';
import HelpModal from '@/components/HelpModal';

export default function SeagullPage() {
  const [helpModal, setHelpModal] = useState(false);

  const goals = [
    "Оказание материальной, продовольственной и иной помощи семьям, оказавшимся в сложной жизненной ситуации;",
    "Улучшение материального положения социально-незащищенных категорий населения, в том числе и путем экономии расходов Благополучателей-физических лиц;",
    "Улучшение материально-бытового положения Благополучателей за счет обеспечения продуктами питания и иными потребительскими товарами;",
    "Повышение качества жизни Благополучателей."
  ];

  const activities = [
    "Организуем акции, мероприятия по сбору пожертвований;",
    "Акцентируем общественное внимание к проблемам семей, нуждающихся в материальной помощи и поддержке;",
    "Публикуем информацию в средствах массовой информации и сети интернет;",
    "Принимаем участие в совместных программах, проектах и мероприятиях региональных, межрегиональных фондов и организаций, преследующих схожие цели;",
    "Проводим иные мероприятия, способствующие реализации целей данной программы."
  ];

  const imageSlots = [1, 2, 3, 4, 5, 6];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 px-4 text-center">
          <p className="text-orange-100 text-sm font-medium mb-2 uppercase tracking-wider">ПРОЕКТ ФОНДА КДЛ</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Центр реабилитации <span className="text-yellow-300">"ЧАЙКА"</span> 🕊️
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Для детей с ДЦП, РАС и ЗПР из малообеспеченных и многодетных семей.<br />
            Интенсивная реабилитация и социальная адаптация, не выезжая за пределы региона.
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

      {/* Описание проекта */}
      <FadeIn>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-6 text-center">О проекте</h2>
            <div className="bg-orange-50 rounded-2xl p-8 border-l-4 border-orange-500 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-lg">
                Проект направлен на развитие системной и комплексной помощи детям с особенностями развития из малообеспеченных и многодетных семей. Основная идея проекта – создание при Фонде реабилитационного центра, предоставляющего детям с ДЦП, РАС и ЗПР возможность интенсивной реабилитации, а так же социальной адаптации этой категории подопечных, не выезжая за пределы региона.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                Расходы на оплату приезжих специалистов (дорога, аренда квартиры, питание) покрываются за счет орг. взносов тех, кто имеет возможность самостоятельно оплатить курс реабилитации.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Цели */}
      <FadeIn>
        <section className="py-16 px-4 bg-orange-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-8 text-center">ЦЕЛИ ПРОЕКТА</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {goals.map((goal, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <p className="text-gray-700">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Программа */}
      <FadeIn>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-8 text-center">В рамках Программы мы:</h2>
            <ul className="space-y-4">
              {activities.map((act, i) => (
                <li key={i} className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors">
                  <span className="text-orange-600 mt-1 font-bold text-lg">✓</span>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Помогите детям обрести надежду</h2>
            <p className="text-xl opacity-95 mb-10">
              Ваше пожертвование оплачивает курсы реабилитации, работу специалистов и поддержку семей
            </p>
            <button
              onClick={() => setHelpModal(true)}
              className="px-10 py-5 bg-white text-orange-700 rounded-2xl font-bold text-xl hover:bg-yellow-50 hover:scale-105 transition-all shadow-2xl"
            >
              Сделать пожертвование 🕊️
            </button>
            <p className="mt-6 text-sm opacity-80">🔒 Безопасный платёж • Чек по 54-ФЗ • 100% на помощь</p>
          </div>
        </section>
      </FadeIn>

      <HelpModal isOpen={helpModal} onClose={() => setHelpModal(false)} />
    </main>
  );
}