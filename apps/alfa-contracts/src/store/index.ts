import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { auth } from '../services/auth';
import app from './reducers/app';
import contracts from './reducers/contracts';
import tranches from './reducers/tranches';
import transactions from './reducers/transactions';

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [auth.reducerPath]: auth.reducer,
  app,
  contracts,
  tranches,
  transactions,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, auth.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
