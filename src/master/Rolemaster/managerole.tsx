import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_USER, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import {RFCRMToolbar} from "../../common/components/toolbar";
import { rolemasterHelp } from './rolemasterHelp';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['roleid', 'rolename', 'status'];

const onEnterEvent: IRFEventParams = {
  input: ['roleid'],
  moduleName: CRM_USER,
  serviceName: 'ONENTER_ROLE_MST',
};

const helpComponents = {
  rolemasterHelp: rolemasterHelp
};

const searchSection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'roleid',
    label: 'Role ID',
    required:true,
    maxLength:20,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Role Master',
      componentName: 'rolemasterHelp',
      receiveParams: [{parentField: 'roleid', childField: 'ROLE_ID'},
                      {parentField: 'rolename', childField: 'ROLE_NAME'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'rolename',
    label: 'Role Name',
    maxLength:50,
    required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
];

const actionBarButtons: IControlDefinition[] = [
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'create',
        label: 'Create',
        event: {
          serviceName: 'CREATE_ROLE_MST',
          moduleName: CRM_USER,
          input: [...actionInputs],
        },
      },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'ACTIVATE_ROLE_MST',
        moduleName: CRM_USER,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_ROLE_MST',
        moduleName: CRM_USER,
        input: [...actionInputs]
      },
    },
  ];
export const DataSection: IControlDefinition[] = [
  
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
      format:DATE_TIME_FORMAT

    },
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
      format:DATE_TIME_FORMAT

    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_ROLE_MST',
  moduleName: CRM_USER,
    input: ['roleid']
};

export const ManageRole:React.FC<IPageBaseProps> = (props) => {
    const {id,name} = usePageQueryParam();

    const initialData: IRFData = {
      roleid: id,
      rolename: name
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
