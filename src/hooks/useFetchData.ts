import { useEffect, useState } from 'react';

export const useFetchData = <T>(url: string) => {
  const [data, setSata] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async (urlParam: string) => {
    try {
      setIsError(false);
      const response = await fetch(urlParam);

      const res = await response.json();

      setSata(res);
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return {
    isLoading,
    fetchData,
    isError,
    data,
  };
};
