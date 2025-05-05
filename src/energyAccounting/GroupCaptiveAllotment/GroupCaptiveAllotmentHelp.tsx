
import * as React from 'react';
 
import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
  RFTabs,
  RFTabItem,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_ENERGY_ACCOUNTING } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
 
 
 
const searchInputs = ['id','generationyear','generationPeriod','site','transactionDate','status'];
 
;
 
const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'id',
        label: 'ID',      
      },
      {
        type: ControlType.COMBOBOX,
        name: 'generationyear',
        label: 'Generation Year',
        masterField:'generationyear',
    
      },
      {
        type: ControlType.COMBOBOX,
        name: 'generationPeriod',
        label: 'Generation Period',
        masterField:'generationPeriod',
      },
    {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
   },
  {
    type: ControlType.DATEPICKER,
    name: 'transactionDate',
    label: 'Transaction Date',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField:'status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

 

const OverallMonthlySummarySection: IControlDefinition[] = [
 

    {
        type: ControlType.DISPLAY,
        name: 'openingBaningUnits',
        label: 'Opening Banking Units',
    },
    {
        type: ControlType.DISPLAY,
        name: 'generationNetEnergy',
        label: 'Generation Net Energy',
    },
    {
        type: ControlType.DISPLAY,
        name: 'consumption',
        label: 'Consumption',
    },
    {
        type: ControlType.DISPLAY,
        name: 'bankingUnitsUtilized',
        label: 'Banking Units Utilized',
    },
    {
        type: ControlType.DISPLAY,
        name: 'excessEnergy',
        label: 'Excess Energy',
    },

    {
        type: ControlType.DISPLAY,
        name: 'closingBankingUnits',
        label: 'Closing Banking Units',
    },
  

];
 

const MonthlyGenerationSummarySection: IControlDefinition[] = [

    {
        type: ControlType.DISPLAY,
        name: 'netEnergyinkWh',
        label: 'Net Energy in kWh',
    },

];


const SearchSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'GroupCaptiveSummary',
      isHelpTable: true,
      column: 12,
      pageSize:7,
      columns: [
     
        {
          title: 'Id',
          dataField: 'ID',        
      },
      {
        title: 'Generation Year',
        dataField: 'GENERATION_YEAR',
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
      },
      {
        title: 'Site',
        dataField: 'SITE',
      },
      {
        title: 'Transaction Date',
        dataField: 'TRANSACTION_DATE',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
      {
        title: 'Opening Banking Units',
        dataField: 'OPENING_BANKING_UNIT',
      },
      {
        title: 'Generation Net Energy',
        dataField: 'GENERATION_BET_ENERGY',
      },
      {
        title: 'Consumption',
        dataField: 'CONSUMPTION',
      },
      {
        title: 'Banking Units Utilized',
        dataField: 'BANKING_UNIT_UTILLIZED',
      },
      {
        title: 'Excess Energy',
        dataField: 'EXCESS_ENERGY',
      },
      {
        title: 'Closing Banking Units',
        dataField: 'CLOSING_BANKING_UNIT',
      },
      {
        title: 'Net Energy in kWh',
        dataField: 'NET_EENERGY_KWH',
      },
    ] 
  
    }    
  ];

 
  
 
const onLoadEventParams: IRFEventParams = {
 serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_INIT_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: [...searchInputs],
};
 
export const GroupCaptiveAllotmentHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder   scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams}  className={'page-with-footer-btn-meta'} prompt>
      <ScrollabeContainer hasHeader={true}>
       <RFSection  controls={generalSection}  title={'Search Criteria'} columns={6} transparent/> 
        <RFSection  controls={SearchSection}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
 