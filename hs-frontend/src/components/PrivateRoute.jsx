import { useContext } from 'react';
import { AuthContext } from '../contexts';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ path, exact, children, ...rest }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <Route path={path} exact={exact} {...rest}>
      {children}
    </Route>
  );
};
export default PrivateRoute;
