// 🔥 Server Component: отключаем кэш для мгновенного обновления сборов
export const dynamic = 'force-dynamic';
import CampaignCarousel from '@/components/CampaignCarousel';
import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config'; 
import { FadeIn } from '@/components/animations';
import HeroButtons from '@/components/HeroButtons'; // ✅ Импорт кнопок

// Запрос сборов из Keystatic
async function getHomeCampaigns() {
  try {
    const reader = createReader(process.cwd(), config);
    const all = await reader.collections.campaigns.all();
    return all
      .filter((c: any) => c.entry?.status === 'active')
      .sort((a: any, b: any) => {
        if (b.entry?.urgency === 'urgent' && a.entry?.urgency !== 'urgent') return 1;
        if (a.entry?.urgency === 'urgent' && b.entry?.urgency !== 'urgent') return -1;
        return 0;
      })
    
  } catch (error) {
    console.error('❌ Ошибка загрузки сборов:', error);
    return [];
  }
}

export default async function Home() {
  const campaigns = await getHomeCampaigns();

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <FadeIn>
        <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <p className="text-orange-100 text-sm md:text-base font-medium mb-2 tracking-wider uppercase">КЛУБ ДОБРЫХ ЛЮДЕЙ</p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              УЖЕ 8 ЛЕТ МЫ ДЕЛАЕМ<br />
              <span className="text-yellow-300">ЭТОТ МИР ЛУЧШЕ!</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 text-2xl md:text-3xl font-heading italic">
              <span>Творите</span>
              <span className="text-yellow-300">Добро</span>
              <span>Неустанно</span>
            </div>
            
            {/* ✅ Кнопки с модалками */}
            <HeroButtons />
            
          </div>
        </section>
      </FadeIn>

      {/* 🔥 ИМ НУЖНА ПОМОЩЬ (Динамические сборы из Keystatic) */}
      <FadeIn delay={0.1}>
                  <section className="py-16 px-4 bg-orange-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-orange-800 mb-12">
                Им нужна помощь ❤️
              </h2>
              
              {/* ✅ Карусель сборов */}
              <CampaignCarousel campaigns={campaigns} />

              <div className="text-center mt-10">
                <a href="/campaigns" className="inline-block px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-all">
                  Все сборы →
                </a>
              </div>
            </div>
          </section>
      </FadeIn>
      {/* О фонде */}
      <FadeIn delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-orange-800 mb-6">О фонде</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Благотворительный фонд социальной помощи и поддержки граждан "Клуб Добрых Людей (КДЛ)" работает с 2016 года и каждый день старается помочь детям и взрослым, всем людям, кто в ней нуждается.
            </p>
            <div className="bg-orange-50 rounded-2xl p-8 mb-8 border-l-4 border-orange-500">
              <h3 className="font-heading text-2xl font-bold text-orange-700 mb-4">МИССИЯ:</h3>
              <p className="text-gray-700 leading-relaxed">
                Фонд "КДЛ" с 2016 организует работу по Республике Ингушетия, так же мы рассматриваем заявки из Чеченской республики и респ. Северная Осетия-Алания по развитию добровольчества и популяризации донорства крови и ее компонентов, оказывает помощь детям и взрослым с различными заболеваниями здоровья, реализует образовательные проекты для детей из малообеспеченных и многодетных семей.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Проекты */}
      <FadeIn delay={0.3}>
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-orange-800 mb-12">Акции и проекты Фонда</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="#" className="group rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all border-2 border-orange-200">
                <div className="text-4xl mb-3">👵</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Проект "Мы рядом"</h3>
                <p className="text-sm text-gray-600">Поддержка одиноких пожилых людей</p>
              </a>
              <a href="/goodhearts" className="group rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all border-2 border-orange-200">
                <div className="text-4xl mb-3">🧡</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Программа «Добрые сердца»</h3>
                <p className="text-sm text-gray-600">Помощь детям из малообеспеченных семей</p>
              </a>
              <a href="/overcoming" className="group rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all border-2 border-purple-200">
                <div className="text-4xl mb-3">💪</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Проект «Преодоление»</h3>
                <p className="text-sm text-gray-600">Поддержка женщин в сложной ситуации</p>
              </a>
              <a href="/seagull" className="group rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all border-2 border-orange-200">
                <div className="text-4xl mb-3">🕊️</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">Центр «Чайка»</h3>
                <p className="text-sm text-gray-600">Реабилитация для детей с ДЦП и РАС</p>
              </a>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Мы помогли */}
      <FadeIn delay={0.4}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-orange-800 mb-4">МЫ ПОМОГЛИ ✨</h2>
            <p className="text-center text-gray-600 mb-12">Благодаря вашей поддержке эти сборы завершены успешно</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Костоева Аиша", age: 3, diagnosis: "ДЦП", amount: 105586 },
                { name: "Аржеваров Амин", age: 9, diagnosis: "Лейкоз", amount: 89482 },
                { name: "Героева Сафият", age: 11, diagnosis: "Почечная недостаточность", amount: 76698 },
                { name: "Бокова Ясмина", age: 6, diagnosis: "ДЦП", amount: 104002 },
              ].map((c, i) => (
                <div key={i} className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h3 className="font-bold text-gray-900 mb-2">{c.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{c.age} лет</p>
                  <p className="text-orange-600 text-sm mb-3">{c.diagnosis}</p>
                  <div className="pt-3 border-t border-orange-200">
                    <p className="text-xs text-gray-500">Собрано</p>
                    <p className="text-lg font-bold text-green-600">{c.amount.toLocaleString('ru-RU')} ₽</p>
                    <p className="text-xs text-green-600">✓ Сбор завершен</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.5}>
        <section className="py-20 px-4 bg-gradient-to-br from-orange-600 to-orange-800 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Помогите нам сделать жизнь счастливее!</h2>
            <p className="text-xl mb-10 opacity-90">Вы можете внести свой вклад с помощью пожертвования.<br/>Каждый перевод будет большой помощью!</p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a href="/donate" className="bg-white text-orange-700 rounded-2xl p-8 font-bold text-xl hover:scale-105 transition-transform shadow-xl text-center">💰 Помочь деньгами</a>
              <a href="/volunteer" className="bg-orange-700 border-2 border-white text-white rounded-2xl p-8 font-bold text-xl hover:bg-orange-800 transition-colors text-center">🤝 Помочь делом</a>
            </div>
            <blockquote className="font-heading text-xl italic opacity-90">"И творите добро, ведь Аллах любит творящих добро"<br/><span className="text-sm">Коран, 2:195</span></blockquote>
          </div>
        </section>
      </FadeIn>

      {/* Отчёты и документы */}
      <FadeIn>
        <section className="py-20 px-4 bg-orange-400">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">Отчеты и документы</h2>
            <p className="text-lg text-gray-800 mb-12 max-w-xl mx-auto">Мы ответственно следим за документацией, и готовы показать всю отчетность фонда</p>
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg text-3xl">📋</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Учредительные документы Фонда</h3>
                <a href="#" className="text-gray-600 hover:text-gray-900 underline text-sm">Скачать ↓</a>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg text-3xl">📝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Договор публичной оферты</h3>
                <a href="#" className="text-gray-600 hover:text-gray-900 underline text-sm">Скачать ↓</a>
              </div>
            </div>
            <a href="/reports" className="px-10 py-4 bg-transparent border-2 border-gray-900 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all inline-block">
              Архив отчетов
            </a>
          </div>
        </section>
      </FadeIn>

      {/* Фонд в лицах */}
      <FadeIn>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">Фонд в лицах</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Если вы хотите присоединиться к нашей команде, свяжитесь с нами:<br/>
              <a href="mailto:dobro.kdl@gmail.com" className="text-orange-600 underline">dobro.kdl@gmail.com</a><br/>
              <a href="tel:+79287312602" className="text-orange-600 underline">+7 928 731 26 02</a>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Матиева Ната Руслановна", role: "Директор Фонда" },
                { name: "Гандарова Ася Асламбековна", role: "Заместитель директора" },
                { name: "Костоева Хади Беслановна", role: "Фотограф / видеограф" },
                { name: "Досхоева Фатима Амерхановна", role: "Администратор" },
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-5xl mb-4 shadow-lg">👤</div>
                  <h3 className="font-bold text-gray-900 text-center text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-500 text-center mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Реквизиты */}
      <FadeIn>
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="bg-orange-500 rounded-2xl p-8 md:p-12 text-white max-w-lg mx-auto">
              <h3 className="font-heading text-3xl font-bold mb-6">Реквизиты</h3>
              <div className="space-y-3 text-sm md:text-base">
                <p>Фонд "КДЛ"</p>
                <p>386001, г. Магас, ул. Чахкиева 31, Республика Ингушетия</p>
                <p><strong>ИНН/КПП</strong> 0608040494/060801001 <strong>БИК</strong> 040702615</p>
                <p><strong>Р/с:</strong> 40703810860350000067</p>
                <p>Ставропольское отделение № 5230 ПАО «Сбербанк»</p>
                <p><strong>к/с</strong> 30101810907020000615</p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Статистика */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><p className="text-3xl md:text-4xl font-bold text-orange-600">8 лет</p><p className="text-sm text-gray-600 mt-1">Помогаем людям</p></div>
          <div><p className="text-3xl md:text-4xl font-bold text-orange-600">400+</p><p className="text-sm text-gray-600 mt-1">Подопечных</p></div>
          <div><p className="text-3xl md:text-4xl font-bold text-orange-600">42M ₽</p><p className="text-sm text-gray-600 mt-1">Собрано в 2023</p></div>
          <div><p className="text-3xl md:text-4xl font-bold text-orange-600">100%</p><p className="text-sm text-gray-600 mt-1">Прозрачность</p></div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gradient-to-b from-orange-500 to-orange-300 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-3 text-sm">
              <p>Телефон: <a href="tel:+79287312602" className="underline hover:no-underline">+7 928 731 26 02</a></p>
              <p>WhatsApp: <a href="https://wa.me/79287312602" className="underline hover:no-underline">+7 928 731 26 02</a></p>
              <p>Почта: <a href="mailto:dobro.kdl@gmail.com" className="underline hover:no-underline">dobro.kdl@gmail.com</a></p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 text-2xl">🧡</div>
              <p className="font-semibold text-lg">Клуб Добрых Людей (КДЛ)</p>
            </div>
            <div className="text-sm">
              <h4 className="font-bold mb-3">Адрес</h4>
              <p>386001, Республика Ингушетия,<br/>город Магас, улица Чахкиева, дом 31</p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/30">
            <p className="text-2xl md:text-3xl font-bold text-orange-100">СПАСИБО, ЧТО ПОМОГАЕТЕ НАМ ПОМОГАТЬ!</p>
            <a href="/keystatic" className="mt-4 inline-block text-xs text-orange-200 hover:text-white transition-colors opacity-60 hover:opacity-100">🔒 Вход для администратора</a>
          </div>
        </div>
      </footer>
    </main>
  );
}