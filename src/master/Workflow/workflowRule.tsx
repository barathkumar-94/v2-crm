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
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import {WorkFlowHelp} from '../Workflow/workflowHelp';
import { CRM_MASTER, CRM_USER, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { usermasterHelp } from '../UserMaster/usermasterHelp';
import { WorkflowRuleBuilderModal } from './workflowRuleBuilder';


const onEnterEvent: IRFEventParams = {
    input: ['component'],
    moduleName: CRM_MASTER,
    serviceName: 'ONCHANGE_WORKFLOWRULE_COMPONENT',
  };

const baseInfoSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component',
    required: true,
    event:onEnterEvent
  }
];

const ruleTable: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'addBtn',
    label: 'Add Rule',
    isPrimary: true,
    iconName: 'CirclePlus',
    event: {
      openModal: true,
      modalProps: {
        title: 'Configure Workflow Rule',
        componentName: 'WorkflowRuleBuilderModal',
        sendParams:[{parentSource:'page',parentField:'component',childField:'component'}]
      },
    },
    className:'text-right'
    //className:'workflow-rule-add-btn'
  },
  {
    type: ControlType.TABLE,
    name: 'workFlowRuleDetails',
    isPrimeReactTable: true,
    excelExport:false,
    columns: [
      {
        title: 'Priority',
        dataField: 'priority'
      },
      {
        title: 'WorkFlow Name',
        dataField: 'workFlowCode'
      },
      {
        dataField: 'effectiveFrom',
        title: 'Effective From',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
            format:DATE_FORMAT
        }
      },
      {
        dataField: 'effectiveTo',
        title: 'Effective To',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
            format:DATE_FORMAT
        }

      },
      {
        title: 'Rule Name',
        dataField: 'ruleName',
      },
      {
        title: 'Rule',
        dataField: 'rule_query',
      },

      {
        title: 'Action',
        dataField: null,
        cellRenderer: TableCellRendererType.DYNAMIC_CONTROL,
        conditionalControls: [
          {
            canRenderControl: () => true,
            control: {
              dataField: null,
              cellRenderer: TableCellRendererType.BUTTON,
              cellClass:'cell-icon-park-icon-single mr-1',
              cellRendererParams: {
                iconName: 'Edit',
                iconTooltipText:'Edit Rule',
                event: {
                  getEventProps: (rowData, pageData) => {
                    return {
                      openModal: true,
                      modalProps: {
                        title: 'Configure Workflow Rule',
                        componentName: 'WorkflowRuleBuilderModal',
                        sendParams: [{customData: {...rowData,component:pageData.component}}],
                      },
                    };
                  },
                },
              },
            },
          },
          {
            canRenderControl: () => true,
            control: {
              dataField: null,
              cellRenderer: TableCellRendererType.BUTTON,
              cellClass:'cell-icon-park-icon-single',
              cellRendererParams: {
                iconName: 'Delete',
                iconTooltipText:'Delete Rule',
                event: {
                  moduleName: CRM_MASTER,
                  serviceName: 'DELETE_ELIGIBILITY_RULE',
                  input: ['ruleId'],
                  confirmationDialog:{
                    message:'Are you sure you want to delete this rule?'
                  },
                  deleteRow: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
];

const actionBarInputs = [
    'component', 
    'workFlowRuleDetails'   
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
      input: actionBarInputs,
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
      input: actionBarInputs,
    },
  },
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'inactivate',
    label: 'Inactivate',
    event: {
      serviceName: 'INACTIVATE_WORKFLOW',
      moduleName: CRM_MASTER,
      input: actionBarInputs,
    },
  },
];

const helpComponents = {
    workflowHelp: WorkFlowHelp,
    usermasterHelp: usermasterHelp,
    WorkflowRuleBuilderModal: WorkflowRuleBuilderModal
};

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_WORKFLOW_RULE',
  moduleName: CRM_MASTER,
  input: [],
};



export const WorkFlowRule:React.FC<IPageBaseProps> = (props) => {
  const {code} = usePageQueryParam();
  const initialData: IRFData = {
    workFlowCode: code
    };
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={baseInfoSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={ruleTable} title={'Workflow Rule Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};