import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const {
      sendMessagesWithIA,
      replyMessagesWithIA,
      replyWithGenericAnswers,
      modelIA,
      apiKeyIA,
    } = await req.json();
    const { id: userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const newSetting = await prisma.settings.create({
      data: {
        sendMessagesWithIA: sendMessagesWithIA,
        replyMessagesWithIA: replyMessagesWithIA,
        replyWithGenericAnswers: replyWithGenericAnswers,
        modelIA: modelIA,
        apiKeyIA: apiKeyIA,
        UserSettings: {
          create: {
            userId: userId,
          },
        },
      },
    });

    return NextResponse.json(newSetting, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
