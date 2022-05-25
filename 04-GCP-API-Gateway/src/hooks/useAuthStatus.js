import { useState, useEffect } from "react";
import axios from "axios";

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    username: "",
  });

  useEffect(() => {
    let cancelRequest = false;
    const authToken = localStorage.getItem("psg_auth_token");
    axios
      .get(process.env.REACT_APP_GCP_GATEWAY_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (cancelRequest) {
          return;
        }
        const { email, phone } = response.data;
        if (email || phone) {
          setResult({
            isLoading: false,
            isAuthorized: true,
            username: email,
          });
        } else {
          setResult({
            isLoading: false,
            isAuthorized: false,
            username: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResult({
          isLoading: false,
          isAuthorized: false,
          username: "",
        });
      });
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}
