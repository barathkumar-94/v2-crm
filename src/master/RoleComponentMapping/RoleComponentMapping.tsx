import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { rolemasterHelp } from '../Rolemaster/rolemasterHelp';
import { CRM_USER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['roleid','rolename','bfg','componentmapping'];


const onEnterEvent: IRFEventParams = {
    input: ['roleid'],
    moduleName: CRM_USER,
    serviceName: 'ONENTER_ROLE_COMPONENT_MST',
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
      panelTitle: 'Help On role Master',
      componentName: 'rolemasterHelp',
      receiveParams: [{parentField: 'roleid', childField: 'ROLE_ID'},
                      {parentField: 'rolename', childField: 'ROLE_NAME'}],
      event: onEnterEvent
    }
      },
      {
        type: ControlType.DISPLAY,
        name: 'rolename',
        label: 'Role Name',
      },
      {
        type: ControlType.COMBOBOX,
        name: 'bfg',
        label: 'BFG',
        multiSelect:true,
        required:false,
        masterField:'bfg',
        multiSelectFor: 'save',
        event: {
          moduleName: CRM_USER,
          serviceName: 'SEARCH_ROLE_COMPONENT_MAPPING',
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        name: 'getdetails',
        label: 'Get Details',
        isPrimary: true,
        event: {
          moduleName: CRM_USER,
          serviceName: 'SEARCH_ROLE_COMPONENT_MAPPING',
          input: [...actionInputs],
        },
      },
  
];

const tableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'componentmapping',
      isPrimeReactTable: true,
      editorProps:{
        isEditable:false,
        hideAdd:true,
        hideDelete:false,
    },
      columns: [
        {
          title: 'BFG',
          dataField: 'BFG',
          hidden:true
        },
        {
          title: 'BFG ',
          dataField: 'BFG_NAME',
        },
        {
          title: 'Component Code',
          dataField: 'COMPONENT_CODE',
        },
        {
          title: 'Component Name',
          dataField: 'COMPONENT_NAME',
        },
        {
          title: 'Permission',
          dataField: 'PERMISSION',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
            masterField: 'PERMISSION',
          }
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
        serviceName: 'SAVE_ROLE_COMPONENT_MAPPING',
        moduleName: CRM_USER,
        input: [...actionInputs],
      },
    },
    
  ];
export const DataSection: IControlDefinition[] = [
    {
      type: ControlType.LABEL,
      name: 'strroleCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtroleCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strroleModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtroleModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_ROLE_COMPONENT_MAPPING',
  moduleName: CRM_USER,
//   input: searchInputs,
};

export const RoleComponentMapping:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn'} prompt>
      <RFCRMToolbar/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />    
        <RFSection controls={tableSection} title={'Component Mapping'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
};
