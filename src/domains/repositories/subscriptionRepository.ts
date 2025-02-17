import prisma from '@/core/libs/prisma';

export class SubscriptionRepository {
  async createSubscription(name: string, price: number) {
    return await prisma.subscription.create({
      data: { name, price },
    });
  }

  async getSubscriptionById(id: number) {
    return await prisma.subscription.findUnique({ where: { id } });
  }

  async getSubscriptionByPublicId(publicId: string) {
    return await prisma.subscription.findUnique({ where: { publicId } });
  }

  async getAllSubscriptions() {
    return await prisma.subscription.findMany();
  }

  async updateSubscription(
    id: number,
    data: Partial<{ name: string; price: number }>,
  ) {
    return await prisma.subscription.update({
      where: { id },
      data,
    });
  }

  async deleteSubscription(id: number) {
    return await prisma.subscription.delete({ where: { id } });
  }
}

export class UserSubscriptionRepository {
  async createUserSubscription(userId: number, subscriptionId: number) {
    return await prisma.userSubscription.create({
      data: { userId, subscriptionId },
    });
  }

  async getUserSubscriptionById(id: number) {
    return await prisma.userSubscription.findUnique({ where: { id } });
  }

  async getUserSubscriptionByUserId(userId: number) {
    return await prisma.userSubscription.findUnique({ where: { userId } });
  }

  async getUserSubscriptionBySubscriptionId(subscriptionId: number) {
    return await prisma.userSubscription.findUnique({
      where: { subscriptionId },
    });
  }

  async getUserSubscriptionsByUserId(userId: number) {
    return await prisma.userSubscription.findMany({ where: { userId } });
  }

  async updateUserSubscription(
    id: number,
    data: Partial<{ userId: number; subscriptionId: number }>,
  ) {
    return await prisma.userSubscription.update({
      where: { id },
      data,
    });
  }

  async deleteUserSubscription(id: number) {
    return await prisma.userSubscription.delete({ where: { id } });
  }
}
