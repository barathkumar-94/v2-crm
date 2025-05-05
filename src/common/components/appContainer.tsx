import * as React from 'react';
import AppThemeContainer from './theme-container';
import {IBaseApplicationOptions} from '@retina360-ai/core-ui-library-v2';
import RetinaOidcProvider from '@retina360-ai/core-ui-library-v2/lib/base-components/oidc/retina-oidc-provider';
import {ApplicationOptionContext, ConfirmationDialogProvider} from '@retina360-ai/core-ui-library-v2';

interface IAppContainerProps {
  options: Partial<IBaseApplicationOptions>;
  isCustomPage?: boolean;
  /**
   * load user info..
   * oidc option..
   * @default false
   */
  loadUserInfo?: boolean;
  /**
   * disable client authentication..
   * oidc option..
   * @default false
   */
  disableClientAuthentication?: boolean;
}

export const AppContainer: React.FC<IAppContainerProps> = (props) => {
  const {options} = props;

  return (
    <ApplicationOptionContext.Provider value={{options}}>
      <AppThemeContainer position={'tc'} isCustomPage={props.isCustomPage}>
        <ConfirmationDialogProvider>
          {options.oidcOptions?.useImplicitFlow ? (
            <RetinaOidcProvider
              loadUserInfo={props.loadUserInfo}
              disableClientAuthentication={props.disableClientAuthentication}>
              {props.children}
            </RetinaOidcProvider>
          ) : (
            <>{props.children}</>
          )}
        </ConfirmationDialogProvider>
      </AppThemeContainer>
    </ApplicationOptionContext.Provider>
  );
};
