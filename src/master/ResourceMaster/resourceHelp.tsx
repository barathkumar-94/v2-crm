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

const searchInputs = ['resourceid', 'firstname', 'lastname','mobile','email','organization','status'];

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
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_RESOURCE_SUM',
      input: searchInputs,
    },
  },
];


const resourceSummary: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'resourcesummary',
    isHelpTable: true,
    pageSize:5,
    columns: [
      {
        title: 'Resource ID',
        dataField: 'RESOURCE_ID',
        cellRenderer:TableCellRendererType.TEXT,
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



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_RESOURCE_INIT_SUM',
  moduleName: CRM_MASTER,
 input: searchInputs,
};

export const resourceHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} title={'Search Criteria'} columns={6} />
        <RFSection controls={resourceSummary} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
