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
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['sbucode', 'sbuname', 'state','DateType','DateFrom','DateTo','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sbucode',
    label: 'SBU Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sbuname',
    label: 'SBU Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField: 'state',
  },
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'status',
  //   label: 'Status',
  //   masterField: 'status',
  // },
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
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_SBU_SUM',
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
      serviceName: 'SEARCH_SBU_SUM',
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
      serviceName: 'SEARCH_SBU_SUM',
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
      serviceName: 'SEARCH_SBU_SUM',
      input: searchInputs
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'sbusummary',
    isPrimeReactTable: true,
    pageSize:7,

    columns: [
      {
        title: 'SBU Code',
        dataField: 'SBU_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManageSBU',
            queryParams:[{sourceField:'SBU_CODE', targetField:"code"}]
          },
        },
      },
      {
        title: 'SBU Name',
        dataField: 'SBU_NAME',
      },
      // {
      //   title: 'State',
      //   dataField: 'STATE',
      // },

      {
        title: 'Registered Company Name',
        dataField: 'REGISTERED_COMPANY_NAME',
      },
      {
        title: 'CIN',
        dataField: 'CIN',
      },
      {
        title: 'PAN',
        dataField: 'PAN',
      },
      {
        title: 'GST',
        dataField: 'GST',
      },
      {
        title: 'HSN Code',
        dataField: 'HSN_CODE',
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
      name: 'manageSBU',
      isPrimary: true,
      label: 'Manage SBU',
      event: {
        linkTo: '/ManageSBU',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_SBU_SUMMARY',
  moduleName: CRM_MASTER,

};

export const SBUSummary:React.FC<IPageBaseProps> = (props) => {
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
