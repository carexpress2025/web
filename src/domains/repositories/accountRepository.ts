import prisma from '@/core/libs/prisma';

export class AccountRepository {
  async createAccount(email: string, password: string) {
    return await prisma.account.create({
      data: { email, password },
    });
  }

  async getAccountByEmail(email: string) {
    return await prisma.account.findUnique({ where: { email } });
  }

  async getAccountById(id: number) {
    return await prisma.account.findUnique({ where: { id } });
  }

  async updateAccount(
    id: number,
    data: Partial<{ email: string; password: string }>,
  ) {
    return await prisma.account.update({
      where: { id },
      data,
    });
  }

  async deleteAccount(id: number) {
    return await prisma.account.delete({ where: { id } });
  }

  async createUserAccount(userId: number, accountId: number) {
    return await prisma.userAccount.create({
      data: { userId, accountId },
    });
  }

  async getUserAccountByUserId(userId: number) {
    return await prisma.userAccount.findUnique({ where: { userId } });
  }

  async getUserAccountByAccountId(accountId: number) {
    return await prisma.userAccount.findUnique({ where: { accountId } });
  }

  async updateUserAccount(
    id: number,
    data: Partial<{ userId: number; accountId: number }>,
  ) {
    return await prisma.userAccount.update({
      where: { id },
      data,
    });
  }

  async deleteUserAccount(id: number) {
    return await prisma.userAccount.delete({ where: { id } });
  }
}
