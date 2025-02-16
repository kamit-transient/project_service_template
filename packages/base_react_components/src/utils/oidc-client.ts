
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

//THESE ENV VARIABLES SHOULD PICED FROM .ENV OF CONSUMER APP
const config = {
    serverUrl: process.env.NEXT_PUBLIC_AUTH_PROVDER_ENDPOINT!,
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
    appName: process.env.NEXT_PUBLIC_AUTH_PROVIDER_ORG_NAME!,
    organizationName: process.env.NEXT_PUBLIC_AUTH_PROVIDER_APP_NAME!,
    redirectPath: '/callback',
};





function getReirectUrl() {

    if (typeof window !== 'undefined') {
        return `${window.location.origin}/callback`;
    }
    // Fallback for server-side
    return config.redirectPath;

}

/**
 * 
 * @param scope apends the provided scope to existing one
 * @returns 
 */
export function getOidcClient(scope: string = "") {

    const oidcConfig = {
        authority: config.serverUrl,
        client_id: config.clientId,
        redirect_uri: getReirectUrl(),
        response_type: 'code',
        scope: 'openid profile email offline_access ' + scope,
        userStore: new WebStorageStateStore({ store: window.localStorage }),
        post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_UI_URL}/`, // Post-logout URI
    };
    const userManager = new UserManager(oidcConfig);
    return userManager;

}


