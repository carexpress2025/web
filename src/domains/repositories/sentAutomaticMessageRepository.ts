import prisma from '@/core/libs/prisma';
import { SENT_AUTOMATIC_MESSAGE } from '@prisma/client';

export class SentAutomaticMessageRepository {
  async createSentAutomaticMessage(data: {
    contact: string;
    body: string;
    usedAi?: boolean;
    status?: SENT_AUTOMATIC_MESSAGE;
  }) {
    return await prisma.sentAutomaticMessage.create({
      data,
    });
  }

  async getSentAutomaticMessageById(id: number) {
    return await prisma.sentAutomaticMessage.findUnique({ where: { id } });
  }

  async getSentAutomaticMessageByPublicId(publicId: string) {
    return await prisma.sentAutomaticMessage.findUnique({
      where: { publicId },
    });
  }

  async getAllSentAutomaticMessages() {
    return await prisma.sentAutomaticMessage.findMany();
  }

  async updateSentAutomaticMessage(
    id: number,
    data: Partial<{
      contact: string;
      body: string;
      usedAi: boolean;
      status: SENT_AUTOMATIC_MESSAGE;
    }>,
  ) {
    return await prisma.sentAutomaticMessage.update({
      where: { id },
      data,
    });
  }

  async deleteSentAutomaticMessage(id: number) {
    return await prisma.sentAutomaticMessage.delete({ where: { id } });
  }

  async createUserSentAutomaticMessage(
    userId: number,
    sentAutomaticMessageId: number,
  ) {
    return await prisma.userSentAutomaticMessage.create({
      data: { userId, sentAutomaticMessageId },
    });
  }

  async getUserSentAutomaticMessageById(id: number) {
    return await prisma.userSentAutomaticMessage.findUnique({ where: { id } });
  }

  async getUserSentAutomaticMessageByUserId(userId: number) {
    return await prisma.userSentAutomaticMessage.findMany({
      where: { userId },
    });
  }

  async getUserSentAutomaticMessagesByUserId(userId: number) {
    return await prisma.userSentAutomaticMessage.findMany({
      where: { userId },
    });
  }

  async updateUserSentAutomaticMessage(
    id: number,
    data: Partial<{ userId: number; sentAutomaticMessageId: number }>,
  ) {
    return await prisma.userSentAutomaticMessage.update({
      where: { id },
      data,
    });
  }

  async deleteUserSentAutomaticMessage(id: number) {
    return await prisma.userSentAutomaticMessage.delete({ where: { id } });
  }

  async createCarSentAutomaticMessage(
    carId: number,
    sentAutomaticMessageId: number,
  ) {
    return await prisma.carSentAutomaticMessage.create({
      data: { carId, sentAutomaticMessageId },
    });
  }

  async getCarSentAutomaticMessageById(id: number) {
    return await prisma.carSentAutomaticMessage.findUnique({ where: { id } });
  }

  async getCarSentAutomaticMessageByCarId(carId: number) {
    return await prisma.carSentAutomaticMessage.findMany({
      where: { carId },
    });
  }

  async getCarSentAutomaticMessagesByCarId(carId: number) {
    return await prisma.carSentAutomaticMessage.findMany({ where: { carId } });
  }

  async updateCarSentAutomaticMessage(
    id: number,
    data: Partial<{ carId: number; sentAutomaticMessageId: number }>,
  ) {
    return await prisma.carSentAutomaticMessage.update({
      where: { id },
      data,
    });
  }

  async deleteCarSentAutomaticMessage(id: number) {
    return await prisma.carSentAutomaticMessage.delete({ where: { id } });
  }
}
