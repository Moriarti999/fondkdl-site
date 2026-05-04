'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type Campaign = {
  slug: string;
  title: string;
  description?: string;
  goal: number;
  raised: number;
  urgency?: string;
  image?: string | null;
};

const PER_PAGE = 3;

function chunkCampaigns(items: Campaign[], size: number): Campaign[][] {
  const out: Campaign[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function CampaignCard({ c }: { c: Campaign }) {
  const r = Number(c.raised) || 0;
  const g = Number(c.goal) || 1;
  const p = Math.min(100, Math.round((r / g) * 100));
  const urgent = c.urgency === 'urgent';

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100 hover:shadow-lg transition-all flex flex-col h-full">
      <div className="h-40 sm:h-44 overflow-hidden relative bg-orange-50 shrink-0">
        {c.image ? (
          <Image
            src={c.image}
            alt={c.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🧡</div>
        )}
        {urgent && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
            🔥 Срочно
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 line-clamp-2 leading-tight">{c.title}</h3>
        {c.description && (
          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 flex-1">{c.description}</p>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2 mt-auto">
          <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${p}%` }} />
        </div>
        <div className="flex justify-between text-xs font-bold mb-3">
          <span>{r.toLocaleString('ru-RU')} ₽</span>
          <span className="text-gray-500">из {g.toLocaleString('ru-RU')} ₽</span>
        </div>
        <a
          href={`/campaigns/${c.slug}`}
          className="block w-full bg-orange-600 text-white py-2 rounded-lg text-center text-sm font-medium hover:bg-orange-700 transition"
        >
          Подробнее
        </a>
      </div>
    </article>
  );
}

export default function CampaignCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const pages = useMemo(() => chunkCampaigns(campaigns, PER_PAGE), [campaigns]);
  const pageCount = pages.length;
  const lastPage = Math.max(0, pageCount - 1);

  const go = useCallback(
    (dir: -1 | 1) => {
      setPage((i) => Math.min(lastPage, Math.max(0, i + dir)));
    },
    [lastPage]
  );

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-orange-50 rounded-xl border border-orange-100">
        <p className="text-lg">Активные сборы пока не добавлены</p>
        <p className="text-sm mt-2">Добавьте сбор через админку или проверьте статус «active»</p>
      </div>
    );
  }

  const slidePercent = 100 / pageCount;
  const startIdx = page * PER_PAGE + 1;
  const endIdx = Math.min(campaigns.length, (page + 1) * PER_PAGE);

  return (
    <div className="relative max-w-6xl mx-auto w-full px-2 sm:px-0">
      <div
        className="overflow-hidden rounded-2xl w-full"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          if (start == null) return;
          const end = e.changedTouches[0]?.clientX ?? start;
          const dx = end - start;
          if (dx < -48) go(1);
          else if (dx > 48) go(-1);
        }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            width: `${pageCount * 100}%`,
            transform: `translateX(-${page * slidePercent}%)`,
          }}
        >
          {pages.map((chunk, pi) => (
            <div
              key={pi}
              className="shrink-0 box-border px-1 sm:px-2"
              style={{ width: `${slidePercent}%` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                {chunk.map((c) => (
                  <CampaignCard key={c.slug} c={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Предыдущие три сбора"
            disabled={page === 0}
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-0 sm:-translate-x-2 z-10 w-10 h-10 rounded-full bg-white border-2 border-orange-200 text-orange-700 shadow-md flex items-center justify-center text-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-50 transition"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Следующие три сбора"
            disabled={page === lastPage}
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 sm:translate-x-2 z-10 w-10 h-10 rounded-full bg-white border-2 border-orange-200 text-orange-700 shadow-md flex items-center justify-center text-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-50 transition"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {pages.map((chunk, i) => (
              <button
                key={`page-${i}`}
                type="button"
                aria-label={`Страница ${i + 1} из ${pageCount}`}
                aria-current={i === page}
                onClick={() => setPage(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === page ? 'w-8 bg-orange-600' : 'w-2.5 bg-orange-200 hover:bg-orange-300'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <p className="text-center text-sm text-gray-500 mt-3">
        {pageCount > 1 ? (
          <>
            Страница {page + 1} из {pageCount} · сборы {startIdx}–{endIdx} из {campaigns.length}
            <span className="hidden sm:inline"> · стрелки или свайп</span>
          </>
        ) : (
          <>Все активные сборы: {campaigns.length}</>
        )}
      </p>
    </div>
  );
}
