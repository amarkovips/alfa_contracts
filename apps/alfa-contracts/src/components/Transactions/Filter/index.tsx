import React from 'react';
import Heading from 'arui-feather/heading';
import InputGroup from 'arui-feather/input-group';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import { FilterMIcon } from '@alfalab/icons-glyph/FilterMIcon';

import {
  setTransactionsFilter,
  setRefetch,
} from '../../../store/reducers/transactions';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import styles from './index.module.scss';

interface IInput {
  placeholder: string;
  name: string;
}

const Filter = () => {
  const inputs = [
    {
      placeholder: 'ID проводки',
      name: 'id',
    },
    {
      placeholder: 'Номер карты',
      name: 'card_number',
    },
    {
      placeholder: 'TID',
      name: 'tid',
    },
    {
      placeholder: 'MID',
      name: 'mid',
    },
    {
      placeholder: 'Utrnno',
      name: 'utrnno',
    },
    {
      placeholder: 'Код авторизации',
      name: 'auth_code',
    },
  ];

  const dispatch = useAppDispatch();
  const handleChange = (v?: string, e?: React.ChangeEvent<any>): void => {
    const { name, value } = e?.currentTarget;
    name && dispatch(setTransactionsFilter({ name, value }));
  };

  const setFilter = () => {
    dispatch(setRefetch(true));
  };

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
  );
};

export default Filter;
