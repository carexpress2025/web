import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const userSchedulings = await prisma.userSchedulings.findMany({
      where: { userId },
      include: {
        scheduling: true,
      },
    });

    if (userSchedulings.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum agendamento encontrado para este usuário' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Agendamentos encontrados com sucesso',
        data: userSchedulings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
