import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();

    if (!data.idCar || !data.name || !data.brand || !data.year || !data.price) {
      return NextResponse.json(
        { error: 'Os campos id, name, brand, year e price são obrigatórios' },
        { status: 400 },
      );
    }

    const existingCar = await carRepository.getCarByIdCar(data.idCar);

    if (existingCar) {
      return NextResponse.json(
        { error: 'ID do carro já cadastrado' },
        { status: 400 },
      );
    }

    const newCar = await carRepository.createCar({
      ...data,
    });

    return NextResponse.json(
      { message: 'Carro cadastrado com sucesso', data: newCar },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const cars = await carRepository.getAllCars();
    return NextResponse.json(cars);
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
