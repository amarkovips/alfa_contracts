import React, { useEffect, useState } from 'react';
import Spin from 'arui-feather/spin';
import { ArrowUpDownHeavyMIcon } from '@alfalab/icons-glyph/ArrowUpDownHeavyMIcon';
import { ITransaction } from '../../../models/transactions';
import { useLazyGetTransactionsQuery } from '../../../services/api';
import { Typography } from '@alfalab/core-components/typography';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { setCurrentTransaction } from '../../../store/reducers/transactions';

import styles from './index.module.scss';

const TransactionsList = () => {
  const current_transactions = useAppSelector((state) => state.transactions.current_transaction);
  const filter = useAppSelector(
    (state) => state.transactions.transactionsFilter
  );
  const need_refetch = useAppSelector((state) => state.contracts.need_refetch);

  const dispatch = useAppDispatch();
  const [getTransactions, { data, isFetching, isLoading }] =
    useLazyGetTransactionsQuery();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [order, setOrder] = useState<boolean>(false);

  useEffect(() => {
    getTransactions(filter);
  }, []);
  useEffect(() => {
    if (need_refetch) getTransactions(filter);
  }, [need_refetch]);

  useEffect(() => {
    setTransactions(data || []);
  }, [data]);

  const sortNumbers = (data: string) => {
    setOrder(!order);
    const sorted = [...transactions].sort(
      (contract: ITransaction, next: ITransaction) =>
        order ? contract[data] - next[data] : next[data] - contract[data]
    );
    setTransactions(sorted);
  };

  if (isLoading || isFetching) return <Spin size="s" visible={true} />;

  if (!transactions.length)
    return (
      <Typography.TitleResponsive tag="div" view="xsmall">
        Нет доступных транзакций
      </Typography.TitleResponsive>
    );
  return (
    <table className={styles['table']}>
      <thead>
        <tr className={styles['header']}>
          <th className={styles['col']}>Utrnno</th>
          <th className={styles['col']}>Номер карты</th>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Сумма{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortNumbers('amount')}
              />
            </div>
          </th>
          <th className={styles['col']}>Валюта</th>
          <th className={styles['col']}>Номер устройства</th>
          <th className={styles['col']}>Тип операции</th>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Дата операции{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortNumbers('operation_date')}
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: ITransaction, index: number) => (
          <tr
            key={index}
            onClick={() => dispatch(setCurrentTransaction(transaction))}
            className={`${styles['row']} ${
              transaction.id === current_transactions?.id ? styles['selected'] : ''
            }`}
          >
            <td className={styles['col']}>{transaction.utrno}</td>
            <td className={styles['col']}>{transaction.card_number}</td>
            <td className={styles['col']}>{transaction.amount}</td>
            <td className={styles['col']}>{transaction.currency}</td>
            <td className={styles['col']}>{transaction.device_number}</td>
            <td className={styles['col']}>{transaction.operation_type}</td>
            <td className={styles['col']}>
              {new Date(transaction.operation_date).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsList;
