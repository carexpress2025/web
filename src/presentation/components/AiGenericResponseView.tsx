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

export default function AiGenericResponseView() {
  const { t: translate } = useTranslation();

  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const [positiveResponses, setPositiveResponses] = useState<string[]>(['']);
  const [negativeResponses, setNegativeResponses] = useState<string[]>(['']);

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

  const handleSubmitUpdateSettings = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Respostas positivas:', positiveResponses);
    console.log('Respostas negativas:', negativeResponses);
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
        {translate('pages.settings.ai.reply.generic.title')}
      </h1>
      <Tabs defaultValue="positive" className="w-full h-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="positive" className="text-base font-semibold">
            {translate('pages.settings.ai.reply.generic.tabs.reply')}
          </TabsTrigger>
          <TabsTrigger value="negative" className="text-base font-semibold">
            {translate('pages.settings.ai.reply.generic.tabs.send')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positive">
          <Card className="border border-gray-200 shadow-lg transition-all duration-200 hover:shadow-xl lg:col-span-12">
            <CardContent>
              <form onSubmit={handleSubmitUpdateSettings} className="space-y-6">
                {positiveResponses.map((response, index) => (
                  <div key={index} className="space-y-2">
                    <Textarea
                      value={response}
                      onChange={(e) =>
                        handlePositiveResponseChange(index, e.target.value)
                      }
                      placeholder={translate(
                        'pages.settings.ai.reply.generic.form.responsePlaceholder',
                      )}
                      className="mt-2 w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {positiveResponses.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemovePositiveResponse(index)}
                        className="bg-red-600 text-white text-sm mt-2"
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
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md"
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
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md mt-4"
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
          <Card className="border border-gray-200 shadow-lg transition-all duration-200 hover:shadow-xl lg:col-span-12">
            <CardContent>
              <form onSubmit={handleSubmitUpdateSettings} className="space-y-6">
                {negativeResponses.map((response, index) => (
                  <div key={index} className="space-y-2">
                    <Textarea
                      value={response}
                      onChange={(e) =>
                        handleNegativeResponseChange(index, e.target.value)
                      }
                      placeholder={translate(
                        'pages.settings.ai.reply.generic.form.responsePlaceholder',
                      )}
                      className="mt-2 w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {negativeResponses.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveNegativeResponse(index)}
                        className="bg-red-600 text-white text-sm mt-2"
                      >
                        {translate(
                          'pages.settings.ai.reply.generic.button.removeResponse',
                        )}
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddNegativeResponse}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md"
                >
                  {translate(
                    'pages.settings.ai.reply.generic.button.addResponse',
                  )}
                </Button>
                <Button
                  type="submit"
                  disabled={negativeResponses.some(
                    (response) => !response.trim(),
                  )}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md mt-4"
                >
                  {translate(
                    'pages.settings.ai.reply.generic.button.saveResponses',
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
