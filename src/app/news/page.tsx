// 🔥 Server Component + отключаем кэш
export const dynamic = 'force-dynamic';

import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Image from 'next/image';
import { FadeIn } from '@/components/animations';

// Получаем новости из Keystatic
async function getNews() {
  try {
    const reader = createReader(process.cwd(), config);
    const all = await reader.collections.news.all();
    // Сортируем по дате: новые сверху
    return all.sort((a: any, b: any) => {
      const dateA = new Date(a.entry.publishedAt || 0).getTime();
      const dateB = new Date(b.entry.publishedAt || 0).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('❌ Ошибка загрузки новостей:', error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-16 px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Новости фонда 📰</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            Следите за нашими успехами, акциями и историями подопечных
          </p>
        </section>
      </FadeIn>

      {/* Список новостей */}
      <FadeIn delay={0.1}>
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            {news.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Пока нет новостей</p>
                <p className="text-sm mt-2">Загляните позже — мы обязательно расскажем что-то важное</p>
              </div>
            ) : (
              <div className="space-y-8">
                {news.map(({ slug, entry }: any) => (
                  <article key={slug} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
                    {entry.image?.src && (
                      <div className="h-56 md:h-72 relative">
                        <Image
                          src={entry.image.src}
                          alt={entry.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        {entry.publishedAt && (
                          <span>📅 {new Date(entry.publishedAt).toLocaleDateString('ru-RU')}</span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{entry.title}</h2>
                      {entry.excerpt && (
                        <p className="text-lg text-gray-600 mb-4 italic border-l-4 border-orange-400 pl-4">
                          {entry.excerpt}
                        </p>
                      )}
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {entry.content}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </FadeIn>

            {/* CTA: Соцсети */}
      <FadeIn delay={0.2}>
        <section className="py-16 px-4 bg-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-orange-800 mb-4">
              Хотите быть в курсе?
            </h2>
            <p className="text-gray-600 mb-6">
              Подпишитесь на наши соцсети, чтобы не пропустить важные новости
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {/* Telegram — замените ссылку на вашу */}
              <a 
                href="https://t.me/dobrokdl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <span className="text-xl">✈️</span> Telegram
              </a>
              
              {/* ВКонтакте — ваша ссылка */}
              <a 
                href="https://vk.com/dobrokdl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <span className="text-xl">💬</span> ВКонтакте
              </a>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}