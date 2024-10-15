import { getUrl, Result } from './utils';
import * as router from './router';

type RouteHandler = (id: number | string, zone?: string | number) => Promise<Result>;

const routeMap: Record<string, RouteHandler> = {
  '/ag': router.ag,
  '/aov': router.aov,
  '/cod': router.cod,
  '/ff': router.ff,
  '/gi': router.gi,
  '/hi': router.hi,
  '/hsr': router.hsr,
  '/la': router.la,
  '/ml': router.ml,
  '/pb': router.pb,
  '/pgr': router.pgr,
  '/sm': router.sm,
  '/sus': router.sus,
  '/valo': router.valo,
  '/zzz': router.zzz
};

export default async function callAPI(request: Request): Promise<Result> {
  const url = getUrl(request);
  const path = url.pathname;
  const params = url.searchParams;
  const id = params.get('id');
  const zone = params.get('zone') || params.get('server');
  if (!id) {
    return {
      success: false,
      message: 'Bad request' 
    };
  }
  const handler = Object.entries(routeMap).find(([route]) => path.includes(route))?.[1];
  if (!handler) {
    return {
      success: false,
      message: 'Bad request'
    }
  }
  try {
    return await handler(id, zone)
  } catch (error) {
    return {
      success: false,
      message: 'Not found'
    };
  }
}