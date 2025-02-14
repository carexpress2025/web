import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);

    const includeUser = searchParams.get('user') === 'true';
    const includeAccounts = searchParams.get('accounts') === 'true';
    const includeSchedulings = searchParams.get('schedulings') === 'true';
    const includeSentManualMessage =
      searchParams.get('sentManualMessage') === 'true';
    const includeWhatsapp = searchParams.get('whatsapp') === 'true';
    const includeSettings = searchParams.get('settings') === 'true';

    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        UserAccounts: includeAccounts
          ? {
              include: {
                account: true,
                user: includeUser,
              },
            }
          : false,
        UserSchedulings: includeSchedulings,
        UserSentManualMessage: includeSentManualMessage,
        UsersWhatsapp: includeWhatsapp,
        UserSettings: includeSettings,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const id = req.nextUrl.searchParams.get('id');
    const { name } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'O ID do usuário é obrigatório' },
        { status: 400 },
      );
    }

    const userExists = await prisma.users.findUnique({ where: { id } });

    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        name: name || userExists.name,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'O ID do usuário é obrigatório' },
        { status: 400 },
      );
    }

    const userExists = await prisma.users.findUnique({ where: { id } });

    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    await prisma.users.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Usuário excluído com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
