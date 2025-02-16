import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const responses = await prisma.aiGenericResponse.findMany({
      where: {
        UserAiGenericResponse: {
          some: {
            userId: parseInt(userId, 10),
          },
        },
      },
    });

    return NextResponse.json(responses, { status: 200 });
  } catch (error: unknown) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
