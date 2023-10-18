import React, { useEffect, useState } from 'react'
import Spin from 'arui-feather/spin'
import { ArrowUpDownHeavyMIcon } from '@alfalab/icons-glyph/ArrowUpDownHeavyMIcon'
import { IContractor } from '../../../models/contractors'
import { useLazyGetContractorsQuery } from '../../../services/api'
import { Typography } from '@alfalab/core-components/typography'
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector'

import styles from './index.module.scss'
import { setCurrentContractor } from 'apps/alfa-contracts/src/store/reducers/contractors'

const ContractorsList = () => {
  const current_contractor = useAppSelector(
    (state) => state.сontractors.current_contractor
  )
  const filter = useAppSelector((state) => state.сontractors.contractorsFilter)
  const need_refetch = useAppSelector((state) => state.сontractors.need_refetch)

  const dispatch = useAppDispatch()
  const [getContractors, { data, isLoading, isFetching }] =
    useLazyGetContractorsQuery()
  const [contractors, setContractors] = useState<IContractor[] | []>([])

  const [order, setOrder] = useState<boolean>(false)

  useEffect(() => {
    getContractors(filter)
  }, [])
  useEffect(() => {
    if (need_refetch) getContractors(filter)
  }, [need_refetch])

  useEffect(() => {
    setContractors(data || [])
  }, [data])

  // const sortNumbers = (data: string) => {
  //   setOrder(!order)
  //   const sorted = [...contractors].sort(
  //     (contractor: IContractor, next: IContractor) =>
  //       order ? contractor[data] - next[data] : next[data] - contractor[data]
  //   )
  //   setContractors(sorted)
  // }

  const sortStrings = (data: string) => {
    setOrder(!order)
    const sorted = [...contractors].sort(
      (contractor: IContractor, next: IContractor) =>
        order
          ? ('' + contractor[data]).localeCompare(next[data])
          : ('' + next[data]).localeCompare(contractor[data])
    )
    setContractors(sorted)
  }

  if (isLoading || isFetching) return <Spin size="s" visible={true} />

  if (!contractors.length)
    return (
      <Typography.TitleResponsive tag="div" view="xsmall">
        Нет доступных договоров
      </Typography.TitleResponsive>
    )
  return (
    <table className={styles['table']}>
      <thead>
        <tr className={styles['header']}>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Название компании{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortStrings('company_name')}
              />
            </div>
          </th>
          <th className={styles['col']}>
            <div className={styles['cell']}>
              Название банка{' '}
              <ArrowUpDownHeavyMIcon
                className={styles['sort']}
                onClick={() => sortStrings('bank')}
              />
            </div>
          </th>
          <th className={styles['col']}>Лицевой счет</th>
          <th className={styles['col']}>БИК</th>
          <th className={styles['col']}>КС</th>
        </tr>
      </thead>
      <tbody>
        {contractors.map((contrator: IContractor, index: number) => (
          <tr
            key={index}
            onClick={() => dispatch(setCurrentContractor(contrator))}
            // className={`${styles['row']} ${
            //   contrator.number === current_contractor?.number
            //     ? styles['selected']
            //     : ''
            // }`}
            className={styles['row']}
          >
            <td className={styles['col']}>{contrator.company_name}</td>
            <td className={styles['col']}>{contrator.bank}</td>
            <td className={styles['col']}>{contrator.personal_account}</td>
            <td className={styles['col']}>{contrator.bik}</td>
            <td className={styles['col']}>{contrator.ks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ContractorsList
