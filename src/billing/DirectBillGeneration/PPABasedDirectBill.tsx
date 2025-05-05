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
  IGetDynamicEventProps,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { BillSummary } from './BillSummary';
import { DirectBillHelp } from './DirectBillHelp';
import { MaskedTextField } from 'office-ui-fabric-react';
import { CRM_BILLING, CRM_TRANSACTION, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { PPAHelp } from '../../master/PPA/PPAHelp';
import { ViewCustomer } from './ViewCustomer';
import { ViewManagePPA } from './ViewManagePPA';
import { ViewDirectPPA } from './ViewDirectPPA';
import { ViewPayterm } from './ViewPayterm';
import { PPABasedDirectBillHelp } from './PPABasedDirectBillHelp';

const actionInputs = ['bill', 'billdate', 'status', 'financial_year', 'billingperiod', 'generationperiod', 'billCategory', 'billtype', 'remarks','schema','sbu', 'Hidden_PPA_NO','PPA_No', 'Title', 'customername', 'customercode', 
  'htsc', 'discom', 'VoltageLevel', 'Address', 'City', 'State', 'District', 'Pincode', 'Country',
  'cont_firstName','cont_lastName','cont_mobile','cont_phone','cont_email','cont_department','cont_designation','cont_addressType','cont_address',
  'cont_state','cont_district','cont_country','cont_city','cont_pincode',
   'paytermcode', 'Due_Days','Payment_Term', 'REGISTERED_COMPANY_NAME', 'BANK_NAME', 'BRANCH_NAME', 'ACCOUNT', 'ACCOUNT_TYPE',
   'IFSC_CODE', 'PAN', 'GST', 'HSN_Code', 'ServiceDetailsGrid','todGrid', 'OpenAccessCharges','DISCOMTarifTCDsummary',
    
];
 
 
const onEnterEvent: IRFEventParams = {
  input: ['bill'],
  moduleName: CRM_BILLING,
  serviceName: 'RCRM_PPABASED_DIRECTBILL_ONENTER',
};
 
 
const onEnterEventppa: IRFEventParams = {
  input: ['PPA_No'],
  moduleName: CRM_BILLING,
  serviceName: 'RCRM_PPABASED_DIRECTBILL_ONCHANGE',
};
 
const helpComponents = {
  PPABasedDirectBillHelp: PPABasedDirectBillHelp,
  PPAHelp:PPAHelp,
  ViewDirectPPA:ViewDirectPPA,
  ViewManagePPA:ViewManagePPA,
  ViewCustomer:ViewCustomer,
  ViewPayterm:ViewPayterm
};
 
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'bill',
    label: 'Bill',
    required:true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On BillSummary',
      componentName: 'PPABasedDirectBillHelp',
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
      serviceName:'RCRM_ONCHANGE_BILL_FINANCIAL_YEAR',
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
      serviceName:'RCRM_BILL_GENERATION_PERIOD_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationperiod']
      }
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
    masterField:'billCategory',
    event :{
      serviceName:'RCRM_BILL_CATEGORY_ONCHANGE',
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
      serviceName:'RCRM_BILL_TYPE_ONCHANGE',
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
    type: ControlType.HIDDEN,
    name: 'sbu',
    label: 'SBU',

  },
  {
    type: ControlType.HIDDEN,
    name: 'schema',
    label: 'Schema',

  },
 
];
 
const ReferenceDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    label:'Hidden PPA No',
    name: 'Hidden_PPA_NO',
    hidden:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'PPA_No',
    label: 'PPA',
    required:true,
    event: onEnterEventppa,
    help: {
      panelTitle: 'Help On PPA',
      componentName: 'PPAHelp',
      receiveParams: [{parentField: 'PPA_No', childField: 'PPA'},
                      {parentField: 'PPA_Date', childField: 'PPA_DATE'},
                      {parentField: 'Amendment', childField: 'AMENDMENT'},
                      {parentField: 'Title', childField: 'TITLE'},
                      {parentField: 'PPA_Status', childField: 'PPA_STATUS'},
                      {parentField: 'COD', childField: 'COD_DATE'},
                      {parentField: 'Power_Producer', childField: 'POWER_PRODUCER'},
                      {parentField: 'Scheme', childField: 'SCHEME'},
                      {parentField: 'Site', childField: 'SITE'},
                      {parentField: 'LOI', childField: 'LOI'},
                      {parentField: 'Customer_Account', childField: 'CUSTOMER'}],
      event: onEnterEventppa
    }
  },
  {
    type: ControlType.DISPLAY,
    label:'LOI',
    name: 'LOI',
    hidden:true,
  },
  
  {
    type: ControlType.DISPLAY,
    name: 'Title',
    label: 'Title',
    // required:true
  },

  {
    type: ControlType.DISPLAY,
    name: 'power_producer',
    label: 'Power Producer',
  },

  {
    type: ControlType.DISPLAY,
    name: 'scheme',
    label: 'Scheme',
  },

  {
    type: ControlType.DISPLAY,
    name: 'site',
    label: 'Site',
  },

  {
    type: ControlType.BUTTON,
    name: 'viewdetails',
    label: 'View Details',
    isPrimary: true,
    hidden:(pageData)=>!pageData.PPA_No,   
     event: {
      getEventProps:(pageData)=>{
        return {
          openModal:true,
          modalProps:{
            title:'View PPA Details',
            componentName:pageData.PPA_No === 'Y' ? 'ViewManagePPA' : 'ViewDirectPPA',
            sendParams:[{parentField:'PPA_No', childField:"PPA_No"}
            ]
          }
        } as IGetDynamicEventProps
      }
    },
  }
]
const CustomerDetailsSection: IControlDefinition[]=[
  {
    type: ControlType.DISPLAY,
    name: 'customercode',
    label: 'Customer Code'
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
    masterField:'htsc',
    required:true,
    event :{
      serviceName:'RCRM_PPADIRECTBILL_CUSTOMER_ONCHANGE',
      moduleName : CRM_BILLING,
      input:['financial_year','generationperiod','billCategory','billtype','PPA_No','htsc']
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
    name: 'ServiceDetailsGrid',
    isPrimeReactTable: true,
    column: 12,
  //   editorProps:{
  //     isEditable:true,
  // },
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
            // cellEditor: TableCellEditorType.COMBOBOX,
            // cellEditorParams: {
            //     masterField: 'TYPE',
            //     required: true
            //   }
          },
      {
        title: 'Service Description',
        dataField: 'SERVICE_DESCRIPTION',
        
      },
      {
          title: 'UOM',
          dataField: 'TARIFF_UOM',
          // cellEditor: TableCellEditorType.COMBOBOX,
          // cellEditorParams: {
          //   masterField: 'TARIFF_UOM',
          //   required: true
          // }
        },
        {
          title: 'Contracted Quantum',
          dataField: 'CONTRACTED_QUANTUM',
          cellEditor: TableCellEditorType.TEXTBOX,
        },
        {
            title: 'Actual Units',
            dataField: 'ACTUAL_UNITS',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required: true
              }
          },
         
        {
          title: 'Rate',
          dataField: 'RATE',
          cellEditor: TableCellEditorType.TEXTBOX,
        },
        {
          title: 'Value',
          dataField: 'Value',
        },
      ]
 
  }    
];
 
const CreditUnitsDetails : IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todGrid',
    isPrimeReactTable: true,
    column: 12,
    csvExport:false,
    
    // editorProps:{
    //   isEditable:true,
     
    // },
    columns: [
        {
            title: 'TOD Name',
            dataField: 'TOD_NAME_LOAD',
            // cellEditor: TableCellEditorType.,
            // cellEditorParams: {
            //     masterField: 'TOD_NAME_LOAD',
            //     required:true
            //   }
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
        cellEditorParams: {
         required: true,
         inputType:"number"
        }
      },  
      ]
 
  }    
];
 
const OpenAccessChargesSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'OpenAccessCharges',
    isPrimeReactTable: true,
    // filter:true,
    // editorProps:{
    //   isEditable:true,
     
    // },
 
    columns: [
      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
      //   cellEditor: TableCellEditorType.COMBOBOX,
      //   cellEditorParams: {
      //   masterField: 'GENERATION_TYPE',
      //   required:true,
      // }
      },
      {
        title: 'TCD Code',
        dataField: 'TCD_CODE',
      //   cellEditor: TableCellEditorType.COMBOBOX,
      //   cellEditorParams: {
      //   masterField: 'OPEN_TCD_CODE',
      //   required: true,
      // }
      },
      {
        title: 'Description',
        dataField: 'TCD_DESCRIPTION',
      },
      {
        title: 'TCD Type',
        dataField: 'TCD_TYPE',
      },
      {
        title: 'UOM',
        dataField: 'OPEN_ACCESS_UOM',
      //   cellEditor: TableCellEditorType.COMBOBOX,
      //   cellEditorParams: {
      //   masterField: 'OPEN_ACCESS_UOM',
      //   required: true,
      // }
      },
      {
        title: 'Value',
        dataField: 'TCD_VALUE_1',
        // cellEditor: TableCellEditorType.TEXTBOX,
        // cellEditorParams:
        // {
        //   required:true        
        // }
       
      },
      {
        title: 'Value',
        dataField: 'TCD_VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          required:true        
        }
       
      },
      {
        title: '% of Share',
        dataField: 'PER_OF_SHARE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType:"number"
        }
      },
    ],
  },
];
const DISCOMTarif: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'DISCOMTarifTCDsummary',
    isPrimeReactTable: true,
    filter:true,
    // editorProps:{
    //   isEditable:true,
     
    // },
 
    columns: [
      {
        title: 'TCD Code',
        dataField: 'TCD_CODE',
        // cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
        // masterField: 'DISCOM_TCD_CODE',
        // required:true,
        event :{
          serviceName:'RCRM_LOI_TCD_ONCHANGE',
          moduleName : CRM_TRANSACTION,
          input:['TCD_CODE']
          }
      }
      },
      {
        title: 'Description',
        dataField: 'TCD_DESCRIPTION'
      },
      {
        title: 'TCD Type',
        dataField: 'TCD_TYPE'
      },
     
      {
        title: 'UOM',
        dataField: 'TCD_UOM',
        // cellEditor: TableCellEditorType.COMBOBOX,
        // cellEditorParams: {
        // masterField: 'TCD_UOM',
        // required:true,
        // },
      },
      {
        title: 'Value',
        dataField: 'TCD_VALUE_1',
        // cellEditor: TableCellEditorType.TEXTBOX,
        // cellEditorParams:
        // {
        //   required:true        
        // }
       
      },
      {
        title: 'Value',
        dataField: 'TCD_VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType:"number",
          required:true,
        }

      },
      {
        title: '% of Share',
        dataField: 'TCD_PER_OF_SHARE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType:"number",
        }
      },
    ],
  },
];
 
 
const PaymentTermDetailsSection: IControlDefinition[]=[
  {
    type: ControlType.DISPLAY,
    name: 'paytermcode',
    label: 'Payment Term Code',
  //  required:true,
  hidden:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'Payment_Term',
    label: 'Payment Term',
  //  required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'Due_Days',
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
 
const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {
      serviceName: 'CREATE_PPA_DIRECTBILL_MST',
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
      serviceName: 'SAVE_PPA_DIRECTBILL_MST',
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
  //     serviceName: 'VALIDATE_PPA_DIRECTBILL_MST',
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
      serviceName: 'SUBMIT_PPA_DIRECTBILL_MST',
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
      serviceName: 'CANCEL_PPA_DIRECTBILL_MST',
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
      getEventProps:(pageData)=>{
        return{
          serviceName: 'PRINT_PPA_DIRECTBILL_MST',
          moduleName: CRM_BILLING,
          input: [...actionInputs],
          downloadFile:{
            jasperReportTemplate:(pageData)=>pageData.jasperReportFileName,
            fileName:(pageData)=>pageData.downloadFileName,
            input:['guid']
          }
        }
      }
    },
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
  serviceName: 'RCRM_INIT_PPA_DIRECT_BILL_MST',
  moduleName: CRM_BILLING,
    input: ['bill']
};
 
export const PPABasedDirectBill:React.FC<IPageBaseProps> = (props) => {
    const {bill} = usePageQueryParam();
 
 
  const initialData: IRFData = {
    bill: bill
 
    };
 
 
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={searchSection} title={'Bill Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
 
 <RFSection title={'PPA Details'} controls={ReferenceDetailsSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>    
  <RFSection title={'Customer Details'} controls={CustomerDetailsSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>
     <RFSection title={'Customer Delivery Point'} controls={CustomerDeliveryPointSection} columns={6} className={'section-header-bg-primary'} collapse={false}/>
     <RFSection  controls={BillingSection} title={'Bill To'} columns={6}  className={'section-header-bg-primary'} collapse={false}/>
     <RFSection title={'Service Details'} controls={ServiceDetailstableSection}   columns={1} className={'section-header-bg-primary'} collapse={false}/>
     <RFSection title={'Credit Units Details - TOD'} controls={CreditUnitsDetails}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
     <RFSection title={'Open Access Charges'} controls={OpenAccessChargesSection}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
<RFSection  title={'DISCOM-Tariff'}controls={DISCOMTarif}   columns={1} className={'section-header-bg-primary'} collapse={false}/>
<RFSection title={'Payment Term Details'} controls={PaymentTermDetailsSection}  columns={6} className={'section-header-bg-primary'} collapse={false}/>
  <RFSection title={'Beneficiary Details'} controls={BeneficiaryDetailsSection}  columns={6} className={'section-header-bg-primary'} collapse={false}/>
 {/* <RFSection  controls={GenerateBillSection} title={'Generate Bill'} columns={6} className={'section-header-bg-primary'} collapse={false}/> */}
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};