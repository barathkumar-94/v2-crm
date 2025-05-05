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
  RFTabs,
  RFTabItem,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { UomMasterHelp } from '../../master/UomMaster/UomMasterHelp';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { date } from 'yup';
import { CustomerAccountHelp } from '../../master/CustomerAccount/CustomerAccountHelp';
import { ConsumerBillDataHelp } from './consumerBillDataHelp';


const actionInputs = ['id', 'customercode', 'customername', 'htsc', 'date', 'time', 'status', 'generationyear', 'generationPeriod', 'netenergy',
  'netkvarh', 'netkVAh', 'netenergy_tod', 'exmfkwh', 'exlastreadingkwh', 'exlastreadingdatekwh', 'exlastreadingtimekwh', 'excurrentreadingkwh', 'exnetreadingkwh', 'expowerfactorkwh',
  'exvoltagekwh', 'exmfkvarh', 'exlastreadingkvarh', 'exlastreadingdatekvarh', 'exlastreadingtimekvarh', 'excurrentreadingkvarh', 'exnetreadingkvarh', 'expowerfactorkvarh', 'exvoltagekvarh',
  'immfkwh', 'imlastreadingkwh', 'imlastreadingdatekwh', 'imlastreadingtimekwh', 'imcurrentreadingkwh', 'imnetreadingkwh', 'impowerfactorkwh', 'imvoltagekwh',
  'immfkvarh', 'imlastreadingkvarh', 'imlastreadingdatekvarh', 'imlastreadingtimekvarh', 'imcurrentreadingkvarh', 'imnetreadingkvarh', 'impowerfactorkvarh', 'imvoltagekvarh',
  'exportReadingDetails', 'importReadingDetails', 'consumptionBreakupBySource', 'notes', 'attachmentgrid','creditDataUom','totalCreditUnits','SLDCUnits'
];

const onEnterEvent: IRFEventParams = {
  input: ['id'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'RCRM_CONSUMERBILLDATA_ONENTER',
};

const helpComponents = {
  CustomerAccountHelp: CustomerAccountHelp,
  ConsumerBillDataHelp: ConsumerBillDataHelp
}
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'id',
    label: 'ID',
    required: true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Consumer Bill data',
      componentName: 'ConsumerBillDataHelp',
      receiveParams: [{ parentField: 'generationyear', childField: 'GENERATION_YEAR' },
      { parentField: 'generationPeriod', childField: 'GENERATION_PERIOD' },
      { parentField: 'date', childField: 'DATE' },
      { parentField: 'id', childField: 'ID' },
      { parentField: 'customercode', childField: 'CUSTOMER_CODE' },
      { parentField: 'customername', childField: 'CUSTOMER_NAME' },
      { parentField: 'htsc', childField: 'HT_SC' },
      { parentField: 'netenergy', childField: 'NET_READING' },
      ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customercode',
    label: 'Customer Code',
    event: {
      serviceName: 'RCRM_CUSTOMER_NAME_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['customercode']
    },
    help: {
      panelTitle: 'Help On Customer Account',
      componentName: 'CustomerAccountHelp',
      receiveParams: [{ parentField: 'customercode', childField: 'CUSTOMER_CODE' },
      { parentField: 'customername', childField: 'CUSTOMER_NAME' },
      ],
      event: {
        serviceName: 'RCRM_CUSTOMER_NAME_ONCHANGE',
        moduleName: CRM_ENERGY_ACCOUNTING,
        input: ['customercode']
      },
    },

    required: true,

  },
  {
    type: ControlType.DISPLAY,
    name: 'customername',
    label: 'Customer Name',

  },
  {
    type: ControlType.COMBOBOX,
    name: 'htsc',
    label: 'HT SC#',
    masterField: 'htsc',
    required: true,
    event: {
      serviceName: 'RCRM_CONSUMER_HTSC_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['htsc']
    },

  },
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
    required: true,

  },

  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',

  },
  {
    type: ControlType.TIMEPICKER,
    name: 'time',
    label: 'Time',
    required: true,

  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField: 'generationyear',
    required: true,
    event: {
      serviceName: 'RCRM_CONSUMER_GENERATION_YEAR_ONCHANGE',
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
      serviceName: 'RCRM_MONTHLY_PERIOD_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['generationPeriod', 'customercode', 'htsc']
    }
  },

];


const MonthlySummarySection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'netenergy',
    label: 'Net Energy(kWh)',

  },
  {
    type: ControlType.DISPLAY,
    name: 'netkvarh',
    label: 'Net kVARh'
  },
  {
    type: ControlType.DISPLAY,
    name: 'netkVAh',
    label: 'Net kVAh'
  },
  {
    type: ControlType.DISPLAY,
    name: 'netenergy_tod',
    label: 'Net Energy(kWh)(TOD)'
  },


];

const ExportReadingKwhSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'exmfkwh',
    label: 'MF',
    inputType: "number",
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingkwh',
    label: 'Last Reading',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingdatekwh',
    label: 'Last Reading Date',
    format: DATE_FORMAT

    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingtimekwh',
    label: 'Last Reading Time',
    format: HH_MM
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'excurrentreadingkwh',
    label: 'Current Reading',
    required: true,
    inputType: "number",/*
    event: {
      serviceName: 'RCRM_DAILYMETER_CURRENTREADING_CHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['exlastreading', 'excurrentreading']
    }*/
  },

  {
    type: ControlType.DISPLAY,
    name: 'exnetreadingkwh',
    label: 'Net Reading',
    // required:true
  },

  {
    type: ControlType.TEXTBOX,
    name: 'expowerfactorkwh',
    label: 'Power Factor',
    inputType: "number",
  },
  {
    type: ControlType.TEXTBOX,
    name: 'exvoltagekwh',
    label: 'Voltage',
    inputType: "number",
  }
];

const ExportReadingKvarhSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'exmfkvarh',
    label: 'MF',
    inputType: "number",
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingkvarh',
    label: 'Last Reading (Lead)',
    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingdatekvarh',
    label: 'Last Reading Date',
    format: DATE_FORMAT

    // required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'exlastreadingtimekvarh',
    label: 'Last Reading Time',
    format: HH_MM
    // required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'excurrentreadingkvarh',
    label: 'Current Reading (Lead)',
    inputType: "number",/*
    required: true,
    event: {
      serviceName: 'RCRM_DAILYMETER_CURRENTREADING_CHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['exlastreading', 'excurrentreading']
    }*/
  },

  {
    type: ControlType.DISPLAY,
    name: 'exnetreadingkvarh',
    label: 'Net Reading',
    // required:true
  },

  {
    type: ControlType.TEXTBOX,
    name: 'expowerfactorkvarh',
    label: 'Power Factor',
    inputType: "number",
  },
  {
    type: ControlType.TEXTBOX,
    name: 'exvoltagekvarh',
    label: 'Voltage',
    inputType: "number",
  }
];

const ImportReadingkwhSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'immfkwh',
    label: 'MF',
    inputType: "number",
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingkwh',
    label: 'Last Reading',
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingdatekwh',
    label: 'Last Reading Date',
    format: DATE_FORMAT

    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingtimekwh',
    label: 'Last Reading Time',
    format: HH_MM
    //required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'imcurrentreadingkwh',
    label: 'Current Reading',
    required: true,
    inputType: 'number',/*
    event: {
      serviceName: 'RCRM_DAILYMETER_IMPCURRENTREADING_CHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['imlastreading', 'imcurrentreading']
    }*/
  },
  {
    type: ControlType.DISPLAY,
    name: 'imnetreadingkwh',
    label: 'Net Reading',
    // required:true
  },

  {
    type: ControlType.TEXTBOX,
    name: 'impowerfactorkwh',
    label: 'Power Factor',
    inputType: 'number',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'imvoltagekwh',
    label: 'Voltage',
    inputType: 'number',
  }
];
const ImportReadingkvarhSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'immfkvarh',
    label: 'MF',
    inputType: "number",
    required: true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingkvarh',
    label: 'Last Reading',
    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingdatekvarh',
    label: 'Last Reading Date',
    format: DATE_FORMAT

    //required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'imlastreadingtimekvarh',
    label: 'Last Reading Time',
    format: HH_MM
    //required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'imcurrentreadingkvarh',
    label: 'Current Reading',
    required: true,
    inputType: 'number',/*
    event: {
      serviceName: 'RCRM_DAILYMETER_IMPCURRENTREADING_CHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['imlastreading', 'imcurrentreading']
    }*/
  },
  {
    type: ControlType.DISPLAY,
    name: 'imnetreadingkvarh',
    label: 'Net Reading',
    // required:true
  },

  {
    type: ControlType.TEXTBOX,
    name: 'impowerfactorkvarh',
    label: 'Power Factor',
    inputType: 'number',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'imvoltagekvarh',
    label: 'Voltage',
    inputType: 'number',
  }
];
const ExportReadingDetails: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'exportReadingDetails',
    isPrimeReactTable: true,
    column: 12,
    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true
    },

    



    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_EX',
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_EX',
      },
      {
        title: 'Seq no',
        dataField: 'SEQ_NO_EX',
        hidden: true,
      },

      {
        title: 'From Time',
        dataField: 'FROM_TIME_EX',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME_EX',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }
      },
      {
        title: 'MF',
        dataField: 'MF_EX',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",
        }
      },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_EX',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_EX',
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_EX',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }
      },
      {
        title: 'Current Reading',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataField: 'CURRENT_READING_EX',
        cellEditorParams:
        {
          inputType: "number",
        }

      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_EX',
      },
      {
        title: 'Power Factor',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataField: 'POWER_FACTOR_EX',
        cellEditorParams:
        {
          inputType: "number",
        }
      },
      {
        title: 'Voltage',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataField: 'VOLTAGE_EX',
        cellEditorParams:
        {
          inputType: "number",
        }
      },
    ]

  }
];

const ImportReadingSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'importReadingDetails',
    isPrimeReactTable: true,
    column: 12,

    editorProps: {
      isEditable: true,
      hideDelete: true,
      hideAdd: true,
      hideRowDuplicate:true
    },

    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE_IM',
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME_IM',
      },
      {
        title: 'Seq no',
        dataField: 'SEQ_NO_IM',
        hidden: true,
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME_IM',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME_IM',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }
      },
      {
        title: 'MF',
        dataField: 'MF_IM',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",
        }
      },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_IM',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_IM',
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_IM',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }
      },
      {
        title: 'Current Reading',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataField: 'CURRENT_READING_IM',
        cellEditorParams:
        {
          inputType: "number",
        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING_IM',
      },
      {
        title: 'Power Factor',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataField: 'POWER_FACTOR_IM',
        cellEditorParams:
        {
          inputType: "number",
        }
      },
      {
        title: 'Voltage',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataField: 'VOLTAGE_IM',
        cellEditorParams:
        {
          inputType: "number",
        }
      },
    ]

  }
];

const ConsumptionBreakupBySource: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'consumptionBreakupBySource',
    isPrimeReactTable: true,
    column: 12,
    editorProps: {
      isEditable: true,
    },
    columns: [
      {
        title: 'Source Description',
        dataField: 'DESCRIPTION',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'DESCRIPTION',
          required: true,
        }
      },
      {
        title: 'Units',
        dataField: 'UNITS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required: true,
        }
      },
      {
        title: 'UOM',
        dataField: 'UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'UOM',
          required: true,
        }

      },
      {
        title: 'Remarks',
        dataField: 'REMARKS',
        cellEditor: TableCellEditorType.TEXTBOX,

      },

    ]

  }
];
// const customerCreditData: IControlDefinition[] = [
//   {
//     type: ControlType.COMBOBOX,
//     name: 'creditDataUom',
//     label: 'UOM',
//     masterField:'creditDataUom',
//     column:2
//   },

//   {
//     type: ControlType.TEXTBOX,
//     name: 'totalCreditUnits',
//     label: 'Total Credit Units',
//     inputType: 'number',
//     column:2
//   },
//   {
//     type: ControlType.TEXTBOX,
//     name: 'SLDCUnits',
//     label: 'SLDC Units',
//     inputType: 'number',
//     column:2
//   },
//     {
//     type: ControlType.TABLE,
//     name: 'customerCreditData',
//     isPrimeReactTable: true,

//     editorProps: {
//       isEditable: true,
//       hideDelete: true,
//       hideAdd: true,
//     },

//     columns: [
//       {
//         title: 'TOU Code',
//         dataField: 'TOD_CODE',

//       },
//       {
//         title: 'TOU Name',
//         dataField: 'TOD_NAME',
//       },
//       {
//         title: 'From Time',
//         dataField: 'FROM_TIME',
//         cellRenderer: TableCellRendererType.TEXT,
//         cellRendererParams: {
//           format: HH_MM
//         }

//       },
//       {
//         title: 'To Time',
//         dataField: 'TO_TIME',
//         cellRenderer: TableCellRendererType.TEXT,
//         cellRendererParams: {
//           format: HH_MM
//         }
//       },
//       {
//         title: 'Units',
//         dataField: 'UNITS',
//         cellEditor: TableCellEditorType.TEXTBOX,
//         cellEditorParams:
//         {
//           inputType: "number",
//           // required:true,

//         }

//       },
//       {
//         title: 'seq no',
//         dataField: 'SEQ_NO',
//         hidden: true,
//       },

//     ],
//   },
// ];
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
    name: 'attachmentgrid',
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
      serviceName: 'RCRM_CONSUMERBILLDATA_CREATE_MST',
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
      serviceName: 'RCRM_CONSUMERBILLDATA_SAVE_MST',
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
      serviceName: 'RCRM_CONSUMERBILLDATA_SUBMIT_MST',
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
  serviceName: 'RCRM_INIT_CONSUMERBILLDATA_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id']
};

export const ConsumerBillData: React.FC<IPageBaseProps> = (props) => {
  const { id } = usePageQueryParam();


  const initialData: IRFData = {
    id: id
  };


  return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} components={helpComponents}>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={searchSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        {/* <RFSection controls={customerCreditData} title={'Customer Credit Data'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        */}
        <RFSection controls={MonthlySummarySection} title={'Monthly Summary'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFTabs>
          <RFTabItem headerText='Export Reading Details - kWh' alwaysRender>
            <RFSection controls={ExportReadingKwhSection} columns={6} />
          </RFTabItem>
          <RFTabItem headerText='Export Reading Details - kVARh' alwaysRender>
            <RFSection controls={ExportReadingKvarhSection} columns={6} />
          </RFTabItem>
        </RFTabs>
        {/* <RFSection  controls={ExportReadingKwhSection} title={'Export Reading Details - kWh'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={ExportReadingKvarhSection} title={'Export Reading Details - kVARh'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
       */}
        <RFTabs>
          <RFTabItem headerText='Import Reading Details - kWh' alwaysRender>
            <RFSection controls={ImportReadingkwhSection} columns={6} />
          </RFTabItem>
          <RFTabItem headerText='Import Reading Details - kVARh' alwaysRender>
            <RFSection controls={ImportReadingkvarhSection} columns={6} />
          </RFTabItem>
        </RFTabs>

        {/* <RFSection  controls={ImportReadingkwhSection} title={'Import Reading Details - kWh'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={ImportReadingkvarhSection} title={'Import Reading Details - kVARh'} columns={6} className={'section-header-bg-primary'} collapse={false}/> */}
       
           <RFSection controls={ExportReadingDetails} title={'Export Reading Details'} columns={6} className={'section-header-bg-primary'} collapse={false}   />
         
        <RFSection controls={ImportReadingSection} title={'Import Reading Details'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        
       <RFSection controls={ConsumptionBreakupBySource} title={'Consumption Breakup by Source'} columns={6} className={'section-header-bg-primary'} collapse={false} />
      

        <RFSection controls={NotesSection} title={'Notes'} columns={1} className={'section-header-bg-primary'} collapse={false} />
           <RFSection controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false} />  
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection} />
    </RetinaFormBuilder>
  );
};