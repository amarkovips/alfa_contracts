import React, {Fragment} from 'react';
import PageBlock from '../UI/PageBlock';
import Filter from './Filter';
import TranchesList from './TranchesList';
import TrancheInfo from './TranchesInfo';

const Tranches = () => {
  return (
    <Fragment>
      <PageBlock>
        <Filter />
      </PageBlock>
      <PageBlock>
        <TranchesList />
      </PageBlock>
      <PageBlock>
        <TrancheInfo />
      </PageBlock>
    </Fragment>
  );
};

export default Tranches;
