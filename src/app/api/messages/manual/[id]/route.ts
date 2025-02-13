import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const messageId = req.nextUrl.searchParams.get('id');

    if (!messageId) {
      return NextResponse.json(
        { error: 'O ID da mensagem é obrigatório' },
        { status: 400 },
      );
    }

    const message = await prisma.sentManualMensage.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem não encontrada' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Mensagem encontrada com sucesso', data: message },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar a mensagem manual:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
