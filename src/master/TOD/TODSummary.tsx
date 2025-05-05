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
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_MASTER, HH_MM } from '../../common/constants';

const searchInputs = ['TODCode', 'TODName','DateType','DateFrom','DateTo', 'tod_type','state','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'TODCode',
    label: 'TOD Code',

  },
  {
    type: ControlType.TEXTBOX,
    name: 'TODName',
    label: 'TOD Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField: 'state',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'tod_type',
    label: 'TOD Type',
    masterField: 'tod_type',
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
      serviceName: 'SEARCH_TOD_SUM',
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
      serviceName: 'SEARCH_TOD_SUM',
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
      serviceName: 'SEARCH_TOD_SUM',
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
      serviceName: 'SEARCH_TOD_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todgrid',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManageTod',
            queryParams:[{sourceField:'TOD_CODE', targetField:"code"},

            ],
          },
        },
        
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'State',
        dataField: 'STATE',
      },
      {
        title: 'TOD Type',
        dataField: 'TOD_TYPE',
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
      label: 'Manage TOD',
      event: {
        linkTo: '/ManageTod',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_TOD_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const TODSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls ={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
