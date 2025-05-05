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
import { CRM_MASTER, DATE_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['FinancialYearCode', 'Description','DateType','DateFrom','DateTo','Status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'FinancialYearCode',
    label: 'Financial Year Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
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
  //   name: 'Status',
  //   label: 'Status',
  // },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_MASTER,
      serviceName: 'RCRM_FIN_PERIOD_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const tileSection: IControlDefinition[] = [
  {
    type: ControlType.ICON_METRIC_TILE,
    name: 'totalCount',
    data:{
      field:'Status',
      value:'ALL'
    },
    label: 'Total Count',
    icon: 'images/icons/sum.svg',
    backgroundIcon: 'images/icons/bg-points.svg',
    className: 'total-count-icon-tile',
    event: {
      moduleName:CRM_MASTER,
      serviceName: 'RCRM_FIN_PERIOD_SEARCH_SUM',
      input: searchInputs,
    },
  },
  {
    type: ControlType.ICON_METRIC_TILE,
    name: 'activeCount',
    data:{
      field:'Status',
      value:'ACTIVE'
    },
    label: 'Active Count',
    icon: 'images/icons/active.svg',
    backgroundIcon: 'images/icons/bg-circle.svg',
    className: 'active-count-icon-tile',
    event: {
      moduleName:CRM_MASTER,
      serviceName: 'RCRM_FIN_PERIOD_SEARCH_SUM',
      input: searchInputs,
    },
  },
  {
    type: ControlType.ICON_METRIC_TILE,
    name: 'inactiveCount',
    data:{
      field:'Status',
      value:'INACTIVE'
    },
    label: 'Inactive Count',
    icon: 'images/icons/inactive.svg',
    backgroundIcon: 'images/icons/bg-square.svg',
    className: 'inactive-count-icon-tile',
    event: {
      moduleName:CRM_MASTER,
      serviceName: 'RCRM_FIN_PERIOD_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'finyeargrid',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Financial Year Code',
        dataField: 'FINANCIAL_YEAR_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManageFinancialYearPeriod',
            queryParams:[{sourceField:'FINANCIAL_YEAR_CODE', targetField:"code"}]
          },
        },
      },
      
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'Start Date',
        dataField: 'START_DATE',
        dataType:'dateTime',
cellRenderer:TableCellRendererType.TEXT,
cellRendererParams:{
format:DATE_FORMAT
}
      },
      {
        title: 'End Date',
        dataField: 'END_DATE',
        dataType:'dateTime',
cellRenderer:TableCellRendererType.TEXT,
cellRendererParams:{
format:DATE_FORMAT
}
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
      label: 'Manage Financial Year/Period',
      event: {
        linkTo: '/ManageFinancialYearPeriod',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_FIN_PERIOD_INIT_SUM',
  moduleName: CRM_MASTER,
};

export const FinancialYearPeriodSummary:React.FC<IPageBaseProps> = (props) => {

  
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
