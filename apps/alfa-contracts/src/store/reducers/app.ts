import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { IUser } from '../../models/user';

import * as jose from 'jose'

interface AppState {
  navigation: string;
  user: IUser
  isAuth: boolean;
}

const initialState: AppState = {
  navigation: 'contracts',
  isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false'),
  user: {}
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNavigation(state, action: PayloadAction<string>) {
      state.navigation = action.payload;
    },
    setAuth(state, action: PayloadAction<string | undefined>) {
      localStorage.setItem('isAuth', JSON.stringify(!!action.payload));
      if (typeof action.payload === 'string') {
        const credentials = jose.decodeJwt(action.payload);
        state.user = {name: credentials.name as string};
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export const { setNavigation, setAuth } = appSlice.actions;
export default appSlice.reducer;
