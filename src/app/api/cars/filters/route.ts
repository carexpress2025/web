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
        { error: 'Filtros inválidos ou não fornecidos' },
        { status: 400 },
      );
    }

    const cars = await carRepository.filterCars(filters);

    if (!cars || cars.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum carro encontrado com os filtros fornecidos' },
        { status: 404 },
      );
    }

    return NextResponse.json({ cars }, { status: 200 });
  } catch (error: unknown) {
    console.error(
      'Erro ao filtrar carros:',
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
