import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createUserSchema } from '@/validations';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: result.error.format() },
        { status: 400 },
      );
    }

    const { name, accountId } = result.data;

    const newUser = await prisma.user.create({
      data: {
        name,
        UserAccounts: {
          create: { accountId },
        },
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
