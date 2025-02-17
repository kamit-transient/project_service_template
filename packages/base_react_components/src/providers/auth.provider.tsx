'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
// import { useRouter } from "next/navigation";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, COOKIE_USER } from '../utils/app.constants';
import { getOidcClient } from '../utils/oidc-client';
import { logger } from '../lib/client.logger';
import { User } from 'oidc-client-ts';


export interface AuthContextType {
    user: User | null;
    setCurrentUser: (accessToken: any) => void,
    isLoading: boolean;
    signOut: () => void;
    goBack: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    signOut: () => { },
    setCurrentUser: (accessToken: any) => { },
    goBack: () => { },
});

export function AuthProvider({ children, router }: { children: React.ReactNode, router: any }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // const router = useRouter();

    useEffect(() => {

        async function handleUserInit() {
            try {
                const user = await getOidcClient().getUser();
                if (user) {
                    setUser(user);
                    console.log('User is logged in:', user);
                } else {
                    console.log('User is not logged in');
                }
            } catch (err) {
                console.error('Error getting user info:', err);
            }
        }
        handleUserInit();
        setIsLoading(false);
    }, []);

    const signOut = async () => {


        Cookies.remove(COOKIE_USER);
        Cookies.remove(COOKIE_ACCESS_TOKEN);
        Cookies.remove(COOKIE_REFRESH_TOKEN);
        setUser(null);

        try {

            await fetch("/manage-session", {
                method: "POST",
                body: JSON.stringify({ cleanup: true })
            });


            getOidcClient().signoutRedirect().then(() => {
                logger.info("oidc logout complete...");

            });

        } catch (err) {
            console.error('Error during sign-out:', err);
        }

        router.push("/");
    };

    const setCurrentUser = (accessToken: any) => {
        setUser(accessToken);
    }

    const goBack = () => {
        router.back();
    }

    return (

        <AuthContext.Provider value={{ user, isLoading, signOut, setCurrentUser, goBack }}>
            {/* <SessionProvider> */}
            {children}
            {/* </SessionProvider> */}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);