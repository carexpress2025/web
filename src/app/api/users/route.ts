import { NextRequest, NextResponse } from 'next/server';
import { createUserSchema } from '@/validations';
import { userRepository } from '@/domains/repositories';

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

    const language = 'fi';

    const newUser = await userRepository.createUser(name, accountId, language);

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
