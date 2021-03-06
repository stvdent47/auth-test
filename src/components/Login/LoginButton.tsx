import React, { memo } from 'react';
import { Button } from 'antd';

interface LoginButtonProps {
  pristine: boolean;
  hasValidationErrors: boolean;
  submitting: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = memo(
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
