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

    const userMessages = await prisma.userSentManualMessage.findMany({
      where: { userId },
      include: {
        sentManualMessage: true,
      },
    });

    if (userMessages.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma mensagem encontrada para este usuário' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Mensagens encontradas com sucesso',
        data: userMessages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar mensagens manuais:', error);
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
    const { messageId, status } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!messageId) {
      return NextResponse.json(
        { error: 'O ID da mensagem é obrigatório' },
        { status: 400 },
      );
    }

    const existingMessage = await prisma.userSentManualMessage.findFirst({
      where: {
        userId,
        sentManualMessageId: messageId,
      },
      include: {
        sentManualMessage: true,
      },
    });

    if (!existingMessage) {
      return NextResponse.json(
        { error: 'Mensagem não encontrada ou não pertence ao usuário' },
        { status: 404 },
      );
    }

    const updatedMessage = await prisma.sentManualMensage.update({
      where: { id: messageId },
      data: {
        status: status ?? existingMessage.sentManualMessage.status,
      },
    });

    return NextResponse.json(
      {
        message: 'Mensagem atualizada com sucesso',
        data: updatedMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao atualizar mensagem manual:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
