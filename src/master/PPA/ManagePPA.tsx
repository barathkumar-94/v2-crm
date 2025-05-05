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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { PayTermHelp } from '../PayTerm/PayTermHelp';
import { CustomerAccountHelp } from '../CustomerAccount/CustomerAccountHelp';

import { TarrifMasterHelp } from '../TariffMaster/TarrifMasterHelp';
import { PPAHelp } from './PPAHelp';
import { PPAServiceHelp } from './PPAServiceHelp';
import { PPAOpportunityHelp } from './PPAOpportunityHelp';
import { PPATariffHelp } from './PPATariffHelp';
import { RFFooter } from '../../common/components/footer';
import { LOIPayTermHelp } from '../LOIMaster/LOIPayTermHelp';
import { ManagePPAHelp } from './ManagePPAHelp';

const actionInputs = ['PPA_No','PPA_Date','Amendment','Title','ppa_value', 'PPA_Status',
  'LOI','LOI_Date','LOI_Amendment','LOI_Title','LOI_Status','Loi_signing_date',
  'Loi_ppa_conversation_day','Loi_ppa_due_date','Not_start_date','Not_start_day','COD','Grace_Days',
'Power_Producer','Scheme','Site',
'Opportunity_Code','Opportunity_Description','Opportunity_Owner','Business_Plan_Code','BP_Description','Site_Name',
'Customer_Account','Customer_Address', 'Customer_Name',
'consumerSiteDetails','ExistingconsumerSiteDetails',
'PPA','PPA_Duration','Commencement_Date','Effective_To','Lock_inPeriod','Lock_inDuration',
'Sha','Sha_Duration','Sha_Commencement_Date','sha_Effective_To','sha_Lock_inPeriod','sha_Lock_inDuration','Equity_Participation',
'Equity_Investment','Min_Consumption_Limit','uom_term_detail','Total_Equity_Share_of_Consumers','Total_Equity_Share',
'Billing_Frequency','Pay_Term','Description','Due_Days','Penalty_per','Rebate_Days','Rebate_per','penalty_type', 'GraceDays','RebateType',
'tariffdetailsummary','ESTIMATED_ANNUAL_GENERATION','QE_UOM','MINIMUM_SUPPLY','MINIMUM_OFFTAKE','ProducerQuantumSummary',
'ConsumerSummary','OpenAccessCharges','DISCOMTarifTODsummary','DISCOMTarifTCDsummary',
'notes','attachmentsummary','SelectTemplate','Penalty_type','Grace_days','Rebate_type','OpportunityCodeHdn','PayTermHdn','approvalNotes','fileName','fileReference','templatePreview',
'inr_in','PRODUCER_OVERALL_SUPPLY','PRODUCER_PEAK_SUPPLY','CONSUMER_OVERALL_SUPPLY','CONSUMER_PEAK_SUPPLY','Customer_Industry','Per_Unit_Investment','uom_term_detail','State'

];

const onEnterEvent: IRFEventParams = {
  input: ['PPA_No','LOI'],
  moduleName: CRM_TRANSACTION,
  serviceName: 'RCRM_PPA_ONENTER_MST',
};

const helpComponents = {
    PPAServiceHelp : PPAServiceHelp,
    PPAOpportunityHelp:PPAOpportunityHelp,
    CustomerAccountHelp :CustomerAccountHelp,
    LOIPayTermHelp : LOIPayTermHelp,
    PPATariffHelp :PPATariffHelp,
    ManagePPAHelp:ManagePPAHelp,
};
const PPADetailsSection: IControlDefinition[] = [
  {
  type: ControlType.TEXTBOX,
  name: 'PPA_No',
  label: 'PPA #',
  maxLength:80,
  required:false,
  event: onEnterEvent,
  help: {
    panelTitle: 'Help On PPA',
    componentName: 'ManagePPAHelp',
    receiveParams: [{parentField: 'PPA_No', childField: 'PPA'},
                    {parentField: 'PPA_Date', childField: 'PPA_DATE'},
                    {parentField: 'Amendment', childField: 'AMENDMENT'},
                    {parentField: 'Title', childField: 'TITLE'},
                    {parentField: 'PPA_Status', childField: 'PPA_STATUS'},
                    {parentField: 'COD', childField: 'COD_DATE'},
                    {parentField: 'Power_Producer', childField: 'POWER_PRODUCER'},
                    {parentField: 'Scheme', childField: 'SCHEME'},
                    {parentField: 'Site', childField: 'SITE'},
                    {parentField: 'Customer_Account', childField: 'CUSTOMER'}],
    event: onEnterEvent
  }
},
{
  type: ControlType.DATEPICKER,
  name: 'PPA_Date',
  label: 'PPA Date',
  required:true
},

{
  type: ControlType.COMBOBOX,
  name: 'Amendment',
  label: 'Amendment #',
  masterField:'Amendment',
  hidden:true,
  event :{
    serviceName:'RCRM_PPA_AMEND_ONCHANGE',
    moduleName :CRM_TRANSACTION,
    input:['Amendment','PPA_No']
    }
},
{
  type: ControlType.TEXTBOX,
  name: 'Title',
  label: 'Title',
  maxLength:1000,
  required:true,
},
{
  type: ControlType.DISPLAY,
  name: 'ppa_value',
  label: 'PPA Value',
},
{
  type: ControlType.DISPLAY,
  name: 'PPA_Status',
  label: 'PPA Status',
  // required:true
},

{
  type: ControlType.DISPLAY,
  name: 'WF_Status',
  label: 'Workflow Status'
},

];
const LOIDetailsSection: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'LOI',
  label: 'LOI/Term Sheet',
},
{
  type: ControlType.DISPLAY,
  name: 'LOI_Date',
  label: 'LOI Date',
  format: DATE_FORMAT

},

{
  type: ControlType.DISPLAY,
  name: 'LOI_Amendment',
  label: 'LOI Version #',
},
{
  type: ControlType.DISPLAY,
  name: 'LOI_Title',
  label: 'Title',
},
{
  type: ControlType.DISPLAY,
  name: 'Loi_signing_date',
  label: 'LOI Signing Date',
  format: DATE_FORMAT,
},

{
  type: ControlType.DISPLAY,
  name: 'LOI_Status',
  label: 'LOI Status',
  // required:true
},
{
  type: ControlType.DISPLAY,
  name: 'Loi_ppa_conversation_day',
  label: 'LOI to PPA Convertion Days',
  
},

{
  type: ControlType.DISPLAY,
  name: 'Loi_ppa_due_date',
  label: 'LOI to PPA Due Date',
  format:DATE_FORMAT
},
{
  type: ControlType.DISPLAY,
  name: 'Not_start_day',
  label: 'Notification Start Days',
},
{
  type: ControlType.DISPLAY,
  name: 'Not_start_date',
  label: 'Notification Start Date',
  format: DATE_FORMAT

},

];

const CODCommercialOperationDate: IControlDefinition[] = [
    {
    type: ControlType.DATEPICKER,
    name: 'COD',
    label: 'COD',
    required:true,
    event:{
      copyHeaderToHeader:[
        {sourceField:'COD', targetField:'Commencement_Date'},
        {sourceField:'COD', targetField:'Sha_Commencement_Date'}
      ]
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Grace_Days',
    label: 'Grace Days',
    required:true,
    inputType:"integer"
  }
];

const ProducerDetailsSection: IControlDefinition[] = [
  {
  type: ControlType.COMBOBOX,
  name: 'Power_Producer',
  label: 'Power Producer',
  required:true,
  disable:true,
  masterField:'Power_Producer',
  event :{
    serviceName:'RCRM_LOI_ONCHANGE_POWER_PRODUCER',
    moduleName :CRM_TRANSACTION,
    input:['Power_Producer']
    }
},
{
  type: ControlType.COMBOBOX,
  name: 'Scheme',
  label: 'Scheme',
  required:true,
  masterField:'Scheme',
  disable:true
},
{
  type: ControlType.COMBOBOX,
  name: 'Site',
  label: 'Site',
  required:true,
  masterField:'Site',
  disable:true
},
{
  type: ControlType.TEXTBOX,
  name: 'State',
  label: 'State',
  hidden:true
    
  },
];

const OpportunityDetailsSection: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'Opportunity_Code',
  label: 'Opportunity Code',
  required:true,
 
},
{
  type: ControlType.HIDDEN,
  name: 'OpportunityCodeHdn',
  label: 'Opportunity Code',
},
{
  type: ControlType.DISPLAY,
  name: 'Opportunity_Description',
  label: 'Description',
},
{
  type: ControlType.DISPLAY,
  name: 'Opportunity_Owner',
  label: 'Opportunity Owner',
},
{
  type: ControlType.DISPLAY,
  name: 'Business_Plan_Code',
  label: 'Business Plan Code',
},
{
  type: ControlType.DISPLAY,
  name: 'BP_Description',
  label: 'Description',
},
{
  type: ControlType.DISPLAY,
  name: 'Site_Name',
  label: 'Site Name',
}
];

const CustomerDetailsSection: IControlDefinition[] = [
  {
  type: ControlType.TEXTBOX,
  name: 'Customer_Account',
  label: 'Customer Account',
  maxLength:80,
  required:true,
  onBlurEvent: {
    serviceName: 'RCRM_LOI_ONCHANGE_CUSTOMER_ACCOUNT',
    moduleName: CRM_TRANSACTION,
    input: ['Customer_Account']
  },
  event:  {
    input: ['Customer_Account'],
   moduleName: CRM_TRANSACTION,
   serviceName: 'RCRM_LOI_ONENTER_CUSTOMER' 
 },
  help: {
    panelTitle: 'Help On Customer Account',
    componentName: 'CustomerAccountHelp',
    receiveParams: [{parentField: 'Customer_Account', childField: 'CUSTOMER_CODE'},
                    {parentField: 'Customer_Name', childField: 'CUSTOMER_NAME'},
                    {parentField: 'Customer_Address', childField: 'ADDRESS'},
                    {parentField: 'Customer_Industry', childField: 'INDUSTRY'},],
    event: {
     input: ['Customer_Account'],
    moduleName: CRM_TRANSACTION,
    serviceName: 'RCRM_LOI_ONENTER_CUSTOMER' 
  }
}
},

{
  type: ControlType.TEXTBOX,
  name: 'Customer_Name',
  label: 'Customer Name',
  // required:true
},

{
  type: ControlType.TEXTBOX,
  name: 'Customer_Address',
  label: 'Address',
  // required:true
},
{
  type: ControlType.TEXTBOX,
  name: 'Customer_Industry',
  label: 'Industry'
}
]; 



const ConsumerSiteDetails: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'consumerSiteDetails',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
    },
    columns: [
     
      {
        title: 'Service Point ID',
        dataField: 'SERVICE_POINT_ID',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          maxLength:80,
          event:  {
            input: ['SERVICE_POINT_ID'],
           moduleName: CRM_TRANSACTION,
           serviceName: 'RCRM_LOI_SERVICE_ONENTER_MST' 
         },
          help: {
            panelTitle: 'Help On Service Point',
            componentName: 'PPAServiceHelp',
			        sendParams:[{parentField:'Customer_Account',childField:'CUSTOMER_CODE', parentSource:'page'}],
            receiveParams: [{parentField: 'SERVICE_POINT_ID', childField: 'SERVICE_POINT_ID'},
                            {parentField: 'DISCOM', childField: 'DISCOM'},
                            {parentField: 'VOLTAGE_LEVEL', childField: 'VOLTAGE_LEVEL'},
                            {parentField: 'RECEIVING_SITE_ADDRESS', childField: 'ADDRESS'}],
            event: {
             input: ['SERVICE_POINT_ID'],
            moduleName: CRM_TRANSACTION,
            serviceName: 'RCRM_LOI_SERVICE_ONENTER_MST' 
          }
        },
        }
     } ,
      {
        title: 'DISCOM',
        dataField: 'DISCOM',
      },
      {
        title: 'Voltage Level',
        dataField: 'VOLTAGE_LEVEL',
      },
      {
        title: 'Receiving Site Address',
        dataField: 'RECEIVING_SITE_ADDRESS',
      },
      {
        title: 'Contracted Energy',
        dataField: 'CONTRACTED_QUANTUM',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          inputType:'number',
          maxLength:80
        }
        
      },
      {
        title: 'UOM',
        dataField: 'UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              masterField: 'UOM',
            }
      },



    ],
  },
];

const ExistingConsumptionSection: IControlDefinition[] = [
  {
  type: ControlType.TABLE,
  name: 'ExistingconsumerSiteDetails',
  isPrimeReactTable: true,
  editorProps:{
    isEditable:true,
  },
  columns: [


{
      title: 'Source of Energy',
      dataField: 'SOURCE_OF_ENERGY',
      cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'SOURCE_OF_ENERGY',
            required: true
          }
    },

{
      title: 'Capacity',
      dataField: 'CAPACITY',
      cellEditor: TableCellEditorType.TEXTBOX,
      cellEditorParams:
      {
         inputType:"number",
         required: true
      }
    
    },

{
      title: 'UOM',
      dataField: 'UOM',
      cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'UOM',
            required: true
          }
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
];



const TermDetailsPPASection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'PPA',
    label: 'Term of PPA',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.COMBOBOX,
    name: 'PPA_Duration',
    label: 'PPA Duration',
    masterField:'PPA_Duration',
    required:true,
  },
  {
    type: ControlType.DATEPICKER,
    name: 'Commencement_Date',
    label: 'Commencement Date',
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'Effective_To',
    label: 'Effective To',
    format:DATE_FORMAT,

  },
  {
    type: ControlType.TEXTBOX,
    name: 'Lock_inPeriod',
    label: 'Lock-in Period',
    required:true,
    inputType:"integer"

  },
  {
    type: ControlType.COMBOBOX,
    name: 'Lock_inDuration',
    label: 'Lock-in Duration',
    masterField:'Lock_inDuration',
    required:true,
  },
]
const TermDetails_SHASection: IControlDefinition[] = [
    {
    type: ControlType.TEXTBOX,
    name: 'Sha',
    label: 'Term of SHA',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Sha_Duration',  
    label: 'SHA Duration',
    masterField:'Sha_Duration',
    required:true,
  },
  {
    type: ControlType.DATEPICKER,
    name: 'Sha_Commencement_Date',
    label: 'Commencement Date',
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'sha_Effective_To',
    label: 'Effective To',
    format:DATE_FORMAT,
},
  {
    type: ControlType.TEXTBOX,
    name: 'sha_Lock_inPeriod',
    label: 'Lock-in Period',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'sha_Lock_inDuration',
    label: 'Lock-in Duration',
    masterField:'sha_Lock_inDuration',
    required:true,
  },
  {
  type: ControlType.TEXTBOX,
  name: 'Equity_Participation',
  label: 'Shareholding in Energy Allotment %',
  //required:true,
  inputType:"number"

},

{
  type: ControlType.TEXTBOX,
  name: 'Per_Unit_Investment',
  label: 'Per Unit Investment(INR)',
  inputType:"number"
},
{
  type: ControlType.COMBOBOX,
  name: 'uom_term_detail',
  label: 'UOM',
  required:false,
  masterField:'uom_term_detail',
  //hidden:true
},
{
  type: ControlType.TEXTBOX,
  name: 'Equity_Investment',
  label: 'Equity Investment',
  //required:true,
  inputType:"number"

},
{
  type: ControlType.COMBOBOX,
  name: 'inr_in',
  label: 'INR In',
  required:false,
  masterField:'inr_in'  
},
{
  type: ControlType.TEXTBOX,
  name: 'Min_Consumption_Limit',
  label: 'Min. Consumption Limit(%)',
  required:true,
  inputType:"number",
  hidden:true

},
{
  type: ControlType.TEXTBOX,
  name: 'Total_Equity_Share_of_Consumers',
  label: 'Total Equity Share of Consumer',
  // required:true,
  inputType:"number"

},
{
  type: ControlType.TEXTBOX,
  name: 'Total_Equity_Share',
  label: 'Total Equity Share of Company',
  // required:true,
  inputType:"number"

},
{
  type: ControlType.COMBOBOX,
  name: 'uom_term_detail',
  label: 'UOM',
  required:false,
  masterField:'uom_term_detail',
  hidden:true
},
];
const BilingPaymentSection: IControlDefinition[] = [
  {
  type: ControlType.COMBOBOX,
  name: 'Billing_Frequency',
  label: 'Billing Frequency',
  masterField:'Billing_Frequency',
  required:true,
},
{
  type: ControlType.HIDDEN,
  name: 'PayTermHdn',
  label: 'Pay Term Code'
},
{
  type: ControlType.TEXTBOX,
  name: 'Pay_Term',
  label: 'Pay Term',
 required:true,
 maxLength:80,
 event: {
  input: ['Pay_Term'],
  moduleName: CRM_TRANSACTION,
  serviceName: 'RCRM_LOI_ONENTER_PAY_TERM',
},
help: {
  panelTitle: 'Help On Pay Term Summary',
  componentName: 'LOIPayTermHelp',
  receiveParams: [{parentField: 'Pay_Term', childField: 'PAY_TERM_CODE'},
                  {parentField: 'Description', childField: 'DESCRIPTION'},
                  {parentField: 'Due_Days', childField: 'DUE_DAYS'},
                  {parentField: 'Penalty_per', childField: 'PENALTY_PER'},
                  {parentField: 'Rebate_Days', childField: 'REBATE_DAYS'},
                  {parentField: 'Rebate_per', childField: 'REBATE_PER'},],
event: {
input: ['Pay_Term'],
moduleName: CRM_TRANSACTION,
serviceName: 'RCRM_LOI_ONENTER_PAY_TERM',
},
},
},
{
  type: ControlType.DISPLAY,
  name: 'Description',
  label: 'Pay Term Description',
},
{
  type: ControlType.DISPLAY,
  name: 'Due_Days',
  label: 'Due Days',
},
{
  type: ControlType.DISPLAY,
  name: 'penalty_type',
  label: 'Penalty Type',
},

{
  type: ControlType.DISPLAY,
  name: 'Penalty_per',
  label: 'Penalty',
},
{
  type: ControlType.DISPLAY,
  name: 'GraceDays',
  label: 'Grace Days',
},
 {
    type: ControlType.DISPLAY,
    name: 'RebateType',
    label: 'Rebate Type',
  },
{
  type: ControlType.DISPLAY,
  name: 'Rebate_Days',
  label: 'Rebate Days',
},
{
  type: ControlType.DISPLAY,
  name: 'Rebate_per',
  label: 'Rebate'
},
];
const Tariffdetailssection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'tariffdetailsummary',
      isPrimeReactTable: true,
      filter:true,
      editorProps:{
        isEditable:true,
        
      },
      columns: [
        {
          title: 'HTSC',
          dataField: 'HTSC',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'HTSC',
          required: true,
        }
        }, 
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
          title: 'Tariff Type',
          dataField: 'TARIFF_TYPE', 
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'TARIFF_TYPE',
          required:true
        },
      },
      {
        title: 'Group',
        dataField: 'TARIFF_GROUP', 
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
        masterField: 'TARIFF_GROUP'
        },
       },
        {
          title: 'Tariff ID',
          dataField: 'TARIFF_ID',
          cellEditor: TableCellEditorType.TEXTBOX,
           cellEditorParams:{
            required: true,
            maxLength:80,
            event: {
              input: [{source:'rowData', field:'TARIFF_ID'},{source:'pageData', field:'State'}],
              // input: ['TARIFF_ID'],
              moduleName: CRM_TRANSACTION,
              serviceName: 'RCRM_LOI_TARIFF_ONENTER',
            },
          help: {
            panelTitle: 'Tarrif Help',
            componentName: 'PPATariffHelp',
            sendParams:[{parentField: 'GENERATION_TYPE', childField: 'GENERATION_TYPE'},
            {parentField: 'TARIFF_TYPE', childField: 'TARIFF_TYPE'},
            {parentField: 'State', childField: 'State',parentSource:'page'}
            ],
            receiveParams: [
              {parentField:"TARIFF_ID",childField:"TARIFF_ID"},
              {parentField: 'TARIFF_DESCRIPTION', childField: 'TARIFF_DESCRIPTION'},
              {parentField: 'TARIFF_UOM', childField: 'UOM'},
              {parentField: 'BASE_RATE', childField: 'RATE'}
            ],
            event: {
              input: [{source:'rowData', field:'TARIFF_ID'},{source:'pageData', field:'State'}],
               // input: ['TARIFF_ID','State'],
              moduleName: CRM_TRANSACTION,
              serviceName: 'RCRM_LOI_TARIFF_ONENTER',
            },
          }
        }
        },
        {
          title: 'Tariff Description',
          dataField: 'TARIFF_DESCRIPTION'
          },
		    {
          title: 'UOM',
          dataField: 'TARIFF_UOM'
          },
		   {
          title: 'PPA Tariff',
          dataField: 'BASE_RATE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
            required: true,
          }

          },
          {
            title: 'Discount Value',
            dataField: 'DISCOUNT_VALUE',
            }, 
        {
          title: 'Contracted Energy - Annual',
          dataField: 'CONTRACTED_QUANTUM',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {maxLength:80,
            inputType:"number",
            required:true,
          }
        },
        {
          title: 'UOM',
          dataField: 'UOM',          
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'UOM',
            required:true,
          },
        },
        {
          title: 'Units',
          dataField: 'UNITS_KWH'
        }
      ],
    },
  ];

  const QuantumEnergySection: IControlDefinition[] = [


    {
      type: ControlType.TEXTBOX,
      name: 'ESTIMATED_ANNUAL_GENERATION',
      label: 'Contracted Energy',
      inputType:"number",
      required: true,
    },

    {
      type: ControlType.COMBOBOX,
      name: 'QE_UOM',
      label: 'UOM',
      required:true
    },
       
    ];

const GuaranteedQuantumSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'producerTitle',
    isStatic:true,
    label: 'Producer',
    column:6,
    className:'font-weight-bold'
  },
  {
    type: ControlType.LABEL,
    name: 'consumerTitle',
    isStatic:true,
    label: 'Consumer',
    column:6,
    className:'font-weight-bold'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'MINIMUM_SUPPLY',
    label: 'Minimum Supply%',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.TEXTBOX,
    name: 'PRODUCER_OVERALL_SUPPLY',
    label: 'Overall Supply %',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.TEXTBOX,
    name: 'PRODUCER_PEAK_SUPPLY',
    label: 'Peak Supply %',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.TEXTBOX,
    name: 'MINIMUM_OFFTAKE',
    label: 'Minimum Offtake %',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.TEXTBOX,
    name: 'CONSUMER_OVERALL_SUPPLY',
    label: 'Overall Offtake %',
    required:true,
    inputType:"number"
  },
  {
    type: ControlType.TEXTBOX,
    name: 'CONSUMER_PEAK_SUPPLY',
    label: 'Peak Offtake %',
    required:true,
    inputType:"number"
  },
  //set/copy value to table start
  // {
  //   type: ControlType.LABEL,
  //   name: 'applyToTableTitle',
  //   isStatic:true,
  //   label: 'Set Producer Default Value',
  //   column:12,
  //   className:'header-to-table-copy-title'
  // },
  {
    type: ControlType.COMBOBOX,
    name: 'PROD_MONTH_TYPE',
    label: 'Month Type',
    className:'header-to-table-copy-cntrl'
  },
  {
    type: ControlType.BUTTON,
    name:'monthCopyIcon',
    iconName:'Copy',
    column:'auto',
    className:'header-to-table-copy-icon',
    iconTooltipText:'Set producer month type default value',
    event:{
      copyHeaderToTable:{
        tableName:'ProducerQuantumSummary',
        headerToColumnMapping:[{headerName:'PROD_MONTH_TYPE', columnName:'PROD_MONTH_TYPE'}]
      }
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'PROD_MON_UOM',
    label: 'UOM',
    className:'header-to-table-copy-cntrl'
  },
  {
    type: ControlType.BUTTON,
    name:'uomCopyIcon',
    iconName:'Copy',
    column:'auto',
    className:'header-to-table-copy-icon',
    iconTooltipText:'Set producer UOM default value',
    event:{
      copyHeaderToTable:{
        tableName:'ProducerQuantumSummary',
        headerToColumnMapping:[{headerName:'PROD_MON_UOM', columnName:'PROD_MON_UOM'}]
      }
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'PROD_MON_QUANTUM',
    label: 'Quantum',
    className:'header-to-table-copy-cntrl',
    inputType:'number'
  },
  {
    type: ControlType.BUTTON,
    name:'quantumCopyIcon',
    iconName:'Copy',
    column:'auto',
    className:'header-to-table-copy-icon',
    iconTooltipText:'Set producer quantum default value',
    event:{
      copyHeaderToTable:{
        tableName:'ProducerQuantumSummary',
        headerToColumnMapping:[{headerName:'PROD_MON_QUANTUM', columnName:'PROD_MON_QUANTUM'}]
      }
    }
  },
  {
    type: ControlType.BUTTON,
    name: 'copyBtn',
    label: 'Copy Producer Data To Consumer',
    column:4,
    iconName:'Copy',
    className:'copy-producer-table-to-consumer-lbl',
    event:{
      copyTableToTable:{
        sourceTable:'ProducerQuantumSummary',
        targetTable:'ConsumerSummary',
        columnMapping:[
          {sourceColumn:'PROD_MONTH', targetColumn:'CONSUMER_MONTH'},
          {sourceColumn:'PROD_MONTH_TYPE', targetColumn:'CONSUMER_MONTH_TYPE'},
          {sourceColumn:'PROD_MON_UOM', targetColumn:'CONSUMER_MON_UOM'},
          {sourceColumn:'PROD_MON_QUANTUM', targetColumn:'CONSUMER_MON_QUANTUM'},
          {sourceColumn:'SEQ_NO', targetColumn:'SEQ_NO'}
        ]
      }
    }
  },
  //set/copy value to table end
    {
      type: ControlType.TABLE,
      name: 'ProducerQuantumSummary',
      title:'Producer',
      isPrimeReactTable: true,
      column:6,
      columns: [
        {
          title: 'Month',
          dataField: 'PROD_MONTH',
          width:150,
          //cellEditor: TableCellEditorType.TEXTBOX,
        },
        {
          title: 'Month Type',
          dataField: 'PROD_MONTH_TYPE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'PROD_MONTH_TYPE',
          required:true,
        }
        
        },


        {
          title: 'UOM',
          dataField: 'PROD_MON_UOM',
          cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'PROD_MON_UOM',
          required:true,
        }
        
        },
        {
          title: 'Quantum',
          dataField: 'PROD_MON_QUANTUM',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
            required:true,
          }
        },
        {
          title: 'Seq No',
          dataField: 'SEQ_NO',
          hidden:true,
        },
      ],
    },

  
    
    {
        type: ControlType.TABLE,
        name: 'ConsumerSummary',
        title:'Consumer',
        isPrimeReactTable: true,
        column:6,
        columns: [
          {
            title: 'Month',
            dataField: 'CONSUMER_MONTH',
            width:150,
            //cellEditor: TableCellEditorType.TEXTBOX,
          },

          {
            title: 'Month Type',
            dataField: 'CONSUMER_MONTH_TYPE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
            masterField: 'CONSUMER_MONTH_TYPE',
            required:true,
          }
          
          },

          {
            title: 'UOM',
            dataField: 'CONSUMER_MON_UOM',
            cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'CONSUMER_MON_UOM',
            required:true,
          }
          
          },
          {
            title: 'Quantum',
            dataField: 'CONSUMER_MON_QUANTUM',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:
            {
              inputType:"number",
              required:true,
            }
          },
          {
            title: 'Seq No',
            dataField: 'SEQ_NO',
            hidden:true,
          },
        ],
      },
  ];
  const OpenAccessChargesSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'OpenAccessCharges',
      isPrimeReactTable: true,
      filter:true,
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
          required: true,
        }
        },
        {
          title: 'TCD Code',
          dataField: 'TCD_CODE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'OPEN_TCD_CODE',
          required:true,
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
          dataField: 'OPEN_ACCESS_UOM',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'OPEN_ACCESS_UOM',
          required: true,
        }
        },
        {
          title: 'Value',
          dataField: 'TCD_VALUE'
        },
        {
          title: '% of Share',
          dataField: 'PER_OF_SHARE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
            required: true,
          }
        },
      ],
    },
  ];
  const DISCOMTarifTODfSection : IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'DISCOMTarifTODsummary',
      isPrimeReactTable: true,
      filter:true,
      editorProps:{
        isEditable:true,
        
      },
  
      columns: [
        {
          title: 'TOD Code',
          dataField: 'TOD_CODE',
          hidden:true,
        },
        {
          title: 'TOD Name',
          dataField: 'TOD_NAME',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'TOD_NAME',
         // required:true,
            event :{
              serviceName:'RCRM_LOI_TOD_ONCHANGE',
              moduleName : CRM_TRANSACTION,
              input:[{field:'TOD_NAME', source:'rowData'},{field:'Power_Producer', source:'pageData'}]
              }
        }
        },
        {
          title: 'From Time',
          dataField: 'TOD_FROM_TIME',
          cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
        },
        {
          title: 'To Time',
          dataField: 'TOD_TO_TIME',
          cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
        },
        {
          title: 'Hrs',
          dataField: 'TOD_HRS',
        },
        {
          title: 'Base Tariff Rate',
          dataField: 'BASE_TARIFF_RATE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
          //  required:true,
          }
        },
        {
          title: 'Factor',
          dataField: 'TOD_RATE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
           // required:true,
          }
        },
        {
          title: 'TOD Rate',
          dataField: 'PER_UNIT',
         
        },
        {
          title: 'Value',
          dataField: 'TOD_VALUE',
         
        },
      ],
    },
  ];
  const DISCOMTarifTCDfSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'DISCOMTarifTCDsummary',
      isPrimeReactTable: true,
      filter:true,
      editorProps:{ 
        isEditable:true,
        
      },
  
      columns: [
        {
          title: 'TCD Code',
          dataField: 'TCD_CODE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'DISCOM_TCD_CODE',
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
          title: 'TCD Mode',
          dataField: 'TCD_MODE',
          cellEditor: TableCellEditorType.COMBOBOX,
          hidden:true,
          cellEditorParams: {
          masterField: 'TCD_MODE',
          //required: true
          },
        },
        {
          title: 'UOM',
          dataField: 'TCD_UOM',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
          masterField: 'TCD_UOM',
        //  required:true,
          },
        },
        {
          title: 'Value',
          dataField: 'TCD_VALUE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
            //required:true,
          }

        },
        {
          title: '% of Share',
          dataField: 'TCD_PER_OF_SHARE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
           // required:true,
          }
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
  ];
  // const GeneratePPASection: IControlDefinition[] = [
  //   {
  //   type: ControlType.COMBOBOX,
  //   name: 'SelectTemplate',
  //   label: 'Select Template',
  //   masterField:'SelectTemplate',

  //   },
  //   {
  //     type: ControlType.BUTTON,
  //     name: 'searchBtn',
  //     label: 'Preview',
  //     isPrimary: true,
  //     event: {
  //       moduleName: CRM_TRANSACTION,
  //       serviceName: 'RCRM_LOI_PREVIEW_MST',
  //       input: [...actionInputs],
  //     },
  //   },
  // ];

  const GeneratePPASection: IControlDefinition[] = [
    {
    type: ControlType.COMBOBOX,
    name: 'SelectTemplate',
    label: 'Select Template',
    masterField:'SelectTemplate',
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_PPA_TEMPLATE_ONCHANGE',
      input: ['SelectTemplate'],
    },
    },
    {
      type: ControlType.DISPLAY,
      name: 'fileName',
      label: 'File Name'
      },
      {
        type: ControlType.DISPLAY,
        name: 'fileReference',
        label: 'File Reference'    
      },
     {
      type: ControlType.BUTTON,
      name: 'searchBtn',
      label: 'Preview',
      isPrimary: true,
      /*
      event: {
        moduleName: CRM_TRANSACTION,
        serviceName: 'RCRM_LOI_PREVIEW_MST',
        input: [...actionInputs],
      },
      */
      event: {
        previewFile:{
          api: 'Files/Template/previewDocument/',
          fileType:'docx',
          apiMethodType:'POST',
          apiParams: {
            tableName: 'documentList',
          },
          moduleName: CRM_TRANSACTION,
          serviceName: 'RCRM_PPA_PREVIEW_MST',
          input: [...actionInputs],
        }
        // getEventProps:(pagedata)=>{
        //   return {
        //     downloadFile:{          
        //       api: 'Files/Template/previewDocument/',
        //       fileName:pagedata.fileName,
        //       apiMethodType:'POST',
        //       apiParams: {
        //         tableName: 'documentList',
        //       },
        //       moduleName: CRM_TRANSACTION,
        //       serviceName: 'RCRM_PPA_PREVIEW_MST',
        //       input: [...actionInputs],
        //     }
        //   }
        // }
        }
       
    },
  ];


  const ApprovalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'approvalNotes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4 
}
];


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
const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {
      serviceName: 'RCRM_LOI_PPA_CREATE_MST',
      moduleName: CRM_TRANSACTION,
      input: [...actionInputs],
    },
  },
   {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      hidden:(pageData)=>!(pageData.PPA_Status == 'Working' &&  !pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_PPA_SAVE_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],

      },
    },
   
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Submit',
      label: 'Submit',
      hidden:(pageData)=>!( pageData.PPA_Status == 'Working' &&  !pageData.WF_Status), 
        event: {
        serviceName: 'RCRM_PPA_SUBMIT_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    },   

    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Approve',
      label: 'Approve',
      hidden:(pageData)=>!(pageData.PPA_Status == 'Working' &&  pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_PPA_APPROVE_MST',
        moduleName: CRM_TRANSACTION,
        input: [...actionInputs],
      },
    }, 
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'Reject',
      label: 'Reject',
      hidden:(pageData)=>!(pageData.PPA_Status == 'Working' &&  pageData.WF_Status), 
      event: {
        serviceName: 'RCRM_PPA_REJECT_MST',
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
  serviceName: 'RCRM_LOI_PPA_INIT_MST',
  moduleName: CRM_TRANSACTION,
    input: ['LOI','PPA_No']
};

export const ManagePPA:React.FC<IPageBaseProps> = (props) => {
    const {code, CODE} = usePageQueryParam();

    const initialData: IRFData = {
      LOI: code,
      PPA_No: CODE
      };
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
   {({values})=>(
    <>
    <RFCRMToolbar hasBackButton/>     
    <ScrollabeContainer hasHeader={true}>
    {(Array.isArray(values.approvalHistory) && values.approvalHistory.length > 0) && <RFSection  controls={statusProgressSection} columns={1} title={'PPA - Workflow State'} className={'section-header-bg-primary'} collapse={false}/>}
      <RFSection  controls={PPADetailsSection} title={'PPA Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
    <RFSection  controls={LOIDetailsSection} title={'LOI Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
    <RFSection  controls={ProducerDetailsSection} title={'Producer Details'}  columns={6} className={'section-header-bg-primary'} collapse={false}/>
      
      <RFSection  controls={CODCommercialOperationDate} title={'Commercial Operation Date (COD)'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={OpportunityDetailsSection} title={'Opportunity Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={CustomerDetailsSection} title={'Customer Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
      {/* <RFSection  controls={ConsumerSiteDetails} title={'Consumer Site Details'} columns={1}  className={'section-header-bg-primary'} collapse={false}/> */}
      <RFSection  controls={ExistingConsumptionSection} title={'Existing Consumption'} columns={1}  className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={TermDetailsPPASection} title={'Term Details - PPA'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
       {values.Scheme === 'GC' && <RFSection  controls={TermDetails_SHASection} title={'Term Details-SHA'}  className={'section-header-bg-primary'} collapse={false}/>} 
        <RFSection  controls={BilingPaymentSection} title={'Billing & Payment'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={Tariffdetailssection} title={'Tariff Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={QuantumEnergySection} title={'Quantum of Energy'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={GuaranteedQuantumSection} title={'Guaranteed Quantum'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        
       <RFSection  controls={OpenAccessChargesSection} title={'Open Access Charges'} columns={1} className={'section-header-bg-primary'} collapse={false}/> 
        
        <RFSection  controls={DISCOMTarifTODfSection} title={'DISCOM Tariff - TOD (in kWh)'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={DISCOMTarifTCDfSection} title={'DISCOM Charges'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={NotesSection} title={'Notes'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={GeneratePPASection} title={'Generate PPA'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        {((values.PPA_Status == 'Working' || values.PPA_Status == 'Amended')  &&  values.WF_Status) &&   <RFSection  controls={ApprovalSection} title={'Approval/Rejection Notes'} columns={1} className={'section-header-bg-primary'} collapse={false}/> }
    
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </>
   )}
  </RetinaFormBuilder>
  );
}
