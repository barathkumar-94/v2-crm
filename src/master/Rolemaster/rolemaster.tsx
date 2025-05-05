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

const searchInputs = ['roleid', 'rolename', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'roleid',
    label: 'Role ID',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'rolename',
    label: 'Role Name',
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
      moduleName: CRM_USER,
      serviceName: 'SEARCH_ROLE_SUM',
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
      moduleName: CRM_USER,
      serviceName: 'SEARCH_ROLE_SUM',
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
      moduleName: CRM_USER,
      serviceName: 'SEARCH_ROLE_SUM',
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
      moduleName: CRM_USER,
      serviceName: 'SEARCH_ROLE_SUM',
      input: searchInputs
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'rolemastergrid',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'Role ID',
        dataField: 'ROLE_ID',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/managerole',
            queryParams: [
              {sourceField: 'ROLE_ID', targetField: 'id'},
              {sourceField: 'ROLE_NAME', targetField: 'name'},
            ],
          },
        },
      },
      {
        title: 'Role Name',
        dataField: 'ROLE_NAME',
       
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
    label: 'Manage Role',
    event: {
      linkTo: '/managerole',
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_ROLE_SUM',
  moduleName: CRM_USER,
  // input: searchInputs,
};

export const RoleMaster: React.FC<IPageBaseProps> = (props) => {
  const initialData = {
    // totalCount: 20,
    // activeCount: 10,
    // inactiveCount: 10,
    // selectedTile: 'totalCount',
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
