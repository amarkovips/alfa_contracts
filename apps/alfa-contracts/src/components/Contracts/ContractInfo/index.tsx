import React, { useState } from 'react';
import Tabs from 'arui-feather/tabs';
import TabItem from 'arui-feather/tab-item';
import Button from 'arui-feather/button';
import InfoElem from '../../UI/InfoElem';

import { setNavigation } from '../../../store/reducers/app';
import { setTranchesFilter } from '../../../store/reducers/tranches';
import { setTransactionsFilter } from '../../../store/reducers/transactions';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import styles from './index.module.scss';

interface ITabs {
  [key: string]: any;
}

const ContractInfo = () => {
  const [tab, setTab] = useState<string>('about');
  const tabs: ITabs = {
    about: [
      { company_name: 'Название компании' },
      // { number: 'Номер договора' },
      // { date: 'Дата договора' },
      { inn: 'ИНН' },
      { ogrn: 'ОГРН' },
      // { aggregation_scheme: 'Схема агрегации' },
      // { segment: 'Сегмент' },
    ],
    details: [
      { bank: 'Банк' },
      { bik: 'БИК' },
      { ks: 'КС' },
      { personal_account: 'Лицевой счет' },
      // { payment_order: 'Очередность платежа' },
      // { bank_accounts: 'Счета в банке' },
    ],
    reports: [{ email: 'e-mail' }, { sftp: 'SFTP' }, { eq_id: 'НИБ (EQ ID)' }],
  };
  const currentContract = useAppSelector(
    (state) => state.contracts.current_contract
  );
  const getContent = () =>
    tabs[tab].map((field: string, index: number) => (
      <InfoElem
        key={index}
        value={currentContract && currentContract[Object.keys(field)[0]]}
        label={Object.values(field)[0]}
      />
    ));

  const dispatch = useAppDispatch();
  const toTranches = () => {
    dispatch(setNavigation('tranches'));
    dispatch(setTranchesFilter({name: 'ref', value: currentContract!.ref}))
  };

  const toTransactions = () => {
    dispatch(setNavigation('transactions'));
    dispatch(setTransactionsFilter({name: 'ref', value: currentContract!.ref}))
  };

  if (currentContract)
    return (
      <div className={styles['component']}>
        <Tabs>
          <TabItem onClick={() => setTab('about')} checked={tab === 'about'}>
            Информация о компании
          </TabItem>
          <TabItem
            onClick={() => setTab('details')}
            checked={tab === 'details'}
          >
            Реквизиты
          </TabItem>
          {/*<TabItem onClick={() => setTab('tariff')} checked={tab === 'tariff'}>
            Тарификация
          </TabItem>*/}
          <TabItem
            onClick={() => setTab('reports')}
            checked={tab === 'reports'}
          >
            Способ доставки отчетов
          </TabItem>
        </Tabs>
        <div className={styles['table']}>{getContent()}</div>
        <div className={styles['buttons']}>
          <Button size="s" onClick={toTranches}>
            Проводки
          </Button>
          <Button size="s" onClick={toTransactions}>
            Транзакции
          </Button>
        </div>
      </div>
    );
};

export default ContractInfo;
