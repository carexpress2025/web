import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';
import { Car } from '@prisma/client';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit'));

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'O parâmetro page deve ser um número inteiro positivo' },
        { status: 400 },
      );
    }

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: 'O parâmetro limit deve ser um número inteiro positivo' },
        { status: 400 },
      );
    }

    const cars: Car[] = await carRepository.getAllCarsWithPagination(
      page,
      limit,
    );
    const totalCars = await carRepository.countCars();

    return NextResponse.json(
      {
        cars,
        page,
        limit,
        totalCars,
        totalPages: Math.ceil(totalCars / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      'Erro ao buscar carros:',
      error instanceof Error ? error.message : error,
    );

    const statusCode =
      error instanceof Error && error.message.includes('Database error')
        ? 503
        : 500;
    return NextResponse.json(
      { error: 'Erro ao buscar carros, tente novamente mais tarde' },
      { status: statusCode },
    );
  }
}
