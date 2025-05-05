import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { TableToolbarRenderer } from '@retina360-ai/core-ui-library-v2';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['sitecode', 'sitename', 'DateType','DateFrom','DateTo','sitecategory', 'siteoverallcapacity',  'stage', 'status','creditrating '];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sitecode',
    label: 'Site Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sitename',
    label: 'Site Name',
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'sitecategory',
    label: 'Site Category',
    masterField: 'sitecategory',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'siteoverallcapacity',
    label: 'Site Overall Capacity',
    inputType:'number'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'stage',
    label: 'Stage',
    masterField: 'stage',
  },
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'status',
  //   label: 'Status',
  //   masterField: 'status',
  // },
  {
    type: ControlType.HIDDEN,
    name: 'creditrating',
    label: 'creditrating',  
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
      serviceName: 'SEARCH_SITE_SUM',
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
      serviceName: 'SEARCH_SITE_SUM',
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
      serviceName: 'SEARCH_SITE_SUM',
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
      serviceName: 'SEARCH_SITE_SUM',
      input: searchInputs
    },
  },
];

const siteSummarytableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'sitesummary',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Site Code',
        dataField: 'SITE_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/managesite',
            queryParams:[{sourceField:'SITE_CODE',targetField:'code'},
            {sourceField:'SITE_NAME',targetField:'name'},
          ],
          },
        },
      },
      {
        title: 'Site Name',
        dataField: 'SITE_NAME',
      },
      {
        title: 'Site Category',
        dataField: 'SITE_CATEGORY',
      },
      {
        title: 'Site Overall Capacity',
        dataField: 'SITE_OVERALL_CAPACITY',
      },
      {
        title: 'UOM',
        dataField: 'UOM',
      },
      {
        title: 'Stage',
        dataField: 'STAGE',
      },
      {
        title: 'State',
        dataField: 'STATE',
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
      name: 'managesite',
      isPrimary: true,
      label: 'Manage Site',
      event: {
        linkTo: '/managesite',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_SITE_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const SiteSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={siteSummarytableSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
