"use client"
import { Suspense, useEffect, useRef } from 'react';
import { getOidcClient } from '../utils/oidc-client';
import { STORAGE_REDIRECT_PATH } from '../utils/app.constants';


const SignupPage = ({ searchParams, router }: { router: any, searchParams: any }) => {

    const buttonRef = useRef(null);
    const hasClicked = useRef(false); // Track if the button has already been clicked
    useEffect(() => {
        // Trigger the click event only once on mount
        if (buttonRef.current && !hasClicked.current) {
            (buttonRef!.current as any).click();
            hasClicked.current = true; // Prevent further clicks
        }


    }, []);

    const handleSignup = async () => {
        try {
            sessionStorage.setItem(STORAGE_REDIRECT_PATH, searchParams.get("go") || "/profile");

            const user = await getOidcClient('urn:zitadel:iam:org:id:307354557854253060').signinRedirect({ extraQueryParams: { prompt: "create" } });


            let redirect = sessionStorage.getItem(STORAGE_REDIRECT_PATH) || "/profile"
            router.push(redirect!); //this can be dynamic if you pass some additional param during login/signup nd pickit up here.
        } catch (err) {
            console.error('Error handling callback:', err);
        }
    }

    return (<Suspense fallback="loading....">

        <div>
            Initaiting Signup...
        </div>
        <button ref={buttonRef} onClick={handleSignup}>
            Signup
        </button>
    </Suspense>)

}

export { SignupPage };
