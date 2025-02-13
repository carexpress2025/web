import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;

    const { number, session } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!number && !session) {
      return NextResponse.json(
        { error: 'Número ou sessão são obrigatórios para atualização' },
        { status: 400 },
      );
    }

    const userWhatsapp = await prisma.userWhatsapp.findUnique({
      where: { userId: userId },
      include: {
        whatsapp: true,
      },
    });

    if (!userWhatsapp) {
      return NextResponse.json(
        { error: 'Usuário não encontrado ou WhatsApp não cadastrado' },
        { status: 404 },
      );
    }

    const updatedWhatsapp = await prisma.whatsapps.update({
      where: {
        id: userWhatsapp.whatsappId,
      },
      data: {
        number: number || userWhatsapp.whatsapp.number,
        session: session || userWhatsapp.whatsapp.session,
      },
    });

    return NextResponse.json(
      { message: 'WhatsApp atualizado com sucesso', data: updatedWhatsapp },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao atualizar WhatsApp:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
