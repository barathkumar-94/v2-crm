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
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_BILLING, DATE_FORMAT } from '../../common/constants';

const searchInputs = ['bill','DateType','DateFrom','DateTo','BillStatus','BillCategory','BillType','FinancialYear','BillingPeriod','GenerationPeriod','SBU','Scheme','Customer','HTSC'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'bill', 
    label: 'Bill #',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'DateType',
    label: 'Date Type',
    masterField :'DateType'
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateFrom',
    label: 'Date From',
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'DateTo'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateTo',
    label: 'Date To',
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateFrom'
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'BillCategory',
    label: 'Bill Category',
    masterField:'BillCategory'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'BillType',
    label: 'Bill Type',
  masterField:'BillType'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'FinancialYear',
    label: 'Financial Year',
    masterField:'FinancialYear',
    event :{
      serviceName:'RCRM_ONCHANGE_BILLING_FINANCIAL_YEAR_SUM',
      moduleName :CRM_BILLING,
      input:['FinancialYear']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'BillingPeriod',
    label: 'Billing Period',
    masterField:'BillingPeriod',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'GenerationPeriod',
    label: 'Generation Period',
    masterField:'GenerationPeriod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'SBU',
    label: 'SBU',
    masterField:'SBU',
    event :{
      serviceName:'RCRM_ONCHANGE_BILLING_SBU_SUM',
      moduleName :CRM_BILLING,
      input:['SBU']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Scheme',
    label: 'Scheme',
    masterField:'Scheme'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Customer',
    label: 'Customer',
    masterField:'Customer',
    event :{
      serviceName:'RCRM_ONCHANGE_BILLING_CUSTOMER_SUM',
      moduleName :CRM_BILLING,
      input:['Customer']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'HTSC',
    label: 'HTSC #',
    masterField:'HTSC'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'BillStatus',
    label: 'Bill Status',
    masterField:'BillStatus'
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'SEARCH_FINAL_BILL_SUM', 
      input: searchInputs,
    },
  },
];


const finalBillSumGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'finalBillSummarygrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Bill#',
        dataField: 'BILL',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          
          event: {
            getEventProps:(rowData)=>{
              return {
                linkTo:rowData.PPA ? '/FinalManageBill' : '/Finaldirectbill',
                queryParams:[{sourceField:'BILL', targetField:"bill"}]
              }
            }
          },
        },
      },
      {
        title: 'Bill Date',
        dataField: 'BILL_DATE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT,
        },
      },
      {
        title: 'Bill Status',
        dataField: 'STATUS',
      },
      {
        title: 'Bill Category',
        dataField: 'BILL_CATEGORY',
      },
      {
        title: 'Bill Type',
        dataField: 'BILL_TYPE',
      },
      {
        title: 'Billing Period',
        dataField: 'BILL_PERIOD',
      },
      {
        title: 'Financial Year',
        dataField: 'FINANCIAL_YEAR',
        
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
      },
      {
        title: 'PPA #',
        dataField: 'PPA',
      },
      {
        title: 'SBU',
        dataField: 'SBU',
      },
      {
        title: 'Scheme',
        dataField: 'SCHEME',
      },
      {
        title: 'Customer',
        dataField: 'CUSTOMER',
      },
      {
        title: 'HTSC #',
        dataField: 'HTSC',
      },
      {
        title: 'DISCOM',
        dataField: 'DISCOM',
      },
      {
        title: 'Value',
        dataField: 'VALUE',
      },
    ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_FINAL_BILL_SUM',
  moduleName: CRM_BILLING,
};
 
export const FinalBillSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={finalBillSumGridSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};