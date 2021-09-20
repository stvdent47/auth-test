import React from 'react';
import { Button } from 'antd';

interface LoginButtonProps {
  pristine: boolean;
  hasValidationErrors: boolean;
  submitting: boolean;
}

const LoginButtonComponent: React.FC<LoginButtonProps> = ({
  pristine,
  hasValidationErrors,
  submitting,
}) => (
  <Button
    htmlType='submit'
    type='primary'
    size='large'
    disabled={pristine || hasValidationErrors || submitting}
  >
    Войти
  </Button>
);

export const LoginButton = React.memo(LoginButtonComponent);
