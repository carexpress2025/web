import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Scheduling {
  id: string;
  name: string;
  filters: object;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UseGetSchedulingsReturn {
  error: string;
  loading: boolean;
  schedulings: Scheduling[];
  fetchSchedulings: (userId: string) => void;
}

export function useGetSchedulings(): UseGetSchedulingsReturn {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
  const { t } = useTranslation();

  const fetchSchedulings = async (userId: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/schedulings/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setSchedulings(data.schedulings || []);
      } else {
        setError(t('hooks.errors.errorFetchingSchedulings'));
      }
    } catch {
      setError(t('hooks.errors.errorFetchingSchedulings'));
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    schedulings,
    fetchSchedulings,
  };
}
