import { NextRequest, NextResponse } from 'next/server';
import { userRepository, userWhatsappRepository } from '@/domains/repositories';
import { WAHA_TOKEN, WAHA_URL } from '@/core/libs/waha';

const parseIdFromRequest = (req: NextRequest): number | null => {
  try {
    const idString = req.nextUrl.pathname.split('/').pop();
    if (!idString) return null;
    const accountId = Number(idString);
    return isNaN(accountId) ? null : accountId;
  } catch {
    return null;
  }
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const accountId = parseIdFromRequest(req);
    if (accountId === null) {
      return NextResponse.json(
        { error: 'ID da conta é obrigatório e deve ser um número válido' },
        { status: 400 },
      );
    }

    const user = await userRepository.getUserByAccountId(accountId);
    if (!user || !user.user) {
      return NextResponse.json(
        { error: 'Conta não encontrada' },
        { status: 404 },
      );
    }

    const existingWhatsapp =
      await userWhatsappRepository.getUserWhatsappByUserId(user.user.id);
    if (!existingWhatsapp || !existingWhatsapp.whatsapp?.session) {
      return NextResponse.json(
        { error: 'Sessão do WhatsApp não encontrada para esta conta' },
        { status: 404 },
      );
    }

    const response = await fetch(
      `${WAHA_URL}/sessions/${existingWhatsapp.whatsapp.session}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': WAHA_TOKEN,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Falha ao recuperar a sessão no WAHA', details: errorData },
        { status: response.status },
      );
    }

    const sessionData = await response.json();
    return NextResponse.json(
      {
        message: 'Sessão do WhatsApp encontrada',
        data: { existingWhatsapp, sessionData },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
