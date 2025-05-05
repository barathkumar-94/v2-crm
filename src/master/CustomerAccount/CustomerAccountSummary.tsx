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
// import { truncate } from 'lodash';

const searchInputs = ['customercode','customername','DateType','DateFrom','DateTo','industry','ownership','firstname','lastaname','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'customercode',
    label: 'Customer Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customername',
    label: 'Customer Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField:'industry'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'ownership',
    label: 'Ownership',
    masterField:'ownership'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastaname',
    label: 'Last Name',
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
  //   masterField:'status'
  // },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_CUSTOMER_ACCOUNT_SEARCH_SUM',
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
      value:'All'
    },
    label: 'Total Count',
    icon: 'images/icons/sum.svg',
    backgroundIcon: 'images/icons/bg-points.svg',
    className: 'total-count-icon-tile',
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_CUSTOMER_ACCOUNT_SEARCH_SUM',
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
      serviceName: 'RCRM_CUSTOMER_ACCOUNT_SEARCH_SUM',
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
      serviceName: 'RCRM_CUSTOMER_ACCOUNT_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerGrid',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
        {
            title: 'Customer Code',
            dataField: 'CUSTOMER_CODE',
            cellRenderer:TableCellRendererType.TEXT,
            cellRendererParams: {
              event: {
                linkTo: '/ManageCustomerAccount',
                queryParams:[{sourceField:'CUSTOMER_CODE', targetField:"code"},]
              },
            },
        },
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
      },
      {
        title: 'Industry',
        dataField: 'INDUSTRY',
      },
      {
        title: 'Ownership',
        dataField: 'OWNERSHIP',
      },
      {
        title: 'First Name',
        dataField: 'FIRST_NAME',
      },
      {
        title: 'Last Name',
        dataField: 'LAST_NAME',
      },
      {
        title: 'Mobile',
        dataField: 'MOBILE',
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
      label: 'Manage Customer Account',
      event: {
        linkTo: '/ManageCustomerAccount',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CUSTOMER_ACCOUNT_INIT_SUM',
  moduleName: CRM_MASTER,
};

export const CustomerAccountSummary:React.FC<IPageBaseProps> = (props) => {
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
