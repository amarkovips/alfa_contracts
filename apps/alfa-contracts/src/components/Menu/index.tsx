import React from 'react'
import * as MenuItems from './MenuItems'
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector'
import { setNavigation } from '../../store/reducers/app'

import { clearContractorsFilter } from '../../store/reducers/contractors'
import { clearContractsFilter } from '../../store/reducers/contracts'
import { clearTranchesFilter } from '../../store/reducers/tranches'
import { clearTransactionsFilter } from '../../store/reducers/transactions'

interface IMenu {
  content: JSX.Element,
  value: string,
  disabled?: boolean,
}

const WindowMenu = () => {
  const menu = useAppSelector((state) => state.app.navigation)
  const dispatch = useAppDispatch()
  const MENU: IMenu[] = [
    {
      content: <MenuItems.Contractors />,
      value: 'contractors',
    },
    {
      content: <MenuItems.Contracts />,
      value: 'contracts',
    },
    {
      content: <MenuItems.Tranches />,
      value: 'tranches',
    },
    {
      content: <MenuItems.Transactions />,
      value: 'transactions',
    },
    {
      content: <MenuItems.Reports />,
      value: 'reports',
      disabled: true
    },
  ]

  const handleMenu = (menu: IMenu) => {
    if (!menu.disabled) {
      dispatch(setNavigation(menu.value))
      dispatch(clearContractorsFilter())
      dispatch(clearContractsFilter())
      dispatch(clearTranchesFilter())
      dispatch(clearTransactionsFilter())
    }
  }

  return (
    <div className={styles['menu_container']}>
      <div className={styles['logo']}></div>
      <div className={styles['label']}>
        Система расчетов
      </div>
      <div>
        {MENU.map((elem: IMenu, index: number) => (
          <div 
            className={`${styles['menu']} ${elem.disabled && styles['disabled']} ${menu === elem.value ? styles['checked'] : ''}`} 
            onClick={() => handleMenu(elem)}
            key={index}
          >
            {elem.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WindowMenu
