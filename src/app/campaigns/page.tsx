// 🔥 ОТКЛЮЧАЕМ КЭШ — чтобы новые сборы появлялись сразу
export const dynamic = 'force-dynamic';

import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Image from 'next/image';

async function getCampaigns() {
  try {
    // ✅ Правильный способ чтения данных в Keystatic
    const reader = createReader(process.cwd(), config);
    const campaigns = await reader.collections.campaigns.all();
    console.log('✅ Keystatic нашёл сборов:', campaigns.length);
    return campaigns;
  } catch (error) {
    console.error('❌ Ошибка чтения:', error);
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
        
        {/* 🔍 Блок отладки */}
        <div className="bg-gray-100 p-4 rounded-xl mb-8 text-sm border border-gray-200">
          <p><strong>Отладка:</strong> Найдено сборов: {campaigns.length}</p>
          {campaigns.map((c: any, i: number) => (
            <div key={i} className="mt-1 text-xs">
              • {c.entry?.title || c.data?.title} — статус: {c.entry?.status || c.data?.status}
            </div>
          ))}
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl">Сборов пока нет</p>
            <p className="text-sm mt-2">Добавьте первый сбор через админку <code className="bg-gray-200 px-2 py-1 rounded">/keystatic</code></p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((item: any) => {
              // Поддержка двух форматов данных (entry или data)
              const entry = item.entry || item.data;
              const slug = item.slug;
              
              if (!entry || entry.status !== 'active') return null;
              
              const percent = Math.min(100, Math.round((entry.raised / entry.goal) * 100));
              
              return (
                <div key={slug} className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden relative bg-orange-50">
                    {entry.image?.src ? (
                      <Image 
                        src={entry.image.src} 
                        alt={entry.title} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">👶</div>
                    )}
                    {entry.urgency === 'urgent' && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        🔥 Срочно
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                    <div 
                      className="text-gray-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: entry.description }} 
                    />
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-orange-500 h-2.5 rounded-full transition-all" 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-sm font-bold mb-4">
                      <span>{entry.raised?.toLocaleString('ru-RU')} ₽</span>
                      <span className="text-gray-500">из {entry.goal?.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    
                    <a 
                      href="/donate" 
                      className="block w-full bg-orange-600 text-white py-2 rounded-lg text-center font-medium hover:bg-orange-700 transition"
                    >
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