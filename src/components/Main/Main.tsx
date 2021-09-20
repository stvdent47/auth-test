import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Button, Space, Typography, Modal } from 'antd';
import 'antd/dist/antd.css';

const { Title } = Typography;

interface MainProps {
  setIsLoggedIn: (state: boolean) => void;
}

const MainComponent: React.FC<MainProps> = ({ setIsLoggedIn }): JSX.Element => {
  const history = useHistory();

  const handleSignout = useCallback((): void => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    Modal.info({
      title: 'Вы успешно вышли из системы',
    });
    history.push('/signin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Space
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}
      direction='vertical'
    >
      <Title type='success'>Вы авторизованы!</Title>
      <Button danger onClick={handleSignout} size='large'>
        Выйти
      </Button>
    </Space>
  );
};

export const Main = React.memo(MainComponent);
