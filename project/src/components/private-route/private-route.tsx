import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props : PrivateRouteProps) : JSX.Element {
  const {children} = props;
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
