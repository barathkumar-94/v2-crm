import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { usermasterHelp } from '../UserMaster/usermasterHelp';
import { CRM_USER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['userid', 'firstname', 'lastname','mobile','phone','email','organization',
'department','designation','status','sbumapping'];


const onEnterEvent: IRFEventParams = {
    input: ['userid'],
    moduleName: CRM_USER,
    serviceName: 'ONENTER_USER_SITE_SBU_MST',
  };
  
  const helpComponents = {
    usermasterHelp: usermasterHelp
  };
  

const searchSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'userid',
        label: 'User ID',
        required:true,
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
      {
        type: ControlType.DISPLAY,
        name: 'firstname',
        label: 'First Name',
      },
      {
        type: ControlType.DISPLAY,
        name: 'lastname',
        label: 'Last Name',
      },
      {
        type: ControlType.DISPLAY,
        name: 'mobile',
        label: 'Mobile',
      },
      {
        type: ControlType.DISPLAY,
        name: 'phone',
        label: 'Phone',
      },
      {
        type: ControlType.DISPLAY,
        name: 'email',
        label: 'Email',
      },
      {
        type: ControlType.DISPLAY,
        name: 'organization',
        label: 'Organization',
      },
      {
        type: ControlType.DISPLAY,
        name: 'department',
        label: 'Department',
        
      },
      {
        type: ControlType.DISPLAY,
        name: 'designation',
        label: 'Designation',
     
      },

      { 
        type: ControlType.DISPLAY,
        name: 'status',
        label: 'Status',
      },
  
];

const tableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'sbumapping',
      title:'SBU Mapping',
      isPrimeReactTable: true,
      editorProps:{
          isEditable: true,
          hideAdd:false,
          hideDelete:false,
      },
      columns: [
        {
          title: 'SBU Code',
          dataField: 'SBU_CODE',
          width:150,
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'SBU_CODE',
              event :{
              serviceName:'SBU_MST_ONCHANGE',
              moduleName : CRM_USER,
              input:['SBU_CODE']
              }
          
          }

        },
        {
          title: 'SBU Name',
          dataField: 'SBU_NAME',
          width:200
        },
        {
          title: 'Site Code',
          dataField: 'SITE_CODE',
          width:150,
          cellEditor: TableCellEditorType.COMBOBOX,
         cellEditorParams:{
            commaSeparatedOptionsField:'SITE_MASTER',
            masterField: 'SITE_CODE',
         event :{
              serviceName:'SITE_MST_ONCHANGE',
              moduleName : CRM_USER,
              input:['SITE_CODE']
              }
          } ,
          
        
        },
        {
          title: 'Site Name',
          dataField: 'SITE_NAME',
          width:200
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
        serviceName: 'SAVE_MANAGE_USER_MAPPING',
        moduleName: CRM_USER,
        input: [...actionInputs],
      },
    },
    
  ];
export const DataSection: IControlDefinition[] = [
   
    {
      type: ControlType.LABEL,
      name: 'dtuserCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
      format:DATE_TIME_FORMAT

    },

    {
      type: ControlType.LABEL,
      name: 'struserCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
   
    {
      type: ControlType.LABEL,
      name: 'dtuserModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
      format:DATE_TIME_FORMAT

    },

    {
      type: ControlType.LABEL,
      name: 'struserModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_USER_SBU_SITE_MAPPING',
  moduleName: CRM_USER,
//   input: searchInputs,
};

export const ManageUserMapping:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />    
        <RFSection controls={tableSection}  columns={1} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
