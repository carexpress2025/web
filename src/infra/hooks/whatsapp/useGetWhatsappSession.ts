/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface UseGetWhatsappSessionReturn {
  error: string;
  loading: boolean;
  successMessage: string;
  sessionData: any;
  getWhatsappSession: (accountId: number) => Promise<void>;
}

export function useGetWhatsappSession(): UseGetWhatsappSessionReturn {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [sessionData, setSessionData] = useState<any>(null);
  const { t } = useTranslation();

  const getWhatsappSession = useCallback(
    async (accountId: number) => {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      setSessionData(null);

      try {
        const response = await fetch(
          `/api/whatsapp/session/user/${accountId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || t('messages.errors.fetchingSession'));
        }

        setSessionData(data.data);
        setSuccessMessage(t('messages.success.sessionFound'));
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : t('messages.errors.fetchingSession'),
        );
      } finally {
        setLoading(false);
      }
    },
    [t],
  );

  return { error, loading, successMessage, sessionData, getWhatsappSession };
}
