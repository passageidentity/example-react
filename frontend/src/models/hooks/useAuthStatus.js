import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = "http://localhost:7000";

export function useAuthStatus() {
  const [result, setResult] = useState({isLoading: true, isAuthorized: false, userEmail: ''});

  useEffect(()=>{
    let cancelRequest = false;
    const cookieValue = Cookie.get("psg_auth_token");
    if (cancelRequest) {
      return;
    }
    axios
    .post(`${API_URL}/auth`, null, {
      headers: {
        Authorization: `Bearer ${cookieValue}`,
      },
    })
    .then((response) => {
      const { authStatus, email } = response.data;
      if (authStatus === "success") {
        setResult({isLoading: false, isAuthorized: authStatus, userEmail: email});
      }else{
        setResult({isLoading: false, isAuthorized: false, userEmail: ''});
      }
    })
    .catch((err) => {
      console.log(err);
      setResult({isLoading: false, isAuthorized: false, userEmail: ''});
    });
    return (()=>{cancelRequest = true;})
  }, [])
  return result;
}