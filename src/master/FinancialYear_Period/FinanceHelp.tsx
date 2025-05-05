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
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['FinancialYearCode', 'Description','Status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'FinancialYearCode',
    label: 'Financial Year Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Status',
    label: 'Status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_MASTER,
      serviceName: 'RCRM_SEARCH_FIN_PERIOD_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'finyeargrid',
    isHelpTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Financial Year Code',
        dataField: 'FINANCIAL_YEAR_CODE',
       
      },
      
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'Start Date',
        dataField: 'START_DATE',
      },
      {
        title: 'End Date',
        dataField: 'END_DATE',
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
      label: 'Manage Financial Year/Period',
      event: {
        linkTo: '/ManageFinancialYearPeriod',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_FIN_PERIOD_INIT_SUM',
  moduleName: CRM_MASTER,
};

export const FinancialYearHelp:React.FC<IPageBaseProps> = (props) => {

  
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
     <RFSection  controls={searchSection} columns={6} />
     <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      
    </RetinaFormBuilder>
  );
};
