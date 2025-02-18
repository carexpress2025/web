import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateWhatsappSessionParams {
  accountId: number;
  number?: string;
  session: string;
}

interface UseCreateWhatsappSessionReturn {
  error: string;
  loading: boolean;
  successMessage: string;
  createWhatsappSession: (params: CreateWhatsappSessionParams) => Promise<void>;
}

export function useCreateWhatsappSession(): UseCreateWhatsappSessionReturn {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { t } = useTranslation();

  const createWhatsappSession = useCallback(
    async ({ accountId, number, session }: CreateWhatsappSessionParams) => {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      try {
        const response = await fetch('/api/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accountId, number, session }),
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
    },
    [t],
  );

  return { error, loading, successMessage, createWhatsappSession };
}
