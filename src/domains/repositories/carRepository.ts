import prisma from '@/core/libs/prisma';
import {
  ICarElectronicsInterface,
  ICarInteriorInterface,
  ICarSafetyInterface,
  ICarSpecificationsInterface,
} from '@/data/interfaces';
import { makeCarQuery } from '../factories/queries/makeCarQuery';
import { ICarFiltersInterface } from '@/data/interfaces/ICarFiltersInterface';

export class CarRepository {
  async createCar(data: {
    idCar: string;
    brand?: string;
    name?: string;
    bodyType?: string;
    painting?: string;
    carType?: string;
    driveType?: string;
    transmissionType?: string;
    color?: string;
    mileage?: number;
    engine?: string;
    engineDisplacement?: number;
    fuelType?: string;
    safety: Partial<ICarSafetyInterface>;
    interior: Partial<ICarInteriorInterface>;
    electronics: Partial<ICarElectronicsInterface>;
    specifications: Partial<ICarSpecificationsInterface>;
    owners?: string;
    status?: string;
    year?: number;
    inspected?: string;
    plate?: string;
    additionalInformation?: string;
    others?: string;
    roadWorthy?: string;
    price?: number;
    images?: string[];
    phone?: string;
    seller?: string;
    link?: string;
  }) {
    return await prisma.car.create({
      data: data,
    });
  }

  async getCarById(id: number) {
    return await prisma.car.findUnique({ where: { id } });
  }

  async getCarByIdCar(idCar: string) {
    return await prisma.car.findUnique({ where: { idCar: idCar } });
  }

  async getCarByPublicId(publicId: string) {
    return await prisma.car.findUnique({ where: { publicId } });
  }

  async getAllCars() {
    return await prisma.car.findMany();
  }

  async updateCar(
    id: number,
    data: Partial<{
      idCar: string;
      brand?: string;
      name?: string;
      bodyType?: string;
      painting?: string;
      carType?: string;
      driveType?: string;
      transmissionType?: string;
      color?: string;
      mileage?: number;
      engine?: string;
      engineDisplacement?: number;
      fuelType?: string;
      safety: Partial<ICarSafetyInterface>;
      interior: Partial<ICarInteriorInterface>;
      electronics: Partial<ICarElectronicsInterface>;
      specifications: Partial<ICarSpecificationsInterface>;
      owners?: string;
      status?: string;
      year?: number;
      inspected?: string;
      plate?: string;
      additionalInformation?: string;
      others?: string;
      roadWorthy?: string;
      price?: number;
      images?: string[];
      phone?: string;
      seller?: string;
      link?: string;
    }>,
  ) {
    return await prisma.car.update({
      where: { id },
      data,
    });
  }

  async deleteCar(id: number) {
    return await prisma.car.delete({ where: { id } });
  }

  async getCarsByBrand(brand: string) {
    return await prisma.car.findMany({ where: { brand } });
  }

  async getCarsByYear(year: number) {
    return await prisma.car.findMany({ where: { year } });
  }

  async getCarsByPriceRange(minPrice: number, maxPrice: number) {
    return await prisma.car.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
  }

  async getCarsByColor(color: string) {
    return await prisma.car.findMany({ where: { color } });
  }

  async getCarWithFavorites(carId: number) {
    return await prisma.car.findUnique({
      where: { id: carId },
      include: {
        CarFavorite: true,
      },
    });
  }

  async getCarWithScheduling(carId: number) {
    return await prisma.car.findUnique({
      where: { id: carId },
      include: {
        CarUserScheduling: true,
      },
    });
  }

  async getCarWithMessages(carId: number) {
    return await prisma.car.findUnique({
      where: { id: carId },
      include: {
        CarSentManualMessage: true,
        CarSentAutomaticMessage: true,
      },
    });
  }

  async filter(filters: ICarFiltersInterface) {
    const query = makeCarQuery(filters);

    return await prisma.car.findMany({ where: query });
  }

  async count(filters: ICarFiltersInterface) {
    const query = makeCarQuery(filters);

    return await prisma.car.count({ where: query });
  }
}
