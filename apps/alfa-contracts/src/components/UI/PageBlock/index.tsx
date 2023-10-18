import React from 'react';
import styles from './index.module.scss';

interface BlockProps {
  children: React.ReactNode;
}

const Block = ({children}: BlockProps) => (
  <div className={styles['item']}>
    {children}
  </div>
);

export default Block;
