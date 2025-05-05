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
import { contactHelp } from '../Leads/contactHelp';
import { CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { BusinessSummaryHelp } from '../BusinessPlan/BusinessSummaryHelp';
import { number } from 'yup';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CustomerAccountHelp } from '../CustomerAccount/CustomerAccountHelp';
import { RFFooter } from '../../common/components/footer';
import { LeadBusinessHelp } from '../Leads/LeadBusinessHelp';
import { DirectOpportunityHelp } from './DirectOpportunityHelp';
import { OpportunityCustomerAccountHelp } from './OpportunityCustomerHelp';

const actionInputs = ['opportunitycode','opportunitydescription','opportunitystatus','industry',
'opportunitysource','sourcename','opportunityrating','probableclosedate','probability','opportunitystage',
'existingcustomer','customercode','businessplancode','description',
'sitename','opportunityowner','companyname','website','annualrevenue','comp_currency','noofemployees','crn',
'nooflocations','demand','uom_demand','pastconsumption','uom_past','opportunityvalue',
'currency','addresstype','address','city','state','district','pincode','country','title','firstname','lastname','mobile','phone','email','department','designation','addtionaldetailsummary','existingconsumption',
'notes','attachmentsummary','opportunitycodehdn','estimatedTariffRate','creditrating'];

const onEnterEvent: IRFEventParams = {
  input: ['opportunitycode'],
  moduleName: CRM_TRANSACTION,
  serviceName: 'RCRM_DIRECT_OPPORTUNIYT_ONENTER_MST',
};

const helpComponents = {
  DirectOpportunityHelp: DirectOpportunityHelp,
    contactHelp:contactHelp,
    LeadBusinessHelp:LeadBusinessHelp,
    OpportunityCustomerAccountHelp:OpportunityCustomerAccountHelp
   // CustomerAccountHelp:CustomerAccountHelp

};


const detailsSection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'opportunitycode',
    label: 'Opportunity Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Opporunity',
      componentName: 'DirectOpportunityHelp',
      receiveParams: [{parentField: 'opportunitycode', childField: 'OPPORTUNITY_CODE'},
                      {parentField: 'opportunitydescription', childField: 'DESCRIPTION'},
                      {parentField: 'industry', childField: 'INDUSTRY'},
                      {parentField: 'opportunitysource', childField: 'OPPORTUNITY_SOURCE'},
                      {parentField: 'opportunityrating', childField: 'OPPORTUNITY_RATING'},
                      {parentField: 'opportunitystage', childField: 'OPPORTUNITY_STAGE'},
                      {parentField: 'probableclosedate', childField: 'PROBABLE_CLOSE_DATE'},
                      {parentField: 'probability', childField: 'PROBABILITY'},
                      {parentField: 'opportunitystage', childField: 'OPPORTUNITY_OWNER'},
                      {parentField: 'opportunitystatus', childField: 'OPPORTUNITY_STATUS'}],
event: onEnterEvent
    }
  },
  {
    type: ControlType.HIDDEN,
    name: 'opportunitycodehdn',
    label: 'Opportunity Code'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'opportunitydescription',
    label: 'Description',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    required: true,
    masterField:'industry'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitystage',
    label: 'Opportunity Stage',
    masterField:'opportunitystage',
    required: true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitysource',
    label: 'Opportunity Source',
    required: true,
    masterField:'opportunitysource' 
  },
  {
    type: ControlType.DISPLAY,
    name: 'opportunitystatus',
    label: 'Opportunity Status',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'sourcename',
    label: 'Source Name',
    masterField:'sourcename',
    required:true,
    hidden:(pageData)=>!pageData.opportunitysource || pageData.opportunitysource == 'CC' || pageData.opportunitysource == 'DE',
 
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'opportunityrating',
    label: 'Opportunity Rating',
    required: true,
    masterField:'opportunityrating' 
  },
 
  {
    type: ControlType.DATEPICKER,
    name: 'probableclosedate',
    label: 'Probable Close Date',
    required: true,
  


  },
  {
    type: ControlType.TEXTBOX,
    name: 'probability',
    label: 'Probability(%)',
    inputType: 'number',
  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'existingcustomer',
    label: 'Existing Customer',
    masterField:'existingcustomer',
    required: true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customercode',
    label: 'Customer(Account)',
    maxLength:80,
    required: true,
    hidden:(pageData)=>pageData.existingcustomer == 'NO',
    event: { 
      input: ['customercode'],
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_ONCHNAGE_CUSTOMER_LEAD',
    },
    help: {
    panelTitle: 'Help On Customer Account',
    componentName: 'OpportunityCustomerAccountHelp',
    receiveParams: [{parentField: 'customercode', childField: 'CUSTOMER_CODE'},
              ],
    event: { 
       input: ['customercode'],
       moduleName: CRM_TRANSACTION,
       serviceName: 'RCRM_ONCHNAGE_CUSTOMER_LEAD',
     },    
  }, 
  }, 
  {
    type: ControlType.TEXTBOX,
    name: 'businessplancode',
    label: 'Business Plan Code',
    required: true,
    maxLength:80,
    event: { 
      input: ['businessplancode'],
    moduleName: CRM_TRANSACTION,
    serviceName: 'RCRM_ONCHNAGE_BUSINESS_LEAD',
  },
    help: {
      panelTitle: 'Help On Business Plan',
      componentName: 'LeadBusinessHelp',
        receiveParams: [{parentField: 'businessplancode', childField: 'BUSINESS_PLAN_CODE'},
                      {parentField: 'description', childField: 'DESCRIPTION'},
                      {parentField: 'sitename', childField: 'SITE_NAME'},],
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
  {
    type: ControlType.COMBOBOX,
    name: 'opportunityowner',
    label: 'Opportunity Owner',
    masterField:'opportunityowner',
    required: true
  }, 
];

const companyDetails: IControlDefinition[] = [
  {
  type: ControlType.TEXTBOX,
  name: 'companyname',
  label: 'Company Name',
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
  inputType: 'number',
},
{
  type: ControlType.DISPLAY,
  name: 'comp_currency',
  label: 'Currency',
},
{
  type: ControlType.TEXTBOX,
  name: 'noofemployees',
  label: '# of Employees',
  inputType: 'integer',
  hidden:true
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
  maxLength:100,
  required:true
},
{
  type: ControlType.TEXTBOX,
  name: 'nooflocations',
  label: '# of Locations',
  inputType: 'integer',
},
];

const assetInformation: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'demand',
    label: 'Demand(Yearly)',
    required:true,
    inputType: 'number',
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
    inputType: 'number',
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
    name: 'opportunityvalue',
    label: 'Opportunity Value(INR)',
    required: true,
    //inputType: 'number',
  },
  {
    type: ControlType.DISPLAY,
    name: 'currency',
    label: 'Currency',
    hidden:true
  },
];

const companyAddress: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'addresstype',
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
maxLength:100,

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
  masterField:'district',
  
},
{
  type: ControlType.TEXTBOX,
  name: 'pincode',
  label: 'Pincode',
  inputType: 'number',
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
    masterField:'title',
    required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastname',
    label: 'Last Name',
    maxLength:100,

  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
    inputType: 'number',
    maxLength: 10,
    required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'phone',
    label: 'Phone',
    inputType: 'number',
    maxLength:10
  },
  {
    type: ControlType.TEXTBOX,
    name: 'email',
    label: 'Email',
    inputType: 'email',
    required:true,
    maxLength:80,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'department',
    label: 'Department',
    maxLength:80,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'designation',
    label: 'Designation',
    maxLength:80,
  },
];

const addtionaldetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'addtionaldetailsummary',
      isPrimeReactTable: true,
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
            required:true,
          }
 
        },
        {
          title: 'Last Name',
          dataField: 'LAST_NAME',
          cellEditor: TableCellEditorType.TEXTBOX,
        },
        {
          title: 'Mobile',
          dataField: 'MOBILE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
                inputType: 'number',
                maxLength: 10,
                required: true,
          }
        },
        {
          title: 'Phone',
          dataField: 'PHONE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            inputType: 'number',
            maxLength: 10,
      }
        },
        {
          title: 'Email',
          dataField: 'EMAIL',          
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            inputType: 'email',
            required: true,
      }
        },
        {
          title: 'Department',
          dataField: 'DEPARTMENT',
          cellEditor: TableCellEditorType.TEXTBOX,
        },
        {
          title: 'Designation',
          dataField: 'DESIGNATION',
          cellEditor: TableCellEditorType.TEXTBOX,
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
          },
          {
            title: 'City',
            dataField: 'CITY',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
        {
          title: 'State',
          dataField: 'STATE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams:{
            masterField:'STATE',
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
              inputType: 'number',
              maxLength: 6
            }
          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
          },
  
      ],
    },
  ];
  const existingConsumption: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'existingconsumption',
      isPrimeReactTable: true,
      editorProps:{
        isEditable:true,
      },
      columns: [
        {
          title: 'Source Of Energy',
          dataField: 'SOURCE_OF_ENERGY',
          cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
              masterField:'SOURCE_OF_ENERGY',
              required:true,

            } 
        },
        {
          title: 'Capacity',
          dataField: 'CAPACITY', 
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType: 'number',
            required:true,
          }
        },
        {
          title: 'UOM',
          dataField: 'UOM',
          cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
              masterField:'UOM',
              required:true,
            } 
        },
        {
          title: 'Remarks',
          dataField: 'REMARKS', 
          cellEditor: TableCellEditorType.TEXTBOX,
        },
    ],
},
  ]

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
      serviceName: 'RCRM_OPPORTUNITY_CREATE_MST',
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
        serviceName: 'RCRM_OPPORTUNITY_SAVE_MST',
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
        serviceName: 'RCRM_OPPORTUNITY_DROP_MST',
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
  serviceName: 'RCRM_OPPORTUNITY_INIT_MST',
  moduleName: CRM_TRANSACTION,
    input: ['opportunitycode']
};

export const ManageOpportunity:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
      opportunitycode: code
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={detailsSection} title={'Opportunity Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={companyDetails}  title={'Company Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={assetInformation} title={'Assessment Information'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={companyAddress} title={'Company Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={contactSection} title={'Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>  
        <RFSection  controls={addtionaldetailsSection} title={'Additional Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={existingConsumption} title={'Existing Consumption'} columns={1} className={'section-header-bg-primary'} collapse={false}/>        
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
