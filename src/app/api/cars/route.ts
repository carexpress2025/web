import { NextRequest, NextResponse } from 'next/server';
import { carRepository } from '@/domains/repositories';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const requiredFields = ['idCar', 'name', 'brand', 'year', 'price'];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Os campos ${missingFields.join(', ')} são obrigatórios` },
        { status: 400 },
      );
    }

    const existingCar = await carRepository.getCarByIdCar(data.idCar);
    if (existingCar) {
      return NextResponse.json(
        { error: 'ID do carro já cadastrado' },
        { status: 409 },
      );
    }

    const newCar = await carRepository.createCar(data);
    return NextResponse.json(
      { message: 'Carro cadastrado com sucesso', data: newCar },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      'Erro ao criar carro:',
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const cars = await carRepository.getAllCars();
    return NextResponse.json(cars, { status: 200 });
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
