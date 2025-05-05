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
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_LOI_PAY_TERM_SEARCH',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'Paytermgrid',
    isHelpTable: true,
    pageSize:5,
    columns: [
      {
        title: 'Pay Term Code',
        dataField: 'PAY_TERM_CODE',
        
      },
      {
        title: 'Pay Term Description',
        dataField: 'DESCRIPTION',
    
    },
      {
        title: 'Due Days',
        dataField: 'DUE_DAYS',
        
      },
      {
        title: 'Penalty Type',
        dataField: 'PENALTY_TYPE',
      },
      {
        title: 'Penalty',
        dataField: 'PENALTY_PER',
      },
      {
        title: 'Grace Days',
        dataField: 'GRACE_DAYS',
      },
      {
        title: 'Rebate Days',
        dataField: 'REBATE_DAYS',
      },
      {
        title: 'Rebate_type',
        dataField: 'REBATE_TYPE',
      },
      { 
        title: 'Rebate',
        dataField: 'REBATE_PER'
      },
      {
        title: 'Status',
        dataField: 'STATUS',
        
      },

    ],
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_LOI_PAY_TERM_INIT',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};

export const LOIPayTermHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
