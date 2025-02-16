import prisma from '@/core/libs/prisma';

export class PromptRepository {
  async createPrompt(settingsReply?: object, settingsSend?: object) {
    return await prisma.prompt.create({
      data: {
        settingsReply,
        settingsSend,
      },
    });
  }

  async getPromptById(id: number) {
    return await prisma.prompt.findUnique({ where: { id } });
  }

  async getPromptByPublicId(publicId: string) {
    return await prisma.prompt.findUnique({ where: { publicId } });
  }

  async getAllPrompts() {
    return await prisma.prompt.findMany();
  }

  async updatePrompt(
    id: number,
    data: Partial<{ settingsReply: object; settingsSend: object }>,
  ) {
    return await prisma.prompt.update({
      where: { id },
      data,
    });
  }

  async deletePrompt(id: number) {
    return await prisma.prompt.delete({ where: { id } });
  }

  async createUserPrompt(userId: number, promptId: number) {
    return await prisma.userPrompt.create({
      data: { userId, promptId },
    });
  }

  async getUserPromptById(id: number) {
    return await prisma.userPrompt.findUnique({ where: { id } });
  }

  async getUserPromptByUserId(userId: number) {
    return await prisma.userPrompt.findUnique({ where: { userId } });
  }

  async getUserPromptByPromptId(promptId: number) {
    return await prisma.userPrompt.findUnique({ where: { promptId } });
  }

  async getUserPromptsByUserId(userId: number) {
    return await prisma.userPrompt.findMany({ where: { userId } });
  }

  async updateUserPrompt(
    id: number,
    data: Partial<{ userId: number; promptId: number }>,
  ) {
    return await prisma.userPrompt.update({
      where: { id },
      data,
    });
  }

  async deleteUserPrompt(id: number) {
    return await prisma.userPrompt.delete({ where: { id } });
  }
}
