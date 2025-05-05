
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
  TableCellRendererType,
  TableCellEditorType,
  RFTabItem,
  RFTabs,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { UomMasterHelp } from '../../master/UomMaster/UomMasterHelp';
import { DailyMeterHelp } from './DailyMeterHelp';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT, DATE_TIME_FORMAT,HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { date } from 'yup'


const actionInputs = ['id', 'site', 'meterid', 'metertype', 'assetid', 'assetname', 'takenby',
  'netreading', 'uom', 'date', 'time', 'mf', 'exlastreading', 'exlastreadingdate', 'exlastreadingtime', 'excurrentreading', 'exnetreading', 'exuom', 'expowerfactor',
  'exvoltage', 'mf', 'imlastreading', 'imlastreadingdate', 'imlastreadingtime', 'imuom', 'impowerfactor', 'imvoltage', 'imcurrentreading', 'notes', 'attachmentgridDaily', 'imnetreading', 'ExportReadingDetailsSection', 'ImportReadingDetailsSection',
  'dailyexportFifteenMinGrid', 'dailyimportFifteenGridSection', 'dailyexportGrid', 'dailyimportGrid','assettype'
];

const onEnterEvent: IRFEventParams = {
  input: ['id'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'ONENTER_DAILY_METER_MST',
};

const helpComponents = {
  DailyMeterHelp: DailyMeterHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'id',
    label: 'ID',
    required: true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Daily Meter',
      componentName: 'DailyMeterHelp',
      receiveParams: [
        { parentField: 'id', childField: 'dailymeter_id' },
      ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    required: true,
    masterField: 'site',
    event: {
      serviceName: 'RCRM_DAILY_METER_ONCHANGE_SITE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['site']
    }

  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset ID',
    required: true,
    event: {
      serviceName: 'RCRM_DAILYMETER_ONCHANGE_ASSET',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['assetid']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'assetname',
    label: 'Asset Name',
  },
  {
    type: ControlType.DISPLAY,
    name: 'assettype',
    label: 'Asset Type',
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'metertype',
    label: 'Meter Type',
    masterField: 'metertype',
    required: true,
    event: {
      serviceName: 'RCRM_DAILY_METER_ONCHANGE_METER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['metertype', 'assetid']
    }
  },
  
  {
    type: ControlType.DISPLAY,
    name: 'meterid',
    label: 'Meter ID',
  },
];

const ManageDailyMeterSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'uom',
    label: 'UOM',
    masterField: 'uom',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
    required: true,
    event: {
      serviceName: 'DAILYMETER_ONCHANGE_DATE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['date', 'metertype', 'assetid', 'site', 'mf', 'meterid']
    }
  },
  {
    type: ControlType.TIMEPICKER,
    name: 'time',
    label: 'Time',
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'NetEnergy',
    label: 'Net Energy',
  },
  {
    type: ControlType.DISPLAY,
    name: 'netenergy_tod_kwh',
    label: 'Net Energy (kWh) (TOD - 15Mins Block)',
  },
  {
    type: ControlType.DISPLAY,
    name: 'netenergy_tod',
    label: 'Net Energy (kWh) (TOD)'
  },

];

const ExportReadingDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'mf',
    label: 'MF',
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreading',
    label: 'Last Reading',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingdate',
    label: 'Last Reading Date',
    format:DATE_FORMAT
   // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingtime',
    label: 'Last Reading Time',
    format:HH_MM
   // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'excurrentreading',
    label: 'Current Reading',
    required: true,
    onBlurEvent:
    {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'DAILYEXPORT_NETREADING_ONENTER',
      input: ['exlastreading', 'excurrentreading', 'mf']
    },

    event: {
      serviceName: 'DAILYEXPORT_NETREADING_ONENTER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['exlastreading', 'excurrentreading', 'mf']
    }
  },

  {
    type: ControlType.DISPLAY,
    name: 'exnetreading',
    label: 'Net Reading',
    // required:true
  },
  /*
  {
      type: ControlType.DISPLAY,
      name: 'exuom',
      label: 'UOM',
      // required:true
    },
    */
  {
    type: ControlType.TEXTBOX,
    name: 'expowerfactor',
    label: 'Power Factor',
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'exvoltage',
    label: 'Voltage',
  }
];

const ImportReadingDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'mf',
    label: 'MF',
    //  required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreading',
    label: 'Last Reading',
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingdate',
    label: 'Last Reading Date',
    format:DATE_FORMAT,
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingtime',
    label: 'Last Reading Time',
    format:HH_MM
    //required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'imcurrentreading',
    label: 'Current Reading',
    required: true,
    onBlurEvent:
    {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_DAILYIMPORT_NETREADING_ONENTER',
      input: ['imlastreading', 'imcurrentreading', 'mf']
    },
    event: {
      serviceName: 'RCRM_DAILYIMPORT_NETREADING_ONENTER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['imlastreading', 'imcurrentreading', 'mf']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'imnetreading',
    label: 'Net Reading',
    // required:true
  },
  /*
  {
      type: ControlType.DISPLAY,
      name: 'imuom',
      label: 'UOM',
      // required:true
    },*/
  {
    type: ControlType.TEXTBOX,
    name: 'impowerfactor',
    label: 'Power Factor',
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'imvoltage',
    label: 'Voltage',
  }
];

const exportFifteenMinGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'dailyexportFifteenMinGrid',
    isPrimeReactTable: true,

    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true,
      enableBulkUpload: true,
      bulkUploadTemplateFileName: 'Daily_Meter_Entry_Export_Bulk_Upload_Template.xlsx'
    },

    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_EXP_FIFTEEN',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams:{
          masterField: 'TOD_CODE_15',
          disable: true
        },
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_EXP_FIFTEEN',
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME_EXP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME_EXP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'MF',
        dataField: 'mf',
        hidden: true,
      },
      {
        title: 'Last Reading',
        dataField: 'DAILY_LAST_READING_EXP_FIFTEEN',
       
      },
      {
        title: 'Last Reading Date',
        dataField: 'DAILY_LAST_READING_DATE_EXP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        }
        
      },
      {
        title: 'Last Reading Time',
        dataField: 'DAILY_LAST_READING_TIME_EXP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Current Reading',
        dataField: 'CURRENT_READING_EXP_FIFTEEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",


        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_EXP_FIFTEENC',
      },

      {
        title: 'Power Factor',
        dataField: 'POWER_FACTOR_EXP_FIFTEEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Voltage',
        dataField: 'VOLTAGE_EXP_FIFTEEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }

      },

    ],
  },
];

const importGridSectionFifteen: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'dailyimportFifteenGridSection',
    isPrimeReactTable: true,

    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true,
      enableBulkUpload: true,
      bulkUploadTemplateFileName: 'Daily_Meter_Entry_Import_Bulk_Upload_Template.xlsx'
    },

    columns: [

      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_IMP_FIFTEEN',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams:{
          masterField: 'TOD_CODE_15',
          disable: true
        },
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_IMP_FIFTEEN',
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME_IMP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME_IMP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'MF',
        dataField: 'mf',
        hidden: true,
      },
      {
        title: 'Last Reading',
        dataField: 'DAILY_LAST_READING_IMP_FIFTEEN',
        
      },
      {
        title: 'Last Reading Date',
        dataField: 'DAILY_LAST_READING_DATE_IMP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        }
      
      },
      {
        title: 'Last Reading Time',
        dataField: 'DAILY_LAST_READING_TIME_IMP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Current Reading',
        dataField: 'CURRENT_READING_IMP_FIFTEEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_IMP_FIFTEEN',

      },

      {
        title: 'Power Factor',
        dataField: 'POWER_FACTOR_IMP_FIFTEEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Voltage',
        dataField: 'VOLTAGE_IMP_FIFTEEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
    ],
  },
];

const exportGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'dailyexportGrid',
    isPrimeReactTable: true,

    editorProps: {
      isEditable: true, 
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true,
    },

    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_EXP',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams:{
          masterField: 'TOD_CODE',
          disable: true
        },

      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_EXP',
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME_EXP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME_EXP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'MF',
        dataField: 'mf',
        hidden: true,
      },
      {
        title: 'Last Reading',
        dataField: 'DAILY_LAST_READING_EXP',
       
      },
      {
        title: 'seq no',
        dataField: 'SEQ_NO_EXP',
        hidden: true,

      },
      {
        title: 'Last Reading Date',
        dataField: 'DAILY_LAST_READING_DATE_EXP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        }
        
      },
      {
        title: 'Last Reading Time',
        dataField: 'DAILY_LAST_READING_TIME_EXP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Current Reading',
        dataField: 'CURRENT_READING_EXP',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_EXP',

      },

      {
        title: 'Power Factor',
        dataField: 'POWER_FACTOR_EXP',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Voltage',
        dataField: 'VOLTAGE_EXP',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },

    ],
  },
];

const importGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'dailyimportGrid',
    isPrimeReactTable: true,

    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true,
    },

    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_IMP',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams:{
          masterField: 'TOD_CODE',
          disable: true
        },

      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_IMP',
      },
      {
        title: 'seq no',
        dataField: 'SEQ_NO_IMP',
        hidden: true,

      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME_IMP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME_IMP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'MF',
        dataField: 'mf',
        hidden: true,
      },
      {
        title: 'Last Reading',
        dataField: 'DAILY_LAST_READING_IMP',
       
      },
      {
        title: 'Last Reading Date',
        dataField: 'DAILY_LAST_READING_DATE_IMP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        }
       
      },
      {
        title: 'Last Reading Time',
        dataField: 'DAILY_LAST_READING_TIME_IMP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Current Reading',
        dataField: 'CURRENT_READING_IMP',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_IMP',
      },
      {
        title: 'Power Factor',
        dataField: 'POWER_FACTOR_IMP',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
      {
        title: 'Voltage',
        dataField: 'VOLTAGE_IMP',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",

        }
      },
    ],
  },
];

export const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
    format: DATE_TIME_FORMAT

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
    format: DATE_TIME_FORMAT

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
    multiLine: true,
    multiLineRowLength: 4
  },
]

const attachmentSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'attachmentgridDaily',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,
    },
    columns: [
      {
        title: 'Upload Document',
        dataField: 'UPLOAD_DOC',
        cellRenderer: TableCellRendererType.FILE_UPLOADER,
        cellRendererParams: {
          maximumAllowedFileSizeInMB: 10,
          allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
          originalFileNameField: 'file_name'
        },
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
      serviceName: 'RCRM_CREATE_DAILYMETER_MST',
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
      serviceName: 'RCRM_SAVE_DAILYMETER_MST',
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
      serviceName: 'RCRM_SUBMIT_DAILY_METER_ENTRY_MST',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },

];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_DAILYMETER_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id']
};

export const ManageDailyMeterEntry: React.FC<IPageBaseProps> = (props) => {
  const { id } = usePageQueryParam();


  const initialData: IRFData = {
    id: id,

  };


  return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'}>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={searchSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={ManageDailyMeterSection} title={'Daily Summary'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        {/* <RFSection  controls={ExportReadingDetailsSection} title={'Export Reading Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={ImportReadingDetailsSection} title={'Import Reading Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/> */}
        <RFTabs>
          <RFTabItem headerText='Export Reading Details' alwaysRender>
            <RFSection controls={ExportReadingDetailsSection} columns={6} />
          </RFTabItem>
          <RFTabItem headerText='Import Reading Details' alwaysRender>
            <RFSection controls={ImportReadingDetailsSection} columns={6} />
          </RFTabItem>
        </RFTabs>
        <RFSection controls={exportFifteenMinGridSection} title={'Export Reading Details - TOD Breakup - 15 Mins Block'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={importGridSectionFifteen} title={'Import Reading Details - TOD Breakup - 15 Mins Block'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={exportGridSection} title={'Export Reading Details - TOD Breakup'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={importGridSection} title={'Import Reading Details - TOD Breakup'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={NotesSection} title={'Notes'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection} />
    </RetinaFormBuilder>
  );
};