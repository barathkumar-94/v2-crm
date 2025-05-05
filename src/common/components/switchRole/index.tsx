import * as React from 'react';
import {Dialog, DialogType, Link} from 'office-ui-fabric-react';
import {random} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationOptionContext, StateContainer, useGetAuthToken} from '@retina360-ai/core-ui-library-v2';
import {ControlType, IControlDefinition, IRFEventParams, RFSection, RetinaFormBuilder} from '@retina360-ai/core-ui-library-v2';
import {IApplicationState, IUserRoleItem} from '../../state/objects';
import {IQueryAPIMasterData, StatusEnum} from '@retina360-ai/core-ui-library-v2';
import {useRouteNavigation} from '@retina360-ai/core-ui-library-v2/lib/base-components/hooks/useRouteNavigation';
import {setUserRoleInSession} from '../../utils';
import {fetchUserRoles} from '../../state/role/actions';

export const SwitchRoleLink: React.FC = () => {
  const [isDialogOpen, setModalOpen] = React.useState<boolean>(false);

  const handleChangePasswordLinkClick = () => {
    setModalOpen(true);
  };

  const handleModalDismiss = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Link onClick={handleChangePasswordLinkClick} className="mt-2">
        Switch Role
      </Link>
      {isDialogOpen && (
        <Dialog
          hidden={false}
          onDismiss={handleModalDismiss}
          modalProps={{isBlocking: true}}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Switch Role',
            styles: {inner: {paddingLeft: 0, paddingRight: 0}},
          }}>
          <SwitchRoleFormContainer handleModalDismiss={handleModalDismiss} />
        </Dialog>
      )}
    </>
  );
};

interface ISwitchRoleFormContainerProps {
  handleModalDismiss: () => void;
}

const SwitchRoleFormContainer: React.FC<ISwitchRoleFormContainerProps> = (props) => {
  const dispatch = useDispatch();
  const getAuthToken = useGetAuthToken();
  const [fetchStatus, setFetchStatus] = React.useState(StatusEnum.LOADING);

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchUserRoles(getAuthToken()));
      setFetchStatus(StatusEnum.SUCCESS);
    })();
  }, []);

  return (
    <StateContainer status={fetchStatus}>
      <SwitchRoleForm handleModalDismiss={props.handleModalDismiss} />
    </StateContainer>
  );
};

const SwitchRoleForm: React.FC<ISwitchRoleFormContainerProps> = (props) => {
  const roleId = useSelector<IApplicationState, string>((state) => state.userRole.activeRoleId);
  const roleList = useSelector<IApplicationState, IUserRoleItem[]>((state) => state.userRole.roleList);

  const inputSection = React.useMemo((): IControlDefinition[] => {
    return [
      {
        type: ControlType.COMBOBOX,
        name: 'roleId',
        label: 'Role',
        required: true,
      },
      {
        type: ControlType.BUTTON,
        name: 'submitBtn',
        label: 'Submit',
        isPrimary: true,
        className: 'text-center',
        event: {
          input:['roleId'],
          callbackMethod: (pageData) => {
            setUserRoleInSession(pageData.roleId);

            //to change the hash to home(so that when page reload the user home page will render the actual page that the user have access..)
            //assume if we are not using the below line => if user in /RoleMaster after changing the role we will reload the page and if the /RoleMaster isn't part of the new role means then user will see unAuthorized page access...to fix that issue chnaging the hash to '/Home'..
            window.location.hash = '#/Home';
            //to reload the entire app with new hash(/Home)
            window.location.reload();

            return null;
          },
        },
      },
    ];
  }, []);

  const initialData = {
    roleId,
  };

  const roleMasterData = roleList.map((x): IQueryAPIMasterData => ({id: x.roleId, value: x.roleDescription}));

  return (
    <RetinaFormBuilder initialValues={initialData} initialRetinaFormState={{masters: {roleId: roleMasterData}}} showValidationSummaryInDialog={false}>
      <RFSection controls={inputSection} columns={1} transparent />
    </RetinaFormBuilder>
  );
};
