import * as React from 'react';
import {
  ScrollabeContainer,
  RFActionBar,
  RetinaFormBuilder,
  IControlDefinition,
  IRFEventParams,
  ControlType,
  TableCellEditorType,
  IRFData, 
  RFSection,
  RFScreenToolbar,
  WithConfiguratorPageContainer,
  usePageQueryParam,
} from '@retina360-ai/core-ui-library-v2';;
import {WorkFlowHelp} from '../Workflow/workflowHelp';
import { CRM_MASTER, CRM_USER, DATE_TIME_FORMAT } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { usermasterHelp } from '../UserMaster/usermasterHelp';


const onEnterEvent: IRFEventParams = {
    input: ['workFlowCode'],
    moduleName: CRM_MASTER,
    serviceName: 'ONENTER_WORKFLOW',
  };

const baseInfoSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'workFlowCode',
    label: 'Workflow Code',
    required: true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Workflow',
      componentName: 'workflowHelp',
      receiveParams: [{parentField: 'workFlowCode', childField: 'WORKFLOW_CODE'}],
      event: onEnterEvent,
    },
  },
  {
    type: ControlType.TEXTBOX,
    name: 'workFlowName',
    label: 'Workflow Name',
    required: true,
    maxLength:100
  },
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component',
    required: true,
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
    name: 'workFlowStateDetails',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
      hideAdd:false,
      hideDelete:false,
  },
    columns: [
   
      {
        title: 'Level',
        dataField: 'LEVEL',
        cellEditor: TableCellEditorType.TEXTBOX,
   
        cellEditorParams:{
          inputType:'integer',
          required:true,
        }
      },
      /*
      {
        title: 'Status Code',
        dataField: 'STATUS_CODE',
        cellEditor: TableCellEditorType.TEXTBOX,
      },
      */
      {
        title: 'Approval Status',
        dataField: 'APPROVAL_STATUS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
            required:true,
        }
      },
      {

        title: 'Workflow Group',
        dataField: 'WORKFLOW_GROUP',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'WORKFLOW_GROUP',
          required:true,
        }

      },
      /*
      {
        title: 'User',
        dataField: 'USER_ID',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required: true,
          help: {
            panelTitle: 'Help On User Master',
            componentName: 'usermasterHelp',
            receiveParams: [
              {parentField: 'USER_ID', childField: 'USER_ID'},
            ]
          },
        },
      },
      */
    ],
  },
];

const actionInputs = [
    'workFlowCode', 
    'workFlowName', 
    'component', 
    'status',
    'workFlowStateDetails'   
];

const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {
      serviceName: 'CREATE_WORKFLOW',
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
      serviceName: 'ACTIVATE_WORKFLOW',
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
      serviceName: 'INACTIVATE_WORKFLOW',
      moduleName: CRM_MASTER,
      input: [...actionInputs],
    },
  },
];

const helpComponents = {
    workflowHelp: WorkFlowHelp,
    usermasterHelp: usermasterHelp,
  
};

const DataSection: IControlDefinition[] = [

   
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
    format:DATE_TIME_FORMAT,
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
    format:DATE_TIME_FORMAT,
  },
  {
    type: ControlType.LABEL,
    name: 'strModifiedBy',
    isStatic: false,
    prefixText: 'Modified By : ',
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_WORKFLOW',
  moduleName: CRM_MASTER,
  input: ['workFlowCode'],
};



export const ManageWorkFlow:React.FC<IPageBaseProps> = (props) => {
  const {code} = usePageQueryParam();
  const initialData: IRFData = {
    workFlowCode: code
    };
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={baseInfoSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={tableSection} title={'Workflow State Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};