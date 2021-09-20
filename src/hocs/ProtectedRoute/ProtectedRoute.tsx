import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { protectedRouteProps } from '../../interfaces/protectedRouteProps';

const ProtectedRouteComponent: React.FC<protectedRouteProps | any> = ({
  component: Component,
  isLoggedIn,
  path,
  ...rest
}: protectedRouteProps) => {
  return (
    <Route exact path={path}>
      {() => (isLoggedIn ? <Component {...rest} /> : <Redirect to='/signin' />)}
    </Route>
  );
};

export const ProtectedRoute = memo(ProtectedRouteComponent);
