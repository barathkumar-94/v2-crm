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

const searchInputs = ['PayTermCode', 'Description', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'PayTermCode',
    label: 'Pay Term Code'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
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
      serviceName: 'RCRM_SEARCH_PAYTERM_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'Paytermgrid',
    isHelpTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Pay Term Code',
        dataField: 'PAY_TERM_CODE',
        
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
    
    },
      {
        title: 'Due Days',
        dataField: 'DUE_DAYS',
        
      },
      {
        title: 'Penalty %',
        dataField: 'PENALTY_%',
        
      },
      {
        title: 'Rebate Days',
        dataField: 'REBATE_DAYS',
        
      },
      {
        title: 'Rebate %',
        dataField: 'REBATE_%',
        
      },
      {
        title: 'Status',
        dataField: 'STATUS',
        
      },

    ],
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_PAY_TERM_INIT_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const PayTermHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
