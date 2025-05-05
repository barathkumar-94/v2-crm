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
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
// import { truncate } from 'lodash';

const searchInputs = ['customercode','customername','status'];

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
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_LOI_CUSTOMER_SEARCH',
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
        title: 'Address',
        dataField: 'ADDRESS',
      },

      {
        title: 'Industry',
        dataField: 'INDUSTRY',
      },



    ],
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_LOI_CUSTOMER_INIT',
  moduleName: CRM_TRANSACTION,
};

export const LOICustomerHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} title={'Search Criteria'} />
        <RFSection controls={tableSection} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
