import { useState, useEffect } from "react";
import { PassageUser } from '@passageidentity/passage-elements/passage-user';

export function useCurrentUser() {
    const [result, setResult] = useState({
        isLoading: true,
        isAuthorized: false,
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
                });
                return;
            }
            setResult({
                isLoading: false,
                isAuthorized: true,
            });
        });
        return () => {
            cancelRequest = true;
        };
    }, []);
    return result;
}