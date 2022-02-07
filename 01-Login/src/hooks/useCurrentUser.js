import { useState, useEffect } from "react";
import { PassageUser } from '@passageidentity/passage-auth/passage-user';

export function useCurrentUser() {
    const [result, setResult] = useState({
        isLoading: true,
        isAuthorized: false,
        userID: '',
    });

    useEffect(() => {
        let cancelRequest = false;
        new PassageUser().userInfo().then(userInfo=> {
            if( cancelRequest ) {
                return;
            }
            if(userInfo === undefined){
                setResult({
                    isLoading: false,
                    isAuthorized: false,
                    userID: "",
                });
                return;
            }
            setResult({
                isLoading: false,
                isAuthorized: true,
                userID: userInfo.id,
            });
        });
        return () => {
            cancelRequest = true;
        };
    }, []);
    return result;
}