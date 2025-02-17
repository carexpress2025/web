import { NextRequest, NextResponse } from 'next/server';
import { userRepository } from '@/domains/repositories';

const parseIdFromRequest = (req: NextRequest): number | null => {
  const idString = req.nextUrl.pathname.split('/').pop();
  if (!idString) return null;
  const accountId = Number(idString);
  return isNaN(accountId) ? null : accountId;
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const accountId = parseIdFromRequest(req);
    if (accountId === null) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório e deve ser um número válido' },
        { status: 400 },
      );
    }

    const user = await userRepository.getUserByAccountId(accountId);
    if (!user) {
      return NextResponse.json(
        { error: 'Carro não encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar carro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const accountId = parseIdFromRequest(req);
    if (accountId === null) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório e deve ser um número válido' },
        { status: 400 },
      );
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
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

    const updatedUser = await userRepository.updateUser(userExists.id, {
      name,
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
