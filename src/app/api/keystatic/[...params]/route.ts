// ✅ ПРАВИЛЬНЫЙ ИМПОРТ для Keystatic + Next.js App Router
import { keystaticNext } from '@keystatic/next';
import config from '../../../../keystatic.config';

export const { GET, POST } = keystaticNext({ config });