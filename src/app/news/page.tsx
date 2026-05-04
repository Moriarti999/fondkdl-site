// 🔥 Server Component + отключаем кэш
export const dynamic = 'force-dynamic';
import { createReader } from '@keystatic/core/reader';
import config from '@root/keystatic.config';
import Image from 'next/image';

// 🔥 ЛОКАЛЬНАЯ БЕЗОПАСНАЯ ОБЁРТКА (гарантирует, что не будет undefined)
function FadeIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

async function getNews() {
  try {
    const reader = createReader(process.cwd(), config);
    const all = await reader.collections.news.all();
    return all.sort((a: any, b: any) => {
      const dateA = new Date(a.entry?.publishedAt || 0).getTime();
      const dateB = new Date(b.entry?.publishedAt || 0).getTime();
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
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-16 px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Новости фонда 📰</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">Следите за нашими успехами, акциями и историями подопечных</p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            {news.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Пока нет новостей</p>
                <p className="text-sm mt-2">Загляните позже — мы обязательно расскажем что-то важное</p>
              </div>
            ) : (
              <div className="space-y-8">
                {news.map(({ slug, entry }: any) => {
                  // 🔥 Безопасная обработка текста (убирает падение при Markdoc-функциях)
                  const content = typeof entry?.content === 'function' ? entry.content() : (entry?.content || '');
                  
                  return (
                    <article key={slug} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 p-6">
                      {entry.image?.src && (
                        <div className="h-56 md:h-72 relative mb-6 rounded-xl overflow-hidden">
                          <Image src={entry.image.src} alt={entry.title} fill className="object-cover" />
                        </div>
                      )}
                      
                      {entry.publishedAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          📅 {new Date(entry.publishedAt).toLocaleDateString('ru-RU')}
                        </div>
                      )}
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{entry.title}</h2>
                      
                      {entry.excerpt && (
                        <p className="text-lg text-gray-600 mb-4 italic border-l-4 border-orange-400 pl-4">{entry.excerpt}</p>
                      )}
                      
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </FadeIn>
    </main>
  );
}