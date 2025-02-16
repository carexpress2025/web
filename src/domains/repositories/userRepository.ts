import prisma from '@/core/libs/prisma';

export class UserRepository {
  async createUser(name: string, language: string = 'fi') {
    return await prisma.user.create({
      data: { name, language },
    });
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async getUserByPublicId(publicId: string) {
    return await prisma.user.findUnique({ where: { publicId } });
  }

  async updateUser(
    id: number,
    data: Partial<{ name: string; language: string }>,
  ) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } });
  }

  async getUserScheduling(userId: number) {
    return await prisma.userScheduling.findMany({ where: { userId } });
  }

  async getUserSubscription(userId: number) {
    return await prisma.userSubscription.findUnique({ where: { userId } });
  }

  async getUserAiGenericResponse(userId: number) {
    return await prisma.userAiGenericResponse.findUnique({ where: { userId } });
  }

  async getUserWhatsapp(userId: number) {
    return await prisma.userWhatsapp.findUnique({ where: { userId } });
  }

  async getUserSettings(userId: number) {
    return await prisma.userSettings.findUnique({ where: { userId } });
  }

  async getUserFavorite(userId: number) {
    return await prisma.userFavorite.findUnique({ where: { userId } });
  }

  async getUserPrompts(userId: number) {
    return await prisma.userPrompt.findUnique({ where: { userId } });
  }

  async getUserWithAllData(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        UserAccounts: true,
        UserSubscription: true,
        UserAiGenericResponse: true,
        UserScheduling: true,
        UserSentManualMessage: true,
        UserSentAutomaticMessage: true,
        UserWhatsapp: true,
        UserSettings: true,
        UserFavorite: true,
        UserPrompts: true,
      },
    });
  }
}
