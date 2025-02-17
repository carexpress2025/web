import prisma from '@/core/libs/prisma';

export class AiGenericResponseRepository {
  async createAiGenericResponse(
    userId: number,
    positiveResponses: string[],
    negativeResponses: string[],
  ) {
    return await prisma.aiGenericResponse.create({
      data: {
        positiveResponses: positiveResponses,
        negativeResponses: negativeResponses,
        UserAiGenericResponse: {
          create: {
            userId: userId,
          },
        },
      },
    });
  }

  async getAiGenericResponseById(id: number) {
    return await prisma.aiGenericResponse.findUnique({ where: { id } });
  }

  async getAiGenericResponseByPublicId(publicId: string) {
    return await prisma.aiGenericResponse.findUnique({ where: { publicId } });
  }

  async getAllAiGenericResponses() {
    return await prisma.aiGenericResponse.findMany();
  }

  async updateAiGenericResponse(
    id: number,
    data: Partial<{
      positiveResponses: string[];
      negativeResponses: string[];
    }>,
  ) {
    return await prisma.aiGenericResponse.update({
      where: { id },
      data,
    });
  }

  async deleteAiGenericResponse(id: number) {
    return await prisma.aiGenericResponse.delete({ where: { id } });
  }

  async createUserAiGenericResponse(
    userId: number,
    aiGenericResponseId: number,
  ) {
    return await prisma.userAiGenericResponse.create({
      data: { userId, aiGenericResponseId },
    });
  }

  async getUserAiGenericResponseById(id: number) {
    return await prisma.userAiGenericResponse.findUnique({ where: { id } });
  }

  async getUserAiGenericResponseByUserId(userId: number) {
    return await prisma.userAiGenericResponse.findUnique({ where: { userId } });
  }

  async getUserAiGenericResponsesByUserId(userId: number) {
    return await prisma.userAiGenericResponse.findMany({ where: { userId } });
  }

  async updateUserAiGenericResponse(
    id: number,
    data: Partial<{ userId: number; aiGenericResponseId: number }>,
  ) {
    return await prisma.userAiGenericResponse.update({
      where: { id },
      data,
    });
  }

  async deleteUserAiGenericResponse(id: number) {
    return await prisma.userAiGenericResponse.delete({ where: { id } });
  }
}
