import React, { useCallback } from 'react';
import ThemeProvider from 'arui-feather/theme-provider';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Contracts from '../components/Contracts';
import Tranches from '../components/Tranches';
import Transactions from '../components/Transactions';
import Reports from '../components/Reports';
import Layout from '../components/UI/Layout';
import Auth from '../components/Auth';

import styles from './app.module.css';
import { useAppSelector } from '../hooks/useAppSelector';

export function App() {
  const { isAuth, navigation } = useAppSelector((state) => state.app);
  const getContent = useCallback(() => {
    switch (navigation) {
      case 'contracts':
        return <Contracts />;
      case 'tranches':
        return <Tranches />;
      case 'transactions':
        return <Transactions />;
      case 'reports':
        return <Reports />;
      default:
        return <Contracts />;
    }
  }, [navigation]);

  if (!isAuth) {
    return <Auth />;
  }

  return (
    <ThemeProvider theme="alfa-on-white">
      <div className={styles['content']}>
        <Header />
        <div className={styles['window']}>
          <Menu />
          <Layout>{getContent()}</Layout>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
