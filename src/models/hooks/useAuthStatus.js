import { useState, useEffect } from "react";
import { PassageUser } from '@passageidentity/passage-auth/passage-user';

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    username: "",
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
              username: "",
            });
            return;
      }
      const username = userInfo.email ? userInfo.email : userInfo.phone;
      setResult({
          isLoading: false,
          isAuthorized: true,
          username,
        });
    });
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}
