import React, { Fragment } from 'react'
import PageBlock from '../UI/PageBlock'
import Filter from './Filter'
import ContractorsList from './ContractorsList'
import ContractorsInfo from './ContractorsInfo'
import {useAppSelector } from '../../hooks/useAppSelector'

const Contractors = () => {
  const currentContractor = useAppSelector(
    (state) => state.сontractors.current_contractor
  )
  return (
    <Fragment>
      <PageBlock>
        <Filter />
      </PageBlock>
      <PageBlock>
        <ContractorsList />
      </PageBlock>
      {currentContractor && (
        <PageBlock>
          <ContractorsInfo />
        </PageBlock>
      )}
    </Fragment>
  )
}

export default Contractors
