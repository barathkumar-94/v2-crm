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
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';

const searchInputs = ['generationyear','generationPeriod', 'customer_name','htsc','status','consumerCreditDataGrid'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_SUMMARY_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationyear']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationPeriod',
    label: 'Generation Period',
    masterField:'generationPeriod'
  },
{
type: ControlType.TEXTBOX,
name: 'customer_name',
label: 'Customer Name',
},
{
type: ControlType.COMBOBOX,
name: 'htsc',
label: 'HT SC #',
masterField:'htsc'
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
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_CONSUMER_CREDIT_DATA_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  
  
  {
    type: ControlType.TABLE,
    name: 'consumerCreditDataGrid',
    isHelpTable: true,
    columns: [
      {
        title: 'ID',
        dataField: 'ID',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ConsumerCreditData',
            queryParams:[{sourceField:'ID', targetField:"id"}]
        },
      },
        
      },
      {
        title: 'Generation Year',
        dataField: 'GENERATION_YEAR',
        
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
        cellRenderer:TableCellRendererType.TEXT,
         
      },
      {
        title: 'Date',
        dataField: 'DATE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        } 
    },
      
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        
      },
      {
        title: 'HT SC#',
        dataField: 'HT_SC',
         
      },
      {
        title: 'Total SLDC Units in kWh',
        dataField: 'TOTAL_SDLC_UNITS',
        
      },
      {
        title: 'Total Consumed Units in kWh',
        dataField: 'TOTAL_CONSUMED_UNITS',
        
      },
      {
        title: 'Status',
        dataField: 'STATUS',
        
      },
    ],
  },
];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CONSUMER_CREDIT_DATA_INIT_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: searchInputs,
};

export const ConsumerCreditDataHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={searchSection} columns={6} /> 
        {/* <RFSection controls={tileSection} columns={3} transparent /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
