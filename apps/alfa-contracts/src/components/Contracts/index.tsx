import React, {Fragment} from 'react';
import PageBlock from '../UI/PageBlock';
import Filter from './Filter';
import ContractsList from './ContractsList';
import ContractInfo from './ContractInfo';

const Contracts = () => {
  return (
    <Fragment>
      <PageBlock>
        <Filter />
      </PageBlock>
      <PageBlock>
        <ContractsList />
      </PageBlock>
      <PageBlock>
        <ContractInfo />
      </PageBlock>
    </Fragment>
  );
};

export default Contracts;
