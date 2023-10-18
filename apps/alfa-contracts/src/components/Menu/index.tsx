import React from 'react';
import Menu from 'arui-feather/menu';
import * as MenuItems from './MenuItems';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { setNavigation } from '../../store/reducers/app';

import { clearContractsFilter } from '../../store/reducers/contracts';
import { clearTranchesFilter } from '../../store/reducers/tranches';
import { clearTransactionsFilter } from '../../store/reducers/transactions';

const WindowMenu = () => {
  const menu = useAppSelector((state) => state.app.navigation);
  const dispatch = useAppDispatch();
  const MENU = [
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
      props: {
        disabled: true,
      },
    },
  ];

  const handleMenu = ({ value }: any) => {
    dispatch(setNavigation(value));
    dispatch(clearContractsFilter());
    dispatch(clearTranchesFilter());
    dispatch(clearTransactionsFilter());
  };

  return (
    <Menu
      checkedItems={[menu]}
      onItemClick={handleMenu}
      mode="radio-check"
      content={MENU}
      className={styles['menu']}
    />
  );
};

export default WindowMenu;
