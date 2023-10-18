import React, { Fragment } from 'react'
import PageBlock from '../UI/PageBlock'
import Filter from './Filter'
import ContractorsList from './ContractorsList'
import ContractorsInfo from './ContractorsInfo'

const Contractors = () => {
  return (
    <Fragment>
      <PageBlock>
        <Filter />
      </PageBlock>
      <PageBlock>
        <ContractorsList />
      </PageBlock>
      <PageBlock>
        <ContractorsInfo />
      </PageBlock>
    </Fragment>
  )
}

export default Contractors
