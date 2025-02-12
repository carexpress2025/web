import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;
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
          error:
            'Pelo menos um dos campos settingsReply ou settingsSend deve ser fornecido',
        },
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

    if (settingsReply) {
      const { instructions, roles, context, language, expectedOutput } =
        settingsReply;

      if (!instructions || !roles || !context || !language || !expectedOutput) {
        return NextResponse.json(
          { error: 'Todos os campos de settingsReply são obrigatórios.' },
          { status: 400 },
        );
      }

      await prisma.prompts.update({
        where: { id: userPrompts.promptId },
        data: {
          settingsReply: {
            instructions,
            roles,
            context,
            language,
            expectedOutput,
          },
        },
      });
    }

    if (settingsSend) {
      const { instructions, roles, context, language, expectedOutput } =
        settingsSend;

      if (!instructions || !roles || !context || !language || !expectedOutput) {
        return NextResponse.json(
          { error: 'Todos os campos de settingsSend são obrigatórios.' },
          { status: 400 },
        );
      }

      await prisma.prompts.update({
        where: { id: userPrompts.promptId },
        data: {
          settingsSend: {
            instructions,
            roles,
            context,
            language,
            expectedOutput,
          },
        },
      });
    }

    return NextResponse.json(
      { message: 'Configurações de prompt atualizadas com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
