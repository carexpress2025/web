import { NextRequest, NextResponse } from 'next/server';
import {
  aiGenericResponseRepository,
  userRepository,
} from '@/domains/repositories';

const parseIdFromRequest = (req: NextRequest): number | null => {
  const idString = req.nextUrl.pathname.split('/').pop();
  if (!idString) return null;
  const accountId = Number(idString);
  return isNaN(accountId) ? null : accountId;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const accountId = parseIdFromRequest(req);
    if (accountId === null) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório e deve ser um número válido' },
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

    const { positiveResponses, negativeResponses } = await req.json();

    if (!positiveResponses?.length && !negativeResponses?.length) {
      return NextResponse.json(
        {
          error:
            'É necessário fornecer pelo menos uma resposta positiva ou negativa',
        },
        { status: 400 },
      );
    }

    const newAiGenericResponse =
      await aiGenericResponseRepository.createAiGenericResponse(
        userExists.id,
        positiveResponses,
        negativeResponses,
      );

    return NextResponse.json(newAiGenericResponse, { status: 201 });
  } catch (error: unknown) {
    console.error('Erro ao criar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const accountId = parseIdFromRequest(req);
    if (accountId === null) {
      return NextResponse.json(
        { error: 'ID do carro é obrigatório e deve ser um número válido' },
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

    const aiGenericResponses =
      await aiGenericResponseRepository.getUserAiGenericResponseByUserId(
        userExists.id,
      );

    return NextResponse.json(aiGenericResponses, { status: 200 });
  } catch (error: unknown) {
    console.error('Erro ao buscar respostas:', error);
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

    const userExists = await userRepository.getUserByAccountId(accountId);
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    const { positiveResponses, negativeResponses } = await req.json();

    if (!positiveResponses?.length && !negativeResponses?.length) {
      return NextResponse.json(
        {
          error:
            'É necessário fornecer pelo menos uma resposta positiva ou negativa',
        },
        { status: 400 },
      );
    }

    const updatedAiGenericResponse =
      await aiGenericResponseRepository.updateAiGenericResponse(
        positiveResponses,
        negativeResponses,
      );

    return NextResponse.json(updatedAiGenericResponse, { status: 200 });
  } catch (error: unknown) {
    console.error('Erro ao atualizar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
