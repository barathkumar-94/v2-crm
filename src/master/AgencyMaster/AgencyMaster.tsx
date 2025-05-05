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
import styled from 'styled-components';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['AgencyCode','AgencyName','DateType','DateFrom','DateTo','AgencyType','state','district', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'AgencyCode',
    label: 'Agency Code',
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'AgencyName',
    label: 'Agency Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'AgencyType',
    label: 'Agency Type',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
   
    masterField:'state',
    event :{
      serviceName:'ONCHANGE_STATE_SUM',
      moduleName :'CRM_Master',
      input:['state']
      },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'district',
    label: 'District',
   // required:true,
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
    className:'widget-title',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_AGENCY_MASTER',
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
      serviceName: 'SEARCH_AGENCY_MASTER',
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
      serviceName: 'SEARCH_AGENCY_MASTER',
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
      serviceName: 'SEARCH_AGENCY_MASTER',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'agencymastersummary',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Agency Code',
        dataField: 'AgencyCode',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManageAgency',
            queryParams:[{sourceField:'AgencyCode', targetField:"code"}]
          },
        },
      },
      {
        title: 'Agency Name ',
        dataField: 'AgencyName',
        
      },
      {
        title: 'Agency Type',
        dataField: 'AgencyType',
      },
      {
        title: 'State',
        dataField: 'state',
      },
      {
        title: 'District',
        dataField: 'district',
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
      label: 'Manage Agency',
      event: {
        linkTo: '/ManageAgency',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_AGENCY_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const AgencyMaster:React.FC<IPageBaseProps> = (props) => {
  return (
  //  <StyleContainer>
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  // </StyleContainer>
  );
};

// const StyleContainer = styled.div`
//   .cRPGyD .container-widget > .widget-header .widget-title {
//     font-weight: bold !important;
//   }
// `;