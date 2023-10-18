import React, { useState } from 'react';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';
import Button from 'arui-feather/button';
import InfoElem from '../../UI/InfoElem';

import { setNavigation } from '../../../store/reducers/app';
import { setContractsFilter } from '../../../store/reducers/contracts';
import { setTransactionsFilter } from '../../../store/reducers/transactions';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import styles from './index.module.scss';

interface ITabs {
  [key: string]: any;
}

const TrancheInfo = () => {
  const [tab, setTab] = useState<string>('details');
  const tabs: ITabs = {
    details: [
      { kt: 'Счет КТ' },
      { dt: 'Счет ДТ' },
      { date: 'Дата' },
      { charge_date: 'Дата списания' },
      { amount: 'Сумма' },
    ],
  };
  const currentTranche = useAppSelector(
    (state) => state.tranches.current_tranche
  );
  const getContent = () =>
    tabs[tab].map((field: string, index: number) => (
      <InfoElem
        key={index}
        value={currentTranche && currentTranche[Object.keys(field)[0]]}
        label={Object.values(field)[0]}
      />
    ));

  const dispatch = useAppDispatch();
  const toContracts = () => {
    dispatch(setNavigation('contracts'));
    dispatch(setContractsFilter({ name: 'ref', value: currentTranche!.ref }));
  };

  const toTransactions = () => {
    dispatch(setNavigation('transactions'));
    dispatch(setTransactionsFilter({name: 'ref', value: currentTranche!.ref}))
  };

  if (currentTranche)
    return (
      <div className={styles['component']}>
        <Tabs>
          <TabItem
            onClick={() => setTab('details')}
            checked={tab === 'details'}
          >
            Детализация по проводке
          </TabItem>
        </Tabs>
        <div className={styles['table']}>{getContent()}</div>
        <div className={styles['buttons']}>
          <Button size="s" onClick={toContracts}>
            Договоры
          </Button>
          <Button size="s" onClick={toTransactions}>
            Транзакции
          </Button>
        </div>
      </div>
    );
};

export default TrancheInfo;
