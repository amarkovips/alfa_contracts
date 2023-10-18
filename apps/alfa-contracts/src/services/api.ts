import { createApi } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import axios from 'axios';

import { urls } from '../utils/urls';
import { IContract } from '../models/contracts';
import { ITranche } from '../models/tranches';
import {
  IContractsFilter,
  ITranchesFilter,
  ITransactionsFilter,
} from '../models/filter';

import contracts from './contracts.json';
import tranches from './tranches.json';
import transactions from './transactions.json';
import { ITransaction } from '../models/transactions';

const baseQuery =
  (): BaseQueryFn<{
    url: string;
    filter: IContractsFilter | ITranchesFilter | ITransactionsFilter;
  }> =>
  async ({ url, filter }) => {
    try {
      const response = await axios.post(url, { filter });
      const result = response.data;
      return { data: result.contracts };
    } catch (axiosError) {
      switch (url) {
        case urls.contracts:
          if (Object.keys(filter).length) {
            const filtered = Object.keys(filter).length
              ? contracts.filter((contract: IContract) => {
                  let correct = true;
                  Object.keys(filter).forEach((elem: string) => {
                    const index = contract[elem]
                      .toString()
                      .toLowerCase()
                      .indexOf(filter[elem].toString().toLowerCase());
                    if (index === -1) {
                      correct = false;
                      return;
                    }
                  });
                  return correct;
                })
              : contracts;
            return { data: filtered };
          } else {
            return { data: contracts };
          }

        case urls.tranches:
          if (Object.keys(filter).length) {
            const filtered = Object.keys(filter).length
              ? tranches.filter((tranche: ITranche) => {
                let correct = true;
                Object.keys(filter).forEach((elem: string) => {
                  const index = tranche[elem]
                    .toString()
                    .toLowerCase()
                    .indexOf(filter[elem].toString().toLowerCase());
                  if (index === -1) {
                    correct = false;
                    return;
                  }
                });
                return correct;
              })
              : tranches;
            return { data: filtered };
          } else {
            return { data: tranches };
          }
        case urls.transactions:
          if (Object.keys(filter).length) {
            const filtered = Object.keys(filter).length
              ? transactions.filter((transaction: ITransaction) => {
                let correct = true;
                Object.keys(filter).forEach((elem: string) => {
                  const index = transaction[elem]
                    .toString()
                    .toLowerCase()
                    .indexOf(filter[elem].toString().toLowerCase());
                  if (index === -1) {
                    correct = false;
                    return;
                  }
                });
                return correct;
              })
              : tranches;
            return { data: filtered };
          } else {
            return { data: transactions };
          }
        default:
          return { data: contracts };
      }
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery(),
  endpoints: (build) => ({
    getContracts: build.query<IContract[], IContractsFilter>({
      query: (filter) => ({
        url: urls.contracts,
        filter: filter,
      }),
    }),
    getTranches: build.query<ITranche[], ITranchesFilter>({
      query: (filter) => ({
        url: urls.tranches,
        filter: filter,
      }),
    }),
    getTransactions: build.query<ITransaction[], ITransactionsFilter>({
      query: (filter) => ({
        url: urls.transactions,
        filter: filter,
      }),
    }),
  }),
});

export const {
  useLazyGetContractsQuery,
  useLazyGetTranchesQuery,
  useLazyGetTransactionsQuery,
} = api;
