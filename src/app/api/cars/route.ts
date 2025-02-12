import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Cars } from '@prisma/client';

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
