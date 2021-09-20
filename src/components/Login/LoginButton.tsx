import React from 'react';
import { Button } from 'antd';

interface LoginButtonProps {
  pristine: boolean;
  hasValidationErrors: boolean;
  submitting: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = React.memo(
  ({ pristine, hasValidationErrors, submitting }) => (
    <Button
      htmlType='submit'
      type='primary'
      size='large'
      disabled={pristine || hasValidationErrors || submitting}
    >
      Войти
    </Button>
  )
);
