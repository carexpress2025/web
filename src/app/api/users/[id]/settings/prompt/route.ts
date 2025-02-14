import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const userId  = req.nextUrl.searchParams.get('id');

    const { settingsReply, settingsSend } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!settingsReply && !settingsSend) {
      return NextResponse.json(
        {
          message:
            'Configurações de Prompt da IA deve incluir Envio ou Resposta',
        },
        { status: 400 },
      );
    }

    const settingsPromptExists = await prisma.userPrompts.findUnique({
      where: { userId: userId },
    });

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

    const settingsPrompt = await prisma.prompts.create({
      data: {
        settingsReply: settingsReply,
        settingsSend: settingsSend,
        UserPrompts: {
          create: {
            userId: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Configurações criadas com sucesso', data: settingsPrompt },
      { status: 201 },
    );
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
    const userId  = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const userPrompts = await prisma.userPrompts.findUnique({
      where: { userId: userId },
      include: {
        prompt: true,
      },
    });

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
