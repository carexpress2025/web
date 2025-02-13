import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: schedulingId } = params;

    const { status } = await req.json();

    if (!schedulingId) {
      return NextResponse.json(
        { error: 'ID do agendamento é obrigatório' },
        { status: 400 },
      );
    }

    const existingScheduling = await prisma.schedulings.findUnique({
      where: { id: schedulingId },
    });

    if (!existingScheduling) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 },
      );
    }

    const updatedScheduling = await prisma.schedulings.update({
      where: { id: schedulingId },
      data: {
        status: status || existingScheduling.status,
      },
    });

    return NextResponse.json(
      {
        message: 'Agendamento atualizado com sucesso',
        data: updatedScheduling,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
