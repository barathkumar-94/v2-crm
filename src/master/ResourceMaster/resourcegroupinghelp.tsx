import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { resourceHelp } from './resourceHelp';

const searchInputs = ['groupname'];


const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'groupname',
    label: 'Group Name',
    masterField: 'groupname'
  }
];
const resourceGrouping: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'resourcegrouping',
    isHelpTable: true, 
    columns: [
      {
        title: 'Resource ID',
        dataField: 'resourceids',
        
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
   serviceName: 'RCRM_RESOURCE_GROUPING_INIT',
  moduleName: CRM_MASTER,
 input: ['groupname'],
};

export const resourcegroupinghelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} >
       <RFCRMToolbar hasBackButton/> 
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={resourceGrouping} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
