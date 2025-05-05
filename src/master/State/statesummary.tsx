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

const searchInputs = ['statecode', 'statename','DateType','DateFrom','DateTo', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'statecode',
    label: 'State Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'statename',
    label: 'State Name',
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
      serviceName: 'SEARCH_STATE_SUM',
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
      serviceName: 'SEARCH_STATE_SUM',
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
      serviceName: 'SEARCH_STATE_SUM',
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
      serviceName: 'SEARCH_STATE_SUM',
      input: searchInputs
    },
  },
];

const stateSummarytableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'statesummary',
    isPrimeReactTable: true, 
    pageSize:7,
    columns: [
      {
        title: 'State Code',
        dataField: 'STATE_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/managestate',
            queryParams:[{sourceField:'STATE_CODE', targetField:"code"}]
          },
        },
      },
      {
        title: 'State Name',
        dataField: 'STATE_NAME',

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
      name: 'manageState',
      isPrimary: true,
      label: 'Manage State',
      event: {
        linkTo: '/managestate',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_STATE_SUM',
  moduleName: CRM_MASTER,
 // input: searchInputs,
};

export const StateSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={stateSummarytableSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
