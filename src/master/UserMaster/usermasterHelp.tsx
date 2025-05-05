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
import { CRM_USER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['userid', 'firstname', 'lastname','mobile','email','organization','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'userid',
    label: 'User ID',
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastname',
    label: 'Last Name',
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
    inputType:"number",
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'email',
    label: 'Email',
    inputType:"email",

    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'organization',
    label: 'Organization',
    // required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField: 'status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_USER,
      serviceName: 'SEARCH_USER_MST',
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
      serviceName: 'SEARCH_USER_MST',
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
      moduleName: CRM_USER,
      serviceName: 'SEARCH_USER_MST',
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
      moduleName: CRM_USER,
      serviceName: 'SEARCH_USER_MST',
      input: searchInputs
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'usermastergridsummary',
    isHelpTable: true,
    columns: [
      {
        title: 'User ID',
        dataField: 'USER_ID',
       
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
      label: 'Manage User',
      event: {
        linkTo: '/ManageUser',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_USER_SUM',
  moduleName: CRM_USER,
  // input: searchInputs,
};

export const usermasterHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams}>
      <RFSection controls={searchSection} />
   <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
    </RetinaFormBuilder>
  );
};
