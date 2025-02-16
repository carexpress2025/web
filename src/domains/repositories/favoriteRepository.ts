import prisma from '@/core/libs/prisma';

export class FavoriteRepository {
  async createFavorite() {
    return await prisma.favorite.create({
      data: {},
    });
  }

  async getFavoriteById(id: number) {
    return await prisma.favorite.findUnique({ where: { id } });
  }

  async getFavoriteByPublicId(publicId: string) {
    return await prisma.favorite.findUnique({ where: { publicId } });
  }

  async updateFavorite(id: number, data: Partial<{ publicId: string }>) {
    return await prisma.favorite.update({
      where: { id },
      data,
    });
  }

  async deleteFavorite(id: number) {
    return await prisma.favorite.delete({ where: { id } });
  }
}

export class UserFavoriteRepository {
  async createUserFavorite(userId: number, favoriteId: number) {
    return await prisma.userFavorite.create({
      data: { userId, favoriteId },
    });
  }

  async getUserFavoriteById(id: number) {
    return await prisma.userFavorite.findUnique({ where: { id } });
  }

  async getUserFavoriteByUserId(userId: number) {
    return await prisma.userFavorite.findUnique({ where: { userId } });
  }

  async getUserFavoriteByFavoriteId(favoriteId: number) {
    return await prisma.userFavorite.findUnique({ where: { favoriteId } });
  }

  async updateUserFavorite(
    id: number,
    data: Partial<{ userId: number; favoriteId: number }>,
  ) {
    return await prisma.userFavorite.update({
      where: { id },
      data,
    });
  }

  async deleteUserFavorite(id: number) {
    return await prisma.userFavorite.delete({ where: { id } });
  }
}

export class CarFavoriteRepository {
  async createCarFavorite(userFavoriteId: number) {
    return await prisma.carFavorite.create({
      data: { userFavoriteId },
    });
  }

  async getCarFavoriteById(id: number) {
    return await prisma.carFavorite.findUnique({ where: { id } });
  }

  async getCarFavoriteByUserFavoriteId(userFavoriteId: number) {
    return await prisma.carFavorite.findUnique({ where: { userFavoriteId } });
  }

  async getCarFavoritesByUserFavoriteId(userFavoriteId: number) {
    return await prisma.carFavorite.findMany({ where: { userFavoriteId } });
  }

  async updateCarFavorite(
    id: number,
    data: Partial<{ userFavoriteId: number }>,
  ) {
    return await prisma.carFavorite.update({
      where: { id },
      data,
    });
  }

  async deleteCarFavorite(id: number) {
    return await prisma.carFavorite.delete({ where: { id } });
  }
}
