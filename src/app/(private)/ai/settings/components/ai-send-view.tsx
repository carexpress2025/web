'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageState } from '@/store/languageSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../../../../i18n';
import { Textarea } from '@/components/ui/textarea';

export default function AiSendView() {
  const { t } = useTranslation();

  const language = useSelector(
    (state: { language: LanguageState }) => state.language.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const [promptSendInstructions, setPromptSendInstructions] =
    useState<string>('');
  const [promptSendContext, setPromptSendContext] = useState<string>('');
  const [promptSendRoles, setPromptSendRoles] = useState<string>('');
  const [promptSendLanguage, setPromptSendLanguage] =
    useState<string>('english');
  const [expectedOutputSend, setExpectedOutputSend] = useState<string>('');
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(true);

  const handleSubmitUpdateSettings = async (event: React.FormEvent) => {};

  return (
    <Card className="border border-gray-200 shadow-lg transition-all duration-200 hover:shadow-xl lg:col-span-12">
      <CardContent>
        <form onSubmit={handleSubmitUpdateSettings} className="space-y-6">
          <div>
            <label
              htmlFor="instructionsSend"
              className="block text-sm font-medium text-gray-700"
            >
              {t('ia.form.instructionsTextGeneration')}
            </label>
            <input
              id="instructionsSend"
              type="text"
              placeholder={t('ia.form.instructionsTextGeneration')}
              value={promptSendInstructions}
              onChange={(e) => setPromptSendInstructions(e.target.value)}
              disabled={!isSendEnabled}
              className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="contextSend"
              className="block text-sm font-medium text-gray-700"
            >
              {t('ia.form.conversationContext')}
            </label>
            <input
              id="contextSend"
              type="text"
              placeholder={t('ia.form.conversationContext')}
              value={promptSendContext}
              onChange={(e) => setPromptSendContext(e.target.value)}
              disabled={!isSendEnabled}
              className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="rolesSend"
              className="block text-sm font-medium text-gray-700"
            >
              {t('ia.form.conversationRules')}
            </label>
            <Textarea
              id="rolesSend"
              placeholder={t('ia.form.conversationRules')}
              value={promptSendRoles}
              onChange={(e) => setPromptSendRoles(e.target.value)}
              disabled={!isSendEnabled}
              className="mt-2 w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="languageSend"
              className="block text-sm font-medium text-gray-700"
            >
              {t('ia.form.outputLanguage')}
            </label>
            <select
              id="languageSend"
              value={promptSendLanguage}
              onChange={(e) => setPromptSendLanguage(e.target.value)}
              disabled={!isSendEnabled}
              className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="english">{t('ia.languages.en_US')}</option>
              <option value="portuguese">{t('ia.languages.pt_BR')}</option>
              <option value="finnish">{t('ia.languages.fi_FI')}</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="expectedOutputSend"
              className="block text-sm font-medium text-gray-700"
            >
              {t('ia.form.expectedOutput')}
            </label>
            <Textarea
              id="expectedOutputSend"
              placeholder={t('ia.form.expectedOutput')}
              value={expectedOutputSend}
              onChange={(e) => setExpectedOutputSend(e.target.value)}
              disabled={!isSendEnabled}
              className="mt-2 w-full h-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            type="submit"
            disabled={!promptSendInstructions?.trim() || !isSendEnabled}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
          >
            {t('ia.button.update')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
