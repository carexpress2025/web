import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, accountId } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: 'O nome é obrigatório' },
        { status: 400 },
      );
    }

    const newUser = await prisma.users.create({
      data: {
        name,
        UserAccounts: {
          create: {
            accountId: accountId,
          },
        },
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const users = await prisma.users.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
