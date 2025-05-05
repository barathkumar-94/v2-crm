import {merge} from 'lodash';
import {
  AUTHENTICATION_URL,
  QUERY_API_URL,
  REPORT_API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  USE_IMPLICIT_FLOW,
} from './common/constants/envrionment';
import {IRetinaFormOptions} from '@retina360-ai/core-ui-library-v2';
import {AuthenticationProviderTypeEnum} from '@retina360-ai/core-ui-library-v2';
import {ICRMAppOptions} from './common/objects';

export const mergeApplicationOptions = (optionsFromHTML: IRetinaFormOptions): ICRMAppOptions => {
  let options: Partial<ICRMAppOptions> = {
    //title: 'Customer Relationship Management(CRM)',
    oidcOptions: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      useImplicitFlow: USE_IMPLICIT_FLOW,
      isClientSecretSeparate: true,
      providerType: AuthenticationProviderTypeEnum.KEYCLOAK,
    },
    images: {
      favicon: 'images/favicon.png',
      loginBackground: 'images/RenewablesBackground.jpg',
      productLogo: 'images/continuum_logo.svg',
      navbarLogo: 'images/continuum_logo.svg',
      defaultProfileImage: 'images/avatar.png',
      //defaultLogo: 'images/bct_logo.png',
      bctLogo: 'images/bct_logo.png',
      placeholder: 'images/placeholder_100.png',
      loadingOverlaySpinner: 'images/spinner.svg',
      masters: {},
    },
    urls: {
      themeBaseUrl: '',
      assetHierarchyBaseUrl: '',
      authenticationBaseUrl: AUTHENTICATION_URL,
      queryApiBaseUrl: QUERY_API_URL,
      reportApiBaseUrl: REPORT_API_URL,
      simulationJsonBaseUrl: 'data/simulationData/',
    },
    themeData: {
      appStyles: 'data/appStyles.json',
      fabricTheme: 'data/fabricTheme.json',
    },
    loginScreen: {
      title: 'CRM & Billing Application',
      isShowTextboxLabel: true,
      userNameLabel: 'User ID',
      //productLogo: 'images/logo-fav.png',
    },
    isShowMessagesinPopup: true,
    enableTableExcelExport: true,
    showApiDetailedErrorMessage: true,
    datePickerDisplayFormat: 'DD-MM-YYYY',
    defaulColumnSize: 6,
    //enableForgotPassword:true,
    removeValueIfNotPresentInComboMaster: true,
    toolbarFilterRenderingStyle: 'FILTER_ICON_AND_RIGHT_SECTION',
    toolbarFilterSectionDefaultVisibility: true,
    toolbarFilterSectionTitle: 'Filter',
    showValidationSummaryInDialog: true,
    ignoreValidationForHiddenControls: true,
    makeSimulation: false
  };

  let updatedOptions = merge({}, options, optionsFromHTML);

  return updatedOptions;
  
};
