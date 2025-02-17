import { NextRequest, NextResponse } from 'next/server';
import {
  sentManualMessageRepository,
  userRepository,
} from '@/domains/repositories';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { contact, body, usedAi, accountId, carId } = await req.json();

    if (!contact || !body) {
      return NextResponse.json(
        { error: 'Contato e corpo da mensagem são obrigatórios' },
        { status: 400 },
      );
    }

    if (!accountId && !carId) {
      return NextResponse.json(
        { error: 'É necessário informar userId ou carId' },
        { status: 400 },
      );
    }

    const userExists = await userRepository.getUserByAccountId(accountId);
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    const newMessage =
      await sentManualMessageRepository.createSentManualMensage(
        userExists.id,
        carId,
        contact,
        body,
        usedAi,
      );

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
