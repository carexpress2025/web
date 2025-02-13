import { ICarInterface } from '@/interfaces';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseGetAllCarsReturn {
  error: string;
  loading: boolean;
  cars: ICarInterface[];
  fetchCars: (page?: number, limit?: number) => void;
  totalCars: number;
  currentPage: number;
}

export function useGetCars(): UseGetAllCarsReturn {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<ICarInterface[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { t } = useTranslation();

  const fetchCars = async (page: number = 1, limit: number = 12) => {
    setLoading(true);
    setError('');
    setCurrentPage(page);

    try {
      const res = await fetch(
        `/api/cars/pagination?page=${page}&limit=${limit}`,
      );
      const countRes = await fetch('/api/cars/count');

      if (!res.ok || !countRes.ok) {
        throw new Error(t('hooks.errors.errorFetchingCars'));
      }

      const data = await res.json();
      const total = await countRes.json();

      setCars(data);
      setTotalCars(total);
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
    totalCars,
    currentPage,
  };
}
