import { useEffect, useRef, useState } from 'react';

type FetchResult<T> = {
  loading: boolean;
  data: { data: T[]; meta: Record<string, any> };
  error?: Error;
};
export const useFetch = <T extends unknown>(
  url: string,
  invalidate = false,
): FetchResult<T> => {
  const cache = useRef({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (cache.current[url] && !invalidate) {
          setData(cache.current[url]);
        } else {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          setData(data);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};
