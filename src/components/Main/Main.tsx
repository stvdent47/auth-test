import 'antd/dist/antd.css';

import { Button, Space, Typography } from 'antd';
const { Title } = Typography;

interface IMainProps {
  onSignout: () => void;
}

const Main: React.FC<IMainProps> = ({ onSignout }): JSX.Element => {
  return (
    <Space
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}
      direction='vertical'
    >
      <Title type='success'>Вы авторизованы!</Title>
      <Button danger onClick={onSignout} size='large'>
        Выйти
      </Button>
    </Space>
  );
};

export default Main;
