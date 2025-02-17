'use client';

import { LanguageState } from '@/data/store/languageSlice';
import { useGetCarsPagination } from '@/infra/hooks/cars/useGetCarsPagination';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import { ICarInterface } from '@/domains/entities';
import CarCard from './CarCard';

export default function CarsListView() {
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const { cars, currentPage, error, fetchCars, loading, totalCars } =
    useGetCarsPagination();

  const totalPages = Math.ceil(totalCars / 12);

  useEffect(() => {
    fetchCars(currentPage);
  }, []);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      fetchCars(page);
    }
  };

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto">
        {error && (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-500">{error}</p>
          </div>
        )}
        {!loading && !error && cars.length === 0 && (
          <div className="flex items-center justify-center">
            <p className="text-lg text-gray-500">
              {t('errors.cars.noAvailable')}
            </p>
          </div>
        )}
        {!loading && !error && cars.length > 0 && (
          <div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car: ICarInterface) => (
                <CarCard key={car.idCar} car={car} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                {t('components.buttons.pagination.previous')}
              </button>
              <span className="px-4 py-2 text-gray-700">
                {t('components.buttons.pagination.page')} {currentPage}{' '}
                {t('components.buttons.pagination.of')} {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                {t('components.buttons.pagination.next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
