import prisma from '@/core/libs/prisma';
import { SENT_MANUAL_MESSAGE } from '@prisma/client';

export class SentManualMensageRepository {
  async createSentManualMensage(
    userId: number,
    carId: number,
    contact: string,
    body: string,
    usedAi?: boolean,
  ) {
    return await prisma.sentManualMensage.create({
      data: {
        contact,
        body,
        usedAi: usedAi ?? false,
        UserSentManualMessage: userId ? { create: { userId } } : undefined,
        CarSentManualMessage: carId ? { create: { carId } } : undefined,
      },
    });
  }

  async getSentManualMensageById(id: number) {
    return await prisma.sentManualMensage.findUnique({ where: { id } });
  }

  async getSentManualMensageByPublicId(publicId: string) {
    return await prisma.sentManualMensage.findUnique({ where: { publicId } });
  }

  async getAllSentManualMensages() {
    return await prisma.sentManualMensage.findMany();
  }

  async updateSentManualMensage(
    id: number,
    data: Partial<{
      contact: string;
      body: string;
      usedAi: boolean;
      status: SENT_MANUAL_MESSAGE;
    }>,
  ) {
    return await prisma.sentManualMensage.update({
      where: { id },
      data,
    });
  }

  async deleteSentManualMensage(id: number) {
    return await prisma.sentManualMensage.delete({ where: { id } });
  }
}

export class UserSentManualMessageRepository {
  async createUserSentManualMessage(
    userId: number,
    sentManualMessageId: number,
  ) {
    return await prisma.userSentManualMessage.create({
      data: { userId, sentManualMessageId },
    });
  }

  async getUserSentManualMessageById(id: number) {
    return await prisma.userSentManualMessage.findUnique({ where: { id } });
  }

  async getUserSentManualMessageByUserId(userId: number) {
    return await prisma.userSentManualMessage.findMany({ where: { userId } });
  }

  async getUserSentManualMessagesByUserId(userId: number) {
    return await prisma.userSentManualMessage.findMany({ where: { userId } });
  }

  async updateUserSentManualMessage(
    id: number,
    data: Partial<{ userId: number; sentManualMessageId: number }>,
  ) {
    return await prisma.userSentManualMessage.update({
      where: { id },
      data,
    });
  }

  async deleteUserSentManualMessage(id: number) {
    return await prisma.userSentManualMessage.delete({ where: { id } });
  }
}

export class CarSentManualMessageRepository {
  async createCarSentManualMessage(carId: number, sentManualMessageId: number) {
    return await prisma.carSentManualMessage.create({
      data: { carId, sentManualMessageId },
    });
  }

  async getCarSentManualMessageById(id: number) {
    return await prisma.carSentManualMessage.findUnique({ where: { id } });
  }

  async getCarSentManualMessageByCarId(carId: number) {
    return await prisma.carSentManualMessage.findMany({ where: { carId } });
  }

  async getCarSentManualMessagesByCarId(carId: number) {
    return await prisma.carSentManualMessage.findMany({ where: { carId } });
  }

  async updateCarSentManualMessage(
    id: number,
    data: Partial<{ carId: number; sentManualMessageId: number }>,
  ) {
    return await prisma.carSentManualMessage.update({
      where: { id },
      data,
    });
  }

  async deleteCarSentManualMessage(id: number) {
    return await prisma.carSentManualMessage.delete({ where: { id } });
  }
}
