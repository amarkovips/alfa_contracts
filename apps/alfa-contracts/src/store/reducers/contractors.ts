import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { IContractorsFilter, IFilterELem } from '../../models/filter'
import { IContractor } from '../../models/contractors'
import { api } from '../../services/api'

interface ContractorsState {
  contractorsFilter: IContractorsFilter
  current_contractor?: IContractor
  need_refetch: boolean
}

const initialState: ContractorsState = {
  contractorsFilter: {},
  need_refetch: true,
}

const ContractorsSlice = createSlice({
  name: 'contractors',
  initialState,
  reducers: {
    setContractorFilter(state, action: PayloadAction<IFilterELem>) {
      const { name, value } = action.payload
      state.contractorsFilter[name] = value
    },
    setCurrentContractor(state, action: PayloadAction<IContractor>) {
      state.current_contractor = action.payload
    },
    setRefetch(state, action: PayloadAction<boolean>) {
      state.need_refetch = action.payload
    },
    clearContractorsFilter(state) {
      state.contractorsFilter = {}
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        api.endpoints.getContractors.matchFulfilled,
        (state: ContractorsState) => {
          state.need_refetch = false
        }
      )
      .addMatcher(
        api.endpoints.getContractors.matchRejected,
        (state: ContractorsState) => {
          state.need_refetch = false
        }
      ),
})

export const {
  setContractorFilter,
  setCurrentContractor,
  setRefetch,
  clearContractorsFilter,
} = ContractorsSlice.actions
export default ContractorsSlice.reducer
