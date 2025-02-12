'use client';

import { persistor, storeLanguage } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

interface IProps {
  children: React.ReactNode;
}

export default function LanguageContext({ children }: IProps) {
  return (
    <Provider store={storeLanguage}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
