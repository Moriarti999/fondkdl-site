'use client';

import { FadeIn } from '@/components/animations';

export default function AboutPage() {
  const tasks = [
    "Сбор средств на лечение и реабилитацию детей с различными заболеваниями здоровья",
    "Помощь и поддержка семей, оказавшихся в сложной жизненной ситуации",
    "Привлечение внимания к проблемам больных детей и семей, оказавшихся в тяжелой жизненной ситуации",
    "Содействие развитию безвозмездного донорства крови",
    "Развитие волонтерства в регионе"
  ];

  const whoWeHelp = [
    "Дети и взрослые с различными заболеваниями",
    "Пожилые люди (старше 60 лет)",
    "Инвалиды",
    "Малообеспеченные жители Республики",
    "Многодетные семьи"
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 px-4 text-center">
          <p className="text-orange-100 text-sm font-medium mb-2 uppercase tracking-wider">КЛУБ ДОБРЫХ ЛЮДЕЙ</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">О фонде</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
            Благотворительный фонд социальной помощи и поддержки граждан "Клуб Добрых Людей (КДЛ)" работает с 2016 года и каждый день старается помочь детям и взрослым, всем людям, кто в ней нуждается.
          </p>
        </section>
      </FadeIn>

      {/* Миссия */}
      <FadeIn>
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-6 text-center">МИССИЯ</h2>
            <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed text-lg">
                Фонд "КДЛ" с 2016 организует работу по Республике Ингушетия, так же мы рассматриваем заявки из Чеченской республики и респ. Северная Осетия-Алания по развитию добровольчества и популяризации донорства крови и ее компонентов, оказывает помощь детям и взрослым с различными заболеваниями здоровья, реализует образовательные проекты для детей из малообеспеченных и многодетных семей.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Задачи */}
      <FadeIn>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-10 text-center">НАШИ ЗАДАЧИ</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, i) => (
                <div key={i} className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow flex gap-4 items-start">
                  <span className="text-orange-600 text-2xl font-bold flex-shrink-0">✓</span>
                  <p className="text-gray-700 font-medium">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Кому помогаем */}
      <FadeIn>
        <section className="py-16 px-4 bg-orange-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-10">КОМУ ОКАЗЫВАЕТСЯ ПОМОЩЬ</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {whoWeHelp.map((item, i) => (
                <div key={i} className="bg-white px-6 py-4 rounded-xl shadow-sm font-medium text-gray-800 hover:scale-105 hover:shadow-md transition-all cursor-default">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="py-20 px-4 bg-gradient-to-br from-orange-600 to-orange-800 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Присоединяйтесь к нашей команде</h2>
            <p className="text-xl opacity-95 mb-8">Вместе мы можем помочь большему количеству людей</p>
            <a href="/volunteer" className="px-8 py-4 bg-white text-orange-700 rounded-xl font-bold text-lg hover:bg-yellow-50 hover:scale-105 transition-all shadow-xl inline-block">
              Стать волонтёром 🤝
            </a>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}