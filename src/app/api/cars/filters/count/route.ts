import { ICarFiltersInterface } from '@/data/interfaces';
import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const filters = Object.fromEntries(
      searchParams,
    ) as unknown as ICarFiltersInterface;

    if (!filters) {
      return NextResponse.json(
        { error: 'Filtros inválidos ou ausentes' },
        { status: 400 },
      );
    }

    const count = await carRepository.countCarsWithFilters(filters);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(
      'Erro ao contar carros com filtros:',
      error instanceof Error ? error.message : error,
    );

    const statusCode =
      error instanceof Error && error.message.includes('Database error')
        ? 503
        : 500;
    return NextResponse.json(
      {
        error: 'Erro ao buscar contagem de carros, tente novamente mais tarde',
      },
      { status: statusCode },
    );
  }
}
