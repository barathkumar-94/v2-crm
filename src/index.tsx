import "./files";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IRetinaFormOptions} from "@retina360-ai/core-ui-library-v2";
import {Provider} from 'react-redux';
import {App} from './app';
import {createAppStore} from './common/state/store';
import OIDCApp from './oidc-app';
import { AppContainer } from './common/components/appContainer';
import { mergeApplicationOptions } from "./config";
import { setAppBaseUrl } from "@retina360-ai/core-ui-library-v2";

const PageRenderer = (container: HTMLElement, _options: IRetinaFormOptions) => {
  let options = mergeApplicationOptions(_options);
  setAppBaseUrl(options);
  
  const store = createAppStore();

  // Rendering the component
  ReactDOM.render(
    <Provider store={store}>
        <AppContainer options={options}>{options.oidcOptions.useImplicitFlow ? <OIDCApp /> : <App />}</AppContainer>   
    </Provider>,
    container
  );
};

PageRenderer(document.getElementById('mainContainer'), null);
//(window as any).App = PageRenderer;
