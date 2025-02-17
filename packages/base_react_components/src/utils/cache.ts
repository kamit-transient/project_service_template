import NodeCache from 'node-cache';

//singleton cache instance
export const appCache: NodeCache = new NodeCache({ stdTTL: 3600 * 24 }); // 24 hours;

// export function getCache() {
//     if (appCache) {
//         console.log("appCache", appCache);

//         return appCache;
//     } else {
//         appCache = new NodeCache({ stdTTL: 3600 * 24 }); // 24 hours
//         return appCache;
//     }
// }