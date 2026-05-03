import type { Metadata } from "next";
import './globals.css';
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Фонд КДЛ — Благотворительный фонд помощи",
  description: "Помогаем тем, кто нуждается. Прозрачно, безопасно, с любовью.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark:bg-surface-dark">
      <body className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-dark text-text-primary dark:text-text-dark transition-colors duration-300">
        
        {/* HEADER / ШАПКА */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Логотип */}
            <a href="/" className="font-heading text-2xl font-bold text-brand-600 dark:text-brand-400 tracking-tight">
              Фонд КДЛ ❤️
            </a>

            {/* Меню навигации (Я добавил все ссылки!) */}
            <nav className="hidden md:flex gap-8 text-sm font-medium text-text-secondary dark:text-text-darkSec">
              <a href="/campaigns" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1 border-b-2 border-transparent hover:border-brand-600">Сборы</a>
              <a href="/news" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1 border-b-2 border-transparent hover:border-brand-600">Новости</a>
              <a href="/volunteer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1 border-b-2 border-transparent hover:border-brand-600">Помочь делом</a>
              <a href="/reports" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1 border-b-2 border-transparent hover:border-brand-600">Отчёты</a>
              <a href="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1 border-b-2 border-transparent hover:border-brand-600">О фонде</a>
            </nav>

            {/* Правая часть: Тема и Кнопка Помочь */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a href="/donate" className="btn-primary px-5 py-2 text-sm">Помочь</a>
            </div>

          </div>
        </header>

        {/* ОСНОВНОЙ КОНТЕНТ СТРАНИЦЫ */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER / ПОДВАЛ */}
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-12 px-4 mt-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted dark:text-slate-500">
            <p className="font-heading text-lg text-text-secondary dark:text-slate-300">© 2026 Фонд КДЛ</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Политика конфиденциальности</a>
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Оферта</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}