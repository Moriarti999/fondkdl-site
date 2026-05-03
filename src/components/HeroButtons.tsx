'use client';

import { useState } from 'react';
import NeedHelpModal from './NeedHelpModal';
import HelpModal from './HelpModal';
import DonorModal from './DonorModal';

export default function HeroButtons() {
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [donorModal, setDonorModal] = useState(false);
  const [modalMode, setModalMode] = useState<'donation' | 'donor'>('donation');

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {/* Хочу помочь */}
        <button 
          onClick={() => { setModalMode('donation'); setHelpModal(true); }} 
          className="px-6 py-3 bg-white text-orange-700 rounded-xl font-bold text-base hover:bg-yellow-50 hover:scale-105 transition-all shadow-md"
        >
          Хочу помочь ❤️
        </button>
        
        {/* Нужна помощь */}
        <button 
          onClick={() => setNeedHelpModal(true)} 
          className="px-6 py-3 bg-orange-500 border-2 border-white text-white rounded-xl font-bold text-base hover:bg-orange-400 hover:scale-105 transition-all"
        >
          Нужна помощь 🤝
        </button>
        
        {/* Помочь делом */}
        <a 
          href="/volunteer" 
          className="px-6 py-3 bg-orange-700 border-2 border-white text-white rounded-xl font-bold text-base hover:bg-orange-600 hover:scale-105 transition-all text-center"
        >
          Помочь делом 🤝
        </a>
        
        {/* Донорство */}
        <button 
          onClick={() => { setModalMode('donor'); setDonorModal(true); }} 
          className="px-6 py-3 bg-red-600 border-2 border-white text-white rounded-xl font-bold text-base hover:bg-red-700 hover:scale-105 transition-all"
        >
          Донорство 🩸
        </button>

        {/* ✅ НОВАЯ КНОПКА: Новости */}
        <a 
          href="/news" 
          className="px-6 py-3 bg-gray-800 border-2 border-white text-white rounded-xl font-bold text-base hover:bg-gray-700 hover:scale-105 transition-all text-center flex items-center gap-2"
        >
          <span>📰</span> Новости
        </a>
      </div>

      {/* Модальные окна */}
      <NeedHelpModal isOpen={needHelpModal} onClose={() => setNeedHelpModal(false)} />
      <HelpModal isOpen={helpModal} onClose={() => setHelpModal(false)} mode={modalMode} />
      <DonorModal isOpen={donorModal} onClose={() => setDonorModal(false)} />
    </>
  );
}