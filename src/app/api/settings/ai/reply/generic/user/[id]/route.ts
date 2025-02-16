import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { positiveResponses, negativeResponses } = await req.json();
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!positiveResponses?.length && !negativeResponses?.length) {
      return NextResponse.json(
        {
          error:
            'É necessário fornecer pelo menos uma resposta positiva ou negativa',
        },
        { status: 400 },
      );
    }

    const newAiGenericResponse = await prisma.aiGenericResponse.create({
      data: {
        positiveResponses,
        negativeResponses,
        UserAiGenericResponse: {
          create: {
            userId: parseInt(userId, 10),
          },
        },
      },
    });

    return NextResponse.json(newAiGenericResponse, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
