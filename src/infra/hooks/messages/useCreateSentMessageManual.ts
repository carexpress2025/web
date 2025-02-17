import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SendMessageParams {
  contact: string;
  body: string;
  usedAi: boolean;
  accountId: number;
  carId: number;
}

interface UseSendMessageReturn {
  error: string;
  loading: boolean;
  successMessage: string;
  sendMessage: (params: SendMessageParams) => Promise<void>;
}

export function useCreateSentMessageManual(): UseSendMessageReturn {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { t } = useTranslation();

  const sendMessage = async ({
    contact,
    body,
    usedAi,
    accountId,
    carId,
  }: SendMessageParams) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/messages/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: contact,
          body: body,
          usedAi: usedAi,
          accountId: accountId,
          carId: carId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('messages.errors.sendingMessage'));
      }

      setSuccessMessage(t('messages.success.messageSent'));
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : t('messages.errors.sendingMessage'),
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    successMessage,
    sendMessage,
  };
}
