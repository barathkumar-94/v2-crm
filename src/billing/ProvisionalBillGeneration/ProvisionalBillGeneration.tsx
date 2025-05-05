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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { MaskedTextField } from 'office-ui-fabric-react';
import { CRM_BILLING, CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
 
const actionInputs = ['SBU', 'Scheme','BillType','customer','FinancialYear','BillingPeriod','GenerationPeriod',
  'batch_id','batch_status','processed_time','processed_date'
];
 
const Inputs = ['SBU', 'Scheme','customer','FinancialYear','BillingPeriod'];

const onEnterEvent: IRFEventParams = {
  input: [''],
  moduleName: CRM_BILLING,
  serviceName: 'RCRM_PROVISIONAL_BILL_GEN_ONENTER'
};
 
const searchSection: IControlDefinition[] = [
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
    name: 'BillType',
    label: 'Bill Type',
    masterField:'BillType',
    required:true
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
  {
    type: ControlType.COMBOBOX,
    name: 'BillingPeriod',
    label: 'Billing Period',
    masterField:'BillingPeriod',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'GenerationPeriod',
    label: 'Generation Period',
    masterField: 'GenerationPeriod',
    required:true,
    event: {
      input: [...actionInputs],
      moduleName: CRM_BILLING,
      serviceName: 'RCRM_ONCHANGE_BATCH_FINANCIAL_PERIOD',
    },
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
];

const PPADETAILS: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'PPA_DETAILS',
    isPrimeReactTable: true,
    column: 12,
    columns: [
      {
        title: 'Bill Type',
        dataField: 'BILL_TYPE'
      },
      {
        title: 'Customer',
        dataField: 'CUSTOMER'
      },
      {
        title: 'PPA #',
        dataField: 'PPA_NO'
      },
      {
        title: 'HTSC #',
        dataField: 'HTSC_NO'
      },
      {
        title: 'Units',
        dataField: 'VALUE',
        dataType:'number'
      }
      ] 

  }    
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'process',
      label: 'Process',
      event: {
        serviceName: 'RCRM_PROCESS_PROVISIONAL_BILL_GENERATE',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'viewbills',
      label: 'View Bills',
      event: {
        linkTo: '/ProvisionalViewBills',
        queryParams: [{ sourceField: 'batch_id', targetField: "code" }]
      }
    },
  ];

  export const DataSection: IControlDefinition[] = [
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
      format:DATE_TIME_FORMAT
    },
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
      format:DATE_TIME_FORMAT
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];
 
const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_PROVISIONAL_BILL_GENERATE',
  moduleName: CRM_BILLING,
  input: ['batch_id']
};

export const ProvisionalBillGeneration:React.FC<IPageBaseProps> = (props) => {
    const {id} = usePageQueryParam();
 
 
  const initialData: IRFData = {
      batch_id:id
    };
 
 
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={searchSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={PPADETAILS}  title={'Summary'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
       </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};