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
  TableCellRendererType,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';

import { siteHelp } from '../Site/siteHelp';
import { BusinessSummaryHelp } from './BusinessSummaryHelp';
import { CRM_MASTER, CRM_TRANSACTION, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { ViewSite,  } from './ViewSite';
import { BusinessPlanSiteHelp } from './BusinessPlanSiteHelp';


const actionInputs = ['businessplancode','description','status','sitecode','sitename','generationtype',
'state','region','targetCustomerSegment','Notes','sitestatus','creditrating','uom','siteoverallcapacity','stage','projectCost']


const helpComponents = {
  siteHelp : siteHelp,
  BusinessSummaryHelp: BusinessSummaryHelp,
  //ViewSiteHelp:ViewSiteHelp,
  BusinessPlanSiteHelp:BusinessPlanSiteHelp,
  ViewSite:ViewSite
};


const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'businessplancode',
    label: 'Business Plan Code',
    required:false,
    maxLength:80,
    event:  {
      input: ['businessplancode'],
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_BUSINESS_CODE_ONENTER_MST',
    } ,
    help: {
      panelTitle: 'Help On Business Plan',
      componentName: 'BusinessSummaryHelp',
      receiveParams: [{parentField: 'businessplancode', childField: 'BUSINESS_PLAN_CODE'},
                      {parentField: 'description',     childField: 'DESCRIPTION'},
                      {parentField: 'status',          childField: 'STATUS'},
                    ],
                    event: {
                      input: ['businessplancode'],
                      moduleName: CRM_TRANSACTION,
                      serviceName: 'RCRM_BUSINESS_CODE_ONENTER_MST',
                    } 
    }
      },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'projectCost',
    label: 'Total Project Cost (in Millons)',
    required:true,
    inputType:'number',
  },


  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField: 'status',
    required:true
  },
 
];

const siteDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sitecode',
    label: 'Site Code',
    required:true,
    maxLength:80,
    event:  {
      input: ['sitecode'],
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_BUSINESS_SITE_ONENTER_MST',
    } ,
    help: {
      panelTitle: 'Help on site',
      componentName: 'BusinessPlanSiteHelp',
      receiveParams: [{parentField: 'sitecode', childField: 'SITE_CODE'},
                      {parentField: 'sitename', childField: 'SITE_NAME'},
                      {parentField: 'sitecategory', childField: 'SITE_CATEGORY'},
                      {parentField: 'state', childField: 'STATE'},
                      {parentField: 'region', childField: 'REGION'},
                      {parentField: 'siteoverallcapacity', childField: 'SITE_OVERALL_CAPACITY'},
                      {parentField: 'uom', childField: 'UOM'},
                      {parentField: 'creditrating', childField: 'CREDIT_RATING'},
                      {parentField: 'stage',childField: 'STAGE'},
                      {parentField: 'sitestatus', childField: 'STATUS'},
                     ],
        event: {
          input: ['sitecode'],
          moduleName: CRM_TRANSACTION,
          serviceName: 'RCRM_BUSINESS_SITE_ONENTER_MST',
        } 
    } 
  },
  {
    type: ControlType.DISPLAY,
    name: 'sitename',
    label: 'Site Name',
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'generationtype',
    label: 'Site Category',

  },
  {
    type: ControlType.DISPLAY,
    name: 'state',
    label: 'State',
  },
  {
    type: ControlType.DISPLAY,
    name: 'region',
    label: 'Region',
 
  },
  {
    type: ControlType.DISPLAY,
    name: 'sitestatus',
    label: 'Status',
  },
  {
    type: ControlType.DISPLAY,
    name: 'siteoverallcapacity',
    label: 'Site Overall Capacity',
  },
  {
    type: ControlType.DISPLAY,
    name: 'uom',
    label: 'UOM',
  },
 
 {
    type: ControlType.DISPLAY,
    name: 'creditrating',
    label: 'Credit Rating',
  },
  {
    type: ControlType.DISPLAY,
    name: 'stage',
    label: 'Stage',

  },
 

  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'viewSiteDetails',
    label: 'View Site Details',
    event: {
      //linkTo: '/ViewSite',
      openModal:true,
      modalProps:{ 
        title:'View Site Details',
        componentName:'ViewSite',
        sendParams:[{parentField:'sitecode', childField:"sitecode"}]
      }
      //queryParams:[{sourceField:'sitecode', targetField:"code"}]
    },
  }
  
];

const toolbarControls: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'managebtn',
    isPrimary: true,
    label: 'View Site Details',
    event: {
      linkTo: '/ViewSite',
    },
  },
];
const Targetsection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'targetCustomerSegment',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,
      hideAdd: false,
      hideDelete: false,
    },
    columns: [
      {
        title: 'Scheme',
        dataField: 'SEGMENT',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'SEGMENT',
        }
      },
      {
        title: 'Target Capacity',
        dataField: 'TARGET_CAPACITY',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType:"number",
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

      {
        title: 'Target Energy in MU (Million Units)',
        dataField: 'TARGET_ENERGY',  
      
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType:"number",
          required:true,
        }
      },
      
      {
        title: 'Remarks',
        dataField: 'REMARKS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
         maxLength:400
      }
    }
    ]
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
      serviceName: 'RCRM_BUSINESS_PLAN_CREATE',
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
      serviceName: 'RCRM_BUSINESS_PLAN_SAVE',
      moduleName: CRM_TRANSACTION,
      input: [...actionInputs],
    },
  },
 /*  
{
  type: ControlType.BUTTON,
  isPrimary: true,
  name: 'sendNotification',
  label: 'Send Notification',
  event: {
    serviceName: 'SEND_NOTOFICATION_BUSINESS_PLAN',
    moduleName: CRM_TRANSACTION,
    input: [...actionInputs],
  },
},
 */
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
  serviceName: 'INIT_BUSINESS_PLAN_MST',
  moduleName: CRM_TRANSACTION,
  input: ['businessplancode']
};

export const ManageBusinessPlan : React.FC<IPageBaseProps> = (props) => {
  const {code} = usePageQueryParam();
  const initialData: IRFData = {
    businessplancode: code,

    };
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
    <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection}title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={siteDetailsSection}title={'Site Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={Targetsection} title={'Target Customer Segment'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
