import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const userSchedulings = await prisma.userSchedulings.findMany({
      where: { userId },
      include: {
        scheduling: true,
      },
    });

    if (userSchedulings.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum agendamento encontrado para este usuário' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Agendamentos encontrados com sucesso',
        data: userSchedulings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.nextUrl.searchParams.get('id');
    const schedulingId = req.nextUrl.searchParams.get('id');
    const updates = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!schedulingId) {
      return NextResponse.json(
        { error: 'Scheduling ID é obrigatório' },
        { status: 400 },
      );
    }

    const schedulingExists = await prisma.userSchedulings.findUnique({
      where: {
        schedulingId,
        userId,
      },
      include: {
        scheduling: true,
      },
    });

    if (!schedulingExists) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado para este usuário' },
        { status: 404 },
      );
    }

    const updatedScheduling = await prisma.schedulings.update({
      where: { id: schedulingId },
      data: {
        ...updates,
        updatedAt: new Date(),
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
