import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  isAllMessageLevelSuccess,
} from '@retina360-ai/core-ui-library-v2';
import {IPageBaseProps} from '../../common/objects';
//'import { truncate } from 'lodash';
//import { ComboBox } from 'office-ui-fabric-react';
import {rolemasterHelp} from '../Rolemaster/rolemasterHelp';
import {usermasterHelp} from '../UserMaster/usermasterHelp';
import {CRM_USER} from '../../common/constants';
import {RFCRMToolbar} from '../../common/components/toolbar';
import {RFFooter} from '../../common/components/footer';
import {useUserInfo} from '@retina360-ai/core-ui-library-v2';
import {IQueryAPIResponse, isQueryApiMessagesHaveError} from '@retina360-ai/core-ui-library-v2';
import {isEqual, pick, toUpper} from 'lodash';

const actionInputs = ['userrolemappingsummary'];
const searchInputs = ['userid', 'firstname', 'lastname', 'roleid', 'rolename'];

const helpComponents = {
  rolemasterHelp: rolemasterHelp,
  usermasterHelp: usermasterHelp,
};

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'userrolemappingsummary',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,
      hideAdd: false,
      hideDelete: false,
      hideRowDuplicate:true
    },
    columns: [
      {
        title: 'User ID',
        dataField: 'hdnUserId',
        hidden: true,
      },
      {
        title: 'User ID',
        dataField: 'userid',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required: true,
          event: {
            input: ['userid'],
            moduleName: CRM_USER,
            serviceName: 'ONENTER_USER_MST',
          },
          help: {
            panelTitle: 'Help On User Master',
            componentName: 'usermasterHelp',
            receiveParams: [
              {parentField: 'userid', childField: 'USER_ID'},
              {parentField: 'firstname', childField: 'FIRST_NAME'},
              {parentField: 'lastname', childField: 'LAST_NAME'},
            ],
            event: {
              input: ['userid'],
              moduleName: CRM_USER,
              serviceName: 'ONENTER_USER_MST',
            },
          },
        },
      },
      {
        title: 'First Name',
        dataField: 'firstname',
      },
      {
        title: 'Last Name',
        dataField: 'lastname',
      },
      {
        title: 'Role ID',
        dataField: 'hdnRoleId',
        hidden: true,
      },
      {
        title: 'Role ID',
        dataField: 'roleid',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required: true,
          event: {
            input: ['roleid'],
            moduleName: CRM_USER,
            serviceName: 'ONENTER_ROLE_MST',
          },
          help: {
            panelTitle: 'Help On Role Master',
            componentName: 'rolemasterHelp',

            receiveParams: [
              {parentField: 'roleid', childField: 'ROLE_ID'},
              {parentField: 'rolename', childField: 'ROLE_NAME'},
            ],
            event: {
              input: ['roleid'],
              moduleName: CRM_USER,
              serviceName: 'ONENTER_ROLE_MST',
            },
          },
        },
      },
      {
        title: 'Role Name',
        dataField: 'rolename',
      },
      {
        title: 'Default Role',
        dataField: 'default_role',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required: true,
          masterField: 'default_role',
        },
      },
    ],
  },
];

export const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'strCreatedBy',
    isStatic: false,
    prefixText: 'Created By : ',
  },
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
  },
  {
    type: ControlType.LABEL,
    name: 'strModifiedBy',
    isStatic: false,
    prefixText: 'Modified By : ',
  },
  {
    type: ControlType.LABEL,
    name: 'dtModifiedDate',
    isStatic: false,
    prefixText: 'Modified Date : ',
  },
];

export const UserRoleMapping: React.FC<IPageBaseProps> = (props) => {
  const userInfo = useUserInfo();
  const currentUserDataFetchedRef = React.useRef<any>([]);
  const currentUserDataAfterSaveRef = React.useRef<any>([]);

  const searchSection = React.useMemo((): IControlDefinition[] => {
    return [
      {
        type: ControlType.TEXTBOX,
        name: 'userid',
        label: 'User ID',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'firstname',
        label: 'First Name',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'lastname',
        label: 'Last Name',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'roleid',
        label: 'Role ID',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'rolename',
        label: 'Role Name',
      },

      {
        type: ControlType.BUTTON,
        name: 'searchBtn',
        label: 'Search',
        isPrimary: true,
        event: {
          moduleName: CRM_USER,
          serviceName: 'SEARCH_USER_ROLE_MAPPING',
          input: searchInputs,
          processResponse: (response) => {
            let currentUserData = getCurrentUserData(response, userInfo.userName);
            currentUserDataFetchedRef.current = currentUserData;
            return response;
          },
        },
      },
    ];
  }, [userInfo.userName]);

  const actionBarButtons = React.useMemo((): IControlDefinition[] => {
    return [
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',
        event: {
          serviceName: 'SAVE_USER_ROLE_MAPPING',
          moduleName: CRM_USER,
          input: [...actionInputs],
          processResponse: (response) => {
            let currentUserData = getCurrentUserData(response, userInfo.userName);
            currentUserDataAfterSaveRef.current = currentUserData;
            return response;
          },
          callbackMethod: (formData, notificationMessageLevels) => {
            if (
              isAllMessageLevelSuccess(notificationMessageLevels) &&
              !isEqual(currentUserDataFetchedRef.current, currentUserDataAfterSaveRef.current)
            ) {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          },
        },
      },
    ];
  }, [userInfo.userName]);

  const onLoadEventParams: IRFEventParams = {
    serviceName: 'INIT_USER_ROLE_MAPPING',
    moduleName: CRM_USER,
    // input: searchInputs,
    processResponse: (response) => {
      let currentUserData = getCurrentUserData(response, userInfo.userName);
      currentUserDataFetchedRef.current = currentUserData;
      return response;
    },
  };

  return (
    <RetinaFormBuilder
      scrollKey={props.scrollKey}
      onLoadEventParams={onLoadEventParams}
      components={helpComponents}
      className={'page-with-footer-btn'}
      prompt>
      <RFCRMToolbar filterControls={searchSection} />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={tableSection} columns={1} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
};

function getCurrentUserData(response: IQueryAPIResponse, userName: string): any {
  let data: any[] = Array.isArray(response.data.userrolemappingsummary) ? response.data.userrolemappingsummary : [];
  let upperUserName = toUpper(userName);
  let currentUserData = data
    .filter((x) => x.userid === upperUserName)
    .map((x) => pick(x, ['userid', 'roleid', 'default_role']));
  return currentUserData;
}
