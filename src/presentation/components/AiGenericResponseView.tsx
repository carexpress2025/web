/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageState } from '@/data/store/languageSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAiGenericResponse } from '@/infra/hooks/useAiGenericResponse';
import { useSession } from 'next-auth/react';

export default function AiGenericResponseView() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? 0;

  const { t: translate } = useTranslation();

  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const { saveResponses, error, fetchResponses, loading, responses } =
    useAiGenericResponse(Number(userId));

  const [positiveResponses, setPositiveResponses] = useState<string[]>(['']);
  const [negativeResponses, setNegativeResponses] = useState<string[]>(['']);

  useEffect(() => {
    if (userId) {
      fetchResponses();
    }
  }, [userId]);

  useEffect(() => {
    if (responses) {
      setPositiveResponses(responses?.positiveResponses || ['']);
      setNegativeResponses(responses?.negativeResponses || ['']);
    }
  }, [responses]);

  const handlePositiveResponseChange = (index: number, value: string) => {
    const updatedResponses = [...positiveResponses];
    updatedResponses[index] = value;
    setPositiveResponses(updatedResponses);
  };

  const handleNegativeResponseChange = (index: number, value: string) => {
    const updatedResponses = [...negativeResponses];
    updatedResponses[index] = value;
    setNegativeResponses(updatedResponses);
  };

  const handleAddPositiveResponse = () => {
    setPositiveResponses([...positiveResponses, '']);
  };

  const handleAddNegativeResponse = () => {
    setNegativeResponses([...negativeResponses, '']);
  };

  const handleRemovePositiveResponse = (index: number) => {
    const updatedResponses = positiveResponses.filter((_, i) => i !== index);
    setPositiveResponses(updatedResponses);
  };

  const handleRemoveNegativeResponse = (index: number) => {
    const updatedResponses = negativeResponses.filter((_, i) => i !== index);
    setNegativeResponses(updatedResponses);
  };

  const handleSubmitSettings = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await saveResponses(positiveResponses, negativeResponses);
      alert('Respostas salvas com sucesso!');
    } catch (err) {
      alert(`Erro: ${err}`);
    }
  };

  return (
    <>
      <h1 className="mb-8 text-4xl font-extrabold text-gray-800 text-center">
        {translate('pages.settings.ai.reply.generic.title')}
      </h1>
      <Tabs defaultValue="positive" className="w-full h-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 gap-4 justify-center">
          <TabsTrigger
            value="positive"
            className="text-lg font-semibold p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-500 focus:outline-none"
            style={{
              borderBottom: '3px solid',
              borderColor: 'transparent',
              ...(language === 'positive' && {
                borderColor: '#2B6CB0', // Cor para indicar a aba ativa
              }),
            }}
          >
            {translate('pages.settings.ai.reply.generic.tabs.positive')}
          </TabsTrigger>
          <TabsTrigger
            value="negative"
            className="text-lg font-semibold p-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition duration-200 focus:ring-4 focus:ring-red-500 focus:outline-none"
            style={{
              borderBottom: '3px solid',
              borderColor: 'transparent',
              ...(language === 'negative' && {
                borderColor: '#E53E3E', // Cor para indicar a aba ativa
              }),
            }}
          >
            {translate('pages.settings.ai.reply.generic.tabs.negative')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positive">
          <Card className="border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-2xl rounded-lg">
            <CardContent>
              <form onSubmit={handleSubmitSettings} className="space-y-6">
                {positiveResponses.map((response, index) => (
                  <div key={index} className="space-y-4">
                    <Textarea
                      value={response}
                      onChange={(e) =>
                        handlePositiveResponseChange(index, e.target.value)
                      }
                      placeholder={translate(
                        'pages.settings.ai.reply.generic.form.responsePlaceholder',
                      )}
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                    {positiveResponses.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemovePositiveResponse(index)}
                        className="bg-red-600 text-white text-sm mt-2 py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                      >
                        {translate(
                          'pages.settings.ai.reply.generic.buttons.removeResponse',
                        )}
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddPositiveResponse}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md mt-4 transition duration-200"
                >
                  {translate(
                    'pages.settings.ai.reply.generic.buttons.addResponse',
                  )}
                </Button>
                <Button
                  type="submit"
                  disabled={positiveResponses.some(
                    (response) => !response.trim(),
                  )}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md mt-4 transition duration-200"
                >
                  {translate(
                    'pages.settings.ai.reply.generic.buttons.saveResponses',
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negative">
          <Card className="border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-2xl rounded-lg">
            <CardContent>
              <form onSubmit={handleSubmitSettings} className="space-y-6">
                {negativeResponses.map((response, index) => (
                  <div key={index} className="space-y-4">
                    <Textarea
                      value={response}
                      onChange={(e) =>
                        handleNegativeResponseChange(index, e.target.value)
                      }
                      placeholder={translate(
                        'pages.settings.ai.reply.generic.form.responsePlaceholder',
                      )}
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />
                    {negativeResponses.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveNegativeResponse(index)}
                        className="bg-red-600 text-white text-sm mt-2 py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                      >
                        {translate(
                          'pages.settings.ai.reply.generic.buttons.removeResponse',
                        )}
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddNegativeResponse}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md mt-4 transition duration-200"
                >
                  {translate(
                    'pages.settings.ai.reply.generic.buttons.addResponse',
                  )}
                </Button>
                <Button
                  type="submit"
                  disabled={negativeResponses.some(
                    (response) => !response.trim(),
                  )}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md mt-4 transition duration-200"
                >
                  {translate(
                    'pages.settings.ai.reply.generic.buttons.saveResponses',
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
