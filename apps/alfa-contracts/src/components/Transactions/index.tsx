import React, {Fragment} from 'react';
import PageBlock from '../UI/PageBlock';
import Filter from './Filter';
import TransactionsList from './TransactionsList';
import TransactionsInfo from './TransactionsInfo';

const Transactions = () => {
  return (
    <Fragment>
      <PageBlock>
        <Filter />
      </PageBlock>
      <PageBlock>
        <TransactionsList />
      </PageBlock>
      <PageBlock>
        <TransactionsInfo />
      </PageBlock>
    </Fragment>
  );
};

export default Transactions;
