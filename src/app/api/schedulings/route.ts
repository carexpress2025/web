import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId, name, filters, message, status } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!name || !filters || !message) {
      return NextResponse.json(
        { error: 'Nome, filtros e mensagem são obrigatórios' },
        { status: 400 },
      );
    }

    const newScheduling = await prisma.schedulings.create({
      data: {
        name,
        filters,
        message,
        status: status || 'PENDING',
        UserSchedulings: {
          create: {
            userId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Agendamento criado com sucesso', data: newScheduling },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
