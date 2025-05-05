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

const searchInputs = ['resourceid', 'firstname', 'lastname','mobile','email','organization','DateType','DateFrom','DateTo','status','resourcesummary'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'resourceid',
    label: 'Resource ID',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastname',
    label: 'Last Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'email',
    label: 'Email',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'organization',
    label: 'Organization',
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
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_RESOURCE_SEARCH_SUM',
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
      serviceName: 'RCRM_RESOURCE_SEARCH_SUM',
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
      serviceName: 'RCRM_RESOURCE_SEARCH_SUM',
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
      serviceName: 'RCRM_RESOURCE_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const resourceSummary: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'resourcesummary',
    isPrimeReactTable: true, 
    pageSize:7,
    columns: [
      {
        title: 'Resource ID',
        dataField: 'RESOURCE_ID',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/manageresource',
            queryParams:[{sourceField:'RESOURCE_ID', targetField:"id"}]
          },
          
        },
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
        title: 'Phone',
        dataField: 'PHONE',

      },
      {
        title: 'Email',
        dataField: 'EMAIL',

      },
      {
        title: 'Organization',
        dataField: 'ORGANIZATION',

      },
      {
        title: 'Department',
        dataField: 'DEPARTMENT',

      },
      {
        title: 'Designation',
        dataField: 'DESIGNATION',

      },
      {
        title: 'System User ID',
        dataField: 'SYSTEM_USER_ID',

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
      name: 'manageResource',
      isPrimary: true,
      label: 'Manage Resource',
      event: {
        linkTo: '/manageresource',
      },
    },
    {
        type: ControlType.BUTTON,
        name: 'resourceGrouping',
        isPrimary: true,
        label: 'Resource Grouping',
        event: {
          linkTo: '/resourcegrouping',
        },
      },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_RESOURCE_INIT_SUM',
  moduleName: CRM_MASTER,
 input: searchInputs,
};

export const ResourceSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={resourceSummary} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
