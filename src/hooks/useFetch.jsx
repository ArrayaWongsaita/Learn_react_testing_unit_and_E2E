import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useFetch(url) {
  const baseUrl = "http://localhost:3000";
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const token = localStorage.getItem("token");

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const fetchData = async () => {
      try {
        const requestOptions = {
          method: options.method || 'GET',
          ...options,
          headers: {
            authorization: token ? `Bearer ${token}` : "",
            ...options.headers,
          },
        };
        const res = await axios.request(baseUrl + url, requestOptions);
        setResponse(res.data);
        setError(null);
      } catch (error) {
        setError(error.response ? error.response.data : "An error occurred");
        setResponse(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading, options, url, token]);

  return [{ response, isLoading, error }, doFetch];
}
