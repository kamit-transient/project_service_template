"use client"
import { Suspense, useEffect, useRef, useState } from "react";
import { getOidcClient } from "../utils/oidc-client";
import { STORAGE_REDIRECT_PATH } from "../utils/app.constants";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "../components/ui/button";


const Login = ({ searchParams, router }: any) => {
    const buttonRef = useRef(null);
    // let searchParams = useSearchParams()
    let [isManualLoginButtonEnabled, setIsManualLoginButtonEnabled] = useState(false);
    const hasClicked = useRef(false); // Track if the button has already been clicked
    // let router = useRouter();
    useEffect(() => {
        // Trigger the click event only once on mount
        if (buttonRef.current && !hasClicked.current) {
            (buttonRef!.current as any).click();
            hasClicked.current = true; // Prevent further clicks
        }


    }, []);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setIsManualLoginButtonEnabled(true);
        }, 10000);


        return () => clearTimeout(timeoutId);
    }, [])

    const handleLogin = async () => {
        try {
            // console.log("ggg", { go: searchParams.get("go") || "/profile" });
            sessionStorage.setItem(STORAGE_REDIRECT_PATH, searchParams.get("go") || "/profile");

            //rojuka org id: 296895114628825091
            //https://zitadel.com/docs/apis/openidoauth/scopes
            const user = await getOidcClient().signinRedirect();
            // console.log('Logged in user with oidc-client-ts:', user);
            //   window.location.href = '/'; // Redirect to home after login
            // setCurrentUser(user);
            let redirect = sessionStorage.getItem(STORAGE_REDIRECT_PATH) || "/profile"
            router.push(redirect!); //this can be dynamic if you pass some additional param during login/signup and pickit up here.
        } catch (err) {
            console.error('Error handling callback:', err);
        }
    }

    return <Suspense fallback="loading....">
        <div className="min-h-screen flex flex-col justify-around items-center ">
            <div>

                <div className="">
                </div>

                <div className="flex flex-col justify-center items-center">
                    <LoaderCircleIcon size={32} className={`${!isManualLoginButtonEnabled ? 'animate-spin' : ''}`} />
                    <span>Initaiting Signin...</span>
                </div>

                <div className={`flex flex-col justify-center items-center my-20 ${isManualLoginButtonEnabled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>

                    <Button variant={"outline"} ref={buttonRef} onClick={handleLogin}>
                        Log Me In
                    </Button>
                    <div className="text-muted">
                        If you are not being redirected to login form, click the button above.
                    </div>
                </div>

            </div>
            <div></div>
        </div>
    </Suspense>;
};

export default Login;