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
import { RFCRMToolbar } from '../../common/components/toolbar';
// import { truncate } from 'lodash';

const searchInputs = ['generationperiod','date','customername','htsc'];

const searchSection: IControlDefinition[] = [
    {
        type: ControlType.COMBOBOX,
        name: 'generationperiod',
        label: 'Generation Period',
        masterField:'site'
    },
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customername',
    label: 'Customer Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'htsc',
    label: 'HTSC',
    
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_CONSUMER_MONTHLY_METER_SUM',
      input: searchInputs,
    },
  },
];

1
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'MonthlyMeterGrid',
    isPrimeReactTable: true,
    columns: [
        {
            title: 'Generation Period',
            dataField: 'GENERATION_PERIOD',
            
        },
      {
        title: 'Date',
        dataField: 'DATE',
      },
      {
        title: 'ID',
        dataField: 'ID',
      },
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
      },
      {
        title: 'HTSC',
        dataField: 'HTSC',
      },
      {
        title: 'Net Reading(KWH)',
        dataField: 'netreadingkw',
      },
      
    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Monthly Meter Entry',
      event: {
        linkTo: '/ManageConsumerMonthlyMeter',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_CONSUMER_MONTHLY_METER_SUM',
  moduleName: CRM_MASTER,
};

export const ConsumerMonthlyMeterSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tableSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
