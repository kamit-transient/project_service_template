import { logger } from "../lib/client.logger";
import { appCache } from "../utils/cache";



const tokenCache = appCache!;
export class BaseBackendApi {
  constructor() { }

  static async getSuperAdminToken() {

    let cacheKey = `${process.env.NEXT_PUBLIC_AUTH_PROVDER_ENDPOINT}/oauth/v2/token:superadmintoken`;
    let cachedData = tokenCache.get(cacheKey);

    logger.info('geting super admin token...');

    const clientId = process.env.CLIENT_ID_SERVICE_USER_Editor_Comment_Admin_Portal; // Replace with your client ID
    const clientSecret = process.env.CLIENT_SECRET_SERVICE_USER_Editor_Comment_Admin_Portal; // Replace with your client secret

    // Encode client credentials for Basic Auth
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
      if (cachedData) {
        logger.info('Returning cached super admin token...');
        return cachedData;
      }

      let res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_PROVDER_ENDPOINT}/oauth/v2/token`, {
        cache: "no-cache",
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          scope: 'openid profile',
        })
      });

      if (!res.ok) {
        logger.error("Oops! can not get the super admin token to generate app pages...");
        throw new Error(res.statusText);
      }

      let data = await res.json();
      tokenCache.set(cacheKey, data.access_token, data.expires_in);

      return data.access_token;
    } catch (error) {
      // tokenCache.del(cacheKey);
      logger.error("error fetching service user token", error)
    }

  }
}

