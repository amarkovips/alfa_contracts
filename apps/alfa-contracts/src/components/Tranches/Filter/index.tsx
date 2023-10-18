import React from 'react';
import Heading from 'arui-feather/heading';
import InputGroup from 'arui-feather/input-group';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import CalendarInput from 'arui-feather/calendar-input';
import { FilterMIcon } from '@alfalab/icons-glyph/FilterMIcon';

import { setTranchesFilter, setRefetch } from '../../../store/reducers/tranches';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import styles from './index.module.scss';

interface IInput {
  placeholder: string;
  name: string;
}

const Filter = () => {
  const inputs: IInput[] = [
    {
      placeholder: 'Мерчант',
      name: 'merchant',
    },
    {
      placeholder: 'Аутлет',
      name: 'autlet',
    },
    {
      placeholder: 'Терминал',
      name: 'terminal',
    },
    {
      placeholder: 'Название',
      name: 'name',
    },
    {
      placeholder: 'Дата с:',
      name: 'from',
    },
    {
      placeholder: 'Дата до:',
      name: 'to',
    },
    {
      placeholder: 'Счет КТ',
      name: 'kt',
    },
    {
      placeholder: 'Счет ДТ',
      name: 'dt',
    },
    {
      placeholder: 'Сумма',
      name: 'amount',
    },
  ];

  const dispatch = useAppDispatch();
  const handleChange = (v?: string, e?: React.ChangeEvent<any>): void => {
    const { name, value } = e?.currentTarget;
    name && dispatch(setTranchesFilter({ name, value }));
  };

  const setFilter = () => {
    dispatch(setRefetch(true));
  };

  return (
    <div>
      <Heading size="xs" className={styles['heading']}>
        Фильтровать список:
      </Heading>
      <div className={styles['filter']}>
        <div className={styles['filters']}>
          <InputGroup width="available">
            {inputs
              .filter((input: IInput, index: number) => index < 4)
              .map((input: IInput, index) => (
                <Input
                  key={index}
                  placeholder={input.placeholder}
                  size={'s'}
                  name={input.name}
                  onChange={handleChange}
                />
              ))}
          </InputGroup>
          <InputGroup width="available">
            {inputs
              .filter((input: IInput, index: number) => index > 3)
              .map((input: IInput, index) => {
                if (['from', 'to'].includes(input.name)) {
                  return (
                    <CalendarInput
                      key={index}
                      placeholder={input.placeholder}
                      calendar={{showToday: true}}
                      width='available'
                      size="s"
                    />
                  )
                } else {
                  return (
                    <Input
                      key={index}
                      placeholder={input.placeholder}
                      size="s"
                      name={input.name}
                      onChange={handleChange}
                    />
                  )
                }

              })}
          </InputGroup>
        </div>
        <Button size="s" icon={<FilterMIcon />} onClick={setFilter}>
          Фильтр
        </Button>
      </div>
    </div>
  );
};

export default Filter;
