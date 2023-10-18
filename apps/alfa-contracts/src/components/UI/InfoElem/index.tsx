import React from 'react';
import styles from './index.module.scss';

interface LayoutProps {
  label: string;
  value: any;
}

const InfoElem = ({ label, value }: LayoutProps) => (
  <div className={styles['elem']}>
    <div className={styles['label']}>{label}</div>
    <div className={styles['value']}>{
      Array.isArray(value) ? (value.map((elem: any, index: number) => (
        <span key={index}>{elem}<br/></span>
      ))) : value
    }</div>
  </div>
);

export default InfoElem;
