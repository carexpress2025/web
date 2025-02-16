import { NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';
import { Car } from '@prisma/client';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;

    const cars: Car[] = await carRepository.getAllCarsWithPagination(
      page,
      limit,
    );

    const totalCars = await carRepository.countCars();

    return NextResponse.json({
      cars,
      page,
      limit,
      totalCars,
      totalPages: Math.ceil(totalCars / limit),
    });
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes('Database error')) {
        statusCode = 503;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
