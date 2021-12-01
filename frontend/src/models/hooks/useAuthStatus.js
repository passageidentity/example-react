import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:7000";

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    userEmail: "",
  });

  useEffect(() => {
    let cancelRequest = false;
    const authToken = localStorage.getItem("psg_auth_token");
    axios
      .post(`${API_URL}/auth`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (cancelRequest) {
          return;
        }
        const { authStatus, identifier } = response.data;
        if (authStatus === "success") {
          setResult({
            isLoading: false,
            isAuthorized: authStatus,
            userIdentifier: identifier,
          });
        } else {
          setResult({
            isLoading: false,
            isAuthorized: false,
            userIdentifier: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResult({
          isLoading: false,
          isAuthorized: false,
          userIdentifier: "",
        });
      });
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}
