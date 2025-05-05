import { fetchTheme, IBaseApplicationState, IRetinaStyleTheme, setAppTitle, StatusEnum } from "@retina360-ai/core-ui-library-v2";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import NotificationsContainer, { INotificationsContainerProps } from "@retina360-ai/core-ui-library-v2/lib/base-components/notifications/NotificationsContainer";
import GlobalStyle from "@retina360-ai/core-ui-library-v2/lib/base-components/themes/RetinaGlobalStyle";
import { ApplicationOptionContext, ErrorBoundary, loadFabricTheme, StateContainer } from "@retina360-ai/core-ui-library-v2";

interface IAppThemeContainerProps extends INotificationsContainerProps {
  /**
   * Whether the page is custom page or not.
   * to render the notification as a portal(see renderAsPortal in notificationContainer)
   */
  isCustomPage?:boolean;
}

/**
 * A container component which reads the options details for the fabric and overall style theme object
 * to be rendered for the application
 */
const AppThemeContainer: React.FC<IAppThemeContainerProps> = (props) => {
  const [themeLoaded, setThemeLoaded] = React.useState<boolean>(false);
  const { options } = React.useContext(ApplicationOptionContext);
  const { urls, themeData } = options;

  const dispatch = useDispatch();

  const theme = useSelector<IBaseApplicationState, Partial<IRetinaStyleTheme>>((state) => state.themeData.currentTheme);

  //fabric theme
  React.useEffect(() => {
    (async () => {
      await loadFabricTheme(themeData.fabricTheme, urls.themeBaseUrl);
      setThemeLoaded(true);
    })();
  }, []);

  //app styles
  React.useEffect(() => {
    dispatch(fetchTheme(themeData.appStyles, urls.themeBaseUrl));
  }, []);

  //Setting the application title
  React.useEffect(() => {
    let title = options.title;
    if (title) {
      dispatch(setAppTitle(title));
    }
  }, []);

  return (
    <ErrorBoundary fallbackComponent={"Oops! Something went wrong. Please try again."}>
      <ThemeProvider theme={theme as IRetinaStyleTheme}>
        <StateContainer status={themeLoaded ? StatusEnum.SUCCESS : StatusEnum.LOADING}>{props.children}</StateContainer>
        <GlobalStyle />
        <NotificationsContainer position={props.position} renderAsPortal={props.isCustomPage} timeout={props.timeout} />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppThemeContainer;
