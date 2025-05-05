import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER } from '../../common/constants';
// import { truncate } from 'lodash';

const searchInputs = ['customercode','customername','industry','ownership','firstname','lastaname','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'customercode',
    label: 'Customer Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customername',
    label: 'Customer Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField:'industry'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'ownership',
    label: 'Ownership',
    masterField:'ownership'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastaname',
    label: 'Last Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField:'status'
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_CUSTOMER_ACCOUNT_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerGrid',
    isHelpTable: true,
    pageSize:5,
    columns: [
     {
            title: 'Customer Code',
            dataField: 'CUSTOMER_CODE',
            
    },
    {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
    },
      {
        title: 'Industry',
        dataField: 'INDUSTRY',
      },
      {
        title: 'Ownership',
        dataField: 'OWNERSHIP',
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
        title: 'Status',
        dataField: 'STATUS',
      },
      {
        title: 'Address',
        dataField: 'ADDRESS',
        hidden:true,
      },
    ],
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CUSTOMER_ACCOUNT_INIT_SUM',
  moduleName: CRM_MASTER,
};

export const CustomerAccountHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} title={'Search Criteria'} />
        <RFSection controls={tableSection} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
