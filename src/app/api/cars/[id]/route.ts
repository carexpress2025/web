import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { pathname } = req.nextUrl;
    const idString = pathname.split('/').pop();

    if (!idString) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório' },
        { status: 400 },
      );
    }

    const id = Number(idString);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID deve ser um número válido' },
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

    return NextResponse.json(car);
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
