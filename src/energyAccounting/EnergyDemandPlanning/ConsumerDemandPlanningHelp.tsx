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
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';

const searchInputs = ['generation_year','generation_period', 'date','customer_name','htsc','consumerEnergyDataGrid'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generation_year',
    label: 'Generation Year',
    masterField:'generation_year'
  },
    {
        type: ControlType.COMBOBOX,
        name: 'generation_period',
        label: 'Generation Period',
        masterField:'generation_period'
      },
    {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customer_name',
    label: 'Customer Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'htsc',
    label: 'HTSC #',
    masterField:'htsc'
  },
  
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_ENERGY_DEMAND_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  
  
  {
    type: ControlType.TABLE,
    name: 'consumerEnergyDataGrid',
    isHelpTable: true,
    columns: [
      {
        title: 'ID',
        dataField: 'ID',
        
        
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
        cellRenderer:TableCellRendererType.TEXT,
         
      },
      {
        title: 'Generation Year',
        dataField: 'GENERATION_YEAR',
        
      },
     
      {
        title: 'Request Date',
        dataField: 'REQUEST_DATE',
        
    },
      
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        
      },
      {
        title: 'HTSC #',
        dataField: 'HT_SC',
         
      },
      {
        title: 'PPA #',
        dataField: 'PPA',
        
      },
      {
        title: 'UOM',
        dataField: 'UOM',
        
      },
      {
        title: 'Total Units Planned',
        dataField: 'TOTAL_UNITS_PLANNED',
        
      },
      {
        title: 'Units as per PPA',
        dataField: 'UNITS_AS_PER_PPA',
        
      },
      {
        title: 'Actual Allocation',
        dataField: 'ACTUAL_ALLOCATION',
        
      },
      {
        title: 'Variance%',
        dataField: 'VARIANCE',
        
      },
    ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_CONSUMER_ENERGY_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: searchInputs,
};

export const ConsumerDemandPlanningHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        {/* <RFSection controls={tileSection} columns={3} transparent /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
