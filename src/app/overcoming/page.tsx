'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/animations';
import HelpModal from '@/components/HelpModal';

export default function OvercomingPage() {
  const [helpModal, setHelpModal] = useState(false);

  // Список мероприятий для шахматного порядка
  const activities = [
    { title: "Тренинги с психологом", placeholder: "🧠" },
    { title: "Индивидуальные занятия с психологом (по запросу)", placeholder: "💬" },
    { title: "Встречи со специалистами по запросу участниц (врачи, юристы и т.п.)", placeholder: "👨‍⚕️‍⚖️" },
    { title: "Мед. обследование по показаниям специалистов", placeholder: "🏥" },
    { title: "Курсы (обучение)", placeholder: "📚" },
    { title: "Мастер-классы разной направленности", placeholder: "🎨" },
    { title: "Развлекательные акции (просмотр фильмов, поездки на каток, пикники, и др.)", placeholder: "🎉" }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <FadeIn>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              О проекте <span className="text-brand-600">"Преодоление"</span>
            </h1>
            <div className="w-16 h-1 bg-brand-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Проект направлен на поддержку женщин, оказавшихся в сложной жизненной ситуации. 
              К ним относятся женщины, воспитывающие детей с инвалидностью, матери-одиночки, 
              а так же женщины, которые в силу сложившихся обстоятельств находятся в тяжелом материальном положении...
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Мероприятия: Шахматный порядок */}
      <FadeIn>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center text-gray-900 mb-12">
              Мероприятия, организуемые в рамках проекта:
            </h2>

            <div className="space-y-12">
              {activities.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Место для фотографии */}
                  <div className="w-full md:w-1/2 aspect-video bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-md">
                    {/* 📸 ЗАМЕНИТЕ ЭТОТ БЛОК НА: <img src="/путь-к-фото.jpg" alt={item.title} className="w-full h-full object-cover" /> */}
                    <span className="text-6xl opacity-50">{item.placeholder}</span>
                    <p className="absolute text-sm text-gray-500 mt-20">Фото мероприятия</p>
                  </div>

                  {/* Текст */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Статистика */}
      <FadeIn>
        <section className="py-12 px-4 bg-white border-t border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              Количество участников проекта на 01.11.2023:
            </p>
            <p className="text-5xl md:text-6xl font-bold text-brand-600 mt-2">
              34 женщины
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Достигнутые результаты (Точный текст) */}
      <FadeIn>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-8">
              Достигнутые результаты:
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                Регулярные встречи участниц проекта благотворно влияют на их психологическое состояние. 
                Большинство женщин устроились на работу.
              </p>
              
              <p>
                Встречи со специалистами в разных областях помогают женщинам в решении бытовых проблем, 
                а посещение квалифицированных специалистов способствует улучшению их здоровья.
              </p>

              <div className="pl-4 border-l-4 border-brand-200 space-y-4">
                <p className="font-semibold text-gray-900">
                  Участницы отмечают положительные изменения в отношениях с детьми:
                </p>
                <blockquote className="italic text-gray-800">
                  - "Я сильно нервничаю, но больше не бью их. Девочка стала уже чаще обниматься со мной, спрашивать, люблю ли я ее. Я отвечаю, что люблю"
                </blockquote>
              </div>

              <div className="pl-4 border-l-4 border-brand-200 space-y-4">
                <p className="font-semibold text-gray-900">
                  Изменения в отношениях с мужем:
                </p>
                <blockquote className="italic text-gray-800">
                  - 1."Как только он услышал, что я говорю с психологом и мне готовы оказать помощь, он это услышал и сказал: "Больше не обращайся к психологу, я больше не буду пить и бить тебя". Прошло две недели с тех пор, до сих пор держит слово"
                </blockquote>
              </div>

              <p className="pt-4">
                Мероприятия проекта для участниц - это не только возможность получить новые знания, но и возможность социализироваться, получить поддержку, принятие. Многие говорят, что с нетерпением ждут каждой встречи. На занятиях ведут себя активно, в целом поддерживается атмосфера продуктивности, активности, безопасности и поддержки. Занятия проходят эмоционально, насыщенно - участницы любят посмеяться, но могут и поплакать, разделить свою печаль с другими, поделиться своими историями.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="py-20 px-4 bg-gradient-to-br from-brand-600 to-brand-800 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Помогите нам продолжать эту работу
            </h2>
            <p className="text-xl opacity-95 mb-10">
              Ваше пожертвование напрямую влияет на качество поддержки, которую получают участницы проекта
            </p>
            <button 
              onClick={() => setHelpModal(true)}
              className="px-10 py-5 bg-white text-brand-700 rounded-2xl font-bold text-xl hover:bg-accent-50 hover:scale-105 transition-all shadow-2xl"
            >
              Сделать пожертвование 💜
            </button>
            <p className="mt-6 text-sm opacity-80">
              🔒 Безопасный платёж • Чек по 54-ФЗ • 100% на помощь
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Modal */}
      <HelpModal isOpen={helpModal} onClose={() => setHelpModal(false)} />
    </main>
  );
}