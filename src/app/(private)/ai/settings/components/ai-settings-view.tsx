'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AiSettingsView() {
  const { t } = useTranslation();

  const [modelIA, setModelIA] = useState<string>('gemini-1.5-flash');
  const [apiKeyIA, setApiKeyIA] = useState<string>('');
  const [isReplyEnabled, setIsReplyEnabled] = useState<boolean>(false);
  const [isSendEnabled, setIsSendEnabled] = useState<boolean>(false);
  const [maskedApiKey, setMaskedApiKey] = useState<string>('');
  const [isEditingApiKey, setIsEditingApiKey] = useState<boolean>(false);
  const [isGenericReplyEnabled, setIsGenericReplyEnabled] =
    useState<boolean>(false);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApiKeyIA(value);
    setMaskedApiKey(value ? '********' : '');
  };

  const toggleApiKeyEdit = () => {
    setIsEditingApiKey(!isEditingApiKey);
    if (!isEditingApiKey) {
      setMaskedApiKey(apiKeyIA ? '********' : '');
    }
  };

  const handleSubmitUpdateSettings = async () => {};

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
        {t('pages.ia.settings.title')}
      </h1>
      <Card className="border border-gray-200 shadow-lg transition-all duration-200 hover:shadow-xl lg:col-span-12">
        <CardContent>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="modelIA"
                className="block text-sm font-medium text-gray-700"
              >
                {t('ia.form.modelIA')}
              </label>
              <select
                id="modelIA"
                value={modelIA}
                onChange={(e) => setModelIA(e.target.value)}
                className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                <option value="gemini-1.0-pro">gemini-1.0-pro</option>
                <option value="gemini-2.0-pro">gemini-2.0-pro</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="apiKeyIA"
                className="block text-sm font-medium text-gray-700"
              >
                {t('ia.form.AIApiKey')}
              </label>
              <div className="relative flex items-center">
                <input
                  id="apiKeyIA"
                  type="text"
                  placeholder={t('ia.form.AIApiKeyPlaceholder')}
                  value={isEditingApiKey ? apiKeyIA : maskedApiKey}
                  onChange={handleApiKeyChange}
                  readOnly={!isEditingApiKey}
                  className={`block w-full mt-2 px-4 py-2 border ${
                    isEditingApiKey ? 'border-blue-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <Button
                  onClick={toggleApiKeyEdit}
                  className="ml-2 py-2 px-3 bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded-lg shadow-sm"
                >
                  {isEditingApiKey
                    ? t('ia.button.save')
                    : t('ia.button.update')}
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="enable-reply"
                className="text-sm font-medium text-gray-700"
              >
                {t('ia.form.replyWhatsApp')}
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="enable-reply"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="enable-reply"
                    checked={isReplyEnabled}
                    onChange={() => setIsReplyEnabled(!isReplyEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label
                htmlFor="enable-send"
                className="text-sm font-medium text-gray-700"
              >
                {t('ia.form.sendWhatsApp')}
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="enable-send"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="enable-send"
                    checked={isSendEnabled}
                    onChange={() => setIsSendEnabled(!isSendEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label
                htmlFor="enable-generic-reply"
                className="text-sm font-medium text-gray-700"
              >
                {t('ia.form.genericReply')}
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="enable-generic-reply"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="enable-generic-reply"
                    checked={isGenericReplyEnabled}
                    onChange={() =>
                      setIsGenericReplyEnabled(!isGenericReplyEnabled)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
                </label>
              </div>
            </div>

            <Button
              onClick={handleSubmitUpdateSettings}
              disabled={!modelIA?.trim() || !apiKeyIA?.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
            >
              {t('ia.button.update')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
