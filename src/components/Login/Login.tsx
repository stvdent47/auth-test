import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Input, Space, Typography, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import { Form, Field } from 'react-final-form';
import { handleLoginProps } from '../../interfaces/handleLoginProps';
import { LoginButton } from './LoginButton';
import { validate } from './lib/validate';

const SECRET_KEY = 'testkey';

interface submitValues {
  username: string;
  password: string;
}
type LoginProps = {
  setIsLoggedIn: (state: boolean) => void;
};

export const Login: React.FC<LoginProps> = ({ setIsLoggedIn }): JSX.Element => {
  const history = useHistory();

  const handleLogin = useCallback(
    ({ username, password }: handleLoginProps): void => {
      if (username.trim() === 'user' && password.trim() === 'user') {
        localStorage.setItem('token', SECRET_KEY);
        setIsLoggedIn(true);
        history.push('/main');
      } else {
        Modal.error({
          title: 'Вы ввели неверные данные для входа',
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = useCallback((evt: submitValues): void => {
    const { username, password } = evt;

    handleLogin({
      username,
      password,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Space style={{ height: '100vh' }}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, pristine, hasValidationErrors, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Typography>username</Typography>
              <Field name='username'>
                {({ input, meta }) => (
                  <FormItem
                    help={meta.touched && meta.error && meta.error}
                    validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : undefined}
                  >
                    <Input size='large' style={{ width: '330px' }} autoComplete='off' {...input} />
                  </FormItem>
                )}
              </Field>
            </div>
            <div>
              <Typography>password</Typography>
              <Field
                name='password'
                render={({ input, meta }) => (
                  <FormItem
                    help={meta.touched && meta.error && meta.error}
                    validateStatus={meta.touched ? (meta.error ? 'error' : 'success') : undefined}
                  >
                    <Input.Password size='large' style={{ width: '330px' }} {...input} />
                  </FormItem>
                )}
              />
            </div>
            <LoginButton
              pristine={pristine}
              hasValidationErrors={hasValidationErrors}
              submitting={submitting}
            />
          </form>
        )}
      />
    </Space>
  );
};
