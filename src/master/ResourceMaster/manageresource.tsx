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
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { resourceHelp } from './resourceHelp';
import { usermasterHelp } from '../UserMaster/usermasterHelp';
import { dateTimeFormats } from '@retina360-ai/core-ui-library-v2';
import { CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['resourceid', 'firstname', 'lastname','mobile','phone','email','organization', 'department','designation','status','userid'];

const onEnterEvent: IRFEventParams = {
  input: ['resourceid'],
  moduleName: CRM_MASTER,
  serviceName: 'RCRM_RESOURCE_ONENTER_MST',
};

const helpComponents = {
  resourceHelp: resourceHelp,
  usermasterHelp:usermasterHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'resourceid',
    label: 'Resource ID',
    required: true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Resource',
      componentName: 'resourceHelp',
      receiveParams: [{parentField: 'resourceid', childField: 'RESOURCE_ID'},
                      {parentField: 'firstname', childField: 'FIRST_NAME'},
                      {parentField: 'lastname', childField: 'LAST_NAME'},
                      {parentField: 'mobile', childField: 'MOBILE_NO'},
                      {parentField: 'email', childField: 'EMAIL'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
    maxLength:100,
    required: true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastname',
    label: 'Last Name',
    maxLength:100,
    required: true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
    required: true,
    inputType:'number',
    maxLength: 10,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'phone',
    label: 'Phone',
    inputType:'number',
    maxLength: 10,
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'email',
    label: 'Email',
    required: true,
    inputType:'email',
    maxLength:80,
    
  },
  {
    type: ControlType.TEXTBOX,
    name: 'organization',
    label: 'Organization',
    required: true,
    maxLength:100,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'department',
    label: 'Department',
    maxLength:80,
 
  },
  {
    type: ControlType.TEXTBOX,
    name: 'designation',
    label: 'Designation',
    maxLength:80

  },
  {
    type: ControlType.TEXTBOX,
    name: 'userid',
    label: 'System User ID',
    maxLength:20,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On User Master',
      componentName: 'usermasterHelp',
      receiveParams: [{parentField: 'userid', childField: 'USER_ID'},
                      {parentField: 'firstname', childField: 'FIRST_NAME'},
                      {parentField: 'lastname', childField: 'LAST_NAME'},
                      {parentField: 'mobile', childField: 'MOBILE'},
                      {parentField: 'phone', childField: 'PHONE'},
                      {parentField: 'email', childField: 'EMAIL'},
                      {parentField: 'organization', childField: 'ORGANIZATION'},
                      {parentField: 'department', childField: 'DEPARTMENT'},
                      {parentField: 'designation', childField: 'DESIGNATION'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  
];



const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_RESOURCE_CREATE_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'activate',
    label: 'Activate',
    event: {
      serviceName: 'RCRM_RESOURCE_ACTIVATE_MST',
      moduleName: CRM_MASTER,
      input: [...actionInputs],
    },
  },
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'inactivate',
    label: 'InActivate',
    event: {
      serviceName: 'RCRM_RESOURCE_INACTIVATE_MST',
      moduleName: CRM_MASTER,
      input: [...actionInputs],
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
    serviceName: 'RCRM_RESOURCE_INIT_MST',
    moduleName: CRM_MASTER,
    input: ['resourceid']
 };
 

export const ManageResource:React.FC<IPageBaseProps> = (props) => {
    const {id} = usePageQueryParam();
  

    const initialData: IRFData = {
        resourceid: id,

      };

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} 
    scrollKey={props.scrollKey} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/> 
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={searchSection} columns={6} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
