import React, { useState } from 'react'
import Tabs from 'arui-feather/tabs'
import TabItem from 'arui-feather/tab-item'
import Button from 'arui-feather/button'

import { setNavigation } from '../../../store/reducers/app'
import { setTranchesFilter } from '../../../store/reducers/tranches'
import { setTransactionsFilter } from '../../../store/reducers/transactions'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import styles from './index.module.scss'

import { IContractor } from "../../../models/contractors";

interface ITabs {
  [key: string]: {[key: string]: string}
}

const ContractorsInfo = () => {
  const currentContractor = useAppSelector(
    (state) => state.сontractors.current_contractor
  ) || []

  const [tab, setTab] = useState<string>('details');
  const tabs: ITabs = {
    details: {
      bank: 'Банк',
      bik: 'БИК',
      ks: 'КС',
      personal_account: 'Лицевой счет',
    }
  }

  const getContent = () => (
    <table className={styles["table"]}>
      <thead>
        <tr className={styles["header"]}>
          <th className={styles["col"]}>Название банка</th>
          <th className={styles["col"]}>БИК</th>
          <th className={styles["col"]}>Корреспондентский счёт</th>
          <th className={styles["col"]}>Расчетный счет</th>
        </tr>
      </thead>
      <tbody>
        {currentContractor.map((contractor: IContractor, contractor_index: number) => (
          <tr key={contractor_index} className={styles["row"]}>
            {Object.keys(tabs.details).map((field: string, field_index: number) => (
              <td className={styles["col"]}>{contractor[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  const dispatch = useAppDispatch()
  const toTranches = () => {
    dispatch(setNavigation('tranches'))
    dispatch(setTranchesFilter({ name: 'ref', value: currentContractor![0].ref }))
  }

  const toTransactions = () => {
    dispatch(setNavigation('transactions'))
    dispatch(
      setTransactionsFilter({ name: 'ref', value: currentContractor![0].ref })
    )
  }

  const toContracts = () => {
    dispatch(setNavigation('contracts'))
    dispatch(
      setTransactionsFilter({ name: 'ref', value: currentContractor![0].ref })
    )
  }

  if (currentContractor)
    return (
      <div className={styles['component']}>
        <Tabs>
          <TabItem
            onClick={() => setTab('details')}
            checked={tab === 'details'}
          >
            Реквизиты
          </TabItem>
          {/*<TabItem onClick={() => setTab('roles')} checked={tab === 'roles'}>
            Роли
          </TabItem>*/}
        </Tabs>
        <div className={styles['table']}>
          {tab !== 'roles' ? (
            getContent()
          ) : (
            // <ContractsRolesCheckboxGroup roles={currentContractor.roles} />
            null
          )}
        </div>
        <div className={styles['buttons']}>
          <Button size="s" onClick={toTranches}>
            Проводки
          </Button>
          <Button size="s" onClick={toTransactions}>
            Транзакции
          </Button>
          <Button size="s" onClick={toContracts}>
            Контракты
          </Button>
        </div>
      </div>
    )
}

export default ContractorsInfo
