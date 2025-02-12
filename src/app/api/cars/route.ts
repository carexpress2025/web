import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Cars } from '@prisma/client';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();

    if (!data.idCar || !data.name || !data.brand || !data.year || !data.price) {
      return NextResponse.json(
        {
          error: 'Os campos idCar, name, brand, year e price são obrigatórios',
        },
        { status: 400 },
      );
    }

    const existingCar = await prisma.cars.findUnique({
      where: { idCar: data.idCar },
    });

    if (existingCar) {
      return NextResponse.json(
        { error: 'ID do carro já cadastrado' },
        { status: 400 },
      );
    }

    const newCar = await prisma.cars.create({
      data: {
        idCar: data.idCar,
        brand: data.brand,
        name: data.name,
        bodyType: data.bodyType,
        painting: data.painting,
        carType: data.carType,
        driveType: data.driveType,
        transmissionType: data.transmissionType,
        color: data.color,
        mileage: data.mileage,
        engine: data.engine,
        engineDisplacement: data.engineDisplacement,
        fuelType: data.fuelType,
        safety: data.safety,
        interior: data.interior,
        electronics: data.electronics,
        owners: data.owners,
        status: data.status,
        year: data.year,
        inspected: data.inspected,
        plate: data.plate,
        additionalInformation: data.additionalInformation,
        others: data.others,
        roadWorthy: data.roadWorthy,
        price: data.price,
        images: data.images || [],
        phone: data.phone,
        seller: data.seller,
        link: data.link,
      },
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
    const cars: Cars[] = await prisma.cars.findMany({
      take: 300,
      orderBy: {
        createdAt: 'desc',
      },
    });
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
