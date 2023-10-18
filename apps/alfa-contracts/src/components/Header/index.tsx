import React from 'react';
import Link from 'arui-feather/link';
import styles from './header.module.scss';
import { Typography } from '@alfalab/core-components/typography';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { setAuth } from '../../store/reducers/app';

const Header = () => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.app.user);
  return (
    <div className={styles['component']}>
      <div className={styles['label']}>
        <div className={styles['logo']} />
        <Typography.TitleResponsive tag="div" view="small">
          Альфа-Банк. Система расчетов
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
