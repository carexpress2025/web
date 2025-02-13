import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const userId  = req.nextUrl.searchParams.get('id');
    const { numberToAdd } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!numberToAdd) {
      return NextResponse.json(
        {
          error: 'Número para adicionar à lista de não resposta é obrigatório',
        },
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
        {
          error:
            'Não foi encontrado as configurações do whatsapp para o usuário',
        },
        { status: 404 },
      );
    }

    const updatedWhatsapp = await prisma.whatsapps.update({
      where: { id: userWhatsapp.whatsappId },
      data: {
        noReplyList: {
          push: numberToAdd,
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Número adicionado à lista de não resposta com sucesso',
        data: updatedWhatsapp,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao adicionar número à lista de não resposta:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const userId  = req.nextUrl.searchParams.get('id');
    const { numberToRemove } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!numberToRemove) {
      return NextResponse.json(
        { error: 'Número para remover da lista de não resposta é obrigatório' },
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
        {
          error:
            'Não foi encontrado as configurações do whatsapp para o usuário',
        },
        { status: 404 },
      );
    }

    const updatedWhatsapp = await prisma.whatsapps.update({
      where: { id: userWhatsapp.whatsappId },
      data: {
        noReplyList: {
          set: userWhatsapp.whatsapp.noReplyList.filter(
            (number) => number !== numberToRemove,
          ),
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Número removido da lista de não resposta com sucesso',
        data: updatedWhatsapp,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao remover número da lista de não responder:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
