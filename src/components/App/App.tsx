import { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import { ProtectedRoute } from '../../hocs/ProtectedRoute/ProtectedRoute';
import { Login } from '../Login/Login';
import { Main } from '../Main/Main';

const SECRET_KEY = 'testkey';

const App: React.FC = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const history = useHistory();

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
          <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <ProtectedRoute
          path='/main'
          component={Main}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Route path='/*'>{isLoggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}</Route>
      </Switch>
    </div>
  );
};

export default App;
