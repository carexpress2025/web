import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as string | null;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereCondition: any = { userId };

    if (status) {
      whereCondition.scheduling = { status };
    }

    const userSchedulings = await prisma.userSchedulings.findMany({
      where: whereCondition,
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
