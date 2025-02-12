import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Cars } from '@prisma/client';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;

    const skip = (page - 1) * limit;

    const cars: Cars[] = await prisma.cars.findMany({
      skip,
      take: limit,
    });

    const totalCars = await prisma.cars.count();

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
