import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['checklistcode', 'description','DateType','DateFrom','DateTo', 'component','transactiontype','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'checklistcode',
    label: 'Checklist code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component',
    masterField: 'component',
    // event :{
    //   serviceName:'ONCHANGE_CHECKLIST_COMPONENT_SUM',
    //   moduleName :'CRM_Master',
    //   input:['component']
    //   },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'transactiontype',
    label: 'Transaction Type',
    masterField: 'transactiontype',
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
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'status',
  //   label: 'Status',
  //   masterField: 'status',
  // },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_CHECKLIST_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

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
      serviceName: 'RCRM_CHECKLIST_SEARCH_SUM',
      input: searchInputs,
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
      serviceName: 'RCRM_CHECKLIST_SEARCH_SUM',
      input: searchInputs,
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
      serviceName: 'RCRM_CHECKLIST_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const checklisttableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'checklistgrid',
    isPrimeReactTable: true, 
    pageSize:7,
    columns: [
      {
        title: 'Checklist Code',
        dataField: 'CHECKLIST_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManageChecklist',
            queryParams:[{sourceField:'CHECKLIST_CODE', targetField:"code"}]
          },
        },
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',

      },
      {
        title: 'Component',
        dataField: 'COMPONENT',
      },
      {
        title: 'Transaction Type',
        dataField: 'TRANSACTION_TYPE',
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
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Checklist',
      event: {
        linkTo: '/ManageChecklist',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CHECKLIST_INIT_SUM',
  moduleName: CRM_MASTER,
 // input: searchInputs,
};

export const ChecklistSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection}  columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={checklisttableSection} title={'Search Results'}  columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
