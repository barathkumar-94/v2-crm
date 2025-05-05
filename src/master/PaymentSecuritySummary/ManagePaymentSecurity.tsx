
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
  TableCellRendererType,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { PaymentHelp } from './PaymentHelp';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CustomerAccountHelp } from '../CustomerAccount/CustomerAccountHelp';
 
const actionInputs = ['Attachments','Instrumentno','notes','CustomerName','customercode','PaymentSecurityCode', 'PaymentSecurityName','TransactionType','TransactionReference', 'BeneficiaryName','IssuingBank','Amount','Currency','InstrumentType','InstrumentCategory','Instrument','DateofIssue','DateofExpiry','ClaimDate','PPADate','PPA','title','CustomerName','approvalNotes','receivedBy','receivedDate','refNo'];
 
const onEnterEvent: IRFEventParams = {
  input: ['PaymentSecurityCode'],
  moduleName: CRM_TRANSACTION,
  serviceName: 'RCRM_ONENTER_PAYMENT_TRAN',
};
 
const helpComponents = {
    PaymentHelp:PaymentHelp,
    CustomerAccountHelp:CustomerAccountHelp
};
 
const GeneralSection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'PaymentSecurityCode',
    label: 'Payment Security Code',
    required:false,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Payment Summary',
      componentName: 'PaymentHelp',
      receiveParams: [{parentField: 'PaymentSecurityCode', childField: 'PAYMENT_SECURITY_CODE'},
                      {parentField: 'PaymentSecurityName', childField: 'PAYMENT_SECURITY_NAME'},
                      {parentField: 'TransactionType', childField: 'TRANSACTION_TYPE'},
                      {parentField: 'TransactionReference', childField: 'TRANSACTION_REFERENCE'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'PaymentSecurityName',
    label: 'Payment Security Name',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'WF_Status',
    label: 'Workflow Status'
  }
   
];
const PPASection: IControlDefinition[] = [
{
  type: ControlType.COMBOBOX,
  name: 'PPA',
  label: 'PPA#',
  required:true,
  masterField:'PPA',
  event :{
    serviceName:'RCRM_PAYMENT_PPA_ONCHANGE',
    moduleName :CRM_TRANSACTION,
    input:['PPA']
    }
},
{
  type: ControlType.DISPLAY,
  name: 'PPADate',
  label: 'PPA Date',
  format:DATE_FORMAT
},
{
  type: ControlType.DISPLAY,
  name: 'title',
  label: 'Title',
},
{
  type: ControlType.DISPLAY,
  name: 'customercode',
  label: 'Customer Code',
  hidden:true,
},
{
  type: ControlType.DISPLAY,
  name: 'CustomerName',
  label: 'Customer Name'
}
 
];
const InstrumentDetailsSection: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'BeneficiaryName',
    label: 'Beneficiary Name',  
    required:true,
    //maxLength:125,
    },
  {
    type: ControlType.TEXTBOX,
    name: 'IssuingBank',
    label: 'Issuing Bank',
    required:true,
    maxLength:80,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Amount',
    label: 'Amount',
    required:true,
    inputType: 'number'
  },
  {
    type: ControlType.DISPLAY,
    name: 'Currency',
    label: 'Currency',
 
  },
  {
    type: ControlType.COMBOBOX,
    name: 'InstrumentType',
    label: 'Instrument Type',
    masterField:'InstrumentType',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'InstrumentCategory',
    label: 'Instrument Category',
    masterField:'InstrumentCategory',
    required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Instrumentno',
    label: 'Instrument #',
    maxLength:80,
 
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateofIssue',
    label: 'Date of Issue',
    required:true,
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'DateofExpiry'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateofExpiry',
    label: 'Date of Expiry',
    required:true,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateofIssue'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'ClaimDate',
    label: 'Claim Date',
    required:true,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateofIssue'
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'receivedBy',
    label: 'Received By',
    maxLength:100 
  },
  {
    type: ControlType.DATEPICKER,
    name: 'receivedDate',
    label: 'Received Date',
    required:false,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateofIssue'
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'refNo',
    label: 'Locker/Docket Ref #',
    maxLength:100,
 
  },
];
const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4
},
]
const attachmentSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'Attachments',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
    },
    columns: [
     
{
        title: 'Upload Document',
        dataField: 'UPLOAD_DOC',
        cellRenderer: TableCellRendererType.FILE_UPLOADER,
        cellRendererParams:{
          maximumAllowedFileSizeInMB: 10,
          allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
          originalFileNameField:'file_name'
        } ,        
        },
        {
          title: 'File Name',
          dataField: 'file_name',        
        },
      {
        title: 'Remarks',
        dataField: 'REMARKS',
        cellEditor: TableCellEditorType.TEXTBOX,

      },
  ],
},
]
const actionBarButtons: IControlDefinition[] = [
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'create',
        label: 'Create',
        event: {
          serviceName: 'RCRM_CREATE_PAYMENT_MST',
          moduleName: CRM_TRANSACTION,
          input: [...actionInputs],
        },
      },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      hidden:(pageData)=>!(pageData.status == 'Working' &&  !pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_SAVE_PAYMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Amend',
      label: 'Amend',
      hidden:(pageData)=>!(pageData.status == 'Confirmed' || (pageData.status == 'Amended' &&  !pageData.WF_Status)), 
      event: {
        serviceName: 'RCRM_AMEND_PAYMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'submit',
      label: 'Submit',
      hidden:(pageData)=>!( (pageData.status == 'Working' || pageData.status == 'Amended') &&  !pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_SUBMIT_PAYMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Approve',
      label: 'Approve',
      hidden:(pageData)=>!((pageData.status == 'Working' || pageData.status == 'Amended')  &&  pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_APPROVE_PAYMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    }, 
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Reject',
      label: 'Reject',
      hidden:(pageData)=>!((pageData.status == 'Working' || pageData.status == 'Amended')  &&  pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_REJECT_PAYMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },/*
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'CANCEL',
      label: 'Cancel',
      event: {
        serviceName: 'RCRM_CANCEL_PAYMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },
    */
  ];
 
 
export const DataSection: IControlDefinition[] = [
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
      format:DATE_TIME_FORMAT
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
      format:DATE_TIME_FORMAT
    },
  ];
  const ApprovalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'approvalNotes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4 
},
] 
const statusProgressSection: IControlDefinition[] = [
  {
    type: ControlType.STATUS_TIMELINE,
    name: 'approvalHistory',
    titleField:'description',
    primaryTextField:'approvedBy',
    secondaryTextField:'approvedDate',
    tooltipTextField:'remarks'
  },
];
const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_PAYMENT_MST',
  moduleName: CRM_TRANSACTION,
    input: ['PaymentSecurityCode','PaymentSecurityName']
};
 
export const ManagePaymentSecurity:React.FC<IPageBaseProps> = (props) => {
    const {id,name} = usePageQueryParam();
 
    const initialData: IRFData = {
        PaymentSecurityCode: id,
        PaymentSecurityName: name
      };
 
 
      return (
        <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
         {({values})=>(
         <>
          <RFCRMToolbar hasBackButton/>
          <ScrollabeContainer hasHeader={true}>
          {(Array.isArray(values.approvalHistory) && values.approvalHistory.length > 0) && <RFSection  controls={statusProgressSection} columns={1} title={'Payment Security - Workflow State'} className={'section-header-bg-primary'} collapse={false}/>}
            <RFSection  controls={GeneralSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
            <RFSection  controls={PPASection} title={'PPA Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
            <RFSection  controls={InstrumentDetailsSection} title={'Instrument Details'}columns={6} className={'section-header-bg-primary'} collapse={false}/>
            <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
           <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
           {((values.status == 'Working' || values.status == 'Amended')  &&  values.WF_Status) &&  <RFSection  controls={ApprovalSection} title={'Approval/Rejection Notes'} columns={1} className={'section-header-bg-primary'} collapse={false}/> }
          </ScrollabeContainer>
          <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
          </>
          )}
        </RetinaFormBuilder>
      );
    };
   
 
 