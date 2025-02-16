/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export function useAiGenericResponse(userId: number) {
  const [responses, setResponses] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchResponses();
    }
  }, [userId]);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/settings/ai/reply/generic/user/${userId}/view`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao buscar respostas');
      setResponses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveResponses = async (
    positiveResponses: string[],
    negativeResponses: string[],
  ) => {
    setLoading(true);
    try {
      let res;
      if (responses && responses.id) {
        // Se a configuração já existe, faz o PATCH
        res = await fetch(
          `/api/settings/ai/reply/generic/user/${userId}/update`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ positiveResponses, negativeResponses }),
          },
        );
      } else {
        // Se não existir, faz o POST
        res = await fetch(`/api/settings/ai/reply/generic/user/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ positiveResponses, negativeResponses }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar respostas');
      setResponses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    responses,
    loading,
    error,
    fetchResponses,
    saveResponses,
  };
}
