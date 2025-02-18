import prisma from '@/core/libs/prisma';

export class WhatsappUserRepository {
  async createWhatsapp(userId: number, session: string, number?: string) {
    return await prisma.whatsapp.create({
      data: {
        number: number ? number : undefined,
        session: session,
        UserWhatsapp: {
          create: {
            userId: userId,
          },
        },
      },
    });
  }

  async getWhatsappById(id: number) {
    return await prisma.whatsapp.findUnique({ where: { id } });
  }

  async getWhatsappByPublicId(publicId: string) {
    return await prisma.whatsapp.findUnique({ where: { publicId } });
  }

  async getAllWhatsapps() {
    return await prisma.whatsapp.findMany();
  }

  async updateWhatsapp(
    id: number,
    data: Partial<{ number: string; session: string }>,
  ) {
    return await prisma.whatsapp.update({
      where: { id },
      data,
    });
  }

  async deleteWhatsapp(id: number) {
    return await prisma.whatsapp.delete({ where: { id } });
  }

  async createUserWhatsapp(userId: number, whatsappId: number) {
    return await prisma.userWhatsapp.create({
      data: { userId, whatsappId },
    });
  }

  async getUserWhatsappById(id: number) {
    return await prisma.userWhatsapp.findUnique({ where: { id } });
  }

  async getUserWhatsappByUserId(userId: number) {
    return await prisma.userWhatsapp.findUnique({ where: { userId } });
  }

  async getUserWhatsappByWhatsappId(whatsappId: number) {
    return await prisma.userWhatsapp.findUnique({ where: { whatsappId } });
  }

  async getUserWhatsappsByUserId(userId: number) {
    return await prisma.userWhatsapp.findUnique({ where: { userId } });
  }

  async updateUserWhatsapp(
    id: number,
    data: Partial<{
      userId: number;
      whatsappId: number;
      noReplyList: string[];
    }>,
  ) {
    return await prisma.userWhatsapp.update({
      where: { id },
      data,
    });
  }

  async deleteUserWhatsapp(id: number) {
    return await prisma.userWhatsapp.delete({ where: { id } });
  }
}
