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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 },
      );
    }

    const userSettings = await prisma.userSettings.findUnique({
      where: { userId: userId },
      include: {
        settings: true,
      },
    });

    if (!userSettings) {
      return NextResponse.json(
        { error: 'Configurações do usuário não encontradas' },
        { status: 404 },
      );
    }

    return NextResponse.json(userSettings.settings, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar configurações do usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;
    const {
      sendMessagesWithIA,
      replyMessagesWithIA,
      replyWithGenericAnswers,
      modelIA,
      apiKeyIA,
    } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 },
      );
    }

    const updatedSettings = await prisma.userSettings.update({
      where: { userId: userId },
      data: {
        settings: {
          update: {
            sendMessagesWithIA:
              sendMessagesWithIA !== undefined ? sendMessagesWithIA : undefined,
            replyMessagesWithIA:
              replyMessagesWithIA !== undefined
                ? replyMessagesWithIA
                : undefined,
            replyWithGenericAnswers:
              replyWithGenericAnswers !== undefined
                ? replyWithGenericAnswers
                : undefined,
            modelIA: modelIA || undefined,
            apiKeyIA: apiKeyIA || undefined,
          },
        },
      },
    });

    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
