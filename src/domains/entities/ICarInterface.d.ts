import type { CAR_BODY_TYPE } from '../../enums/CarBodyType';
import type { CAR_BRAND } from '../../enums/CarBrand';
import type { CAR_COLOR } from '../../enums/CarColor';
import type { CAR_FUELTYPE } from '../../enums/CarFuelType';
import type { CAR_PAINTING_TYPE } from '../../enums/CarPaintingType';
import type { CAR_TRANSMISSION_TYPE } from '../../enums/CarTransmissionType';
import type { ICarElectronicsInterface } from '../ICarElectronicsInterface';
import type { ICarInteriorInterface } from '../ICarInteriorInterface';
import type { ICarSafetyInterface } from '../ICarSafetyInterface';
import type { ICarSpecificationsInterface } from '../ICarSpecificationsInterface';
import { Car } from '@prisma/client';

export interface ICarInterface extends Car {
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
}
