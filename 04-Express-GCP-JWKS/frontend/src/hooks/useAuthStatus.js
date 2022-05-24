import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:7000";

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    message: "",
    GCP_API_GATEWAY_URL: "",
  });

  useEffect(() => {
    let cancelRequest = false;
    const authToken = localStorage.getItem("psg_auth_token");
    axios
      .post(`${API_URL}/JWKAuth`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (cancelRequest) {
          return;
        }
        const { message, GCP_API_GATEWAY_URL } = response.data;
        if (message) {
          setResult({
            isLoading: false,
            isAuthorized: true,
            message: message,
            GCP_API_GATEWAY_URL: GCP_API_GATEWAY_URL,
          });
        } else {
          setResult({
            isLoading: false,
            isAuthorized: false,
            message: "",
            GCP_API_GATEWAY_URL: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResult({
          isLoading: false,
          isAuthorized: false,
          message: "",
          GCP_API_GATEWAY_URL: "",
        });
      });
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}
