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
  RFTabs,
  RFTabItem,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { TODBreakupHelp } from './todBreakupHelp';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { DatePickerMode } from '@retina360-ai/core-ui-library-v2';


const actionInputs = ['id', 'site', 'meterid','metertype','assetid', 'assetname', 'netreading','uom', 'date','time', 'exportreadingdetails','importreadingdetails'];

const onEnterEvent: IRFEventParams = {
  input: ['id'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'ONENTER_MANAGE_TOD_BREAKUP_MST',
};

const helpComponents = {
  TODBreakupHelp: TODBreakupHelp
};

const generalSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'id',
    label: 'ID',
    required: true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On TOD Breakup',
      componentName: 'TODBreakupHelp',
      receiveParams: [{parentField: 'date', childField: 'DATE'},
                      {parentField: 'statename', childField: 'SITE'},
                      {parentField: 'status', childField: 'ASSET_ID'},
                    ],
      event: onEnterEvent
    }
  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    required: true,
    event :{
      serviceName:'RCRM_DAILYMETER_ONCHANGE_SITE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['site']
      }
  },

  {
    type: ControlType.COMBOBOX,
    name: 'meterid',
    label: 'Meter ID',
    required: true,
    masterField: 'meterid',
    event :{
      serviceName:'RCRM_DAILYMETER_ONCHANGE_METER',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['meterid']
      }
   
  },
  {
    type: ControlType.DISPLAY,
    name: 'metertype',
    label: 'Meter Type',

  },
  {
    type: ControlType.DISPLAY,
    name: 'assetid',
    label: 'Asset ID',

  },
  {
    type: ControlType.DISPLAY,
    name: 'assetname',
    label: 'Asset Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'takenby',
    label: 'Taken By',
  },

];
const dailySummary: IControlDefinition[] = [
    {
      type: ControlType.DISPLAY,
      name: 'netreading',
      label: 'Net Reading',
      
    },
   
    {
      type: ControlType.DISPLAY,
      name: 'uom',
      label: 'UOM',
    },
  
    {
      type: ControlType.DATEPICKER,
      name: 'date',
      label: 'Date',
      event :{
        serviceName:'RCRM_TOD_ONCHANGE_DATE',
        moduleName :CRM_ENERGY_ACCOUNTING,
        input:['date']
        }
     
    },
    {
      type: ControlType.TIMEPICKER,
      name: 'time',
      label: 'Time',
      
  
    },
    
  ];

const exportReadingetails: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'importreadingdetails',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
    },
      columns: [
        {
          title: 'TOD Code',
          dataField: 'TOD_CODE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'TOD_CODE',
          }
        },
        {
            title: 'TOD Name',
            dataField: 'TOD_NAME',
          },
          {
            title: 'MF',
            dataField: 'EXMF',
        
          },
          {
            title: 'Last Reading',
            dataField: 'EXLAST_READING',
        
          },
          {
            title: 'Current Reading',
            dataField: 'EXCURRENT_READING',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
          {
            title: 'Net Reading',
            dataField: 'EXNET_READING',
        
          },
          {
            title: 'UOM',
            dataField: 'EXUOM',
        
          },
          {
            title: 'Power Factor',
            dataField: 'EXPOWER_FACTOR',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
          {
            title: 'Voltage',
            dataField: 'EXVOLTAGE',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
        ] 

    }    
];

const importReadingDetails: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'exportreadingdetails',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
    },
      columns: [
        {
          title: 'TOD Code',
          dataField: 'IMTOD_CODE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'TCD_CODE',
          }
        },
        {
            title: 'TOD Name',
            dataField:'IMTOD_NAME',
          },
          {
            title: 'MF',
            dataField: 'IMMF',
        
          },
          {
            title: 'Last Reading',
            dataField: 'IMLAST_READING',
        
          },
          {
            title: 'Current Reading',
            dataField: 'IMCURRENT_READING',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
          {
            title: 'Net Reading',
            dataField: 'IMNET_READING',
        
          },
          {
            title: 'UOM',
            dataField: 'IMUOM',
        
          },
          {
            title: 'Power Factor',
            dataField: 'IMPOWER_FACTOR',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
          {
            title: 'Voltage',
            dataField: 'IMVOLTAGE',
            cellEditor: TableCellEditorType.TEXTBOX,
          },
        ] 

    }    
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
      name: 'attachments',
      isPrimeReactTable: true,
      editorProps:{
        isEditable:true,
      },
      columns: [
        {
          title: 'Upload Document',
          dataField: 'UPLOAD_DOC',
          cellEditor: TableCellEditorType.TEXTBOX,        
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
      serviceName: 'RCRM_CREATE_TOD_BREAKUP_MST',
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
          serviceName: 'RCRM_SAVE_TOD_BREAKUP_MST',
          moduleName: CRM_ENERGY_ACCOUNTING,
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
    },
  ];
  const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_MANAGE_TOD_BREAKUP_MST',
    moduleName: CRM_ENERGY_ACCOUNTING,
    input: ['id']
 };
 

export const ManageTodBreakup:React.FC<IPageBaseProps> = (props) => {
    const {id} = usePageQueryParam();
  

    const initialData: IRFData = {
        id: id,

      };

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} 
    scrollKey={props.scrollKey} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/> 
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={generalSection} title={'General'}columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFSection  controls={dailySummary} title={'Daily Summary'}columns={6} className={'section-header-bg-primary'} collapse={false}/>
      <RFTabs>
      <RFTabItem headerText='Export Reading Details' >
      <RFSection  controls={exportReadingetails}  columns={6} />
      </RFTabItem>
      <RFTabItem headerText='Import Reading Details' >
       <RFSection  controls={importReadingDetails}  columns={6} />
      </RFTabItem>
     </RFTabs> 
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
