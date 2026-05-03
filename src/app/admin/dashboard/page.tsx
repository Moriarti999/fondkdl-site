'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState('campaigns');
  const [modal, setModal] = useState<'none' | 'form' | 'view'>('none');
  const [formData, setFormData] = useState<any>({});
  const [viewData, setViewData] = useState<any>(null);

  // Хранилища
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem('isAdmin')) router.push('/admin');

    setCampaigns(JSON.parse(localStorage.getItem('kdl_campaigns') || '[]'));
    setNews(JSON.parse(localStorage.getItem('kdl_news') || '[]'));
    setReports(JSON.parse(localStorage.getItem('kdl_reports') || '[]'));
    setPhotos(JSON.parse(localStorage.getItem('kdl_photos') || '[]'));
  }, []);

  if (!mounted) return null;

  const saveData = (key: string, data: any[]) => localStorage.setItem(key, JSON.stringify(data));

  const handleSave = () => {
    if (!formData.title) return alert('Введите заголовок!');
    const newItem = { id: Date.now().toString(), ...formData, date: new Date().toLocaleDateString('ru-RU') };
    
    let updated: any[] = [];
    if (tab === 'campaigns') { updated = [...campaigns, newItem]; setCampaigns(updated); saveData('kdl_campaigns', updated); }
    if (tab === 'news') { updated = [...news, newItem]; setNews(updated); saveData('kdl_news', updated); }
    if (tab === 'reports') { updated = [...reports, newItem]; setReports(updated); saveData('kdl_reports', updated); }
    if (tab === 'photos') { updated = [...photos, newItem]; setPhotos(updated); saveData('kdl_photos', updated); }
    
    setFormData({});
    setModal('none');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Удалить эту запись?')) return;
    let updated: any[] = [];
    if (tab === 'campaigns') { updated = campaigns.filter(i => i.id !== id); setCampaigns(updated); saveData('kdl_campaigns', updated); }
    if (tab === 'news') { updated = news.filter(i => i.id !== id); setNews(updated); saveData('kdl_news', updated); }
    if (tab === 'reports') { updated = reports.filter(i => i.id !== id); setReports(updated); saveData('kdl_reports', updated); }
    if (tab === 'photos') { updated = photos.filter(i => i.id !== id); setPhotos(updated); saveData('kdl_photos', updated); }
  };

  const getCurrentData = () => {
    if (tab === 'campaigns') return campaigns;
    if (tab === 'news') return news;
    if (tab === 'reports') return reports;
    return photos;
  };

  // 🔹 ФОРМА ДОБАВЛЕНИЯ
  const renderForm = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setModal('none')}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-orange-700 mb-4">Добавить запись</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок / Название *</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none" 
              value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Введите название" />
          </div>
          
          {tab === 'campaigns' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm text-gray-600">Цель (сумма)</label><input className="w-full px-4 py-2 border rounded-lg" placeholder="500 000 ₽" value={formData.target || ''} onChange={e => setFormData({...formData, target: e.target.value})} /></div>
                <div><label className="text-sm text-gray-600">Собрано</label><input className="w-full px-4 py-2 border rounded-lg" placeholder="120 000 ₽" value={formData.current || ''} onChange={e => setFormData({...formData, current: e.target.value})} /></div>
              </div>
              <div><label className="text-sm text-gray-600">Статус</label>
                <select className="w-full px-4 py-2 border rounded-lg" value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="active">Активный сбор</option>
                  <option value="completed">Завершён</option>
                </select>
              </div>
            </>
          )}
          
          {tab === 'reports' && (
            <div><label className="text-sm text-gray-600">Год отчёта</label><input className="w-full px-4 py-2 border rounded-lg" placeholder="2024" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} /></div>
          )}
          
          {tab === 'photos' && (
            <div><label className="text-sm text-gray-600">Альбом / Подпись</label><input className="w-full px-4 py-2 border rounded-lg" placeholder="Название альбома" value={formData.album || ''} onChange={e => setFormData({...formData, album: e.target.value})} /></div>
          )}

          <div><label className="block text-sm font-medium text-gray-700 mb-1">Описание / Текст</label>
            <textarea className="w-full px-4 py-2 border rounded-lg h-24 resize-none" placeholder="Подробная информация..." value={formData.desc || formData.content || ''} onChange={e => setFormData({...formData, desc: e.target.value, content: e.target.value})} />
          </div>
          
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Ссылка на фото / файл</label>
            <input className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." value={formData.image || formData.fileUrl || formData.url || ''} onChange={e => setFormData({...formData, image: e.target.value, fileUrl: e.target.value, url: e.target.value})} />
            {(formData.image || formData.fileUrl || formData.url) && (
              <img src={formData.image || formData.fileUrl || formData.url} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg border" />
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="flex-1 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all">💾 Сохранить</button>
          <button onClick={() => setModal('none')} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">Отмена</button>
        </div>
      </div>
    </div>
  );

  // 🔹 МОДАЛКА ПРОСМОТРА
  const renderView = () => !viewData ? null : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setModal('none')}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative h-48 bg-gray-200">
          <img src={viewData.image || viewData.fileUrl || viewData.url || 'https://via.placeholder.com/600x300?text=Нет+фото'} className="w-full h-full object-cover" alt="" />
          <button onClick={() => setModal('none')} className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70">×</button>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{viewData.title || viewData.album}</h3>
          <div className="flex gap-2 mb-4 text-sm text-gray-500">
            <span>📅 {viewData.date}</span>
            {viewData.status && <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{viewData.status === 'active' ? 'Активен' : 'Завершён'}</span>}
            {viewData.year && <span>📆 {viewData.year} год</span>}
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{viewData.desc || viewData.content || 'Нет описания'}</p>
          {viewData.target && <p className="mt-4 p-3 bg-gray-50 rounded-lg text-sm"><strong>Цель:</strong> {viewData.target} | <strong>Собрано:</strong> {viewData.current || '0 ₽'}</p>}
        </div>
      </div>
    </div>
  );

  // 🔹 СПИСОК КАРТОЧЕК
  const renderList = () => {
    const items = getCurrentData();
    if (items.length === 0) return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-400 text-lg mb-2">Пока пусто</p>
        <button onClick={() => setModal('form')} className="text-orange-600 font-medium hover:underline">+ Добавить первую запись</button>
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="h-40 bg-gray-100 relative overflow-hidden">
              <img src={item.image || item.fileUrl || item.url || 'https://via.placeholder.com/400x200?text=Фото'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
              {item.status === 'completed' && <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">Завершён</span>}
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1 truncate">{item.title || item.album}</h4>
              <p className="text-xs text-gray-500 mb-3">{item.date} {item.year ? `• ${item.year}` : ''}</p>
              <div className="flex gap-2">
                <button onClick={() => { setViewData(item); setModal('view'); }} className="flex-1 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors">👁 Открыть</button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors">🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Шапка */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-xl font-bold text-orange-700 flex items-center gap-2">🧡 КДЛ Админка</h1>
        <button onClick={() => { localStorage.removeItem('isAdmin'); router.push('/'); }} className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded hover:bg-red-50">Выйти</button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Табы */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'campaigns', label: '🧡 Сборы' },
            { id: 'news', label: '📰 Новости' },
            { id: 'reports', label: '📊 Отчёты' },
            { id: 'photos', label: '🖼️ Фото' }
          ].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setModal('none'); }}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${tab === t.id ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Кнопка добавить */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {tab === 'campaigns' ? 'Управление сборами' : tab === 'news' ? 'Новости фонда' : tab === 'reports' ? 'Отчёты и документы' : 'Галерея фото'}
          </h2>
          <button onClick={() => { setFormData({}); setModal('form'); }} className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-md flex items-center gap-2">
            <span className="text-xl">+</span> Добавить
          </button>
        </div>

        {renderList()}
      </main>

      {modal === 'form' && renderForm()}
      {modal === 'view' && renderView()}
    </div>
  );
}