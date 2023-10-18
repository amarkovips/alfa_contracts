import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { ITranchesFilter, IFilterELem } from '../../models/filter';
import { ITranche } from '../../models/tranches';

interface TranchesState {
  tranchesFilter: ITranchesFilter;
  current_tranche?: ITranche;
  need_refetch: boolean;
}

const initialState: TranchesState = {
  tranchesFilter: {},
  need_refetch: true,
};

const tranchesSlice = createSlice({
  name: 'tranches',
  initialState,
  reducers: {
    setTranchesFilter(state, action: PayloadAction<IFilterELem>) {
      const { name, value } = action.payload;
      state.tranchesFilter[name] = value;
    },
    setCurrentTranche(state, action: PayloadAction<ITranche>) {
      state.current_tranche = action.payload;
    },
    setRefetch(state, action: PayloadAction<boolean>) {
      state.need_refetch = action.payload;
    },
    clearTranchesFilter(state) {
      state.tranchesFilter = {};
    },
  },
});

export const { setTranchesFilter, setCurrentTranche, setRefetch, clearTranchesFilter } =
  tranchesSlice.actions;
export default tranchesSlice.reducer;
