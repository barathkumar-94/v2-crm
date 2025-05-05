import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { resourceHelp } from './resourceHelp';

const searchInputs = ['groupname', 'resourcegrouping'];

const onEnterEvent: IRFEventParams = {
  input: ['resourceid'],
  moduleName: 'CRM_Master',
  serviceName: 'RCRM_RESOURCE_ONENTER_MST',
};
const helpComponents = {
  resourceHelp: resourceHelp,
};
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'groupname',
    label: 'Group Name',
    masterField: 'groupname',
    required: true,
    event :{
      serviceName:'RCRM_RESOURCE_GROUP_ONCHANGE',
      moduleName :'CRM_Master',
      input:['groupname']
      }
  },
  
];
const resourceGrouping: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'resourcegrouping',
    isPrimeReactTable: true, 
    editorProps:{
      isEditable:true,
  },
    columns: [
      {
        title: 'Resource ID',
        dataField: 'resourceid',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          event:{
            input: ['resourceid'],
            moduleName: CRM_MASTER,
           serviceName: 'RCRM_RESOURCE_ONENTER_MST',
          },
          help: {
            panelTitle: 'Help On Resource',
            componentName: 'resourceHelp',
            receiveParams: [{parentField: 'resourceid', childField: 'RESOURCE_ID'},
                            {parentField: 'firstname', childField: 'FIRST_NAME'},
                            {parentField: 'lastname', childField: 'LAST_NAME'},
                            {parentField: 'mobile', childField: 'MOBILE'},
                            {parentField: 'phone', childField: 'PHONE'},
                            {parentField: 'email', childField: 'EMAIL'},
                            {parentField: 'organization', childField: 'ORGANIZATION'},
                            {parentField: 'department', childField: 'DEPARTMENT'},
                            {parentField: 'designation', childField: 'DESIGNATION'},
                            {parentField: 'systemuserid', childField: 'SYSTEM_USER_ID'},
                            {parentField: 'status', childField: 'STATUS'}],
            event:{
              input: ['resourceid'],
              moduleName: CRM_MASTER,
              serviceName: 'RCRM_RESOURCE_ONENTER_MST',
            }
          },
        }
        
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
        title: 'Mobile',
        dataField: 'mobile',

      },
      {
        title: 'Phone',
        dataField: 'phone',

      },
      {
        title: 'Email',
        dataField: 'email',

      },
      {
        title: 'Organization',
        dataField: 'organization',

      },
      {
        title: 'Department',
        dataField: 'department',

      },
      {
        title: 'Designation',
        dataField: 'designation',

      },
      {
        title: 'System User ID',
        dataField: 'systemuserid',

      },
      {
        title: 'Status',
        dataField: 'status',
      },
    ],
  },
];
const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_RESOURCE_GROUPING_SAVE',
        moduleName: CRM_MASTER,
        input: [...searchInputs],
      },
    },
]

export const DataSection: IControlDefinition[] = [
  // {
  //   type: ControlType.LABEL,
  //   name: 'strCreatedBy',
  //   isStatic: false,
  //   prefixText: 'Created By : ',
  // },
  // {
  //   type: ControlType.LABEL,
  //   name: 'dtCreatedDate',
  //   isStatic: false,
  //   prefixText: 'Created Date : ',
  //   format:DATE_TIME_FORMAT
  // },
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
   serviceName: 'RCRM_RESOURCE_GROUPING_INIT',
  moduleName: CRM_MASTER,
 input: searchInputs,
};

export const ResourceGrouping:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents}>
       <RFCRMToolbar hasBackButton/> 
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={resourceGrouping} columns={1} />
        <RFSection controls={actionBarButtons} />
        <RFSection controls={DataSection} columns={2} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
