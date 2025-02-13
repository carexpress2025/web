import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;

    const { number, session } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    if (!number || !session) {
      return NextResponse.json(
        { error: 'O número e a sessão são obrigatórios' },
        { status: 400 },
      );
    }

    const existingWhatsapp = await prisma.whatsapps.findUnique({
      where: { number: number },
    });

    if (existingWhatsapp) {
      return NextResponse.json(
        { error: 'Número de WhatsApp já cadastrado' },
        { status: 400 },
      );
    }

    const newWhatsapp = await prisma.whatsapps.create({
      data: {
        number,
        session,
        UsersWhatsapp: {
          create: {
            userId: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'WhatsApp cadastrado com sucesso', data: newWhatsapp },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao criar WhatsApp:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id: userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID é obrigatório' },
        { status: 400 },
      );
    }

    const userWhatsapp = await prisma.userWhatsapp.findUnique({
      where: { userId: userId },
      include: {
        whatsapp: true,
      },
    });

    if (!userWhatsapp) {
      return NextResponse.json(
        { error: 'Usuário não encontrado ou WhatsApp não cadastrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'WhatsApp encontrado com sucesso', data: userWhatsapp },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar WhatsApp:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
