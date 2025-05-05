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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const actionInputs = ['SBU', 'Scheme','customer','FinancialYear','BillingPeriod','GenerationPeriod',
  'batch_id','batch_status','processed_time','processed_date','STATE','Bill_type'
];
 
const Inputs = ['STATE','SBU', 'Scheme','customer','FinancialYear','BillingPeriod'];

const onEnterEvent: IRFEventParams = {
  input: [''],
  moduleName: CRM_BILLING,
  serviceName: 'RCRM_PROVISIONAL_BILL_GEN_ONENTER'
};
 
const searchSection: IControlDefinition[] = [
    {
        type: ControlType.COMBOBOX,
        name: 'STATE',
        label: 'State',
        masterField:'STATE',
        event: {
          input: ['STATE'],
          moduleName: CRM_BILLING,
          serviceName: 'RCRM_ONCHANGE_BILLING_STATE',
        },
        required:true,
      },
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
    label: 'Financial Year',
    masterField:'FinancialYear',
    event: {
      input: ['FinancialYear'],
      moduleName: CRM_BILLING,
      serviceName: 'RCRM_ONCHANGE_BILLING_FINANCIAL_YEAR',
    },
    required:true,
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'BillingPeriod',
//     label: 'Billing Period',
//     masterField:'BillingPeriod',
//     required:true
//   },
  {
    type: ControlType.COMBOBOX,
    name: 'GenerationPeriod',
    label: 'Generation Period',
    masterField: 'GenerationPeriod',
    required:true,
    // event: {
    //   input: [...actionInputs],
    //   moduleName: CRM_BILLING,
    //   serviceName: 'RCRM_ONCHANGE_BATCH_FINANCIAL_PERIOD',
    // },
  },

  {
    type: ControlType.COMBOBOX,
    name: 'Bill_type',
    label: 'Bill Type',
    masterField:'Bill_type',
    //required:true,
  },

  {
    type: ControlType.HIDDEN,
    name: 'batch_id',
    label: 'Batch Id',
  },
  {
    type: ControlType.HIDDEN,
    name: 'batch_status',
    label: 'Batch Status',
  },
  {
    type: ControlType.HIDDEN,
    name: 'processed_date',
    label: 'Processed Date',
  },
  {
    type: ControlType.HIDDEN,
    name: 'processed_time',
    label: 'Processed Time',
  },

  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Print',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'PRINT_BULK_PROVISIONAL_BILL_GENERATE',
      input: actionInputs,
      downloadFile:{
        jasperReportTemplate:(pageData)=>pageData.jasperReportFileName,
        fileName:(pageData)=>pageData.downloadFileName,
        input:['guid']
      }
    },
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_BULK_PROVISIONAL_BILL_GENERATE',
  moduleName: CRM_BILLING,
};


export const BulkBillReportGeneration :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} /> 
        </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
