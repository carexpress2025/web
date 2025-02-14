import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(
      { message: 'Carro encontrado com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao buscar carro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
