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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { siteHelp } from './siteHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { DATE_TIME_FORMAT } from '../../common/constants';


const actionInputs = ['sitecode', 'sitename', 'x', 'siteoverallcapacity', 'uom', 
'creditrating','stage','status','address','city','state','district','pincode','country','lat',
'long','survey','village','taluk','region','schemeDetail','generationtype', 'lineLoss', 'tdloss', 'discom'
];

const onEnterEvent: IRFEventParams = {
  input: ['sitecode'],
  moduleName: 'CRM_Master',
  serviceName: 'ONENTER_SITE_MST',
};

const helpComponents = {
  siteHelp: siteHelp
};

const siteDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sitecode',
    label: 'Site Code',
    required:true,
    maxLength:40,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Manage Site',
      componentName: 'siteHelp',
      receiveParams: [{parentField: 'sitecode', childField: 'SITE_CODE'},
                      {parentField: 'sitename', childField: 'SITE_NAME'},
                      {parentField: 'generationtype', childField: 'SITE_CATEGORY'},
                      {parentField: 'siteoverallcapacity', childField: 'SITE_OVERALL_CAPACITY'},
                      {parentField: 'uom', childField: 'UOM'},
                      {parentField: 'creditrating', childField: 'CREDIT_RATING'},
                      {parentField: 'stage',childField: 'STAGE'},
                      {parentField: 'state', childField: 'STATE'},
                      {parentField: 'district', childField: 'DISTRICT'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sitename',
    label: 'Site Name',
    maxLength:100,
    required:true
  },

  {
    type: ControlType.COMBOBOX,
    name: 'generationtype',
    label: 'Site Category',
    masterField:'generationtype',
    required: true,
    event :{
      serviceName:'ONCHANGE_SITE_CATEGORY',
      moduleName :'CRM_Master',
      input:['generationtype']
      }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'siteoverallcapacity',
    label: 'Site Overall Capacity',
    required: true,
    inputType:'number'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'uom',
    label: 'UOM',
    required: true,
    masterField:'uom',
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
 
  {
    type: ControlType.TEXTBOX,
    name: 'creditrating',
    label: 'Credit Rating',
    maxLength:80,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'stage',
    label: 'Stage',
    required: true,
    masterField:'stage',
  },
  // {
  //   type: ControlType.TEXTBOX,
  //   name: 'lineLoss',
  //   label: 'Line Loss%',
  //   required: true,
  // },
  // {
  //   type: ControlType.TEXTBOX,
  //   name: 'tdloss',
  //   label: 'T&D Loss%',
  //   required: true,
  // },
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'discom',
  //   label: 'DISCOM',
  //   required: true,
  //   masterField:'discom',
  // },
  

];

const siteAddress: IControlDefinition[] = [
    {
      type: ControlType.TEXTBOX,
      name: 'address',
      label: 'Address',
      required:true,
      maxLength:400,
    },
    {
      type: ControlType.TEXTBOX,
      name: 'city',
      label: 'City',
      required:true,
      maxLength:100,
    },
    {
      type: ControlType.COMBOBOX,
      name: 'state',
      label: 'State',
      required:true,
      masterField:'state',
      event :{
        serviceName:'ONCHANGE_STATE',
        moduleName :'CRM_Master',
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
      required:true,
      inputType:'number',
      maxLength:6
    },
    {
      type: ControlType.DISPLAY,
      name: 'country',
      label: 'Country',
    },
    {
        type: ControlType.TEXTBOX,
        name: 'lat',
        label: 'Lat',
        inputType:'number'
      },
      {
        type: ControlType.TEXTBOX,
        name: 'long',
        label: 'Long',
        inputType:'number'
      },
      {
        type: ControlType.TEXTBOX,
        name: 'survey',
        label: 'Survey',
        maxLength:80,
      },
      {
        type: ControlType.TEXTBOX,
        name: 'village',
        label: 'Village',
        maxLength:100,
      },  
      {
        type: ControlType.TEXTBOX,
        name: 'taluk',
        label: 'Taluk',
        maxLength:100,
      }, 
      {
        type: ControlType.COMBOBOX,
        name: 'region',
        label: 'Region',
        masterField:'region'
      }, 
  ];
  
  const siteCapacityDetailstableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'siteCapacitygrid',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
        hideAdd:false,
        hideDelete:false,
        resetFieldsOnRowDuplicate:['KEY']
    },
      columns: [
        {
          title: 'Key',
          dataField: 'KEY',
          hidden:true
        },
        {
          title: 'Generation Type',
          dataField: 'GENERATION_TYPE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
            masterField: 'GENERATION_TYPE',
          }
        },
        {
            title: 'Make',
            dataField: 'MAKE',
           
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              maxLength:80,
            }
        },
        {
        title: 'Model',
        dataField: 'MODEL',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          maxLength:80,
        }
        },
        {
          title: 'Manfacturer',
          dataField: 'MANUFACTURER',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            //  required:true,
              masterField: 'MANUFACTURER',
          }
       },
      
        {
            title: 'Capacity per Unit',
            dataField: 'CAPACITY',
            cellEditor: TableCellEditorType.TEXTBOX,
              cellEditorParams: {
              required:true,
              inputType: 'number',
              onBlurEvent:
              {
                moduleName: 'CRM_Master',
                serviceName: 'RCRM_OVERALL_CAPACITY_CAL_SITE',
                input: ['CAPACITY', 'QUANTITY']
              },
              event:
              {
                moduleName: 'CRM_Master',
                serviceName: 'RCRM_OVERALL_CAPACITY_CAL_SITE',
                input: ['CAPACITY', 'QUANTITY']
              },
    
          },
        },
        {
            title: 'UOM',
            dataField: 'UOM',
             cellEditor: TableCellEditorType.COMBOBOX,
             cellEditorParams: {
                 required:true,
               masterField: 'UOM',
             }
            },
        {
            title: 'Number of Unit(s)',
            dataField: 'QUANTITY',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required:true,
              inputType: 'number',
              onBlurEvent:
              {
                moduleName: 'CRM_Master',
                serviceName: 'RCRM_OVERALL_CAPACITY_CAL_SITE',
                input: ['CAPACITY', 'QUANTITY']
              },
              event:
              {
                moduleName: 'CRM_Master',
                serviceName: 'RCRM_OVERALL_CAPACITY_CAL_SITE',
                input: ['CAPACITY', 'QUANTITY']
              },
          }
        },
        {
          title: 'Overall Capacity',
          dataField: 'OVERALL_CAPACITY',
        },

       {
          title: 'Remarks',
          dataField: 'REMARKS',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            maxLength:400,
          }
        },
        {
          title: 'Active',
          dataField: 'ACTIVE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
            masterField: 'ACTIVE',
          }
        },
    ],

    },
]

const additionalNotestableSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'schemeDetail',
        multiLine: true,
        multiLineRowLength: 6,
        column: 10,   
       
         
},
]   
const actionBarButtons: IControlDefinition[] = [
   
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'create',
        label: 'Create',
        event: {
          serviceName: 'CREATE_SITE_MST',
          moduleName: 'CRM_Master',
          input: [...actionInputs,'siteCapacitygrid'],
        },
      },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'ACTIVATE_SITE_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs,'siteCapacitygrid']
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_SITE_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
  ]
 const DataSection: IControlDefinition[] = [

   
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
    serviceName: 'INIT_SITE_MST',
    moduleName: 'CRM_Master',
      input: ['sitecode','sitename']
  };
  
  export const ManageSite:React.FC<IPageBaseProps> = (props) => {
      const {code,name} = usePageQueryParam();
  
      const initialData: IRFData = {
        sitecode: code,
        sitename: name
        };
  
  
    return (
      <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
        <RFCRMToolbar hasBackButton/>
        <ScrollabeContainer hasHeader={true}>
          <RFSection  controls={siteDetailsSection} title={'Site Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection   controls={siteAddress} title={'Site Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection controls={siteCapacityDetailstableSection} title={'Site Capacity Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection controls={additionalNotestableSection} title={'Additional Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </ScrollabeContainer>
        <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
      </RetinaFormBuilder>
    );
  };