import { ICarInterface } from '@/domains/entities';
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

export function useGetCarsPagination(): UseGetAllCarsReturn {
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

      const countRes = await fetch('/api/cars/filters/count');

      if (!res.ok || !countRes.ok) {
        throw new Error(t('messages.errors.cars.errorFetchingCars'));
      }

      const data = await res.json();
      const total = await countRes.json();

      const { cars } = data;
      const { count } = total;

      setCars(cars);
      setTotalCars(count);
    } catch (err) {
      console.error(err);
      setError(t('messages.errors.cars.errorFetchingCars'));
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
