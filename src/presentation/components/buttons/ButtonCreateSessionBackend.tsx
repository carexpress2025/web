'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import i18n from '../../../../i18n';
import { useCreateWhatsappSession } from '@/infra/hooks';
import { LanguageState } from '@/data/store/languageSlice';
import { useSession } from 'next-auth/react';

export default function ButtonCreateSessionBackend() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const { createWhatsappSession, error, loading, successMessage } =
    useCreateWhatsappSession();

  const handleCreateSession = async () => {
    if (!session?.user?.id) {
      console.error('Usuário não autenticado');
      return;
    }

    await createWhatsappSession({
      accountId: session.user ? Number(session.user.id) : 0,
      session: session.user ? session.user.name + session.user.id : 'default',
    });
  };

  return (
    <div>
      <Button
        onClick={handleCreateSession}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? t('components.buttons.whatsapp.session.creatingSession')
          : t('components.buttons.whatsapp.session.createSession')}
        {loading && <Loader2 className="ml-2 animate-spin" />}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
}
