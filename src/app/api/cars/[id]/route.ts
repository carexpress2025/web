import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';

const parseIdFromRequest = (req: NextRequest): number | null => {
  const idString = req.nextUrl.pathname.split('/').pop();
  if (!idString) return null;
  const carId = Number(idString);
  return isNaN(carId) ? null : carId;
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const id = parseIdFromRequest(req);
    if (id === null) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório e deve ser um número válido' },
        { status: 400 },
      );
    }

    const car = await carRepository.getCarById(id);
    if (!car) {
      return NextResponse.json(
        { error: 'Carro não encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error(
      'Erro ao buscar carro:',
      error instanceof Error ? error.message : error,
    );

    const statusCode =
      error instanceof Error && error.message.includes('Database error')
        ? 503
        : 500;
    return NextResponse.json(
      { error: 'Erro ao buscar carro, tente novamente mais tarde' },
      { status: statusCode },
    );
  }
}
