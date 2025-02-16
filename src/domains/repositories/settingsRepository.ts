import prisma from '@/core/libs/prisma';

export class SettingsRepository {
  async createSettings(
    sendMessagesWithIA: boolean,
    replyMessagesWithIA: boolean,
    replyWithGenericAnswers: boolean,
    modelIA?: string,
    apiKeyIA?: string,
  ) {
    return await prisma.settings.create({
      data: {
        sendMessagesWithIA,
        replyMessagesWithIA,
        replyWithGenericAnswers,
        modelIA,
        apiKeyIA,
      },
    });
  }

  async getSettingsById(id: number) {
    return await prisma.settings.findUnique({ where: { id } });
  }

  async getSettingsByPublicId(publicId: string) {
    return await prisma.settings.findUnique({ where: { publicId } });
  }

  async getAllSettings() {
    return await prisma.settings.findMany();
  }

  async updateSettings(
    id: number,
    data: Partial<{
      sendMessagesWithIA: boolean;
      replyMessagesWithIA: boolean;
      replyWithGenericAnswers: boolean;
      modelIA: string;
      apiKeyIA: string;
    }>,
  ) {
    return await prisma.settings.update({
      where: { id },
      data,
    });
  }

  async deleteSettings(id: number) {
    return await prisma.settings.delete({ where: { id } });
  }

  async createUserSettings(userId: number, settingsId: number) {
    return await prisma.userSettings.create({
      data: { userId, settingsId },
    });
  }

  async getUserSettingsById(id: number) {
    return await prisma.userSettings.findUnique({ where: { id } });
  }

  async getUserSettingsByUserId(userId: number) {
    return await prisma.userSettings.findUnique({ where: { userId } });
  }

  async getUserSettingsBySettingsId(settingsId: number) {
    return await prisma.userSettings.findUnique({ where: { settingsId } });
  }

  async getUserSettingsByUserIdMany(userId: number) {
    return await prisma.userSettings.findMany({ where: { userId } });
  }

  async updateUserSettings(
    id: number,
    data: Partial<{ userId: number; settingsId: number }>,
  ) {
    return await prisma.userSettings.update({
      where: { id },
      data,
    });
  }

  async deleteUserSettings(id: number) {
    return await prisma.userSettings.delete({ where: { id } });
  }
}
