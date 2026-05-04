export const dynamic = 'force-dynamic';
import { createReader } from '@keystatic/core/reader';
import config from '@root/keystatic.config';
import Image from 'next/image';
import { entryImageUrl } from '@/lib/entry-image-url';

async function getCampaigns() {
  try {
    const reader = createReader(process.cwd(), config);
    const all = await reader.collections.campaigns.all();
    
    // 🔥 🔥 🔥 ПРИНУДИТЕЛЬНАЯ САНИТАРИЗАЦИЯ  🔥 🔥
    // Создаём массив ТОЛЬКО из примитивов. SDK-объекты полностью отбрасываются.
    return all.map(item => {
      const e = item.entry || {};
      return {
        slug: String(item.slug || ''),
        title: String(e.title || 'Без названия'),
        description: typeof e.description === 'function' ? '' : String(e.description || ''),
        goal: Number(e.goal) || 0,
        raised: Number(e.raised) || 0,
        urgency: String(e.urgency || 'normal'),
        status: String(e.status || 'active'),
        image: entryImageUrl(e.image),
      };
    });
  } catch (error) {
    console.error('❌ Ошибка чтения сборов:', error);
    return [];
  }
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <main className="min-h-screen bg-white text-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-orange-600">
          Активные сборы ❤️
        </h1>

        {campaigns.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">Сборов пока нет</p>
            <p className="text-sm mt-2">Добавьте первый сбор через админку</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map(c => {
              const percent = Math.min(100, Math.round((c.raised / (c.goal || 1)) * 100));
              
              return (
                <div key={c.slug} className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden relative bg-orange-50">
                    {c.image ? (
                      <Image src={c.image} alt={c.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">👶</div>
                    )}
                    {c.urgency === 'urgent' && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">🔥 Срочно</span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                    <div className="text-gray-600 text-sm mb-4 line-clamp-3">{c.description}</div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className="bg-orange-500 h-2.5 rounded-full transition-all" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="flex justify-between text-sm font-bold mb-4">
                      <span>{c.raised.toLocaleString('ru-RU')} ₽</span>
                      <span className="text-gray-500">из {c.goal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    
                    <a href="/donate" className="block w-full bg-orange-600 text-white py-2 rounded-lg text-center font-medium hover:bg-orange-700 transition">
                      Помочь
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}