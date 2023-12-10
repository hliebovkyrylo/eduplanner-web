import {
  StateFromReducersMapObject,
  combineReducers,
  configureStore,
}                          from '@reduxjs/toolkit';
import storage             from 'redux-persist/lib/storage';
import persistReducer      from 'redux-persist/es/persistReducer';
import persistStore        from 'redux-persist/es/persistStore';
import { authSlice }       from './slices/authSlice';
import { PersistConfig }   from 'redux-persist';
import { api }             from '@redux/api/index';
import { authInterceptor } from './middleware/authInterceptor';

export const reducers = {
  auth: authSlice.reducer,
  api : api.reducer,
};

export type IAppState = StateFromReducersMapObject<typeof reducers>;
export const rootReducer = combineReducers(reducers);

export const persistConfig: PersistConfig<IAppState> = {
  key      : 'root',
  whitelist: ['auth'],
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer   : persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(api.middleware, authInterceptor),
});

export const persistor = persistStore(store);