"use client";

import { Suspense, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
import { getOidcClient } from "../utils/oidc-client";
import { STORAGE_REDIRECT_PATH } from "../utils/app.constants";
import { useAuth } from "../utils/auth.provider";
import { logger } from "../lib/client.logger";
import { LoaderCircleIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";


const AuthCallback = ({ router, searchParams }: { router: any, searchParams: any }) => {
    // const router = useRouter();
    let { setCurrentUser } = useAuth();
    // let searchParams = useSearchParams()
    let { toast } = useToast();

    useEffect(() => {

        console.log("@@@@searchParams in callback", searchParams);


        getOidcClient().signinRedirectCallback().then(user => {

            console.log('Logged in user with oidc-client-ts:', user);

            fetch("/manage-session", {
                method: "POST",
                body: JSON.stringify({ token: user.id_token })
            }).then((res) => {

                setCurrentUser(user)
                let redirect = sessionStorage.getItem(STORAGE_REDIRECT_PATH) || "/profile"
                logger.debug("redirectPath:", redirect);
                router.push(redirect!); //this can be dynamic if you pass some additional param during login/signup nd pickit up here.
            }).catch(err => {
                logger.error("erro in callback:", err);
                toast({
                    variant: "destructive",
                    title: "OOps! We couldn't finialize your process..",
                    description: "We found issues creating server side session.."
                })
            })


        }).catch(error => {
            toast({
                variant: "destructive",
                title: "OOps! We couldn't finialize your process..",
                description: "We encountered issues during oidc finalization.."
            })
        });



    }, []);

    return (
        <Suspense fallback="loading....">

            <div className="min-h-screen flex flex-col justify-around items-center ">
                <div>

                    <div className="">
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <LoaderCircleIcon size={32} className={`animate-spin`} />
                        <span className="font-bold text-foreground/80"> Wel Come,back!</span>
                        <span className="text-muted"> Completing the final step... You will be redirected to your page soon..</span>
                    </div>

                </div>
                <div></div>
            </div>
        </Suspense>
    );
};

export default AuthCallback;