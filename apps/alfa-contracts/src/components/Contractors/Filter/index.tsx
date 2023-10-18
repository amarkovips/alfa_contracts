import React from 'react'
import Heading from 'arui-feather/heading'
import InputGroup from 'arui-feather/input-group'
import Input from 'arui-feather/input'
import Button from 'arui-feather/button'
import { FilterMIcon } from '@alfalab/icons-glyph/FilterMIcon'

import {
  setContractsFilter,
  setRefetch,
} from '../../../store/reducers/contracts'
import { useAppDispatch } from '../../../hooks/useAppSelector'
import styles from './index.module.scss'

interface IInput {
  placeholder: string
  name: string
}

const Filter = () => {
  const inputs = [
    {
      placeholder: 'Название компании',
      name: 'company_name',
    },
    {
      placeholder: 'Банк',
      name: 'bank',
    },
    {
      placeholder: 'Лицевой счет',
      name: 'personal_account',
    },
    {
      placeholder: 'БИК',
      name: 'bik',
    },
    {
      placeholder: 'КС',
      name: 'ks',
    },
  ]

  const dispatch = useAppDispatch()
  const handleChange = (v?: string, e?: React.ChangeEvent<any>): void => {
    const { name, value } = e?.currentTarget
    name && dispatch(setContractsFilter({ name, value }))
  }

  const setFilter = () => {
    dispatch(setRefetch(true))
  }

  return (
    <div>
      <Heading size="xs" className={styles['heading']}>
        Фильтровать список:
      </Heading>
      <InputGroup width="available" className={styles['group']}>
        {inputs.map((input: IInput, index) => (
          <Input
            key={index}
            placeholder={input.placeholder}
            size="s"
            name={input.name}
            onChange={handleChange}
          />
        ))}
        <Button size="s" icon={<FilterMIcon />} onClick={setFilter}>
          Фильтр
        </Button>
      </InputGroup>
    </div>
  )
}

export default Filter
