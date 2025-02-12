'use client';

import { LanguageState } from '@/store/languageSlice';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ICarInterface } from '@/interfaces';
import CarCard from '@/components/CarCard';
import { useGetCarsLimited } from '@/hooks/useGetCarsLimited';
import i18n from '../../../../i18n';
import { Loading } from '@/components/Loading';

export function SectionHomeView() {
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  const { cars, error, fetchCars, loading } = useGetCarsLimited();

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto">
        {loading && (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        )}
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car: ICarInterface) => (
              <CarCard key={car.idCar} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
