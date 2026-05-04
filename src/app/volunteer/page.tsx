export const dynamic = 'force-dynamic';
import { createReader } from '@keystatic/core/reader';
import config from '@root/keystatic.config';
import { FadeIn } from '@/components/animations';

async function getVolunteerTasks() {
  try {
    const reader = createReader(process.cwd(), config);
    const all = await reader.collections.volunteerTasks.all();
    return all.filter((t: any) => t.entry?.isActive !== false);
  } catch (error) {
    console.error('❌ Ошибка загрузки задач:', error);
    return [];
  }
}

export default async function VolunteerPage() {
  const tasks = await getVolunteerTasks();
  const categoryMap: Record<string, { label: string; color: string }> = {
    events: { label: '👥 Мероприятия', color: 'bg-purple-100 text-purple-700' },
    items: { label: '📦 Вещи', color: 'bg-green-100 text-green-700' },
    transport: { label: '🚗 Транспорт', color: 'bg-blue-100 text-blue-700' },
    online: { label: '💻 Онлайн', color: 'bg-gray-100 text-gray-700' },
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-20 px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Помочь делом 🤝</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">Ваше время и усилия — бесценный вклад в добрые дела</p>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="py-12 px-4 bg-orange-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed italic mb-4">
                «Помогайте друг другу в благочестии и богобоязненности, но не помогайте друг другу в грехе и вражде. Бойтесь Аллаха, ведь Аллах суров в наказании»
              </p>
              <p className="text-sm text-orange-600 font-semibold">— Сура «Аль-Маида» (Трапеза), аят 2</p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-orange-800 mb-4 text-center">Актуальные задачи</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Выберите дело по душе — каждая помощь важна</p>

            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Пока нет активных задач</p>
                <p className="text-sm mt-2">Загляните позже — мы обязательно найдём дело для вас</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(({ slug, entry }: any) => {
                  const title = String(entry?.title || '');
                  const desc = typeof entry?.description === 'function' ? entry.description() : String(entry?.description || '');
                  const category = String(entry?.category || 'other');
                  const timeRequired = String(entry?.timeRequired || '');
                  const location = String(entry?.location || '');
                  const contact = String(entry?.contact || '');
                  const { label, color } = categoryMap[category] || { label: '🏠 Другое', color: 'bg-orange-100 text-orange-700' };

                  return (
                    <article key={slug} className="bg-orange-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${color}`}>{label}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{desc}</p>
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                        {timeRequired && <p>⏱️ <span className="text-gray-500">Время:</span> {timeRequired}</p>}
                        {location && <p>📍 <span className="text-gray-500">Место:</span> {location}</p>}
                        {contact && <p>📞 <span className="text-gray-500">Контакт:</span> {contact}</p>}
                      </div>
                      <a href={`https://wa.me/79287312602?text=Здравствуйте!%20Хочу%20помочь%20с%20задачей:%20${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-600 text-white py-2 rounded-lg text-center font-medium hover:bg-orange-700 transition">
                        Хочу помочь
                      </a>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.3}>
        <section className="py-16 px-4 bg-orange-50 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-orange-800 mb-4">Не нашли задачу по душе?</h2>
            <p className="text-gray-600 mb-6">Напишите нам — мы подберём дело, которое подойдёт именно вам</p>
            <a href="https://wa.me/79287312602" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-md">
              Написать в WhatsApp 💬
            </a>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}