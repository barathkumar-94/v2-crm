import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableColDef,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['SBU', 'Scheme','customer','FinancialYear','GenerationPeriod',
];
 
const PrintSection: IControlDefinition[] = [
 
    {
        type: ControlType.COMBOBOX,
        name: 'SBU',
        label: 'SBU',
        masterField:'SBU',
        event: {
          input: ['SBU'],
          moduleName: CRM_BILLING,
          serviceName: 'RCRM_ONCHANGE_BILLING_SBU',
        },
        required:true,
      },
      {
        type: ControlType.COMBOBOX,
        name: 'Scheme',
        label: 'Scheme',
        masterField:'Scheme',
        required:true,
        event: {
          input: ['SBU', 'Scheme'],
          moduleName: CRM_BILLING,
          serviceName: 'RCRM_ONCHANGE_BATCH_SCHEMA',
        },
      },
      {
        type: ControlType.COMBOBOX,
        name: 'customer',
        label: 'Customer',
        masterField:'customer',
        required:true,
        multiSelect:true,
        multiSelectFor:'save'
      },
      {
        type: ControlType.COMBOBOX,
        name: 'FinancialYear',
        label: 'Generation Year',
        masterField:'FinancialYear',
        event: {
          input: ['FinancialYear'],
          moduleName: CRM_BILLING,
          serviceName: 'RCRM_ONCHANGE_BILLING_FINANCIAL_YEAR',
        },
        required:true,
      },
      {
        type: ControlType.COMBOBOX,
        name: 'GenerationPeriod',
        label: 'Generation Period',
        masterField: 'GenerationPeriod',
        required:true,
        // event: {
        //   input: [...PrintInputs],
        //   moduleName: CRM_BILLING,
        //   serviceName: 'RCRM_ONCHANGE_BATCH_FINANCIAL_PERIOD',
        // },
      },
  
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'SALES_TALLY_SEARCH_SUMMARY_RPT',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'SalesTallyreportGrid',columnDetails:cols}
        ])
    },
  },
];

const cols: Dictionary<TableColDef[]> = {
  '': [
    {
      title: 'Seq No',
      dataField: 'sort_order' ,
      hidden:true     
    },
     {
       title: 'Vch No.',
       dataField: 'BILL_ID'
              
     },
     {
        title: 'Vch Type',
        dataField: 'VCH_TYPE'
               
      },

      {
        title: 'Today Date',
        dataField: 'CURRENT_DATE'
               
      },

      {
        title: 'Invoice date',
        dataField: 'INVOICE_DATE'
               
      },

      {
        title: 'Reference No.',
        dataField: 'BILL_REF_NO'
               
      },

      {
        title: 'Party Name',
        dataField: 'CUSTOMER_NAME'
               
      },

      {
        title: 'Ledger Group',
        dataField: 'LEDGER_GROUP'
               
      },

      {
        title: 'Registration Type',
        dataField: 'REGISTRATION_TYPE'
               
      },

      {
        title: 'GSTIN No',
        dataField: 'GST_NO'
               
      },

      {
        title: 'Country',
        dataField: 'COUNTRY'
               
      },

      {
        title: 'State',
        dataField: 'STATE'
               
      },

      {
        title: 'Pincode',
        dataField: 'PINCODE'
               
      },

      {
        title: 'Address 1',
        dataField: 'ADDRESS_1'
               
      },

      {
        title: 'Address 2',
        dataField: 'ADDRESS_2'
               
      },

      {
        title: 'Address 3',
        dataField: 'ADDRESS_3'
               
      },

      {
        title: 'Cost center',
        dataField: 'COST_CENTER'
               
      },

      {
        title: 'Narration',
        dataField: 'NARRATION'
               
      },

      {
        title: 'Attachment path',
        dataField: 'ATTACHMENT_PATH'
               
      },

      {
        title: 'Authorizer Name',
        dataField: 'AUTHORIZER_NAME'
               
      },

      {
        title: 'Error',
        dataField: 'ERROR'
               
      },

      {
        title: 'Sales Ledger',
        dataField: 'SALES_LEDGER'
               
      },

      {
        title: 'Amt',
        dataField: 'BILL_AMOUNT'
               
      },

      {
        title: 'CGST Ledger',
        dataField: 'CGST_LEDGER'
               
      },
      {
        title: 'CGST Amt',
        dataField: 'CGST_AMT'
               
      },

      {
        title: 'SGST Ledger',
        dataField: 'SGST_LEDGER'
               
      },

      {
        title: 'SGST Amt',
        dataField: 'SGST_AMT'
               
      },

      {
        title: 'IGST Ledger',
        dataField: 'IGST_LEDGER'
               
      },

      {
        title: 'IGST Amt',
        dataField: 'IGST_AMT'
               
      },

      {
        title: 'CESS Ledger',
        dataField: 'CESS_LEDGER'
               
      }, 
      
      {
        title: 'CESS Amt',
        dataField: 'CESS_AMT'
               
      },


      {
        title: 'Total',
        dataField: 'TOTAL'
               
      },
     
  ]
 } 

const SalesTallyreportSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'SalesTallyreportGrid',
    isPrimeReactTable: true,
    isDynamicColumn:true,
    noPagination: true,
    column: 12,
    editorProps:{
      isEditable:false,
      hideAdd:false,
      hideDelete:false,
  },
  pivotProps: {
    indexVariable: ['BILL_ID','VCH_TYPE',
'CURRENT_DATE',
'INVOICE_DATE',
'BILL_REF_NO',
'CUSTOMER_NAME',
'LEDGER_GROUP',
'REGISTRATION_TYPE',
'GST_NO',
'COUNTRY',
'STATE',
'PINCODE',
'ADDRESS_1',
'ADDRESS_2',
'ADDRESS_3',
'COST_CENTER',
'NARRATION',
'ATTACHMENT_PATH',
'AUTHORIZER_NAME',
'ERROR',
'SALES_LEDGER',
'BILL_AMOUNT',
'CGST_LEDGER',
'CGST_AMT',
'SGST_LEDGER',
'SGST_AMT',
'IGST_LEDGER',
'IGST_AMT',
'CESS_LEDGER',
'CESS_AMT',
'TOTAL'],
    columnVariable: ['GRID_COLUMN_NAME'],
  },
  columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols) 

  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_SALES_TALLY_RPT',
  moduleName: CRM_BILLING,
};


export const SalesTallyReport :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={SalesTallyreportSection} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
