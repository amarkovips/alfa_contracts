import React from 'react';
import Link from 'arui-feather/link';
import styles from './header.module.scss';
import { Typography } from '@alfalab/core-components/typography';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { setAuth } from '../../store/reducers/app';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user: {name}, navigation } = useAppSelector((state) => state.app);
  const menuMap:{[key:string]: string} = {
    contractors: 'Контрагенты',
    contracts: 'Договоры',
    tranches: 'Проводки',
    transactions: 'Транзакции',
    reports: 'Отчеты'
  }
  return (
    <div className={styles['component']}>
      <div className={styles['label']}>
        <Typography.TitleResponsive tag="div" view="small">
          {menuMap[navigation]}
        </Typography.TitleResponsive>
      </div>
      <div className={styles['auth']}>
        <div className={styles['control']}>
          <Link>{name}</Link>
          <span className={styles['separator']}>|</span>
          <Link onClick={() => dispatch(setAuth())}>Выход</Link>
        </div>
        <Typography.TitleResponsive
          tag="div"
          view="xsmall"
          className={styles['role']}
        >
          Роль пользователя: Администратор
        </Typography.TitleResponsive>
      </div>
    </div>
  );
};

export default Header;
