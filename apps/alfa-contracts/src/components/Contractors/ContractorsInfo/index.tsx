import React, { useState } from 'react'
import Tabs from 'arui-feather/tabs'
import TabItem from 'arui-feather/tab-item'
import Button from 'arui-feather/button'
import InfoElem from '../../UI/InfoElem'

import { setNavigation } from '../../../store/reducers/app'
import { setTranchesFilter } from '../../../store/reducers/tranches'
import { setTransactionsFilter } from '../../../store/reducers/transactions'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'
import styles from './index.module.scss'
import { ContractsRolesCheckboxGroup } from '../../UI/ContractsRolesCheckboxGroup'

interface ITabs {
  [key: string]: any
}

const ContractorsInfo = () => {
  const [tab, setTab] = useState<string>('details')
  const tabs: ITabs = {
    details: [
      { personal_account: 'Лицевой счет' },
      { bank: 'Банк' },
      { bik: 'БИК' },
      { ks: 'КС' },
      { payment_order: 'Очередность платежа' },
    ],
    roles: [
      { merchant: 'merchant' },
      { facilitator: 'facilitator' },
      { payment_provider: 'payment_provider' },
    ],
  }
  const currentContractor = useAppSelector(
    (state) => state.сontractors.current_contractor
  )
  const getContent = () =>
    tabs[tab].map((field: string, index: number) => (
      <InfoElem
        key={index}
        value={currentContractor && currentContractor[Object.keys(field)[0]]}
        label={Object.values(field)[0]}
      />
    ))

  const dispatch = useAppDispatch()
  const toTranches = () => {
    dispatch(setNavigation('tranches'))
    dispatch(setTranchesFilter({ name: 'ref', value: currentContractor!.ref }))
  }

  const toTransactions = () => {
    dispatch(setNavigation('transactions'))
    dispatch(
      setTransactionsFilter({ name: 'ref', value: currentContractor!.ref })
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
          <TabItem onClick={() => setTab('roles')} checked={tab === 'roles'}>
            Роли
          </TabItem>
        </Tabs>
        <div className={styles['table']}>
          {tab !== 'roles' ? (
            getContent()
          ) : (
            <ContractsRolesCheckboxGroup roles={currentContractor.roles} />
          )}
        </div>
        <div className={styles['buttons']}>
          <Button size="s" onClick={toTranches}>
            Проводки
          </Button>
          <Button size="s" onClick={toTransactions}>
            Транзакции
          </Button>
        </div>
      </div>
    )
}

export default ContractorsInfo
