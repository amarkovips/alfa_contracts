import React, { useEffect, useState } from 'react';
import Spin from 'arui-feather/spin';
import { ArrowUpDownHeavyMIcon } from '@alfalab/icons-glyph/ArrowUpDownHeavyMIcon';
import { ITranche } from '../../../models/tranches';
import { useLazyGetTranchesQuery } from '../../../services/api';
import { Typography } from '@alfalab/core-components/typography';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import { setCurrentTranche } from '../../../store/reducers/tranches';

import styles from './index.module.scss';

const TranchesList = () => {
  const current_tranche = useAppSelector(
    (state) => state.tranches.current_tranche
  );
  const filter = useAppSelector((state) => state.tranches.tranchesFilter);
  const need_refetch = useAppSelector((state) => state.contracts.need_refetch);

  const dispatch = useAppDispatch();
  const [getTranches, { data, isLoading, isFetching }] =
    useLazyGetTranchesQuery();
  const [tranches, setTranches] = useState<ITranche[]>([]);
  const [order, setOrder] = useState<boolean>(false);

  useEffect(() => {
    getTranches(filter);
  }, []);
  useEffect(() => {
    if (need_refetch) getTranches(filter);
  }, [need_refetch]);

  useEffect(() => {
    setTranches(data || []);
  }, [data]);

  const sortNumbers = (data: string) => {
    setOrder(!order);
    const sorted = [...tranches].sort((contract: ITranche, next: ITranche) =>
      order ? contract[data] - next[data] : next[data] - contract[data]
    );
    setTranches(sorted);
  };

  if (isLoading || isFetching) return <Spin size="s" visible={true} />;

  if (!tranches.length)
    return (
      <Typography.TitleResponsive tag="div" view="xsmall">
        Нет доступных проводок
      </Typography.TitleResponsive>
    );
  return (
    <table className={styles['table']}>
      <thead>
        <tr className={styles['header']}>
          <th className={styles['col']}>ID проводки</th>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Счет КТ{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortNumbers('kt')}
              />
            </div>
          </th>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Счет ДТ{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortNumbers('kt')}
              />
            </div>
          </th>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Дата{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortNumbers('date')}
              />
            </div>
          </th>
          <th className={styles['col']}>Сумма</th>
          <th className={styles['col']}>Валюта</th>
          <th className={styles['col']}>Комментарий</th>
          <th className={styles['col']}>Отчеты</th>
        </tr>
      </thead>
      <tbody>
        {tranches.map((tranche: ITranche, index: number) => (
          <tr
            key={index}
            className={`${styles['row']} ${
              tranche.id === current_tranche?.id ? styles['selected'] : ''
            }`}
          >
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {tranche.id}
            </td>
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {tranche.kt}
            </td>
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {tranche.dt}
            </td>
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {new Date(tranche.date).toLocaleDateString()}
            </td>
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {tranche.amount}
            </td>
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {tranche.currency}
            </td>
            <td
              className={styles['col']}
              onClick={() => dispatch(setCurrentTranche(tranche))}
            >
              {tranche.comment}
            </td>
            <td className={styles['col']}>
              <a href="./assets/test_download.txt" download="test_download.txt">Загрузить</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TranchesList;
