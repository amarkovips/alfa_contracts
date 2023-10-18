import React from 'react';
import { FolderMIcon } from '@alfalab/icons-glyph/FolderMIcon';
import { CashMoneyLineMIcon } from '@alfalab/icons-glyph/CashMoneyLineMIcon';
import { CreditCardMIcon } from '@alfalab/icons-glyph/CreditCardMIcon';
import { CategoryDocumentMIcon } from '@alfalab/icons-glyph/CategoryDocumentMIcon';

import styles from './index.module.scss';

export const Contracts = () => (
  <div className={styles['item']}>
    <FolderMIcon />
     <span>Договоры</span>
  </div>
);

export const Tranches = () => (
  <div className={styles['item']}>
    <CashMoneyLineMIcon />
    <span>Проводки</span>
  </div>
);

export const Transactions = () => (
  <div className={styles['item']}>
    <CreditCardMIcon />
    <span>Транзакции</span>
  </div>
);

export const Reports = () => (
  <div className={styles['item']}>
    <CategoryDocumentMIcon />
    <span>Отчеты</span>
  </div>
);
