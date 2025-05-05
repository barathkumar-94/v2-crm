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
  TableCellRendererType,
  RFTabs,
  RFTabItem,
  IGetDynamicEventProps,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_BILLING, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { DirectBillHelp } from '../DirectBillGeneration/DirectBillHelp';
import { PPAHelp } from '../../master/PPA/PPAHelp';
import { directBillHelp } from './directBillHelp';
import { ViewDirectPPA } from '../DirectBillGeneration/ViewDirectPPA';
import { ViewManagePPA } from '../DirectBillGeneration/ViewManagePPA';
import { ViewCustomer } from '../DirectBillGeneration/ViewCustomer';
import { ViewPayterm } from '../DirectBillGeneration/ViewPayterm';
 
 
const actionInputs = ['bill','billdate','status','financialyear','billingperiod','generationperiod',
'status','billcategory','SBUName','Scheme','Site','billtype','remarks','title','customercode','customername',
'htsc','discom','VoltageLevel','Address','City','State','District','Pincode','Country',
'cont_firstName','cont_lastName','cont_mobile','cont_phone','cont_email','cont_department','cont_designation',
'cont_addressType','cont_address','cont_state','cont_district','cont_country','cont_city','cont_pincode',
'consumerSiteDetails','creditUnitDetailsTOD','openAccessCharges','discomTariff',
'paytermcode','Due_Days',
'registeredcompanyname','bankname','branchname','account','accounttype','ifsccode','pan','gst','hsncode','viewdetails','Notes'
];
 
const onEnterEvent: IRFEventParams = {
  input: ['bill'],
  moduleName: CRM_BILLING,
  serviceName: 'RCRM_ONENTER_FINAL_PPABILL',
};

 
const helpComponents = {
  directBillHelp: directBillHelp,
 ViewDirectPPA:ViewDirectPPA,
  ViewManagePPA:ViewManagePPA,
  ViewCustomer:ViewCustomer,
   ViewPayterm:ViewPayterm
};
 
const BillDetails: IControlDefinition[] = [
  {
  type: ControlType.TEXTBOX,
  name: 'bill',
  label: 'Bill #',
  required:true,
  event: onEnterEvent,
  help: {
    panelTitle: 'Help On BillSummary',
    componentName: 'directBillHelp',
    receiveParams: [{parentField: 'bill', childField: 'BILL'},
                    {parentField: 'billdate', childField: 'BILL_DATE'},
                    {parentField: 'billingperiod', childField: 'BILL_PERIOD'},
                    {parentField: 'generationperiod', childField: 'GENERATION_PERIOD'},
                    {parentField: 'billcategory', childField: 'BILL_CATEGORY'},
                    {parentField: 'billtype', childField: 'BILL_TYPE'},
                    {parentField: 'status', childField: 'STATUS'},
                  ],
    event: onEnterEvent
  }
},
{
  type: ControlType.DISPLAY,
  name: 'billdate',
  label: 'Bill Date',
  format:DATE_FORMAT,
},
 
  {
    type: ControlType.DISPLAY,
    name: 'financialyear',
    label: 'Financial Year',
    // required:true
  },
 
  {
    type: ControlType.DISPLAY,
    name: 'billingperiod',
    label: 'Billing Period',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'generationperiod',
    label: 'Generation Period',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Bill Status',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'billcategory',
    label: 'Bill Category',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'billtype',
    label: 'Bill Type',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'remarks',
    label: 'Remarks',
  },
  {
    type: ControlType.DISPLAY,
    name: 'SBUName',
    label: 'SBU Name',
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'Scheme',
    label: 'Scheme',
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'Site',
    label: 'Site',
    
  },
];
 
const ReferenceDetails: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'PPA_No',
    label: 'PPA #',
  },
  {
    type: ControlType.DISPLAY,
    name: 'title',
    label: 'Title',
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
];
 
const CustomerDetails: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'customercode',
    label: 'Customer Code',
 },
  {
    type: ControlType.DISPLAY,  
    name: 'customername',
    label: 'Customer Name',
  },
  {
    type: ControlType.BUTTON,
    name: 'viewdetails',
    label: 'View Details',
    isPrimary: true,
    hidden:(pageData)=>!pageData.customercode,
    event: {
      openModal:true,
      modalProps:{
        title:'View Customer Details',
        componentName:'ViewCustomer',
        sendParams:[{parentField:'customercode', childField:"customercode"}]
      }
    },
  }
];
 
const CustomerDeliveryPoint: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'htsc',
  label: 'HTSC #',
  
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
    label: 'Address',
  },
  {
    type: ControlType.DISPLAY,
    name: 'City',
    label: 'City',
  },
  {
    type: ControlType.DISPLAY,
    name: 'State',
    label: 'State',
  },
  {
    type: ControlType.DISPLAY,
    name: 'District',
    label: 'District',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Pincode',
    label: 'Pincode',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Country',
    label: 'Country',
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
 
const ServiceDetails: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'consumerSiteDetails',
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
       },
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
        cellEditorParams: {
          required:true
        }
        
      },
      {
        title: 'UOM',
        dataField: 'TARIFF_UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'TARIFF_UOM',
            required:true
          }
      },
      {
        title: 'Contracted Quantum',
        dataField: 'CONTRACTED_QUANTUM',
        cellEditor: TableCellEditorType.TEXTBOX,  
        cellEditorParams:{
          required: true
        }     
      },
      {
        title: 'Actual Units',
        dataField: 'ACTUAL_UNITS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required: true
        }
      },
      {
        title: 'Rate',
        dataField: 'RATE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required: true
        }   
      },
      {
        title: 'Value',
        dataField: 'VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required: true
        }
      },
    ],
  },
];
const CreditUnitDetailsTOD: IControlDefinition[] = [
  {
  type: ControlType.TABLE,
  name: 'creditUnitDetailsTOD',
  isPrimeReactTable: true,
  pageSize:7,
  columns: [
{
      title: 'TOD Name',
      dataField: 'TOD_NAME',
     
    },
{
      title: 'Credit Units',
      dataField: 'CREDIT_UNITS',
      cellEditor: TableCellEditorType.TEXTBOX,
      cellEditorParams: {
        required: true
      }
    },
    {
      title: 'seq no',
      dataField: 'SEQ_NO',
      hidden: true,

    },
     
  ],
},
];
 
const OpenAccessCharges: IControlDefinition[] = [
  {
  type: ControlType.TABLE,
  name: 'openAccessCharges',
  isPrimeReactTable: true,
  pageSize:7,
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
            required:true
          }
      
    },
{
      title: 'TCD Code',
      dataField: 'TCD_CODE',
      cellEditor: TableCellEditorType.COMBOBOX,
      cellEditorParams: {
        masterField:"TCD_CODE",
              event :{
        serviceName:'RCRM_DIRECTBILL_ONCHANGE_TCD',
          moduleName :CRM_BILLING,
          input:['TCD_CODE']
          }
        }
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
        cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'OPEN_ACCESS_UOM',
            required:true
          }
          
      },    
 
{
      title: 'Value',
      dataField: 'TCD_VALUE',
      cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            required: true
          }
    },

  ],
},
];

 
const PaymentTermDetails: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'paytermcode',
    label: 'Payterm Code',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Due_Days',
    label: 'Due Date',
  },
  {
    type: ControlType.BUTTON,
    name: 'viewdetails ',
    label: 'View Details ',
    isPrimary: true,
    hidden:(pageData)=>!pageData.paytermcode,
    event: {
      openModal:true,
      modalProps:{
        title:'View Payterm Details',
        componentName:'ViewPayterm',
        sendParams:[{parentField:'paytermcode', childField:"paytermcode"}]
      }
    },
  }
]
const BeneficiaryDetails: IControlDefinition[] = [
   
  {
    type: ControlType.DISPLAY,
    name: 'registeredcompanyname',  
    label: 'Registered Company Name',
  },
  {
    type: ControlType.DISPLAY,
    name: 'bankname',  
    label: 'Bank Name',
  },
  {
    type: ControlType.DISPLAY,
    name: 'branchname',  
    label: 'Branch Name',
  },
  {
    type: ControlType.DISPLAY,
    name: 'account',  
    label: 'Account #',
  },
  {
    type: ControlType.DISPLAY,
    name: 'accounttype',  
    label: 'Account Type',
  },
  {
    type: ControlType.DISPLAY,
    name: 'ifsccode',  
    label: 'IFSC Code',
  },
{
  type: ControlType.DISPLAY,
  name: 'pan',
  label: 'PAN',
 
},
{
    type: ControlType.DISPLAY,
    name: 'gst',
    label: 'GST',
 
  },
  {
    type: ControlType.DISPLAY,
    name: 'hsncode',
    label: 'HSN Code',
 
  },  
];
 
const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Return',
      label: 'Return',
      event: {
        serviceName: 'RCRM_RETURN_DIRECT_BILL',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },

    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Authorize',
      label: 'Authorize',
      event: {
        serviceName: 'RCRM_AUTHORIZE_DIRECT_BILL',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Cancel',
      label: 'Cancel',
      event: {
        serviceName: 'RCRM_CANCEL_DIRECT_BILL',
        moduleName: CRM_BILLING,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Print',
      label: 'Print',
      //hidden:(pageData)=>pageData.status != 'Authorized', 
      event: {
        getEventProps:(pageData)=>{
          return{
        serviceName: 'RCRM_PRINT_DIRECT_FINALBILL',
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



  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'Notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4,
        errorMessages:{
          required:'Return notes is required'
        } 
},
  ]
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
  serviceName:'RCRM_INIT_FINAL_MANAGE_DIRECTBILL',
  moduleName: CRM_BILLING,
    input: ['bill'] 
};
 
export const Finaldirectbill:React.FC<IPageBaseProps> = (props) => {
    const {bill} = usePageQueryParam();
 
    const initialData: IRFData = {
      bill: bill,
      };
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'}>
   {({values})=>(	
    <>
    <RFCRMToolbar hasBackButton/>    
    <ScrollabeContainer hasHeader={true}>
   
      <RFSection  controls={BillDetails} title={'Bill Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      {/* <RFSection  controls={ReferenceDetails} title={'Producer Details'}  columns={6} className={'section-header-bg-primary'} collapse={false}/> */}
      <RFSection  controls={CustomerDetails} title={'Customer Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={CustomerDeliveryPoint} title={'Consumer Site Details'} columns={6}  className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={BillingSection} title={'Bill To'} columns={6}  className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={ServiceDetails} title={'Service Details'} columns={1}  className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={CreditUnitDetailsTOD} title={'Credit Units Details - TOD'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={OpenAccessCharges} title={'Taxes/Chargers/Discounts'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={PaymentTermDetails} title={'Payment Term Details'} columns={3}  className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={BeneficiaryDetails} title={'Beneficiary Details - From SBU Master'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={NotesSection} title={'Return Notes'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </>
   )}
    </RetinaFormBuilder> )}