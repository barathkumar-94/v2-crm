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
import { AssetMasterHelp } from './assetMasterHelp';
import { number } from 'yup';
import { CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['assetID','discomAsset', 'continumAsset', 'assetName', 'assetType','make','model','manufacturer','capacity',
'uom','site','status', 'lat', 'long','assetGrouping','meterMapping', 'notes', 'attachments','modemSerialNumber','simNumber','htsc','htsc2', 'htsc3'];

const onEnterEvent: IRFEventParams = {
  input: ['assetID'],
  moduleName: 'CRM_Master',
  serviceName: 'RCRM_ASSET_ONENTER_MST',
};

const helpComponents = {
  AssetMasterHelp: AssetMasterHelp
};
const AssetSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'assetID',
    label: 'Asset ID',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Asset Master',
      componentName: 'AssetMasterHelp',
      receiveParams: [{parentField: 'assetID', childField: 'ASSET_ID'},
                      {parentField: 'assetName', childField: 'ASSET_NAME'},
                      {parentField: 'assetType', childField: 'ASSET_TYPE'},
                      {parentField: 'model', childField: 'MODEL'},
                      {parentField: 'manufacturer', childField: 'MANUFACTURER'},
                      {parentField: 'capacity', childField: 'CAPACITY'},
                      {parentField: 'uom', childField: 'UOM'},
                      {parentField: 'site', childField: 'SITE'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'discomAsset',
    label: 'Discom Asset ID',
    // maxLength:100,
    //  required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'continumAsset',
    label: 'Continum Asset ID',
    // maxLength:100,
    //  required:true
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'assetName',
    label: 'Asset Name',
    maxLength:100,
     required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetType',
    label: 'Asset Type',
    masterField:'assetType',
    required:true,
    event :{
      serviceName:'ONCHANGE_ASSET_TYPE',
      moduleName :'CRM_Master',
      input:['assetType']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'make',
    label: 'Make',
    maxLength:80
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'model',
    label: 'Model',
    maxLength:80,
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'manufacturer',
    label: 'Manufacturer',
    masterField:'manufacturer',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'capacity',
    label: 'Capacity',
    inputType: 'number',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'uom',
    label: 'UOM',
  //  masterField:'uom',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
  // masterField:'site',
    required:true
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'lat',
    label: 'Lat',
    inputType:"number",
  },
  {
    type: ControlType.TEXTBOX,
    name: 'long',
    label: 'Long',
    inputType:"number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'modemSerialNumber',
    label: 'Modem Serial Number',
    // maxLength:80
  },
  {
    type: ControlType.TEXTBOX,
    name: 'simNumber',
    label: 'SIM Number',
    // maxLength:80

  },
  {
    type: ControlType.TEXTBOX,
    name: 'htsc',
    label: 'HTSC#1',
    // maxLength:80

  },
  {
    type: ControlType.TEXTBOX,
    name: 'htsc2',
    label: 'HTSC#2',
    // maxLength:80

  },
  // {
  //   type: ControlType.TEXTBOX,
  //   name: 'htsc3',
  //   label: 'HTSC#3',
  //   // maxLength:80

  // },
];

const AssetGroupingSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'assetGrouping',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
      resetFieldsOnRowDuplicate:['KEY']
    },
    columns: [

      {
        title: 'Type',
        dataField: 'TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          //required:true,
          masterField: 'TYPE',
        }
      },

      {
        title: 'Description',
        dataField: 'DESCRIPTION',
        cellEditor: TableCellEditorType.TEXTBOX,
      },

    ]
  },
];  

const MeterMappingSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'meterMapping',
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
            title: 'Meter ID',
            dataField: 'METER_ID',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required:true,
              maxLength:100
            } 
          },
          {
            title: 'Meter Type',
            dataField: 'METER_TYPE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'METER_TYPE',
            }
          },
          {
            title: 'Make',
            dataField: 'MAKE',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              maxLength:80
            }
          },
          {
            title: 'Model',
            dataField: 'MODEL',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              maxLength:80
            }
          },
          {
            title: 'Manufacturer',
            dataField: 'MANUFACTURER',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'MANUFACTURER',
            } 
          },
          {
            title: 'Last QC Date',
            dataField: 'LAST_QC_DATE',
            cellEditor: TableCellEditorType.DATE_PICKER,
            cellEditorParams:{
              required:true
            }
          },
          {
            title: 'Meter Status',
            dataField: 'METER_STATUS',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              masterField: 'METER_STATUS',
            }
          },
          {
            title: 'MF',
            dataField: 'MF',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required:true,
              inputType:"number"
            } 
          },
          {
            title: 'Lat',
            dataField: 'LAT',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
              maxLength:10
            }
          },
          {
            title: 'Long',
            dataField: 'LONG',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
              maxLength:10
            }
          },
          {
            title: 'Active',
            dataField: 'STATUS',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'ACTIVE',
            }
          }
        ]
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
      name: 'attachments',
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
            required:true,
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
          cellRendererParams:{
           maxHeight:400
          } ,  
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
          serviceName: 'RCRM_ASSET_CREATE_MST',
          moduleName: 'CRM_Master',
          input: [...actionInputs],
        },
      },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'RCRM_ASSET_ACTIVATE_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'RCRM_ASSET_INACTIVATE_MST',
        moduleName: 'CRM_Master',
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
  serviceName: 'RCRM_ASSET_INIT_MST',
  moduleName: CRM_MASTER,
    input: ['assetID']
};

export const ManageAsset:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
      assetID: code,
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
       <RFSection  controls={AssetSection} title={'Asset Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
       <RFSection  controls={AssetGroupingSection}  title={'Asset Grouping'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
       <RFSection  controls={MeterMappingSection}  title={'Meter Mapping'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
       <RFSection controls={NotesSection} title={'Notes'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
       <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};



