import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { IContractsFilter, IFilterELem } from '../../models/filter';
import { IContract } from '../../models/contracts';
import { api } from '../../services/api';

interface ContractsState {
  contractsFilter: IContractsFilter;
  current_contract?: IContract;
  need_refetch: boolean;
}

const initialState: ContractsState = {
  contractsFilter: {},
  need_refetch: true,
};

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setContractsFilter(state, action: PayloadAction<IFilterELem>) {
      const { name, value } = action.payload;
      state.contractsFilter[name] = value;
    },
    setCurrentContract(state, action: PayloadAction<IContract>) {
      state.current_contract = action.payload;
    },
    setRefetch(state, action: PayloadAction<boolean>) {
      state.need_refetch = action.payload;
    },
    clearContractsFilter(state) {
      state.contractsFilter = {};
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        api.endpoints.getContracts.matchFulfilled,
        (state: ContractsState) => {
          state.need_refetch = false;
        }
      )
      .addMatcher(
        api.endpoints.getContracts.matchRejected,
        (state: ContractsState) => {
          state.need_refetch = false;
        }
      ),
});

export const {
  setContractsFilter,
  setCurrentContract,
  setRefetch,
  clearContractsFilter,
} = contractsSlice.actions;
export default contractsSlice.reducer;
