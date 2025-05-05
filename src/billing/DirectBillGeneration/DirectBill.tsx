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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { BillSummary } from './BillSummary';
import { DirectBillHelp } from './DirectBillHelp';
import { MaskedTextField } from 'office-ui-fabric-react';
import { CRM_BILLING, CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { PPAHelp } from '../../master/PPA/PPAHelp';
import { CustomerAccountHelp } from '../../master/CustomerAccount/CustomerAccountHelp';
import { ViewCustomer } from './ViewCustomer';
import { PayTermHelp } from '../../master/PayTerm/PayTermHelp';
import { ViewPayterm } from './ViewPayterm';

const actionInputs = ['billdate','bill', 'billdate','status','financial_year','billingperiod','generationperiod','billCategory','billtype' ,'remarks','sbu','scheme','site',
'customercode','customername','htsc','discom','VoltageLevel','Address','City','State','District','Pincode','Country',
'cont_firstName','cont_lastName','cont_mobile','cont_phone','cont_email','cont_department','cont_designation','cont_addressType','cont_address','cont_state','cont_district',
'cont_country','cont_city','cont_pincode',
'todgrid','servicedetailsgrid','tcdgrid','paytermcode','DueDays','viewdetails',
'HSN_Code','GST','PAN','IFSC_CODE','ACCOUNT_TYPE','ACCOUNT','BRANCH_NAME','BANK_NAME','REGISTERED_COMPANY_NAME'];


const onEnterEvent: IRFEventParams = {
  input: ['bill'],
  moduleName: CRM_BILLING,
  serviceName: 'ONENTER_DIRECT_BILL_MST',
};

const helpComponents = {
  DirectBillHelp: DirectBillHelp,
  CustomerAccountHelp:CustomerAccountHelp,
  ViewCustomer:ViewCustomer,
  PayTermHelp:PayTermHelp,
  ViewPayterm:ViewPayterm
  
 // ViewCustomer:ViewCustomer
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'bill',
    label: 'Bill #',
    required:true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On BillSummary',
      componentName: 'DirectBillHelp',
      receiveParams: [{parentField: 'bill', childField: 'BILL'},
                      {parentField: 'billdate', childField: 'BILL_DATE'},
                      {parentField: 'billingperiod', childField: 'BILL_PERIOD'},
                      {parentField: 'generationperiod', childField: 'GENERATION_PERIOD'},
                      {parentField: 'billCategory', childField: 'BILL_CATEGORY'},
                      {parentField: 'billtype', childField: 'BILL_TYPE'},
                      {parentField: 'status', childField: 'STATUS'},
                    ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'billdate',
    label: 'Bill Date',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'financial_year',
    label: 'Financial Year',
    required:true,
    event :{
      serviceName:'RCRM_ONCHANGE_DIRECTBILL_FINANCIAL_YEAR_MST',
      moduleName :CRM_BILLING,
      input:['financial_year']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'billingperiod',
    label: 'Billing Period',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    event :{
      serviceName:'RCRM_DIRECTBILL_GENERATION_PERIOD_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationperiod']
      },
    required:true
  },
  
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Bill Status',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'billCategory',
    label: 'Bill Category',
    event :{
      serviceName:'RCRM_DIRECTBILL_BILL_CATEGORY_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['billCategory']
      },
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'billtype',
    label: 'Bill Type',
    masterField: 'billtype',
    event :{
      serviceName:'RCRM_DIRECTBILL_BILL_TYPE_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['billtype']
      },
    required:true
  },
 
  {
    type: ControlType.TEXTBOX,
    name: 'remarks',
    label: 'Remarks',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'sbu',
    label: 'SBU Name',
    required:true,
    event :{
      serviceName:'RCRM_ONCHANGE_DIRECT_SBU',
      moduleName :CRM_BILLING,
      input:['sbu']
      }

  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'scheme',
    label: 'Scheme',
    event :{
      serviceName:'RCRM_DIRECTBILL_SCHEME_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['scheme']
      },
    required:true
  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    required:true,
    event :{
      serviceName:'RCRM_DIRECTBILL_ONCHANGE_SITE',
      moduleName :CRM_BILLING,
      input:['site']
      }
  },
 
 
];


const CustomerDetailsSection: IControlDefinition[]=[

  {
    type: ControlType.TEXTBOX,
    name: 'customercode',
    label: 'Customer Code',
    integerLength:20,
    event :{
      serviceName:'RCRM_DIRECTBILL_CUSTOMER_NAME_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['customercode']
      },
    help: {
      panelTitle: 'Help On Customer Account',
      componentName: 'CustomerAccountHelp',
      receiveParams: [{parentField: 'customercode', childField: 'CUSTOMER_CODE'},
                ],
      event :{
        serviceName:'RCRM_DIRECTBILL_CUSTOMER_NAME_ONCHANGE',
        moduleName :CRM_BILLING,
        input:['customercode']
        },
    },
    
    required:true,
   
  },
  {
    type: ControlType.DISPLAY,
    name: 'customername',
    label: 'Customer Name'
    // required:true
  },
  {
    type: ControlType.BUTTON,
    name: 'viewdetails',
    label: 'View Details',
    isPrimary: true,
    hidden:(pageData)=>!pageData.customercode,
    event: {
      //linkTo: '/ViewSite',
      openModal:true,
      modalProps:{ 
        title:'View Customer Details',
        componentName:'ViewCustomer',
        sendParams:[{parentField:'customercode', childField:"customercode"}]
      }
      //queryParams:[{sourceField:'sitecode', targetField:"code"}]
    },
  }
]
  const CustomerDeliveryPointSection: IControlDefinition[]=[
  {
    type: ControlType.COMBOBOX,
    name: 'htsc',
    label: 'HTSC #',
    // masterField: 'htsc',
    required:true,
    event :{
      serviceName:'RCRM_DIRECTBILL_HTSC_ONCHANGE',
      moduleName : CRM_BILLING,
      input:['htsc', 'customercode']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'discom',
    label: 'DISCOM',  
  },
  {
    type: ControlType.DISPLAY,
    name: 'VoltageLevel',
    label: 'Voltage Level',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Address',
    label: 'Address'
  },
  {
    type: ControlType.DISPLAY,
    name: 'City',
    label: 'City'
  },
  {
    type: ControlType.DISPLAY,
    name: 'State',
    label: 'State'
  },
  {
    type: ControlType.DISPLAY,
    name: 'District',
    label: 'District'
  },
  {
    type: ControlType.DISPLAY,
    name: 'Pincode',
    label: 'Pincode'
  },
  {
    type: ControlType.DISPLAY,
    name: 'Country',
    label: 'Country'
  },
];

const BillingSection: IControlDefinition[] = [

  {
    type: ControlType.COMBOBOX,
    name: 'cont_firstName',
    label: 'First Name',
    required:true,
    masterField:'cont_firstName',
    event :{
      serviceName:'RCRM_BILL_CONTACT_ONCHANGE',
      moduleName : CRM_BILLING,
      input:['cont_firstName','customercode']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_lastName',
    label: 'Last Name',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_mobile',
    label: 'Mobile',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_phone',
    label: 'Phone',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_email',
    label: 'Email',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_department',
    label: 'Department',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_designation',
    label: 'Designation',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_addressType',
    label: 'Address Type',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_address',
    label: 'Address',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_city',
    label: 'City',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_state',
    label: 'State',
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_district',
    label: 'District',
  },

  {
    type: ControlType.DISPLAY,
    name: 'cont_pincode',
    label: 'Pincode',
  },
  {
    type: ControlType.DISPLAY,
    name: 'cont_country',
    label: 'Country'
  },
  // {
  //   type: ControlType.DISPLAY,
  //   name: 'currency',
  //   label: 'Currency',
  //   },

];
 

const ServiceDetailstableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'servicedetailsgrid',
    isPrimeReactTable: true,
    column: 12,
    editorProps:{
      isEditable:true,
  },
    columns: [
      {
        title: 'HTSC#',
        dataField: 'HTSC',
      },
      {
        title: 'DISCOM',
        dataField: 'DISCOM',
      },
      {
        title: 'Voltage Level',
        dataField: 'VOLTAGE_LEVEL',
      },
      {
        title: ' Receiving Site Address',
        dataField: 'SITE_ADDRESS',
      },
      {
        title: 'Type',
        dataField: 'TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField:'TYPE',
          required:true,
          event :{
            serviceName:'RCRM_DIRECTBILL_ONCHANGE_TYPE',
            moduleName :CRM_BILLING,
            input:['TYPE']
            }
        }
       } ,
 
       {
        title: 'Tariff id',
        dataField: 'TARIFF_ID',
        width:150,
        cellEditor: TableCellEditorType.COMBOBOX,
       cellEditorParams:{
          commaSeparatedOptionsField:'TARRIF_MASTER',
       event :{
            serviceName:'RCRM_DIRECTBILL_ONCHANGE_TARIFF',
            moduleName : CRM_BILLING,
            input:['TARIFF_ID']
            }
        },
      },
      {
        title: 'Service Description',
        dataField: 'SERVICE_DESCRIPTION',
        
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          maxLength:100
        }
      },
      {
          title: 'UOM',
          dataField: 'UOM',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'UOM',
            required:true
          }
        },
       
        {
          title: 'Contracted Quantum',
          dataField: 'CONTRACTED_QUANTUM',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:100,
            inputType:"number"
          }
        },
        {
          title: 'Actual Units',
          dataField: 'ACTUAL_UNITS',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:100,
            inputType:"number"

          }
        },
        {
          title: 'RATE',
          dataField: 'RATE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:100,
            inputType:"number"

          }
        },
        {
          title: 'Value',
          dataField: 'VALUE',
        },
      ] 

  }    
];

const TODtableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todgrid',
    isPrimeReactTable: true,
    excelExport:false,
    column: 12,
  //   editorProps:{
  //     isEditable:true,
  // },
    columns: [
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'TOD_NAME',
          //required:true,
          disable:true,
      
        }
      },
      {
        title: 'Seq no',
        dataField: 'SEQ_NO',
        hidden:true
      },
      {
        title: 'Credit Units',
        dataField: 'CREDIT_UNITS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          maxLength:100,
          inputType:"number"

        }
      },
     
      ] 

  }    
];

const TCDtableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'tcdgrid',
    isPrimeReactTable: true,
    column: 12,
    editorProps:{
      isEditable:true,
  },
    columns: [
      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'GENERATION_TYPE',
        }
      },
      {
        title: 'TCD Code',
        dataField: 'TCD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'TCD_CODE',
          required:true,
          event :{
            serviceName:'RCRM_DIRECTBILL_ONCHANGE_TCD_CODE',
            moduleName :CRM_BILLING,
            input:['TCD_CODE','site']
            }
        }
      },
      {
          title: 'Description',
          dataField: 'DESCRIPTION',
          
        },
        {
          title: 'TCD Type',
          dataField: 'TCD_TYPE',
        },
        {
          title: 'UOM',
          dataField: 'TCD_UOM',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams:{
            required:true,
            masterField:'TCD_UOM'
          }
        },
        {
          title: 'Value',
          dataField: 'VALUE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:100,
            inputType:"number"

          }
        }
      ] 

  }    
];



const PaymentTermDetailsSection: IControlDefinition[]=[

  {
    type: ControlType.TEXTBOX,
    name: 'paytermcode',
    label: 'Pay Term Code',
    required:true,
   
    maxLength:80,
    help: {
      panelTitle: 'Help On Pay Term Summary',
      componentName: 'PayTermHelp',
      receiveParams: [{parentField: 'paytermcode', childField: 'PAY_TERM_CODE'},
                      {parentField: 'Description', childField: 'DESCRIPTION'},
                      {parentField: 'DueDays', childField: 'DUE_DAYS'},
                      {parentField: 'Penaltyper', childField: 'PENALTY_%'},
                      {parentField: 'RebateDays', childField: 'REBATE_DAYS'},
                      {parentField: 'Rebateper', childField: 'REBATE_%'},
                      {parentField: 'status', childField: 'STATUS'}],
     
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'DueDays',
    label: 'Due Days',
  },
 
  {
    type: ControlType.BUTTON,
    name: 'viewdetails ',
    label: 'View Details ',
    isPrimary: true,
    hidden:(pageData)=>!pageData.paytermcode,
    event: {
      //linkTo: '/ViewSite',
      openModal:true,
      modalProps:{ 
        title:'View Payterm Details',
        componentName:'ViewPayterm',
        sendParams:[{parentField:'paytermcode', childField:"paytermcode"}]
      }
      //queryParams:[{sourceField:'sitecode', targetField:"code"}]
    },
  }
];

const BeneficiaryDetailsSection: IControlDefinition[]=[
  {type: ControlType.DISPLAY,
    label: 'Registered Company Name',
    name: 'REGISTERED_COMPANY_NAME',
 
  },
  {type: ControlType.DISPLAY,
    label: 'Bank Name',
    name: 'BANK_NAME'
  },
  {type: ControlType.DISPLAY,
    label: 'Branch Name',
    name: 'BRANCH_NAME'
  },
  {type: ControlType.DISPLAY,
    label: 'Account #',
    name: 'ACCOUNT',
   
  },
  {type: ControlType.DISPLAY,
    label: 'Account Type',
    name: 'ACCOUNT_TYPE',
  },
  {type: ControlType.DISPLAY,
    label: 'IFSC Code',
    name: 'IFSC_CODE',
   
  },
  {type: ControlType.DISPLAY,
    label: 'PAN',
    name: 'PAN',
   
  },
  {type: ControlType.DISPLAY,
    label: 'GST',
    name: 'GST',
   
  },
  {type: ControlType.DISPLAY,
    label: 'HSN Code',
    name: 'HSN_Code',
   
  },

];

// const GenerateBillSection: IControlDefinition[]=[
//   {
//     type: ControlType.COMBOBOX,
//     name: 'selecttemplate',
//     label: 'Select Template'
//   },
//   {
//     type: ControlType.BUTTON,
//     name: 'preview',
//     label: 'Preview',
//     isPrimary: true,
//     event: {
//       serviceName: 'PREVIEW_MANAGEBILL_MST',
//       moduleName: CRM_MASTER,
//       input: [...actionInputs],
//     },
//   }
// ];

const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {  
      serviceName: 'CREATE_DIRECT_BILL_MST',
      moduleName: CRM_BILLING,
      input: [...actionInputs],
    },
  },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'SAVE_DIRECT_BILL_MST',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },

    // {
    //   type: ControlType.BUTTON,
    //   isPrimary: true,
    //   name: 'validate',
    //   label: 'Validate',
    //   event: {
    //     serviceName: 'VALIDATE_DIRECT_BILL_MST',
    //     moduleName: CRM_BILLING,
    //     input: [...actionInputs],
    //   },
    // },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'submit',
      label: 'Submit',
      event: {
        serviceName: 'SUBMIT_DIRECT_BILL_MST',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'cancel',
      label: 'Cancel',
      event: {
        serviceName: 'CANCEL_DIRECT_BILL_MST',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'print',
      label: 'Print',
      // hidden:(pageData)=>pageData.status != 'Authorized', 
      event: {
        serviceName: 'PRINT_DIRECTBILL_MST',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
        downloadFile:{
          jasperReportTemplate:(pageData)=>pageData.jasperReportFileName,
          fileName:(pageData)=>pageData.downloadFileName,
          input:['guid']
        }
      }
    },
];


export const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    format:DATE_TIME_FORMAT,
    prefixText: 'Created Date : ',
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
      format:DATE_TIME_FORMAT,
      prefixText: 'Modified Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  
  ];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_DIRECT_BILL_MST',
  moduleName: CRM_BILLING,
    input: ['bill']
};

export const DirectBill:React.FC<IPageBaseProps> = (props) => {
    const {bill} = usePageQueryParam();


  const initialData: IRFData = {
    bill: bill

    };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={searchSection} title={'Bill Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
  <RFSection title={'Customer Details'} controls={CustomerDetailsSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>

     <RFSection title={'Customer Delivery Point'} controls={CustomerDeliveryPointSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>
     <RFSection  controls={BillingSection} title={'Bill To'} columns={6}  className={'section-header-bg-primary'} collapse={false}/>

     <RFSection title={'Service Details'} controls={ServiceDetailstableSection}   columns={1} className={'section-header-bg-primary'} collapse={false}/>
     
     <RFSection title={'Credit Units Details - TOD'} controls={TODtableSection}   columns={1} className={'section-header-bg-primary'} collapse={false}/>
    <RFSection title={'Taxes/Chargers/Discounts'} controls={TCDtableSection}   columns={1} className={'section-header-bg-primary'} collapse={false}/>

<RFSection title={'Payment Term Details'} controls={PaymentTermDetailsSection}  columns={6} className={'section-header-bg-primary'} collapse={false}/>

  <RFSection title={'Beneficiary Details'} controls={BeneficiaryDetailsSection}  columns={6} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
