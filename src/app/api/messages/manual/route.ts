import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { contact, body, usedAi, userId, carId } = await req.json();

    if (!contact || !body) {
      return NextResponse.json(
        { error: 'Contato e corpo da mensagem são obrigatórios' },
        { status: 400 },
      );
    }

    if (!userId && !carId) {
      return NextResponse.json(
        { error: 'É necessário informar userId ou carId' },
        { status: 400 },
      );
    }

    const newMessage = await prisma.sentManualMensage.create({
      data: {
        contact,
        body,
        usedAi: usedAi ?? false,
        UserSentManualMessage: userId ? { create: { userId } } : undefined,
        CarSentManualMessage: carId ? { create: { carId } } : undefined,
      },
    });

    return NextResponse.json(
      { message: 'Mensagem manual enviada com sucesso', data: newMessage },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao enviar mensagem manual:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
