import { useEffect, useState } from 'react';

interface UseQueryProps {
  fetchFunction: () => Promise<any>;
}
interface UseQueryReturn {
  loading: boolean;
  error: any;
  data: any;
}
export const useQuery = ({ fetchFunction }: UseQueryProps): UseQueryReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error('An unknown error occurred'),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { loading, error, data };
};
