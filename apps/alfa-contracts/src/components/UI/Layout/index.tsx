import React from 'react';
import styles from './index.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => (
  <div className={styles['layout']}>
    {children}
  </div>
);

export default Layout;
