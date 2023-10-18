import React, { useState } from 'react';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';
import Button from 'arui-feather/button';
import InfoElem from '../../UI/InfoElem';

import { setNavigation } from '../../../store/reducers/app';
import { setContractsFilter } from '../../../store/reducers/contracts';
import { setTranchesFilter } from '../../../store/reducers/tranches';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import styles from './index.module.scss';

interface ITabs {
  [key: string]: any;
}

const TransactionInfo = () => {
  const [tab, setTab] = useState<string>('details');
  const tabs: ITabs = {
    details: [
      { utrno: 'Utrno' },
      { card_number: 'Номер карты' },
      { amount: 'Сумма' },
      { operation_date: 'Дата операции' },
      { aggregation: 'Параметр агрегации' },
      { other: 'Какое-то поле' },
    ],
  };
  const currentTransaction = useAppSelector(
    (state) => state.transactions.current_transaction
  );
  const getContent = () =>
    tabs[tab].map((field: string, index: number) => (
      <InfoElem
        key={index}
        value={currentTransaction && currentTransaction[Object.keys(field)[0]]}
        label={Object.values(field)[0]}
      />
    ));

  const dispatch = useAppDispatch();
  const toContracts = () => {
    dispatch(setNavigation('contracts'));
    dispatch(setContractsFilter({ name: 'ref', value: currentTransaction!.ref }));
  };

  const toTranches = () => {
    dispatch(setNavigation('tranches'));
    dispatch(setTranchesFilter({name: 'ref', value: currentTransaction!.ref}))
  };

  if (currentTransaction)
    return (
      <div className={styles['component']}>
        <Tabs>
          <TabItem
            onClick={() => setTab('details')}
            checked={tab === 'details'}
          >
            Детализация по транзакции
          </TabItem>
        </Tabs>
        <div className={styles['table']}>{getContent()}</div>
        <div className={styles['buttons']}>
          <Button size="s" onClick={toContracts}>
            Договоры
          </Button>
          <Button size="s" onClick={toTranches}>
            Проводки
          </Button>
        </div>
      </div>
    );
};

export default TransactionInfo;
