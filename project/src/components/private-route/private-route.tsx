import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: string;
};

function PrivateRoute(props : PrivateRouteProps) : JSX.Element {
  const {children, authorizationStatus} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
