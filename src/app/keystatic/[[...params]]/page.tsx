'use client'; // Важно!

import { makePage } from '@keystatic/next/ui/app';
// Попробуем абсолютный путь, если относительный не работает:
import config from '@/../keystatic.config'; 

export default makePage(config);