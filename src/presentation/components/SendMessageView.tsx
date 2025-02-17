'use client';

import { LanguageState } from '@/data/store/languageSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import i18n from '../../../i18n';
import { useCreateSentMessageManual } from '@/infra/hooks/messages/useCreateSentMessageManual';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function SendMessageView() {
  const [message, setMessage] = useState('');
  const [editablePhone, setEditablePhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const carId = searchParams.get('car');

  const { data: session, status } = useSession();

  const { loading, sendMessage } = useCreateSentMessageManual();

  useEffect(() => {
    if (phone) {
      setEditablePhone(phone);
    }
  }, [phone]);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || status !== 'authenticated' || !session.user) {
      setError(t('messages.errors.notAuthenticated'));
      return;
    }

    try {
      if (!editablePhone || !message) {
        throw new Error(t('messages.errors.missingFields'));
      }

      const accountId = session.user.id;

      if (!accountId || !carId) {
        setError(t('messages.errors.notAuthenticated'));
        return;
      }

      if (!carId) {
        setError(t('messages.errors.notAuthenticated'));
        return;
      }

      await sendMessage({
        contact: editablePhone,
        body: message,
        usedAi: false,
        accountId: parseInt(accountId, 10),
        carId: parseInt(carId, 10),
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : t('messages.errors.sendingMessage');
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-800">
        {t('pages.whatsapp.chats.sendManualMessage.title')}
      </h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('pages.whatsapp.chats.sendManualMessage.labels.phone')}
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            value={editablePhone}
            onChange={(e) => setEditablePhone(e.target.value)}
            disabled
            placeholder={t(
              'pages.whatsapp.chats.sendManualMessage.placeholders.phone',
            )}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            {t('pages.whatsapp.chats.sendManualMessage.labels.message')}
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t(
              'pages.whatsapp.chats.sendManualMessage.placeholders.message',
            )}
            className="mt-1 w-full"
            rows={5}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading
            ? t('pages.whatsapp.chats.sendManualMessage.buttons.sendingMessage')
            : t('pages.whatsapp.chats.sendManualMessage.buttons.sendMessage')}
        </Button>
      </form>
    </>
  );
}
