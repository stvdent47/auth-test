import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import { Button, Input, Space, Typography } from 'antd';
import { Form, Field } from 'react-final-form';
import FormItem from 'antd/lib/form/FormItem';
import { handleLoginProps } from '../../interfaces/handleLoginProps';
import validate from './lib/validate';

interface submitValues {
  username: string;
  password: string;
}
interface LoginProps {
  onLogin: ({ username, password }: handleLoginProps) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const onSubmit = useCallback((evt: submitValues): void => {
    const { username, password } = evt;

    onLogin({
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
                    <Input size='large' style={{ width: '330px' }} {...input} />
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
            <Button
              htmlType='submit'
              type='primary'
              size='large'
              disabled={pristine || hasValidationErrors || submitting}
            >
              Войти
            </Button>
          </form>
        )}
      />
    </Space>
  );
};

export default Login;
