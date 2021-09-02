import { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../../hocs/ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Main from '../Main/Main';
import './App.css';
import { handleLoginProps } from '../../interfaces/handleLoginProps';
import { Modal } from 'antd';

const SECRET_KEY = 'testkey';

const App: React.FC = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

  const handleSignout = useCallback((): void => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    Modal.info({
      title: 'Вы успешно вышли из системы',
    });
    history.push('/signin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginCheck = useCallback((): void => {
    const token = localStorage.getItem('token');

    if (token) {
      const isTokenCorrect = token === SECRET_KEY;

      if (isTokenCorrect) {
        setIsLoggedIn(true);
        history.push('/main');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route path='/signin'>
          <Login onLogin={handleLogin} />
        </Route>
        <ProtectedRoute
          path='/main'
          component={Main}
          isLoggedIn={isLoggedIn}
          onSignout={handleSignout}
        />
        <Route path='/*'>{isLoggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}</Route>
      </Switch>
    </div>
  );
};

export default App;
