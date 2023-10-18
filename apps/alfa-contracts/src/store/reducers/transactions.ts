import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { ITransactionsFilter, IFilterELem } from '../../models/filter';
import { ITransaction } from '../../models/transactions';

interface TransactionsState {
  transactionsFilter: ITransactionsFilter;
  current_transaction?: ITransaction;
  need_refetch: boolean;
}

const initialState: TransactionsState = {
  transactionsFilter: {},
  need_refetch: true,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactionsFilter(state, action: PayloadAction<IFilterELem>) {
      const { name, value } = action.payload;
      state.transactionsFilter[name] = value;
    },
    setCurrentTransaction(state, action: PayloadAction<ITransaction>) {
      state.current_transaction = action.payload;
    },
    setRefetch(state, action: PayloadAction<boolean>) {
      state.need_refetch = action.payload;
    },
    clearTransactionsFilter(state) {
      state.transactionsFilter = {};
    },
  },
});

export const {
  setTransactionsFilter,
  setCurrentTransaction,
  setRefetch,
  clearTransactionsFilter,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
