import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './root.reducer';
import { authApi } from './apis/@auth';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([authApi.middleware])
} as ConfigureStoreOptions);

export const persistor = persistStore(store);
