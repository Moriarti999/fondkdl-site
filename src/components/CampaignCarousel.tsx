'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Campaign {
  slug: string;
  entry: {
    title: string;
    description: string;
    goal: number;
    raised: number;
    urgency?: 'urgent' | 'normal';
    status: string;
    image?: { src: string };
  };
}

export default function CampaignCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= campaigns.length ? 0 : prev + itemsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, campaigns.length - itemsPerPage) : prev - itemsPerPage));
  };

  const visibleCampaigns = campaigns.slice(currentIndex, currentIndex + itemsPerPage);

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Пока нет активных сборов</p>
        <p className="text-sm mt-2">Мы обязательно поможем тем, кто нуждается</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Кнопка назад */}
      {totalPages > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white text-orange-600 rounded-full shadow-lg flex items-center justify-center font-bold text-xl hover:scale-110 transition-all border-2 border-orange-200"
          aria-label="Предыдущие сборы"
        >
          ←
        </button>
      )}

      {/* Сетка карточек */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
        {visibleCampaigns.map(({ slug, entry }) => {
          const percent = Math.min(100, Math.round((entry.raised / entry.goal) * 100));
          return (
            <article
              key={slug}
              className="bg-white rounded-xl shadow-lg border border-orange-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-40 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl mb-4 flex items-center justify-center text-5xl overflow-hidden relative">
                {entry.image?.src ? (
                  <Image
                    src={entry.image.src}
                    alt={entry.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>👶</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{entry.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{entry.description}</p>
              {entry.urgency === 'urgent' && (
                <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded mb-3">🔥 Срочно</span>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                <div
                  className="bg-orange-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="font-semibold text-orange-600">{entry.raised?.toLocaleString('ru-RU')} ₽</span>
                <span className="text-gray-500">из {entry.goal?.toLocaleString('ru-RU')} ₽</span>
              </div>
              <a
                href="/donate"
                className="block w-full bg-orange-600 text-white py-2 rounded-lg text-center font-medium hover:bg-orange-700 transition"
              >
                Помочь
              </a>
            </article>
          );
        })}
      </div>

      {/* Кнопка вперёд */}
      {totalPages > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white text-orange-600 rounded-full shadow-lg flex items-center justify-center font-bold text-xl hover:scale-110 transition-all border-2 border-orange-200"
          aria-label="Следующие сборы"
        >
          →
        </button>
      )}

      {/* Индикаторы страниц */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * itemsPerPage)}
              className={`w-3 h-3 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerPage) === i
                  ? 'bg-orange-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Перейти к странице ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}