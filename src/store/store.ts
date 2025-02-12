/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { languageReducer } from './languageSlice';
import { LANGUAGE } from '@/constants/localStorage';

const persistConfig = {
  key: LANGUAGE,
  storage,
};

const rootReducer = combineReducers({
  language: languageReducer,
});

//@ts-expect-error
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeLanguage = configureStore({
  reducer: persistedReducer,
});

//@ts-expect-error
export const persistor = persistStore(storeLanguage);
