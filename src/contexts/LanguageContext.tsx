'use client';

import { persistor, storeLanguage } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function LanguageContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={storeLanguage}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
