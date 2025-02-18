import { NextRequest, NextResponse } from 'next/server';
import { userRepository, userWhatsappRepository } from '@/domains/repositories';
import { WAHA_TOKEN, WAHA_URL } from '@/core/libs/waha';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { accountId } = body;

    if (!accountId) {
      return NextResponse.json(
        {
          error: 'Todos os campos (accountId) são obrigatórios',
        },
        { status: 400 },
      );
    }

    const user = await userRepository.getUserByAccountId(accountId);
    if (!user || !user.accountId) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    if (!user.user?.name) {
      return NextResponse.json(
        { error: 'Nome de Usuário não encontrado' },
        { status: 404 },
      );
    }

    const session = user
      ? (user.user?.name.trim() + new Date().toISOString().split('T')[0])
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/-/g, '')
      : 'default';

    const existingWhatsapp =
      await userWhatsappRepository.getUserWhatsappsByUserId(user.id);

    if (existingWhatsapp) {
      return NextResponse.json(
        { error: 'Número de WhatsApp já cadastrado para este usuário' },
        { status: 409 },
      );
    }

    const newWhatsapp = await userWhatsappRepository.createWhatsapp(
      user.user.id,
      session,
    );

    if (!newWhatsapp) {
      return NextResponse.json(
        { error: 'Não foi possivel criar a conta do whatsapp' },
        { status: 500 },
      );
    }

    const response = await fetch(`${WAHA_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': WAHA_TOKEN,
      },
      body: JSON.stringify({
        name: session,
        start: false,
        config: {
          metadata: {
            'user.id': user.id.toString(),
            'user.email': user.account?.email,
          },
          proxy: null,
          debug: false,
          noweb: {
            store: {
              enabled: true,
              fullSync: false,
            },
          },
          webhooks: [
            {
              url: `${process.env.NEXTAUTH_URL}/webhooks`,
              events: ['message'],
              hmac: null,
              retries: null,
              customHeaders: null,
            },
          ],
        },
      }),
    });

    console.log(response, { token: WAHA_TOKEN });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao chamar API externa:', errorData);
      return NextResponse.json(
        { error: 'Falha ao registrar a sessão no waha' },
        { status: response.status },
      );
    }

    const sessionData = await response.json();

    return NextResponse.json(
      {
        message: 'Sessão do Whatsapp Criado',
        data: { newWhatsapp, sessionData },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao criar sessão do whatsapp:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
