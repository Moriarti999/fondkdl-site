// 🔥 Server Component + отключаем кэш
export const dynamic = 'force-dynamic';

import { createReader } from '@keystatic/core/reader';
import config from '@root/keystatic.config';
import { FadeIn } from '@/components/animations';

// --- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ (ЧИНИТ ССЫЛКИ) ---
function getFileUrl(entryFile: any) {
  if (!entryFile) return null;
  
  // Получаем путь: может быть объектом { src: '...' } или строкой
  let path = typeof entryFile === 'object' ? (entryFile.src || '') : (entryFile || '');
  if (!path) return null;

  // 🛠️ FIX: Удаляем дублирование путей, если Keystatic ошибся
  // Превращает /files/reports/files/reports/... в /files/reports/...
  path = path.replace('/files/reports/files/reports', '/files/reports');
  // Превращает /files/files/... в /files/... (для документов)
  path = path.replace('/files/files/', '/files/');

  // Убеждаемся, что путь начинается с /
  if (!path.startsWith('/')) path = '/' + path;
  return path;
}
// ----------------------------------------------

async function getReports() {
  try {
    const reader = createReader(process.cwd(), config);
    return (await reader.collections.reports.all())
      .sort((a: any, b: any) => (b.entry.year || 0) - (a.entry.year || 0));
  } catch { return []; }
}

async function getDocuments() {
  try {
    const reader = createReader(process.cwd(), config);
    return await reader.collections.foundingDocuments.all();
  } catch { return []; }
}

export default async function ReportsPage() {
  const reports = await getReports();
  const documents = await getDocuments();

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <FadeIn>
        <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-16 px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Отчёты и документы 📊</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">Прозрачность — наш принцип</p>
        </section>
      </FadeIn>

      {/* Годовые отчёты */}
      <FadeIn delay={0.1}>
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-orange-800 mb-8">Годовые отчёты</h2>
            {reports.length === 0 ? (
              <p className="text-center text-gray-500 py-12">Пока нет отчётов</p>
            ) : (
              <div className="space-y-6">
                {reports.map(({ slug, entry }: any) => {
                  const url = getFileUrl(entry.file); // ✅ Используем исправленную функцию
                  return (
                    <article key={slug} className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold rounded-full">
                            {entry.year} год
                          </span>
                          <h3 className="text-xl font-bold mt-2">{entry.title}</h3>
                        </div>
                        {url ? (
                          <a href={url} target="_blank" className="px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition flex items-center gap-2">
                            📥 Скачать отчёт
                          </a>
                        ) : (
                          <span className="text-gray-400">Скоро будет</span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </FadeIn>

      {/* Учредительные документы */}
      <FadeIn delay={0.2}>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-orange-800 mb-8 text-center">Учредительные документы</h2>
            {documents.length === 0 ? (
              <p className="text-center text-gray-500 py-12">Загрузите через админку</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {documents.map(({ slug, entry }: any) => {
                  const url = getFileUrl(entry.file); // ✅ Используем исправленную функцию
                  return (
                    <div key={slug} className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-2xl">📄</span>
                        <div>
                          <h3 className="font-bold">{entry.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                        </div>
                      </div>
                      {url ? (
                        <a href={url} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition">
                          ⬇️ Скачать PDF
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">Файл не найден</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </FadeIn>

      {/* Цитата */}
      <FadeIn delay={0.3}>
        <section className="py-16 px-4 bg-orange-50 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-800 mb-4">«О те, кто уверовал! Когда вы берёте в долг друг у друга на определённый срок, то записывайте это...»</p>
              <p className="text-sm text-orange-600 font-semibold">— Сура «Аль-Baкара», аят 282</p>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}