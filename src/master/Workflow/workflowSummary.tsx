import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFScreenToolbar,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  WithConfiguratorPageContainer,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';import { CRM_MASTER } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
; 

const searchInputs = ['workFlowCode','workFlowName','component','DateType','DateFrom','DateTo','status'];
const tileSection: IControlDefinition[] = [
  {
    type: ControlType.ICON_METRIC_TILE,
    name: 'totalCount',
    data:{
      field:'status',
      value:'ALL'
    },
    label: 'Total Count',
    icon: 'images/icons/sum.svg',
    backgroundIcon: 'images/icons/bg-points.svg',
    className: 'total-count-icon-tile',
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_WORKFLOW_SUM',
      input: searchInputs
    },
  },
  {
    type: ControlType.ICON_METRIC_TILE,
    name: 'activeCount',
    data:{
      field:'status',
      value:'ACTIVE'
    },
    label: 'Active Count',
    icon: 'images/icons/active.svg',
    backgroundIcon: 'images/icons/bg-circle.svg',
    className: 'active-count-icon-tile',
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_WORKFLOW_SUM',
      input: searchInputs
    },
  },
  {
    type: ControlType.ICON_METRIC_TILE,
    name: 'inactiveCount',
    data:{
      field:'status',
      value:'INACTIVE'
    },
    label: 'Inactive Count',
    icon: 'images/icons/inactive.svg',
    backgroundIcon: 'images/icons/bg-square.svg',
    className: 'inactive-count-icon-tile',
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_WORKFLOW_SUM',
      input: searchInputs
    },
  },
];
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'workFlowCode',
    label: 'Workflow Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'workFlowName',
    label: 'Workflow Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'DateType',
    label: 'Date Type',
    masterField :'DateType'
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateFrom',
    label: 'Date From',
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'DateTo'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateTo',
    label: 'Date To',
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateFrom'
    }
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_MASTER,
      serviceName: 'SEARCH_WORKFLOW_SUM',
      input: searchInputs, 
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'workflowSummary',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Workflow Code',
        dataField: 'WORKFLOW_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/manageWorkflow',
           // linkParams: ['WORKFLOW_CODE'],
           queryParams:[{sourceField:'WORKFLOW_CODE', targetField:"code"}]
          
          },
        },
      },
   
      
      {
        title: 'Workflow Name',
        dataField: 'WORKFLOW_NAME',
      },
      {
        title: 'Component',
        dataField: 'COMPONENT',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
    ],
  },
];

const toolbarControls: IControlDefinition[] = [

  {
    type: ControlType.BUTTON,
    name: 'managebtn1',
    isPrimary: true,
    label: 'Workflow Access',
    event: {
      linkTo: '/workflowAccess',
    },
  },
  {
    type: ControlType.BUTTON,
    name: 'managebtn',
    isPrimary: true,
    label: 'Manage Workflow',
    event: {
      linkTo: '/manageWorkflow',
    },
  },
  {
    type: ControlType.BUTTON,
    name: 'managebtn2',
    isPrimary: true,
    label: 'Workflow Rule',
    event: {
      linkTo: '/workflowRule',
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_WORKFLOW_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const WorkFlowSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection} />
      <ScrollabeContainer hasHeader={true}>
      <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};