import { NextRequest, NextResponse } from 'next/server';
import { promptRepository, userRepository } from '@/domains/repositories';

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

    const { settingsReply, settingsSend } = await req.json();

    if (!settingsReply && !settingsSend) {
      return NextResponse.json(
        {
          message:
            'Configurações de Prompt da IA deve incluir Envio ou Resposta',
        },
        { status: 400 },
      );
    }

    const settingsPromptExists = await promptRepository.getUserPromptsByUserId(
      userExists.id,
    );

    if (settingsPromptExists) {
      return NextResponse.json(
        { error: 'Prompt já existente para o id de usuário' },
        { status: 400 },
      );
    }

    if (settingsSend) {
      const { instructions, roles, context, language, expectedOutput } =
        settingsSend;

      if (!instructions || !roles || !context || !language || !expectedOutput) {
        return NextResponse.json(
          { error: 'Todos os campos do settingsSend são obrigatórios.' },
          { status: 400 },
        );
      }
    }

    if (settingsReply) {
      const { instructions, roles, context, language, expectedOutput } =
        settingsReply;

      if (!instructions || !roles || !context || !language || !expectedOutput) {
        return NextResponse.json(
          { error: 'Todos os campos do settingsReply são obrigatórios.' },
          { status: 400 },
        );
      }
    }

    const settingsPrompt = await promptRepository.createPrompt(
      userExists.id,
      settingsReply,
      settingsSend,
    );

    return NextResponse.json(
      { message: 'Configurações criadas com sucesso', data: settingsPrompt },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
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

    const userPrompts = await promptRepository.getUserPromptsByUserId(
      userExists.id,
    );

    if (!userPrompts) {
      return NextResponse.json(
        { error: 'Prompt não encontrado para este usuário' },
        { status: 404 },
      );
    }

    return NextResponse.json(userPrompts, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
