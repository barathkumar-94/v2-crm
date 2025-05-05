
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
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { MonthlyMeterEntryHelp } from './MonthlyMeterEntryHelp';





const actionInputs = [
  'id', 'site', 'meterid', 'hdnmeterid','metertype', 'assetid', 'assetname', 'status', 'takenby', 'notes', 'generationPeriod'
  , 'time', 'netreadingkwh', 'netreadingkvarh', 'net_kvah', 'netenergy_tod_kwh', 'netenergy_tod', 'mf', 'lastreadingExp_kwh', 'lastreadingdateexp_kwh', 'lastreadingtimeExp_kwh',
  'currentreadingexp_kwh', 'netreadingExp_kwh', 'powerfactorExp_kwh', 'voltageExp_kwh', 'lastreadingExp_kvarh', 'lastreadingdateExp_kvarh', 'lastreadingtimeExp_kvarh'
  , 'currentreadingExp_kvarh', 'netreadingExp_kvarh', 'powerfactorExp_kvarh', 'voltageExp_kvarh', 'lastreadingImp_kwh', 'date',
  'lastreadingtimeImp_kwh', 'currentreadingImp_kwh', 'netreadingImp_kwh', 'powerfactorImp_kwh', 'voltageImp_kwh', 'notes', 'attachmentMontlyMetergrid', 'exportFifteenMinGrid',
  'importfifteenGrid', 'exportGrid', 'importGrid', 'generationyear','lineloss','service_number','other_charges','meter_charges','kvah_export','kvah_import','finalreadingkwh','finalenergy_tod',
  'lastreadingImp_kvarh', 'lastreadingdateImp_kvarh', 'lastreadingtimeImp_kvarh', 'currentreadingImp_kvarh', 'netreadingImp_kvarh', 'powerfactorImp_kvarh', 'voltageImp_kvarh','assettype'];

const onEnterEvent: IRFEventParams = {
  input: ['id'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'RCRM_ONENTER_MONTHLY_METER_ENTRY_MST',
};

const helpComponents = {
  MonthlyMeterEntryHelp: MonthlyMeterEntryHelp
};

const generalSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'id',
    label: 'ID',
    required: true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Monthly Meter Help',
      componentName: 'MonthlyMeterEntryHelp',
      receiveParams: [{ parentField: 'id', childField: 'ENTRY_ID' },
      ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField: 'site',
    required: true,
    event: {
      serviceName: 'RCRM_MONTHLYMETER_ONCHANGE_ASSET',
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
      serviceName: 'RCRM_ONCHANGE_ASSET',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['assetid']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'service_number',
    label: 'Service Number',
  },
  {
    type: ControlType.DISPLAY,
    name: 'assetname',
    label: 'Asset Name',
  },

  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.DISPLAY,
    name: 'assettype',
    label: 'Asset Type',
  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'metertype',
    label: 'Meter Type',
    masterField: 'metertype',
    required: true,
    event: {
      serviceName: 'RCRM_ONCHANGE_METER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['metertype', 'assetid']
    }
  },
  

  {
    type: ControlType.DISPLAY,
    name: 'meterid',
    label: 'Meter ID',
    required:true,
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'hdnmeterid',
    label: 'Meter ID',
    hidden:true
  },

  {
    type: ControlType.TEXTBOX,
    name: 'lineloss',
    label: 'Line Loss',
    required:true,
    inputType:'number',
    
  },

  {
    type: ControlType.TEXTBOX,
    name: 'other_charges',
    label: 'Other Charges',
    //required:true,
    inputType:'number',
    
  },

  {
    type: ControlType.TEXTBOX,
    name: 'meter_charges',
    label: 'Meter Charges',
    required:true,
    inputType:'number',
    
  },
];
const MonthlySection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField: 'generationyear',
    required: true,
    event: {
      serviceName: 'RCRM_GENERATION_YEAR_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['generationyear']
    }
  },


  {
    type: ControlType.COMBOBOX,
    name: 'generationPeriod',
    label: 'Generation Period',
    masterField: 'generationPeriod',
    required: true,
    event: {
      serviceName: 'RCRM_MONTHLYMETER_ONCHANGE_DATE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['mf','generationPeriod', 'metertype', 'assetid', 'site','meterid']
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
    required: true,


  },
  {
    type: ControlType.TIMEPICKER,
    name: 'time',
    label: 'Time',
    required: true
  },
  //   {
  //   type: ControlType.TEXTBOX,
  //   name: 'gencontrollerkwh',
  //   label: 'Generation at Controller (KWH)',
  //   required:true

  // },
  {
    type: ControlType.DISPLAY,
    name: 'netreadingkwh',
    label: 'Total Net Energy (kWh)',
  },


  {
    type: ControlType.DISPLAY,
    name: 'finalreadingkwh',
    label: 'Final Net Energy (kWh)',
  },
 
  // {
  //   type: ControlType.DISPLAY,
  //   name: 'net_kvah',
  //   label: 'Net kVAh',

  // },

  
  {
    type: ControlType.DISPLAY,
    name: 'netenergy_tod_kwh',
    label: 'Net Energy (kWh) (TOD - 15Mins Block)',
    column: 4
  },

  {
    type: ControlType.DISPLAY,
    name: 'netenergy_tod',
    label: 'Total Net Energy (kWh) (TOD)',
    column: 4
  },

  {
    type: ControlType.DISPLAY,
    name: 'finalenergy_tod',
    label: 'Final Net Energy (kWh) (TOD)',
    column: 4
  },

  {
    type: ControlType.DISPLAY,
    name: 'netreadingkvarh',
    label: 'Net kVARh',

  },

  {
    type: ControlType.TEXTBOX,
    name: 'kvah_export',
    label: 'KVAH Export',
    required:true,
    inputType:'number',
    
  },

  {
    type: ControlType.TEXTBOX,
    name: 'kvah_import',
    label: 'KVAH Import',
    required:true,
    inputType:'number',
    
  },
];

const ExportReadingKWHSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'mf',
    label: 'MF',
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingExp_kwh',
    label: 'Last Reading',
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingdateexp_kwh',
    label: 'Last Reading Date',
    format: DATE_FORMAT
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingtimeExp_kwh',
    label: 'Last Reading Time',
    format:HH_MM
  },
  {
    type: ControlType.TEXTBOX,
    name: 'currentreadingexp_kwh',
    label: 'Current Reading',
    inputType: "number",
    required: true,
    onBlurEvent:
    {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'MONTHLYEXPORT_KWH_NETREADING_ONENTER',
      input: ['currentreadingexp_kwh', 'lastreadingExp_kwh', 'mf']
    },
    event: {
      serviceName: 'MONTHLYEXPORT_KWH_NETREADING_ONENTER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['currentreadingexp_kwh', 'lastreadingExp_kwh', 'mf']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'netreadingExp_kwh',
    label: 'Net Reading',
    // inputType:"number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'powerfactorExp_kwh',
    label: 'Power Factor',
    inputType: "number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'voltageExp_kwh',
    label: 'Voltage',
    inputType: "number",

  }

];

const ExportReadingKVARHSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'mf',
    label: 'MF',
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingExp_kvarh',
    label: 'Last Reading',
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingdateExp_kvarh',
    label: 'Last Reading Date',
    format: DATE_FORMAT

  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingtimeExp_kvarh',
    label: 'Last Reading Time',
    format:HH_MM
  },
  {
    type: ControlType.TEXTBOX,
    name: 'currentreadingExp_kvarh',
    label: 'Current Reading',
    inputType: "number",
    required: true,
    onBlurEvent:
    {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'MONTHLYEXPORT_KVARH_NETREADING_ONENTER',
      input: ['currentreadingExp_kvarh', 'lastreadingExp_kvarh', 'mf']
    },
    event: {
      serviceName: 'MONTHLYEXPORT_KVARH_NETREADING_ONENTER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['currentreadingExp_kvarh', 'lastreadingExp_kvarh', 'mf']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'netreadingExp_kvarh',
    label: 'Net Reading',
    //inputType:"number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'powerfactorExp_kvarh',
    label: 'Power Factor',
    inputType: "number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'voltageExp_kvarh',
    label: 'Voltage',
    inputType: "number",

  }

];

const ImportReadingKWHSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'mf',
    label: 'MF',
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingImp_kwh',
    label: 'Last Reading',
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingdateexp_kwh',
    label: 'Last Reading Date',
    format: DATE_FORMAT
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingtimeImp_kwh',
    label: 'Last Reading Time',
    format:HH_MM
  },
  {
    type: ControlType.TEXTBOX,
    name: 'currentreadingImp_kwh',
    label: 'Current Reading',
    inputType: "number",
    required: true,
    onBlurEvent:
    {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'MONTHLYIMPORT_KWH_NETREADING_ONENTER',
      input: ['currentreadingImp_kwh', 'lastreadingImp_kwh', 'mf']
    },
    event: {
      serviceName: 'MONTHLYIMPORT_KWH_NETREADING_ONENTER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['currentreadingImp_kwh', 'lastreadingImp_kwh', 'mf']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'netreadingImp_kwh',
    label: 'Net Reading',
    //inputType:"number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'powerfactorImp_kwh',
    label: 'Power Factor',
    inputType: "number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'voltageImp_kwh',
    label: 'Voltage',
    inputType: "number",

  }

];

const ImportReadingKVARHSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'mf',
    label: 'MF',
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingImp_kvarh',
    label: 'Last Reading',
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingdateImp_kvarh',
    label: 'Last Reading Date',
    format: DATE_FORMAT

  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingtimeImp_kvarh',
    label: 'Last Reading Time ',
    format:HH_MM
  },
  {
    type: ControlType.TEXTBOX,
    name: 'currentreadingImp_kvarh',
    label: 'Current Reading',
    inputType: "number",
    required: true,
    onBlurEvent:
    {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'MONTHLYIMPORT_KVARH_NETREADING_ONENTER',
      input: ['currentreadingImp_kvarh', 'lastreadingImp_kvarh', 'mf']
    },
    event: {
      serviceName: 'MONTHLYIMPORT_KVARH_NETREADING_ONENTER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['currentreadingImp_kvarh', 'lastreadingImp_kvarh', 'mf']
    }
  },
  {
    type: ControlType.DISPLAY,
    name: 'netreadingImp_kvarh',
    label: 'Net Reading',
    // inputType:"number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'powerfactorImp_kvarh',
    label: 'Power Factor',
    inputType: "number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'voltageImp_kvarh',
    label: 'Voltage',
    inputType: "number",

  }

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

const exportFifteenMinGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'exportFifteenMinGrid',
    isPrimeReactTable: true,

    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true,
      enableBulkUpload: true,
      bulkUploadTemplateFileName: 'Monthly_Meter_Entry_Export_Bulk_Upload_Template.xlsx'

    },

    columns: [
      {
        title: 'Seq No',
        dataField: 'SEQ_NO_EXP_FIFTEEN',
        hidden: true,
      },
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_EXP_FIFTEEN',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'TOD_CODE_EXP_FIFTEEN',
          disable:true
        }
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_EXP_FIFTEEN'
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
        dataField: 'MF_EXP_FIFTEEN',
        hidden:true
      },
      
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_EXP_FIFTEEN'
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_EXP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_EXP_FIFTEEN',
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
          required:true
        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_EXP_FIFTEEN',
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
          inputType: "number"
        }
      },
    ],
  },
];


const importGridSectionFifteen: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'importfifteenGrid',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true,
      enableBulkUpload: true,
      bulkUploadTemplateFileName: 'Monthly_Meter_Entry_Import_Bulk_Upload_Template.xlsx'
    },

    columns: [
      {
        title: 'Seq No',
        dataField: 'SEQ_NO_IMP_FIFTEEN',
        hidden: true,
      },
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_IMP_FIFTEEN',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'TOD_CODE_EXP_FIFTEEN',
          disable:true
        }
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
        dataField: 'MF_IMP_FIFTEEN',
        hidden:true
      },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_IMP_FIFTEEN',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_IMP_FIFTEEN',
        cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }

      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_IMP_FIFTEEN',
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
          required:true
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
    name: 'exportGrid',
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
        cellEditorParams: {
          required:true,
          masterField: 'TOD_CODE_EXP',
          disable:true
        }

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
        dataField: 'MF_EXP',
      },
      {
        title: 'Seq No',
        dataField: 'SEQ_NO_EXP',
        hidden: true,
      },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_EXP',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_EXP',
        cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_EXP',
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
          required:true
        }
      },
      {
        title: 'Net Reading Without Loss',
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
      {
        title: 'Line Loss',
        dataField: 'LINE_LOSS'
      },
      {
        title: 'Net Reading With Loss',
        dataField: 'NET_READING_EXP_WITH_LOSS',
      },
    ],
  },
];

const importGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'importGrid',
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
        cellEditorParams: {
          required:true,
          masterField: 'TOD_CODE_EXP',
          disable:true
        }
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_IMP',
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
        dataField: 'MF_IMP',
      },
      {
        title: 'Seq No',
        dataField: 'SEQ_NO_IMP',
        hidden: true,
      },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_IMP',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_IMP',
        cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_IMP',
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
          required:true
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


const attachmentSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'attachmentMontlyMetergrid',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,

    },

    // editorProps: {
    //   isEditable: true,
    //   enableBulkUpload:true,
    //   bulkUploadTemplateFileName:'productDetails.xlsx'
    // },

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
      serviceName: 'RCRM_CREATE_MONTHLY_METER_ENTRY_MST',
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
      serviceName: 'RCRM_SAVE_MONTHLY_METER_ENTRY_MST',
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
      serviceName: 'RCRM_SUBMIT_MONTHLY_METER_ENTRY_MST',
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
    format: DATE_TIME_FORMAT

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
    format: DATE_TIME_FORMAT

  },
];






const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_MONTHLY_METER_ENTRY_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id']
};

export const ManageMonthlyMeterEntry: React.FC<IPageBaseProps> = (props) => {
  const { id } = usePageQueryParam();

  const initialData: IRFData = {
    id: id,

  };


  return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={MonthlySection} title={'Monthly Summary'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFTabs>
          <RFTabItem headerText='Export Reading Details - kWh' alwaysRender>
            <RFSection controls={ExportReadingKWHSection} columns={6} />
          </RFTabItem>
          <RFTabItem headerText='Export Reading Details - kVARh' alwaysRender>
            <RFSection controls={ExportReadingKVARHSection} columns={6} />
          </RFTabItem>
        </RFTabs>
        <RFTabs>
          <RFTabItem headerText='Import Reading Details - kWh' alwaysRender>
            <RFSection controls={ImportReadingKWHSection} columns={6} />
          </RFTabItem>
          <RFTabItem headerText='Import Reading Details - kVARh' alwaysRender>
            <RFSection controls={ImportReadingKVARHSection} columns={6} />
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
