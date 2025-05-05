import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
import { RFFooter } from '../../common/components/footer';
import { CustomerAccountHelp } from '../../master/CustomerAccount/CustomerAccountHelp';
import { ViewPPA } from './ViewPPA';
import { ConsumerDemandPlanningHelp } from './ConsumerDemandPlanningHelp';

const actionInputs = ['ID','customercode','CustomerName', 'htsc','RequestDate','generationyear','generationPeriod','GenerationSource','Status','ppa','UOM',
'TotalUnitsPlanned','UnitsasperPPA','ActualAllocation','Variance%','consumerDemandGrid'];
const onEnterEvent: IRFEventParams = {
  input: ['ID'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'RCRM_MANAGE_ENERGY_ONENTER_DEMAND',
};
const helpComponents = {
  CustomerAccountHelp:CustomerAccountHelp,
  ViewPPA:ViewPPA,
  ConsumerDemandPlanningHelp:ConsumerDemandPlanningHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'ID',
    label: 'ID',
    required:true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Consumer Demand plan',
      componentName: 'ConsumerDemandPlanningHelp',
      receiveParams: [{parentField: 'ID', childField: 'ID'},
                      {parentField: 'CustomerName', childField: 'CUSTOMER_NAME'},
                      {parentField: 'htsc', childField:'HT_SC'},
                      {parentField: 'RequestDate', childField:'REQUEST_DATE'},
                      {parentField: 'ppa', childField: 'PPA'},
                      {parentField: 'generationyear', childField:'GENERATION_YEAR'},
                      {parentField: 'generationPeriod', childField:'GENERATION_PERIOD'},
                      {parentField: 'UOM', childField: 'UOM'}
                ],
             event: onEnterEvent
    }
},
{
  type: ControlType.TEXTBOX,
  name: 'customercode',
  label: 'Customer Code',
  event :{
    serviceName:'RCRM_CUSTOMER_NAME_ENERGY_ONCHANGE',
    moduleName :CRM_ENERGY_ACCOUNTING,
    input:['customercode']
    },
  help: {
    panelTitle: 'Help On Customer Account',
    componentName: 'CustomerAccountHelp',
    receiveParams: [{parentField: 'customercode', childField: 'CUSTOMER_CODE'},
      {parentField: 'CustomerName', childField: 'CUSTOMER_NAME'},
              ],
    event :{
      serviceName:'RCRM_CUSTOMER_NAME_ENERGY_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['customercode']
      },
  },
  
  required:true,
},
  {
    type: ControlType.DISPLAY,
    name: 'CustomerName',
    label: 'Customer Name',
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'htsc',
    label: 'HTSC #',
    required:true,
    masterField:'htsc',
    event :{
     serviceName:'RCRM_HTSC_ENERGY_ONCHANGE',
     moduleName :CRM_ENERGY_ACCOUNTING,
     input:['customercode','htsc']
     },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'ppa',
    label: 'PPA #',
    required:true,  
    masterField:'ppa',
    event :{
      serviceName: 'RCRM_CONSUMER_ENERGY_PPA_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['ppa']
      } 

  },

  {
    type: ControlType.DISPLAY,
    name: 'Status',
    label: 'Status',
  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
    event :{
      serviceName:'RCRM_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationPeriod',
    label: 'Generation Period',
    masterField:'generationPeriod',
    required:true,
    event :{
      serviceName: 'RCRM_GENERATION_PERIOD_PPA_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationPeriod','ppa']
      }
    
  },
  {
    type: ControlType.DATEPICKER,
    name: 'RequestDate',
    label: 'Request Date',
    required:true,
  },
  {
    type: ControlType.HIDDEN,
    name: 'GenerationSource',
    label: 'Generation Source',
    },
  
  
  {
    type: ControlType.COMBOBOX,
    name: 'UOM',
    label: 'UOM',
    required:true,   
    masterField:'UOM',
  },
  


  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'PPAGuaranteedQuantum',
    label: 'PPA Guaranteed Quantum',
    event: {
     // linkTo: '/ViewPPA',
      openModal:true,
      modalProps:{ 
        title:'View PPA Details',
        componentName:'ViewPPA',
        sendParams:[{parentField:'ppa', childField:'PPA_No'}]
  
      }
      //queryParams:[{sourceField:'sitecode', targetField:"code"}]
    },
  }
 
];

const summarySection: IControlDefinition[] = [
    {
      type: ControlType.DISPLAY,
      name: 'TotalUnitsPlanned',
      label: 'Total Units Planned',
      //required:true,
  },
    {
      type: ControlType.DISPLAY,
      name: 'UnitsasperPPA',
      label: 'Units as per PPA',
    },
    
    {
      type: ControlType.DISPLAY,
      name: 'ActualAllocation',
      label: 'Actual Allocation',
     // required:true,
    },
    {
      type: ControlType.DISPLAY,
      name: 'Variance%',
      label: 'Variance%',
    },
]



const viewppadetails: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'managebtn',
    isPrimary: true,
    label: 'View PPA Details',
    event: {
      linkTo: '/ViewPPA',
    },
  },
];

const Todbreakupsection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'consumerDemandGrid',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_Code',
        
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_Name',
        
    },
      {
        title: 'From Time',
        dataField: 'FROM_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
        
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Units Planned',
        dataField: 'UNITS_PLANNED',
        cellEditor: TableCellEditorType.TEXTBOX   ,
        cellEditorParams:
        {
          inputType:"number",
             
        }    
      },

    ],
  },
];

const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {
      serviceName: 'RCRM_MANAGE_ENERGY_CREATE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
},
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'save',
    label: 'Save',
    event: {
      serviceName: 'RCRM_MANAGE_ENERGY_SAVE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'submit',
    label: 'Submit',
    event: {
      serviceName: 'RCRM_MANAGE_ENERGY_SUBMIT',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },

  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'rollback',
    label: 'Rollback',
    event: {
      serviceName: 'RCRM_MANAGE_ENERGY_ROLLBACK',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },
]
const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
    //   iconName:'Circleplus',
      label: 'Manage Energy Demand Planning',
      event: {
        linkTo: '/ManageDemandPlanning',
        
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
   serviceName: 'RCRM_INIT_CONSUMER_DEMAND_ENERGY_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
 input: ['ID'],
};

export const ManageEnergyDemandPlanning : React.FC<IPageBaseProps> = (props) => {
  const {id} = usePageQueryParam();
  const initialData: IRFData = {
    ID: id,

    };
 return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
    <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection}title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={summarySection} title={'Summary'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={Todbreakupsection} title={'TOD Breakup'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};