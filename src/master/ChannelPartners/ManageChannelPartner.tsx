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
import { CRM_MASTER } from '../../common/constants';
import {  DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { ChannelPartnerHelp } from './ChannelPartnerHelp';

const actionInputs = ['ChannelPartnerCode', 'ChannelPartnerName', 'Website','Address','City','state','district','Pincode',
'Country','status','Title','notes','FirstName','LastName','Mobile','Phone','Email',
'Department','Designation','channelpartnermastersummary','channelpartnerattachmentgrid'];

const onEnterEvent: IRFEventParams = {
  input: ['ChannelPartnerCode'],
  moduleName: CRM_MASTER,
  serviceName: 'ONENTER_CHANNELPARTNER_MST',
};

const helpComponents = {
    ChannelPartnerHelp: ChannelPartnerHelp
};
const AgencySection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'ChannelPartnerCode',
    label: 'Channel Partner Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Agency Master',
      componentName: 'ChannelPartnerHelp',
      receiveParams: [{parentField: 'ChannelPartnerCode', childField: 'ChannelPartnerCode'},
                     ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'ChannelPartnerName',
    label: 'Channel Partner Name',
    maxLength:100,
     required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Website',
    label: 'Website', 
    maxLength:100,
    // required:true
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'AgencyType',
//     label: 'Agency Type',
//     required:true
//   },
  
  {
    type: ControlType.TEXTBOX,
    name: 'Address',
    label: 'Address',
     required:true,
     maxLength:400,
  },

  {
    type: ControlType.TEXTBOX,
    name: 'City',
    label: 'City',
    required:true,
    maxLength:100
  },

  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
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
      required:true,
   
  },
  {
    type: ControlType.COMBOBOX,
    name: 'district',
    label: 'District',  
    required:false
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Pincode',
    label: 'Pincode',
    inputType:"number",
    maxLength:6,
    required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'Country',
    label: 'Country',
    // required:true
  },
 
//   {
//     type: ControlType.COMBOBOX,
//     name: 'ParentAgency',
//     label: 'Parent Agency',
//   },
 
 
];

const ContactSection: IControlDefinition[] = [
  
  {
    type: ControlType.COMBOBOX,
    name: 'Title',
    label: 'Title',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'FirstName',
    label: 'First Name',
   required:true,
   maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'LastName',
    label: 'Last Name',
   required:false,
   maxLength:100,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Mobile',
    label: 'Mobile',
    inputType:"number",
    maxLength:10,
   required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Phone',
    label: 'Phone',
    inputType:"number",
    maxLength:10,
   // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Email',
    label: 'Email',
    required:true,
    inputType:"email",
    maxLength:80,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Department',
    label: 'Department',
    maxLength:80,
    //required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Designation',
    label: 'Designation',
    maxLength:80
   // required:true
  },
 
 
];
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'channelpartnermastersummary',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
      resetFieldsOnRowDuplicate:['KEY']
    },
    columns: [
      {
     
        title: 'Key',
        dataField: 'KEY',
        hidden:true
      },
        {
            title: 'Title',
            dataField: 'TITLE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'TITLE',
            }
          },
          {
            title: 'First Name',
            dataField: 'FIRSTNAME',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:100,
            }
          },
          {
            title: 'Last Name',
            dataField: 'LASTNAME',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              //required:true,
              maxLength:100,
            }
          },
          {
            title: 'Mobile',
            dataField: 'MOBILE',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required:true,
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
              required:true,
              inputType:"email",
              maxLength:80
            }
          },
          {
            title: 'Department',
            dataField: 'DEPARTMENT',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              //required:true,
              maxLength:80,
            }
          },
          {
            title: 'Designation',
            dataField: 'DESIGNATION',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              //required:true,
              maxLength:80,
            }
          },
          {
            title: 'Address Type',
            dataField: 'ADDRESSTYPE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              masterField: 'ADDRESSTYPE',
            }
          },
          {
            title: 'Address',
            dataField: 'ADDRESS',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              //required:true,
              maxLength:400,
            }
          },
          {
            title: 'City',
            dataField: 'CITY',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              //required:true,
              maxLength:80,
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
                input:['STATE']
              }
            }
        
        
        },
        {
          title: 'District',
          dataField: 'DISTRICT',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams:{
            commaSeparatedOptionsField:'DISTRICT_MASTER'
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
    
          },
        ]
  },
]
;

  const attachmentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'channelpartnerattachmentgrid',
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
        cellEditorParams:{
          //required:true,
          maxLength:400,
        }

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
          serviceName: 'CREATE_CHANNELPARTNER_MST',
          moduleName: CRM_MASTER,
          input: [...actionInputs],
        },
      },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'ACTIVATE_CHANNELPARTNER_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs,'channelpartnerattachmentgrid'],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_CHANNELPARTNER_MST',
        moduleName: CRM_MASTER,
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

  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4 
},
]   




const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_CHANNELPARTNER_MST',
  moduleName: CRM_MASTER,
    input: ['ChannelPartnerCode']
};

export const ManageChannelPartner:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
        ChannelPartnerCode: code,
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={AgencySection} title={'Channel Partner Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={ContactSection} title={'Primary Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={tableSection}  title={'Additional Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
