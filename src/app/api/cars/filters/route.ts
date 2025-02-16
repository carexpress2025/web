import { ICarFiltersInterface } from '@/data/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const filters = Object.fromEntries(
      searchParams,
    ) as unknown as ICarFiltersInterface;

    const cars = await carRepository.filterCars(filters);

    return NextResponse.json({ cars });
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
