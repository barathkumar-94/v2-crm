import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  RFTabs,
  RFTabItem,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import {IPageBaseProps} from '../../common/objects';
import {CRM_USER} from '../../common/constants';
import {RFCRMToolbar} from "../../common/components/toolbar";

const searchInputs = ['templateCode', 'templateDescription', 'templateType','DateType','DateFrom','DateTo','status'];

const searchSection: IControlDefinition[] = [
    {
      type: ControlType.TEXTBOX,
      name: 'templateCode',
      label: 'Template Code'
    },
    {
      type: ControlType.TEXTBOX,
      name: 'templateDescription',
      label: 'Template Description'
    },
    {
      type: ControlType.COMBOBOX,
      name: 'templateType',
      label: 'Template Type'
    },   
    {
      type: ControlType.COMBOBOX,
      name: 'status',
      label: 'Status'
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
          moduleName: 'CRM_Master',
          serviceName: 'RCRM_TEMPLATE_BUILDER_SEARCH_SUM',
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
        moduleName: 'CRM_Master',
        serviceName: 'RCRM_TEMPLATE_BUILDER_SEARCH_SUM',
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
        moduleName: 'CRM_Master',
        serviceName: 'RCRM_TEMPLATE_BUILDER_SEARCH_SUM',
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
      moduleName: 'CRM_Master',
      serviceName: 'RCRM_TEMPLATE_BUILDER_SEARCH_SUM',
      input: searchInputs
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'TEMPLATE_GRID',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'Template Code',
        dataField: 'TEMPLATE_CODE',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/TemplateBuilder',
            queryParams: [
              {sourceField: 'TEMPLATE_CODE', targetField: 'templateCode'}
            ],
          },
        },
      },
      {
        title: 'Template Description',
        dataField: 'TEMPLATE_DESC',
       
      },
      {
        title: 'Template Type',
        dataField: 'TEMPLATE_TYPE',
       
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
    label: 'Manage Template Builder',
    event: {
      linkTo: '/TemplateBuilder',
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_TEMPLATE_BUILDER_INIT_SUM',
  moduleName: 'CRM_Master',
};

export const TemplateBuilderSummary: React.FC<IPageBaseProps> = (props) => {
  const initialData = {
  };

  return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
