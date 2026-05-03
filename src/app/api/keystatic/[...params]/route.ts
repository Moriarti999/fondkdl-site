// 🔥 src/app/api/keystatic/[...params]/route.ts
import { keystaticNext } from '@keystatic/next/api';
import config from '../../../../keystatic.config'; 

export const { GET, POST } = keystaticNext({ config });