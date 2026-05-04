// Локальное хранилище: контент из репозитория. Для админки на Vercel с коммитами в Git
// настройте GitHub mode: https://keystatic.com/docs/github-mode
// и переменные NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER, NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO
// + KEYSTATIC_GITHUB_*, KEYSTATIC_SECRET, NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
import { config, fields, collection } from '@keystatic/core';

const githubOwner = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER;
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;

export default config({
  storage:
    githubOwner && githubRepo
      ? { kind: 'github', repo: { owner: githubOwner, name: githubRepo } }
      : { kind: 'local' },
  collections: {
    campaigns: collection({
      label: 'Сборы',
      slugField: 'title',
      path: 'src/content/campaigns/*',
      schema: {
        title: fields.text({ label: 'Название' }),
        description: fields.markdoc({ label: 'Описание' }),
        goal: fields.integer({ label: 'Цель (₽)' }),
        raised: fields.integer({ label: 'Собрано (₽)' }),
        urgency: fields.select({
          label: 'Срочность',
          options: [
            { label: 'Обычный', value: 'normal' },
            { label: '🔥 Срочно', value: 'urgent' },
          ],
          defaultValue: 'normal', // ✅ ИСПРАВЛЕНИЕ 1: значение по умолчанию
        }),
        status: fields.select({
          label: 'Статус',
          options: [
            { label: 'Активен', value: 'active' },
            { label: 'Завершён', value: 'completed' },
          ],
          defaultValue: 'active', // ✅ ИСПРАВЛЕНИЕ 2: значение по умолчанию
        }),
        image: fields.image({ label: 'Фото' }),
      },
    }),
    news: collection({
      label: 'Новости',
      slugField: 'title',
      path: 'src/content/news/*',
      schema: {
        title: fields.text({ label: 'Заголовок' }),
        excerpt: fields.text({ label: 'Кратко' }),
        content: fields.markdoc({ label: 'Текст' }),
        publishedAt: fields.date({ label: 'Дата публикации' }),
        image: fields.image({ label: 'Фото' }),
      },
    }),
    reports: collection({
      label: 'Отчёты',
      slugField: 'title',
      path: 'src/content/reports/*',
      schema: {
        title: fields.text({ label: 'Название' }),
        year: fields.integer({ label: 'Год' }),
        file: fields.file({ label: 'PDF-файл' }),
      },
    }),
    foundingDocuments: collection({
      label: 'Документы',
      slugField: 'title',
      path: 'src/content/documents/*',
      schema: {
        title: fields.text({ label: 'Название' }),
        description: fields.text({ label: 'Описание' }),
        file: fields.file({ label: 'PDF-файл' }),
      },
    }),
    volunteerTasks: collection({
      label: 'Задачи волонтёров',
      slugField: 'title',
      path: 'src/content/volunteer-tasks/*',
      schema: {
        title: fields.text({ label: 'Название' }),
        description: fields.text({ label: 'Описание' }),
        category: fields.select({
          label: 'Категория',
          options: [
            { label: 'Мероприятия', value: 'events' },
            { label: 'Вещи', value: 'items' },
            { label: 'Транспорт', value: 'transport' },
            { label: 'Онлайн', value: 'online' },
            { label: 'Другое', value: 'other' },
          ],
          defaultValue: 'events',
        }),
        timeRequired: fields.text({ label: 'Время (напр. 2 часа)' }),
        location: fields.text({ label: 'Место' }),
        contact: fields.text({ label: 'Контакт' }),
        isActive: fields.checkbox({ label: 'Активна', defaultValue: true }),
      },
    }),
  },
});