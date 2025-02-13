import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const idCar = req.nextUrl.searchParams.get('id');
    const data = await req.json();

    if (!idCar) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório' },
        { status: 400 },
      );
    }

    const existingCar = await prisma.cars.findUnique({
      where: { idCar },
    });

    if (!existingCar) {
      return NextResponse.json(
        { error: 'Carro não encontrado' },
        { status: 404 },
      );
    }

    const updatedCar = await prisma.cars.update({
      where: { idCar },
      data,
    });

    return NextResponse.json(
      { message: 'Carro atualizado com sucesso', data: updatedCar },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const idCar = req.nextUrl.searchParams.get('id');

    if (!idCar) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório' },
        { status: 400 },
      );
    }

    const car = await prisma.cars.findUnique({
      where: { idCar },
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Carro não encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Carro encontrado com sucesso', data: car },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar carro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
