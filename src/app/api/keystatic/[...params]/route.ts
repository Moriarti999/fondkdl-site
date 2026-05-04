import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@root/keystatic.config';

export const dynamic = 'force-dynamic';

export const { GET, POST } = makeRouteHandler({ config });
