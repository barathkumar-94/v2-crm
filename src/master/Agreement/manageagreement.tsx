import * as React from 'react';
 
import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  usePageQueryParam,
  IRFData,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { agreementHelp } from './agreementHelp';
 
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_TRANSACTION, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { PPAHelp } from '../PPA/PPAHelp';
import { RFFooter } from '../../common/components/footer';
// import { truncate } from 'lodash';
 
const actionInputs = ['agreement', 'agreementDate','title','agreementType','status','amendment','effectiveStartDate','effectiveEndDate','ppa','customercode',
  'CustomerName',
  'ppaDate','ppa_title','Notes','attachmentsummary','receivedBy','receivedDate','refNo', 'notificationStartDays', 'notificationStartDate'];
 
const onEnterEvent: IRFEventParams = {
  input: ['agreement'],
  moduleName: CRM_TRANSACTION,
  serviceName: 'RCRM_ONENTER_AGREEMENT_MST',
};
 
const helpComponents = {
  agreementHelp: agreementHelp,
  PPAHelp:PPAHelp
};
const generalSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'agreement',
    label: 'Agreement #',
    required:false,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Agreement',
      componentName: 'agreementHelp',
      receiveParams: [{parentField: 'agreement', childField: 'AGREEMENT'},
                      {parentField: 'agreementDate', childField: 'AGREEMENT_DATE'},
                      {parentField: 'title', childField: 'TITLE'},
                      {parentField: 'agreementType', childField: 'AGREEMENT_TYPE'},
                      {parentField: 'status', childField: 'STATUS'},
                      {parentField: 'effectiveStartDate', childField: 'EFFECTIVE_START_DATE'},
                      {parentField: 'effectiveEndDate', childField: 'EFFECTIVE_END_DATE'}],
      event: onEnterEvent
    }
 
  },
  {
    type: ControlType.DATEPICKER,
    name: 'agreementDate',
    label: 'Agreement Date',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'title',
    label: 'Title',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'agreementType',
    label: 'Agreement Type',
    required:true,
    masterField:'agreementType',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'amendment',
    label: 'Amendment #',
    masterField:'amendment',
    event :{
      serviceName:'RCRM_ONCHANGE_AGREEEMENT_MST',
      moduleName :CRM_TRANSACTION,
      input:['amendment','agreement']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
    //required:true
  },
  {
    type: ControlType.DATEPICKER,
    name: 'effectiveStartDate',
    label: 'Effective Start Date',
    required:true
  },
  {
    type: ControlType.DATEPICKER,
    name: 'effectiveEndDate',
    label: 'Effective End Date',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'notificationStartDays',
    label: 'Notification Start Days',
    inputType:'number',
    required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'notificationStartDate',
    label: 'Notification Start Date',
    format:DATE_FORMAT
    // required:true
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
    required:false
  },
  {
    type: ControlType.TEXTBOX,
    name: 'refNo',
    label: 'Locker/Docket Ref #',
    maxLength:100,
 
  }
 
];
 
const ppaDetails: IControlDefinition[] = [
  //   {
  //   type: ControlType.TEXTBOX,
  //   name: 'ppa',
  //   label: 'PPA #',
  //   required:true,
  //   event:{
  //     input: ['ppa'],
  //     moduleName: CRM_TRANSACTION,
  //     serviceName: 'ONENTER_PPA_MST',
  //   },
  // help: {
  //   panelTitle: 'Help On PPA',
  //   componentName: 'PPAHelp',
  //   receiveParams: [{parentField: 'ppa', childField: 'PPA'},
  //                   {parentField: 'ppaDate', childField: 'PPA_Date'},
  //                   {parentField: 'ppa_title', childField: 'TITLE'},
  //           ],
  //   event: {
  //     input: ['ppa'],
  //     moduleName: CRM_TRANSACTION,
  //     serviceName: 'ONENTER_PPA_MST',
     
  //   },
  // }
  // },
  // {
  //   type: ControlType.DISPLAY,
  //   name: 'ppaDate',
  //   label: 'PPA Date',
  //   format:DATE_FORMAT
  // },
  // {
  //   type: ControlType.DISPLAY,
  //   name: 'ppa_title',
  //   label: 'Title',
  // }
  {
    type: ControlType.COMBOBOX,
    name: 'ppa',
    label: 'PPA#',
    required:true,
    masterField:'ppa',
    event :{
      serviceName:'RCRM_AGREEMENT_PPA_ONCHANGE',
      moduleName :CRM_TRANSACTION,
      input:['ppa']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'ppaDate',
    label: 'PPA Date',
    format:DATE_FORMAT
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'ppa_title',
    label: 'Title',
    // required:true
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
    label: 'Customer Name',
 
  },
];
 
 
  const attachmentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'attachmentsummary',
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
          cellEditorParams:{
            maxLength:400
          }
 
        },
    ],
},
  ]
 
  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'Notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4
},
]  
const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {
      serviceName: 'RCRM_CREATE_AGREEMENT_MST',
      moduleName: CRM_TRANSACTION,
      input: [...actionInputs],
    },
  },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_SAVE_AGREEMENT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },
   
   
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'submit',
        label: 'Submit',
        event: {
          serviceName: 'RCRM_SUBMIT_AGREEMENT_MST',
          moduleName: CRM_TRANSACTION,
          input: [...actionInputs],
        },
      },
 
         
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'amend',
        label: 'Amend',
        event: {
          serviceName: 'RCRM_AMEND_AGREEMENT_MST',
          moduleName: CRM_TRANSACTION,
          input: [...actionInputs],
        },
      },
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
      format:DATE_TIME_FORMAT    },
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
 
 
const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_AGREEMENT_MST',
  moduleName: CRM_TRANSACTION,
    input: ['agreement']
};
 
export const ManageAgreement:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();
 
    const initialData: IRFData = {
      agreement: code,
      };
 
 
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={ppaDetails} title={'PPA Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
 