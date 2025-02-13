import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest): Promise<NextResponse> {
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
