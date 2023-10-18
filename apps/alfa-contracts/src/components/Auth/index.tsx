import React from 'react';
import Form from 'arui-feather/form';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import { GoogleLogin } from '@react-oauth/google';
import { setAuth } from '../../store/reducers/app';
import { useAppDispatch } from '../../hooks/useAppSelector';

import { useLazyAuthQuery } from '../../services/auth';

import styles from './index.module.scss';

const Auth = () => {
  const dispatch = useAppDispatch();
  const [oauth] = useLazyAuthQuery();
  return (
    <div className={styles['component']}>
      <Form
        onSubmit={() => {
          console.log('try to auth');
        }}
      >
        <FormField>
          <Input placeholder="Логин" />
        </FormField>
        <FormField>
          <Input placeholder="Пароль" />
        </FormField>
        <FormField>
          <Button view="extra" type="submit">
            Отправить
          </Button>
        </FormField>
      </Form>

      <div className={styles['google']}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            dispatch(setAuth(credentialResponse.credential));
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
};

export default Auth;
