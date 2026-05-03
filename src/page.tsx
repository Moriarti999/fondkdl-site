import { collection } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Image from 'next/image';

async function getCampaigns() {
  const campaigns = await collection(config, 'campaigns').all();
  // Сортировка: сначала срочные, потом активные
  return campaigns.sort((a, b) => {
    if (a.entry.urgency === 'urgent' && b.entry.urgency !== 'urgent') return -1;
    if (a.entry.status === 'active' && b.entry.status !== 'active') return -1;
    return 0;
  });
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
            <p className="text-xl">Пока нет активных сборов</p>
            <p className="text-sm mt-2">Загляните позже — мы обязательно поможем тем, кто нуждается</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map(({ slug, entry }) => {
              if (entry.status !== 'active') return null;
              const percent = Math.min(100, Math.round((entry.raised / entry.goal) * 100));
              
              return (
                <div key={slug} className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition-all duration-300">
                  <div className="h-48 overflow-hidden relative">
                    {entry.image ? (
                      <Image 
                        src={entry.image.src} 
                        alt={entry.title} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-4xl">
                        👶
                      </div>
                    )}
                    {entry.urgency === 'urgent' && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                        🔥 Срочно
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{entry.title}</h3>
                    <div 
                      className="text-gray-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: entry.description }} 
                    />
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-sm font-bold mb-4">
                      <span className="text-orange-600">{entry.raised.toLocaleString('ru-RU')} ₽</span>
                      <span className="text-gray-500">из {entry.goal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    
                    <a 
                      href="/donate" 
                      className="block w-full bg-orange-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
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