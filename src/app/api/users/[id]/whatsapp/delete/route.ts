import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const userWhatsapp = await prisma.userWhatsapp.findUnique({
      where: { userId: userId },
    });

    if (!userWhatsapp) {
      return NextResponse.json(
        { error: 'Usuário não encontrado ou WhatsApp não cadastrado' },
        { status: 404 },
      );
    }

    await prisma.userWhatsapp.delete({
      where: { userId: userId },
    });

    await prisma.whatsapps.delete({
      where: { id: userWhatsapp.whatsappId },
    });

    return NextResponse.json(
      { message: 'WhatsApp removido com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao remover WhatsApp:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
