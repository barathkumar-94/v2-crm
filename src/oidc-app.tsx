import * as React from 'react';
import {useAuth} from 'react-oidc-context';
import {HashRouter} from 'react-router-dom';
import {AuthRouteContainer} from './app';

const OIDCApp = () => {
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.isLoading]);

  return auth.isLoading && !auth.isAuthenticated ? (
    <h3>Loading...</h3>
  ) : (
    <HashRouter>
      <AuthRouteContainer />
    </HashRouter>
  );
};

export default OIDCApp;
