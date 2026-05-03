import { config, fields, collection } from '@keystatic/core';

export default config({
  // 🔥 ХРАНИЛИЩЕ: GitHub (для работы на Vercel)
  storage: {
    kind: 'github',
    repo: {
      owner: 'АБУ_ИЛИ_ТВОЙ_НИК',  // 👈 ЗАМЕНИ на свой логин GitHub (без кавычек внутри!)
      name: 'fondkdl-site',        // 👈 ЗАМЕНИ на точное имя репозитория
    },
  },
  
  collections: {
    // 🔹 СБОРЫ
    campaigns: collection({
      label: '🧡 Сборы',
      slugField: 'title',
      path: 'src/content/campaigns/*',
      schema: {
        title: fields.slug({ name: { label: 'Название сбора' } }),
        image: fields.image({
          label: 'Фото сбора',
          directory: 'public/images/campaigns',
          publicPath: '/images/campaigns/',
        }),
        goal: fields.number({ label: 'Цель (₽)' }),
        raised: fields.number({ label: 'Собрано (₽)' }),
        description: fields.text({ label: 'Описание' }),
        status: fields.select({
          label: 'Статус',
          options: [
            { label: '🟢 Активный', value: 'active' },
            { label: '🔴 Завершён', value: 'completed' },
            { label: '🟡 На паузе', value: 'paused' },
          ],
          defaultValue: 'active',
        }),
        urgency: fields.select({
          label: 'Срочность',
          options: [
            { label: 'Обычный', value: 'normal' },
            { label: '🔥 Срочно', value: 'urgent' },
          ],
          defaultValue: 'normal',
        }),
      },
    }),

    // 🔹 НОВОСТИ
    news: collection({
      label: '📰 Новости',
      slugField: 'title',
      path: 'src/content/news/*',
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        image: fields.image({
          label: 'Фото новости',
          directory: 'public/images/news',
          publicPath: '/images/news/',
        }),
        excerpt: fields.text({ label: 'Краткое описание' }),
        content: fields.text({ label: 'Полный текст' }),
        publishedAt: fields.datetime({ label: 'Дата публикации' }),
      },
    }),

    // 🔹 КОМАНДА
    team: collection({
      label: '👥 Команда',
      slugField: 'name',
      path: 'src/content/team/*',
      schema: {
        name: fields.slug({ name: { label: 'Имя Фамилия' } }),
        role: fields.text({ label: 'Должность' }),
        image: fields.image({
          label: 'Фото',
          directory: 'public/images/team',
          publicPath: '/images/team/',
        }),
        bio: fields.text({ label: 'О себе' }),
      },
    }),

    // 🔹 ОТЧЁТЫ
    reports: collection({
      label: '📊 Отчёты',
      slugField: 'title',
      path: 'src/content/reports/*',
      schema: {
        title: fields.slug({ name: { label: 'Название отчёта' } }),
        year: fields.number({ label: 'Год' }),
        file: fields.file({
          label: 'PDF файл',
          directory: 'public/files/reports',
          publicPath: '/files/reports/',
          validation: { extension: ['pdf'] },
        }),
        description: fields.text({ label: 'Описание' }),
      },
    }),

    // 🔹 УЧРЕДИТЕЛЬНЫЕ ДОКУМЕНТЫ
    foundingDocuments: collection({
      label: '📄 Документы',
      slugField: 'title',
      path: 'src/content/documents/*',
      schema: {
        title: fields.slug({ name: { label: 'Название файла' } }),
        description: fields.text({ label: 'Описание' }),
        file: fields.file({
          label: 'Загрузить PDF',
          directory: 'public/files',
          publicPath: '/files/',
          validation: { extension: ['pdf'] },
        }),
      },
    }),

    // 🔹 ЗАДАЧИ ДЛЯ ВОЛОНТЁРОВ
    volunteerTasks: collection({
      label: '🤝 Задачи для волонтёров',
      slugField: 'title',
      path: 'src/content/volunteer-tasks/*',
      schema: {
        title: fields.slug({ name: { label: 'Название задачи' } }),
        description: fields.text({ label: 'Описание задачи' }),
        category: fields.select({
          label: 'Категория',
          options: [
            { label: '📦 Помощь с вещами', value: 'items' },
            { label: '🚗 Транспорт', value: 'transport' },
            { label: '👥 Мероприятия', value: 'events' },
            { label: '💻 Онлайн-помощь', value: 'online' },
            { label: '🏠 Домашние дела', value: 'home' },
          ],
          defaultValue: 'events',
        }),
        timeRequired: fields.text({ label: 'Сколько времени нужно' }),
        location: fields.text({ label: 'Место / Город' }),
        contact: fields.text({ label: 'Контакт для связи' }),
        isActive: fields.checkbox({ label: 'Актуально', defaultValue: true }),
      },
    }),
  },
});