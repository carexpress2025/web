import {
  CAR_BODY_TYPE,
  CAR_BRAND,
  CAR_COLOR,
  CAR_FUELTYPE,
  CAR_PAINTING_TYPE,
  CAR_TRANSMISSION_TYPE,
  CAR_TYPE,
} from '@/data/enums';
import type {
  ICarElectronicsInterface,
  ICarInteriorInterface,
  ICarSafetyInterface,
  ICarSpecificationsInterface,
} from '@/data/interfaces';
import type { Car } from '@prisma/client';

export interface ICarInterface extends Partial<Car> {
  brand: CAR_BRAND;
  bodyType: CAR_BODY_TYPE;
  painting: CAR_PAINTING_TYPE;
  carType: CAR_TYPE;
  transmissionType: CAR_TRANSMISSION_TYPE;
  color: CAR_COLOR;
  fuelType: CAR_FUELTYPE;
  safety: ICarSafetyInterface;
  interior: ICarInteriorInterface;
  specifications: ICarSpecificationsInterface;
  electronics: ICarElectronicsInterface;
  images: string[];
}
