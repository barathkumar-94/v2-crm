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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';


const actionInputs = ['noofLocations','title','firstName','lastName', 'mobile', 'phone', 'email', 'department', 'designation','companyName','website',
  'annualRevenue','currency','noofEmployees','crn','addressType','address','city','state','district','pincode','country','addtionaldetailsummary','Notes','attachmentsummary','attachmentcontactgrid','creditrating'
];

const contactDetailsSection: IControlDefinition[] = [
    {
    type: ControlType.COMBOBOX,
    name: 'title',
    label: 'Title',
    masterField:'title',
    required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstName',
    label: 'First Name',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastName',
    label: 'Last Name',
    maxLength:100
 

  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
    inputType:"number",
    maxLength:10,
   required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'phone',
    label: 'Phone',
    inputType:"number",
    maxLength:10,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'email',
    label: 'Email',
    required:true,
    inputType:"email",
    maxLength:80
  },
  {
    type: ControlType.TEXTBOX,
    name: 'department',
    label: 'Department',
    maxLength:80
  },
  {
    type: ControlType.TEXTBOX,
    name: 'designation',
    label: 'Designation',
    maxLength:80
  },
];
const companyDetails: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'companyName',
    label: 'Company Name',
    maxLength:80,
    required:true,

  },

  {
    type: ControlType.TEXTBOX,
    name: 'website',
    label: 'Website',
    maxLength:100,
  },

  {
    type: ControlType.TEXTBOX,
    name: 'annualRevenue',
    label: 'Annual Revenue',
    maxLength:80,
    inputType:'number' 
  },
  {
    type: ControlType.DISPLAY,
    name: 'currency',
    label: 'Currency',
    
  },
  {
    type: ControlType.TEXTBOX,
    name: 'noofEmployees',
    label: '# of Employees',
    inputType:"number",
    hidden:true,
  },

  {
    type: ControlType.TEXTBOX,
    name: 'creditrating',
    label: 'Credit Rating',
    maxLength:80
  },
  {
    type: ControlType.TEXTBOX,
    name: 'crn',
    label: 'CIN',
    //inputType:"number",
    maxLength:100,
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'noofLocations',
    label: '# of Locations',
    inputType:"number",
  },
];

const companyAddress: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'addressType',
    label: 'Address Type',  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'address',
    label: 'Address',
    maxLength:400
  },

  {
    type: ControlType.TEXTBOX,
    name: 'city',
    label: 'City',
    maxLength:100

  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    event :{
      serviceName:'ONCHANGE_STATE',
      moduleName :'CRM_Master',
      input:['state']
      }, 
  },
  {
    type: ControlType.COMBOBOX,
    name: 'district',
    label: 'District',

  },
  {
    type: ControlType.TEXTBOX,
    name: 'pincode',
    label: 'Pincode',
    inputType:"number",
    maxLength:6,
  },
  {
    type: ControlType.DISPLAY,
    name: 'country',
    label: 'Country',
  },
];

const addtionaldetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'addtionaldetailsummary',
      isPrimeReactTable: true,
      editorProps:{
        isEditable:true,
      },
      columns: [
        {
          title: 'Title',
          dataField: 'TITLE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'TITLE',
        }
        },
        {
          title: 'First Name',
          dataField: 'FIRST_NAME', 
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:100,
            required:true,
          }
        },
        {
          title: 'Last Name',
          dataField: 'LAST_NAME',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:100,
            required:true,
          }
        },
        {
          title: 'Mobile',
          dataField: 'MOBILE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            inputType:"number",
            maxLength:10
          }
        },
        {
          title: 'Phone',
          dataField: 'PHONE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            inputType:"number",
            maxLength:10
          }
        },
        {
          title: 'Email',
          dataField: 'EMAIL',          
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:80,
          }
        },
        {
          title: 'Department',
          dataField: 'DEPARTMENT',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:80,
          }
        },
        {
          title: 'Designation',
          dataField: 'DESIGNATION',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:80,
          }
        },
        {
            title: 'Address Type',
            dataField: 'ADDRESS_TYPE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
             masterField:'ADDRESS_TYPE',
                
            }
        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              maxLength:400,     
             }
          },
          {
            title: 'City',
            dataField: 'CITY',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              maxLength:100,     
             }
          },
          {
            title: 'State',
            dataField: 'STATE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: { 
              masterField: 'STATE',
              event :{
                serviceName:'ONCHANGE_STATE_DTL',
                moduleName :'CRM_Master',
                input:['STATE'],
                
              }
            }
        },
        {
          title: 'District',
          dataField: 'DISTRICT',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams:{
            commaSeparatedOptionsField:'DISTRICT_MASTER',
            
          }     
      },
          {
            title: 'Pincode',
            dataField: 'PINCODE',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
              maxLength:6
            }
          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
            cellEditorParams: {
              inputType:"number",
              maxLength:100
            }
          },
  
      ],
    },
  ];
  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'Notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4 
},
]   

  const attachmentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'attachmentcontactgrid',
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
          originalFileNameField:'file_name' } ,         
          
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
      serviceName: 'RCRM_CREATE_CONTACT_MST',
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
        serviceName: 'RCRM_SAVE_CONTACT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },
   
    
    
  ];
export const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
    format:DATE_TIME_FORMAT,
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
      format:DATE_TIME_FORMAT,
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_MANAGE_CONTACTS',
  moduleName: CRM_TRANSACTION,
    input: ['crn']
};

export const ManageContact:React.FC<IPageBaseProps> = (props) => {
    const {name} = usePageQueryParam();

    const initialData: IRFData = {
      crn: name,
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={companyDetails} title={'Company Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={companyAddress} title={'Company Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={contactDetailsSection} title={'Primary Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
       <RFSection  controls={addtionaldetailsSection} title={'Additional Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
