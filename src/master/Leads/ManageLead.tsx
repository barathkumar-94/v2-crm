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
  isQueryApiMessagesHaveErrorByErrorLevel,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { leadsHelp } from './leadsHelp';
import { contactHelp } from './contactHelp';
import { CRM_MASTER, CRM_TRANSACTION, DATE_TIME_FORMAT } from '../../common/constants';
import { BusinessSummaryHelp } from '../BusinessPlan/BusinessSummaryHelp';
import { number } from 'yup';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { LeadBusinessHelp } from './LeadBusinessHelp';
import { useRouteNavigation } from '@retina360-ai/core-ui-library-v2/lib/base-components/hooks/useRouteNavigation';

const actionInputs = ['leadcode','leaddescription','industry','leadsource','leadrating','leadstatus',
'sourcename','probclosedate','leadowner','businessplancode','description','sitename',
'companyname','website','annualrevenue','comp_currency','noofemployees','crn','noofloactions',
'demand','pastconsumption','uom_demand','leadvalue','currency','uom_past',
'title','firstname','lastname','mobile','phone','email','department','designation',
'addresstype','address','city','state','district','pincode','country','addtionaldetailsummary',
'notes','attachmentsummary','estimatedTariffRate','creditrating'];

const onEnterEvent: IRFEventParams = {
  input: ['leadcode'],
  moduleName: CRM_TRANSACTION,
  serviceName: 'RCRM_LEAD_ONENTER_MST',
};

const helpComponents = {
    leadsHelp: leadsHelp,
    contactHelp:contactHelp,
    LeadBusinessHelp :LeadBusinessHelp
};


const detailsSection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'leadcode',
    label: 'Lead Code',
    maxLength:80,
    required:false,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Lead',
      componentName: 'leadsHelp',
      receiveParams: [{parentField: 'leadcode', childField: 'LEAD_CODE'},
                      {parentField: 'leaddescription', childField: 'DESCRIPTION'},
                      {parentField: 'industry', childField: 'INDUSTRY'},
                      {parentField: 'leadsource', childField: 'LEAD_SOURCE'},
                      {parentField: 'leadrating', childField: 'LEAD_RATING'},
                      {parentField: 'leadstatus', childField: 'LEAD_STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'leaddescription',
    label: 'Description',
    required:true,
    maxLength:100 
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField:'industry',
    required:true,

  },


  {
    type: ControlType.COMBOBOX,
    name: 'leadrating',
    label: 'Lead Rating',
    masterField:'leadrating',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadsource',
    label: 'Lead Source',
    masterField:'leadsource',
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'leadstatus',
    label: 'Lead Status'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'sourcename',
    label: 'Source Name',
    hidden:(pageData)=>pageData.leadsource == 'CC' || pageData.leadsource == 'DE',
    masterField:'sourcename',
    required:true,
  },
 
  {
    type: ControlType.DATEPICKER,
    name: 'probclosedate',
    label: 'Probable Close Date',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadowner',
    label: 'Lead Owner',
    masterField:'leadowner',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'businessplancode',
    label: 'Business Plan Code',
    required:true,
    maxLength:100,
    event: { 
      input: ['businessplancode'],
    moduleName: CRM_TRANSACTION,
    serviceName: 'RCRM_ONCHNAGE_BUSINESS_LEAD',
  },
  // onBlurEvent:
  // { input: ['businessplancode'],
  //   moduleName: CRM_TRANSACTION,
  //   serviceName: 'RCRM_ONCHNAGE_BUSINESS_LEAD',},

    help: {
      panelTitle: 'Help On Business Plan',
      componentName: 'LeadBusinessHelp',
      receiveParams: [{parentField: 'businessplancode', childField: 'BUSINESS_PLAN_CODE'},
                      {parentField: 'description', childField: 'DESCRIPTION'},
                      {parentField: 'sitename', childField: 'SITE_NAME'},
                    ],
    event: { 
       input: ['businessplancode'],
       moduleName: CRM_TRANSACTION,
       serviceName: 'RCRM_ONCHNAGE_BUSINESS_LEAD',
     },    
  },
},
  {
    type: ControlType.DISPLAY,
    name: 'description',
    label: 'Description',
  },
  {
    type: ControlType.DISPLAY,
    name: 'sitename',
    label: 'Site Name',
  },
];



const CompanySection: IControlDefinition[] = [
  {
  type: ControlType.TEXTBOX,
  name: 'companyname',
  label: 'Company Name',
  required:true,
  maxLength:100,
},
{
  type: ControlType.TEXTBOX,
  name: 'website',
  label: 'Website',
  maxLength:100,
},
{
  type: ControlType.TEXTBOX,
  name: 'annualrevenue',
  label: 'Annual Revenue',
  inputType:"number",
  maxLength:80,
},
{
  type: ControlType.DISPLAY,
  name: 'comp_currency',
  label: 'Currency',
},
{
  type: ControlType.TEXTBOX,
  name: 'creditrating',
  label: 'Credit Rating',
  maxLength:80
},
{
  type: ControlType.HIDDEN,
  name: 'noofemployees',
  label: '# of Employees',
 // inputType:"integer"
},
{
  type: ControlType.TEXTBOX,
  name: 'crn',
  label: 'CIN',
  maxLength:100,
  required:true
},
{
  type: ControlType.TEXTBOX,
  name: 'noofloactions',
  label: '# of Locations',
  inputType:"integer"
},
];

const informationSection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'demand',
    label: 'Demand(Yearly)',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.COMBOBOX,
    name: 'uom_demand',
    label: 'UOM',
    masterField:'uom_demand',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'pastconsumption',
    label: 'Past Consumption(Yearly)',
    inputType:"number"
  },
  {
    type: ControlType.COMBOBOX,
    name: 'uom_past',
    label: 'UOM',
    masterField:'uom_past',

  },
  {
    type: ControlType.TEXTBOX,
    name: 'estimatedTariffRate',
    label: 'Estimated Tariff Rate',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.DISPLAY,
    name: 'leadvalue',
    label: 'Lead Value(INR)',
    //inputType:"number"
  },
  {
    type: ControlType.DISPLAY,
    name: 'currency',
    label: 'Currency',
    hidden:true
  },
 
];


const addressSection: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'addresstype',
  label: 'Address Type',
  // masterField:'addresstype'
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
  masterField:'state',
  event :{
    serviceName:'ONCHANGE_STATE_TRAN',
    moduleName :CRM_TRANSACTION,
    input:['state']
    }
},
{
  type: ControlType.COMBOBOX,
  name: 'district',
  label: 'District',
  masterField:'district'
},
{
  type: ControlType.TEXTBOX,
  name: 'pincode',
  label: 'Pincode',
  inputType:"number",
  maxLength:6
},
{
  type: ControlType.DISPLAY,
  name: 'country',
  label: 'Country',
},

];

const contactSection: IControlDefinition[] = [
    {
    type: ControlType.COMBOBOX,
    name: 'title',
    label: 'Title',
    required:true,
    masterField:'title',
    
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
    required:true,
    maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastname',
    label: 'Last Name',
    maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
    required:true,
    inputType:"number",
    maxLength:10
  },
  {
    type: ControlType.TEXTBOX,
    name: 'phone',
    label: 'Phone',
    inputType:"number",
    maxLength:10
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




const addtionaldetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'addtionaldetailsummary',
      isPrimeReactTable: true,
      pageSize:7,
      filter:true,
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
          required:true,
        }
        },
        {
          title: 'First Name',
          dataField: 'FIRST_NAME', 
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
          maxLength:100 ,
          required:true,
         
        }
        },
        {
          title: 'Last Name',
          dataField: 'LAST_NAME',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:100          
          }
        },
        {
          title: 'Mobile',
          dataField: 'MOBILE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType:"number",
            maxLength:10,
            required:true,

          }
        },
        {
          title: 'Phone',
          dataField: 'PHONE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType:"number",
            maxLength:10
          }
        },
        {
          title: 'Email',
          dataField: 'EMAIL',          
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"email",
            maxLength:80,
            required:true,

          }
        },
        {
          title: 'Department',
          dataField: 'DEPARTMENT',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:80          
          }
        },
        {
          title: 'Designation',
          dataField: 'DESIGNATION',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:80          
          }
        },
        {
            title: 'Address Type',
            dataField: 'ADDRESS_TYPE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
                masterField:'ADDRESS_TYPE'
            }
        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              maxLength:400          
            }
          },
          {
            title: 'City',
            dataField: 'CITY',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              maxLength:100          
            }
          },
        {
          title: 'State',
          dataField: 'STATE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'STATE',
            event :{
              serviceName:'ONCHANGE_STATE_DTL_TRAN',
              moduleName :CRM_TRANSACTION,
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
            cellEditorParams:{
              inputType:"number",
              maxLength:6
            }
          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
          },
  
      ],
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
      name: 'attachmentsummary',
      isPrimeReactTable: true,
      pageSize:7,
      editorProps:{
        isEditable:true,
      },
      columns: [
        {
          title: 'Upload Document',
          dataField: 'UPLOAD_DOC',
          filter:false,
          cellRenderer: TableCellRendererType.FILE_UPLOADER,
          cellRendererParams:{
            maximumAllowedFileSizeInMB: 10,
            allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
            originalFileNameField:'file_name',
            required:true,

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
          cellEditorParams: {
            maxLength:400          
          }
        },
    ],
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

  const actionBarButtons: IControlDefinition[] =  [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_LEAD_CREATE_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs]
      },
    },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',
        event: {
          serviceName: 'RCRM_LEADS_SAVE_MST',
          moduleName: CRM_TRANSACTION,
          input: [...actionInputs],
  
        },
      },
      
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'drop',
        label: 'Drop',
        event: {
          serviceName: 'RCRM_LEADS_DROP_MST',
          moduleName: CRM_TRANSACTION,
          input: [...actionInputs],
  
        },
      },
      
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'opportunitybtn',
        label: 'Convert to Opportunity',
        hidden:(pageData)=>pageData.leadstatus == 'Converted',    
        event: {
          moduleName:CRM_TRANSACTION,
          serviceName:'RCRM_LEAD_CONVERT_TO_OPPORTUNITY',
          input: ['leadcode','businessplancode'],
          linkTo:'/ManageLeadOpportunity',
          isLinkToIfNoErrorInQueryApi:true,
          queryParams:[{sourceField:'leadcode', targetField:'code'}]
        },
      },
      
    ];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_LEAD_INIT_MST',
  moduleName: CRM_TRANSACTION,
    input: ['leadcode']
};

export const ManageLead:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
      leadcode: code,
      };

  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={detailsSection} title={'Lead Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={CompanySection} title={'Company Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={informationSection} title={'Assessment Information'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={addressSection} title={'Company Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={contactSection} title={'Primary Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={addtionaldetailsSection} title={'Additional Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
