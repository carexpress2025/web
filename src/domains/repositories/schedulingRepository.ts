import prisma from '@/core/libs/prisma';
import { ICarFiltersInterface } from '@/data/interfaces/ICarFiltersInterface';
import { SCHEDULINGS_STATUS } from '@prisma/client';

export class SchedulingRepository {
  async createScheduling(data: {
    name: string;
    filters: Partial<ICarFiltersInterface>;
    message: string;
    favorities?: boolean;
  }) {
    return await prisma.scheduling.create({
      data,
    });
  }

  async getSchedulingById(id: number) {
    return await prisma.scheduling.findUnique({ where: { id } });
  }

  async getSchedulingByPublicId(publicId: string) {
    return await prisma.scheduling.findUnique({ where: { publicId } });
  }

  async getAllSchedulings() {
    return await prisma.scheduling.findMany();
  }

  async updateScheduling(
    id: number,
    data: Partial<{
      name: string;
      filters: Partial<ICarFiltersInterface>;
      message: string;
      favorities: boolean;
      status: SCHEDULINGS_STATUS;
    }>,
  ) {
    return await prisma.scheduling.update({
      where: { id },
      data,
    });
  }

  async deleteScheduling(id: number) {
    return await prisma.scheduling.delete({ where: { id } });
  }
}

export class UserSchedulingRepository {
  async createUserScheduling(userId: number, schedulingId: number) {
    return await prisma.userScheduling.create({
      data: { userId, schedulingId },
    });
  }

  async getUserSchedulingById(id: number) {
    return await prisma.userScheduling.findUnique({ where: { id } });
  }

  async getUserSchedulingByUserId(userId: number) {
    return await prisma.userScheduling.findMany({ where: { userId } });
  }

  async getUserSchedulingBySchedulingId(schedulingId: number) {
    return await prisma.userScheduling.findUnique({
      where: { schedulingId },
    });
  }

  async getUserSchedulingsByUserId(userId: number) {
    return await prisma.userScheduling.findMany({ where: { userId } });
  }

  async updateUserScheduling(
    id: number,
    data: Partial<{ userId: number; schedulingId: number }>,
  ) {
    return await prisma.userScheduling.update({
      where: { id },
      data,
    });
  }

  async deleteUserScheduling(id: number) {
    return await prisma.userScheduling.delete({ where: { id } });
  }
}

export class CarUserSchedulingRepository {
  async createCarUserScheduling(
    userSchedulingId: number,
    cars: { id: number }[],
  ) {
    return await prisma.carUserScheduling.create({
      data: { userSchedulingId, cars: { connect: cars } },
    });
  }

  async getCarUserSchedulingById(id: number) {
    return await prisma.carUserScheduling.findUnique({ where: { id } });
  }

  async getCarUserSchedulingByUserSchedulingId(userSchedulingId: number) {
    return await prisma.carUserScheduling.findUnique({
      where: { userSchedulingId },
    });
  }

  async getCarsByUserSchedulingId(userSchedulingId: number) {
    return await prisma.carUserScheduling.findMany({
      where: { userSchedulingId },
      include: { cars: true },
    });
  }

  async updateCarUserScheduling(
    id: number,
    data: Partial<{ userSchedulingId: number }>,
  ) {
    return await prisma.carUserScheduling.update({
      where: { id },
      data,
    });
  }

  async deleteCarUserScheduling(id: number) {
    return await prisma.carUserScheduling.delete({ where: { id } });
  }
}
