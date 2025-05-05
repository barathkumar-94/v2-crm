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
import { ChecklistHelp } from './ChecklistHelp';
import { CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';


const actionInputs = ['checklistcode', 'description', 'component','transactiontype','status','checklistgrid'];

const onEnterEvent: IRFEventParams = {
  input: ['checklistcode'],
  moduleName: CRM_MASTER,
  serviceName: 'RCRM_CHECKLIST_ONENTER_MST',
};

const helpComponents = {
    ChecklistHelp: ChecklistHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'checklistcode',
    label: 'Checklist code',
    required: true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Checklist',
      componentName: 'ChecklistHelp',
      receiveParams: [{parentField: 'checklistcode', childField: 'CHECKLIST_CODE'},],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
    maxLength:100,
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component',
    masterField: 'component',
    required:true,
    event :{
      serviceName:'ONCHANGE_CHECKLIST_COMPONENT',
      moduleName :'CRM_Master',
      input:['component']
      },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'transactiontype',
    label: 'Transaction Type',
    masterField: 'transactiontype',
    required:true,

  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
];

const checklistDetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'checklistgrid',
      isPrimeReactTable: true,
      editorProps:{
        isEditable:true,
    },
      columns: [
        {
          title: 'Checklist Group',
          dataField: 'CHECKLIST_GROUP',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
            masterField: 'CHECKLIST_GROUP',
          }
        },
       /* {
            title: 'Group Description',
            dataField: 'GROUP_DESCRIPTION',
            cellEditor: TableCellEditorType.TEXTBOX,
            hidden:true
          },*/
          {
            title: 'Checklist Id',
            dataField: 'CHECKLIST_ID',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required:true,
              maxLength:80,
            }
          },
          {
            title: 'Checklist Name',
            dataField: 'CHECKLIST_NAME',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:100
            }
          },
        ] 

    }    
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_CHECKLIST_CREATE_MST',
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
      serviceName: 'RCRM_CHECKLIST_ACTIVATE_MST',
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
      serviceName: 'RCRM_CHECKLIST_INACTIVATE_MST',
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
    serviceName: 'RCRM_CHECKLIST_INIT_MST',
    moduleName: CRM_MASTER,
    input: ['checklistcode']
 };
 

export const ManageChecklist:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();
  

    const initialData: IRFData = {
        checklistcode: code,

      };

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} scrollKey={props.scrollKey} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/> 
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6}  title={'General'} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={checklistDetailsSection}  title={'Checklist Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
