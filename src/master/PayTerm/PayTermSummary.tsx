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
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['PayTermCode', 'Description', 'status','Unit','Nature','DateType','DateFrom','DateTo','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'PayTermCode',
    label: 'Pay Term Code'
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
      serviceName: 'RCRM_SEARCH_PAYTERM_SUM',
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
      serviceName: 'RCRM_SEARCH_PAYTERM_SUM',
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
      serviceName: 'RCRM_SEARCH_PAYTERM_SUM',
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
      serviceName: 'RCRM_SEARCH_PAYTERM_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'Paytermgrid',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Pay Term Code',
        dataField: 'PAY_TERM_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/managepayterm',
            queryParams:[{sourceField:'PAY_TERM_CODE', targetField:"code"}]
        },
      },
        
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
        
    },
      {
        title: 'Due Days',
        dataField: 'DUE_DAYS',
        
      },
      {
        title: 'Penalty ',
        dataField: 'PENALTY_%',
        
      },
      {
        title: 'Rebate Days',
        dataField: 'REBATE_DAYS',
        
      },
      {
        title: 'Rebate ',
        dataField: 'REBATE_%',
        
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
    //   iconName:'Circleplus',
      label: 'Manage Pay Term',
      event: {
        linkTo: '/managepayterm',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_PAY_TERM_INIT_SUM',
  moduleName: CRM_MASTER,
  // input: searchInputs,
};

export const PayTermSummary:React.FC<IPageBaseProps> = (props) => {
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
