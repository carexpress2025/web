/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Card } from '@/components/ui/card';
import { LanguageState } from '@/data/store/languageSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import ButtonCreateSessionBackend from './buttons/ButtonCreateSessionBackend';
import { useGetWhatsappSession } from '@/infra/hooks/whatsapp/useGetWhatsappSession';
import { useSession } from 'next-auth/react';

export default function CardScanQrcode() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  const { data: session } = useSession();

  const { error, getWhatsappSession, loading, sessionData, successMessage } =
    useGetWhatsappSession();

  const createSessionFrontend = async () => {};

  const handleGetQrCode = async () => {};

  const handleRemoveSession = async () => {};

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (!session?.user?.id) {
      console.error('Usuário não autenticado');
      return;
    }

    const userId = Number(session.user.id);
    getWhatsappSession(userId);
  }, [session, getWhatsappSession]);

  const isSessionCreated = sessionData && sessionData.status !== 'STOPPED';

  return (
    <Card className="p-4 shadow-md rounded-xl w-full max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          {t('pages.whatsapp.qrcode.generateQrCode.title')}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {t('pages.whatsapp.qrcode.generateQrCode.descriptionWhats')}
        </p>
        {whatsappConnected && (
          <p className="text-green-600 font-medium mt-2">
            {t('pages.whatsapp.connected')}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {!isSessionCreated && <ButtonCreateSessionBackend />}

        <Button
          onClick={handleGetQrCode}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600"
        >
          {t('qrCode.generateQrCode.button.generate')}
          {loading && <Loader2 className="ml-2 animate-spin" />}
        </Button>
        <Button
          onClick={handleRemoveSession}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600"
        >
          {t('qrCode.generateQrCode.button.delete')}
          {loading && <Loader2 className="ml-2 animate-spin" />}
        </Button>
      </div>

      {qrValue && (
        <div className="mt-4 flex justify-center">
          <Image
            src={qrValue}
            alt="QRCode"
            width={180}
            height={180}
            className="rounded-md shadow"
          />
        </div>
      )}
    </Card>
  );
}
