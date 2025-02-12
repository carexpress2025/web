import { ICarInterface } from '@/interfaces';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseGetCarsLimitedReturn {
  error: string;
  loading: boolean;
  cars: ICarInterface[];
  fetchCars: () => void;
}

export function useGetCarsLimited(): UseGetCarsLimitedReturn {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<ICarInterface[]>([]);
  const { t } = useTranslation();

  const fetchCars = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/cars');

      if (response.ok) {
        const data = await response.json();
        setCars(data);
      } else {
        if (response.status === 404) {
          setError(t('hooks.errors.carsNotFound'));
        } else {
          setError(t('hooks.errors.errorFetchingCars'));
        }
      }
    } catch {
      setError(t('hooks.errors.errorFetchingCars'));
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    cars,
    fetchCars,
  };
}
