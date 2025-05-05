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
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { date } from 'yup';
import { CustomerAccountHelp } from '../../master/CustomerAccount/CustomerAccountHelp';
import { ConsumerCreditDataHelp } from './consumerCreditDataHelp';

//import { ConsumerBillDataHelp } from './consumerBillDataHelp';


const actionInputs = ['id', 'customercode', 'customername', 'surplus_units','htsc', 'date', 'time', 'status',
  'generationyear', 'generationPeriod', 'notes', 'wind_sldc_units', 'solar_sldc_units', 'total_sldc_units', 'total_consumed_units',
  'total_units', 'night_units', 'tou_units', 'ot_total_units', 'night_consession_units', 'attachmentgrid', 'ppa',
  'ppa_date', 'units_generated', 'tariff_rate', 'net_units', 'discomtariffgrid', 'openaccesschargesgrid',
  'ppa_rate','sbu','tariff_type','discomtariffvaluegrid','discomtariffvalueannualgrid','base_benefit','net_rate'
];

const onEnterEvent: IRFEventParams = {
  input: ['id'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'RCRM_CONSUMER_CREDIT_DATA_DATA_ONENTER',
};

const helpComponents = {
  CustomerAccountHelp: CustomerAccountHelp,
  ConsumerCreditDataHelp: ConsumerCreditDataHelp
}
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'id',
    label: 'ID',
    //required: true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Consumer Bill data',
      componentName: 'ConsumerCreditDataHelp',
      receiveParams: [{ parentField: 'generationyear', childField: 'GENERATION_YEAR' },
      { parentField: 'generationPeriod', childField: 'GENERATION_PERIOD' },
      { parentField: 'date', childField: 'DATE' },
      { parentField: 'id', childField: 'ID' },
      { parentField: 'customercode', childField: 'CUSTOMER_CODE' },
      { parentField: 'customername', childField: 'CUSTOMER_NAME' },
      { parentField: 'htsc', childField: 'HT_SC' },

      ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'customercode',
    label: 'Customer Code',
    event: {
      serviceName: 'RCRM_CUSTOMER_CODE_ONCHANGE_CREDIT_DATA',
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
        serviceName: 'RCRM_CUSTOMER_CODE_ONCHANGE_CREDIT_DATA',
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
    name: 'sbu',
    label: 'SBU',
    masterField: 'sbu',
    required: true,
    event: {
      serviceName: 'RCRM_CONSUMER_SBU_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['sbu', 'customercode']
    },

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
      input: ['htsc', 'customercode','sbu']
    },

  },


  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',

  },

  {
    type: ControlType.COMBOBOX,
    name: 'ppa',
    label: 'PPA #',
    required: true,
    masterField: 'ppa',
    event: {
      serviceName: 'RCRM_CCD_PPA_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['ppa', 'htsc']
    }
  },

  {
    type: ControlType.DISPLAY,
    name: 'ppa_date',
    label: 'PPA Date',
    //required: true,

  },

  {
    type: ControlType.DISPLAY,
    name: 'ppa_rate',
    label: 'PPA Rate',
    //required: true,

  },

  {
    type: ControlType.DISPLAY,
    name: 'tariff_type',
    label: 'Tariff Type',
    //required: true,

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


const ConsumptionDetailsinkWhSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'wind_sldc_units',
    label: 'Wind SLDC Units',
    inputType: "number",

  },
  {
    type: ControlType.TEXTBOX,
    name: 'solar_sldc_units',
    label: 'Solar SLDC Units',
    inputType: "number",

  },
  {
    type: ControlType.DISPLAY,
    name: 'total_sldc_units',
    label: 'Total SLDC Units'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'total_consumed_units',
    label: 'Actual Consumed Units',
    inputType: "number",
  },

  {
    type: ControlType.TEXTBOX,
    name: 'surplus_units',
    label: 'Surplus Units',
    inputType: "number",
  },



];


const BillingDetailsinkWhSection: IControlDefinition[] = [

  {
    type: ControlType.TEXTBOX,
    name: 'units_generated',
    label: 'Total Units Generated',
    inputType: "number",
    required: true
  },

  {
    type: ControlType.DISPLAY,
    name: 'net_units',
    label: 'Net Units'

  },

    {
      type: ControlType.DISPLAY,
      name: 'tariff_rate',
      label: 'Actual Tariff Rate'
    },

 

  {
    type: ControlType.DISPLAY,
    name: 'base_benefit',
    label: 'Base Benefit'
  },


  {
    type: ControlType.DISPLAY,
    name: 'net_rate',
    label: 'Net Rate'
  },

];

const discomTariffGrid: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'discomtariffgrid',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,
    },
    columns: [

      {
        title: 'Seq No#',
        dataField: 'SEQ_NO',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType: 'integer',
        }
      },

      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'GENERATION_TYPE',
          required: true
        }
      },

      {
        title: 'TCD Code',
        dataField: 'DISCOM_TCD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'DISCOM_TCD_CODE',
          required: true,
          event: {
            serviceName: 'RCRM_CCD_TCD_CHARGES_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['DISCOM_TCD_CODE']
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
        title: 'UOM',
        dataField: 'CHARGES_UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'CHARGES_UOM',
          required: true
        }
      },

      // {
      //   title: 'Charges',
      //   dataField: 'CHARGES',
      //   cellEditor: TableCellEditorType.TEXTBOX,

      // },


      {
        title: 'Percentage',
        dataField: 'VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",
        }

      },


   


      {
        title: 'Units',
        dataField: 'FINAL_RATE',


      },

      {
        title: '% of Share',
        dataField: 'PER_OF_SHARE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType: 'integer',
        }
      },
    ],
  },
]


const openAccessCharges: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'openaccesschargesgrid',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: true,
    },
    columns: [

      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'GENERATION_TYPE',
          required: true
        }
      },

      {
        title: 'TCD Code',
        dataField: 'TCD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'TCD_CODE',
          required: true,
          event: {
            serviceName: 'RCRM_CCD_TCD_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['TCD_CODE']
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
        title: 'UOM',
        dataField: 'OPEN_ACCESS_UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'OPEN_ACCESS_UOM',
          required: true
        }
      },
      {
        title: 'Value',
        dataField: 'TCD_VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          //required: true,
          inputType: 'number',
        }
      },

    

      {
        title: 'Total Value',
        dataField: 'TCD_TOTAL_VALUE',

      },

      {
        title: '% of Share',
        dataField: 'PER_OF_SHARE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType: 'integer',
        }
      },


    ],
  },
]


const discomTariffValueGrid: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'discomtariffvaluegrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    editorProps: {
      isEditable: true,
    },
    columns: [

      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'GENERATION_TYPE',
          //required: true
        }
      },

      {
        title: 'TCD Code',
        dataField: 'DISOCM_VALUE_TCD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'DISOCM_VALUE_TCD_CODE',
          //required: true,
          event: {
            serviceName: 'RCRM_CCD_TCD_VALUE_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['DISOCM_VALUE_TCD_CODE']
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
        title: 'UOM',
        dataField: 'VALUES_UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'VALUES_UOM',
          //required: true
        }
      },

      // {
      //   title: 'Charges',
      //   dataField: 'CHARGES',
      //   cellEditor: TableCellEditorType.TEXTBOX,

      // },


      {
        title: 'Value',
        dataField: 'VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",
        }

      },


     


      {
        title: 'Total Value',
        dataField: 'FINAL_RATE',


      },

      {
        title: 'Total Value - Overridden',
        dataField: 'TOTAL_VALUE_OVERRIDDEN',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number",
        }

      },


      {
        title: '% of Share',
        dataField: 'PER_OF_SHARE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType: 'integer',
        }
      },
    ],
  },
]


const discomTariffValueAnnualGrid: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'discomtariffvalueannualgrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    
    columns: [

      {
        title: 'Period',
        dataField: 'PERIOD'

      },
      {
        title: 'Discom Variable Tariff - actual',
        dataField: 'DISCOM_RATE'
      },
      {
        title: 'Total units (KWH)',
        dataField: 'TOTAL_UNITS'
      },

      {
        title: 'Energy Charges',
        dataField: 'ENERGY_CHARGES'
      },

      {
        title: 'Fuel Surcharge',
        dataField: 'FUEL_SURCHARGE'
      },

      {
        title: 'Time of Use Charges',
        dataField: 'TME_OF_USE_CHARGES'
      },

      {
        title: 'Night Rebate',
        dataField: 'NIGHT_REBATE'
      },

      {
        title: 'PF Incentive',
        dataField: 'PF_INCENTIVE'
      },

      {
        title: 'EHV Rebate',
        dataField: 'EHV_REBATE'
      },

      {
        title: 'ED',
        dataField: 'ED_CHARGES'
      },

      {
        title: 'Cross Subsidy Charge ',
        dataField: 'CROSS_SUBSIDY_CHARGE'
      },

      {
        title: 'Additional Surcharge',
        dataField: 'ADDITIONAL_SURCHARGE'
      },

      {
        title: 'Wheeling Charge',
        dataField: 'WHEELING_CHARGE'
      },

      {
        title: 'Additional Wheeling Charge',
        dataField: 'ADDITIONAL_WHEELING_CHARGE'
      },
     
     

      
    ],
  },
]







const NotesSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'notes',
    column: 10,
    multiLine: true,
    multiLineRowLength: 4
  },
]


const TotalHTBillUnitsinkWhSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'total_units',
    label: 'Total Units',
    inputType: "number",
  },
  {
    type: ControlType.TEXTBOX,
    name: 'night_units',
    label: 'Night Units',
    inputType: "number",
  },
  {
    type: ControlType.TEXTBOX,
    name: 'tou_units',
    label: 'TOU Units',
    inputType: "number",

  },
  {
    type: ControlType.DISPLAY,
    name: 'ot_total_units',
    label: '1/3 of Total Units'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'night_consession_units',
    label: 'Night Concession Unit',
    inputType: "number",
  },
];


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
      serviceName: 'RCRM_CONSUMER_CREDIT_DATA_CREATE_MST',
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
      serviceName: 'RCRM_CONSUMER_CREDIT_DATA_DATA_SAVE_MST',
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
      serviceName: 'RCRM_CONSUMER_CREDIT_DATA_DATA_SUBMIT_MST',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
      confirmationDialog:{
        message:'Are you sure about Submitting? Once data Submitted cannot be modified.'
      },
    },
  },

  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'rollback',
    label: 'Rollback',
    event: {
      serviceName: 'RCRM_CONSUMER_CREDIT_DATA_DATA_ROLLBACK_MST',
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
  serviceName: 'RCRM_INIT_CONSUMER_CREDIT_DATA_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id']
};

export const ConsumerCreditData: React.FC<IPageBaseProps> = (props) => {
  const { id } = usePageQueryParam();


  const initialData: IRFData = {
    id: id
  };


  return (
    
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} components={helpComponents}>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={searchSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={ConsumptionDetailsinkWhSection} title={'Consumption Details in kWh'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={BillingDetailsinkWhSection} title={'Billing Details in kWh'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={discomTariffGrid} title={'DISCOM Charges - Units'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={openAccessCharges} title={'Open Access Charges'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={TotalHTBillUnitsinkWhSection} title={'HT Bill - Consumption Details'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFTabs>

        <RFTabItem headerText='DISCOM Charges - Value' alwaysRender>
              <RFSection controls={discomTariffValueGrid} columns={6} className={'section-header-bg-primary'} collapse={false} />
        </RFTabItem> 

        <RFTabItem headerText='DISCOM Charges - Value(Annual ReconcilIation)' alwaysRender>
              <RFSection controls={discomTariffValueAnnualGrid} columns={6} className={'section-header-bg-primary'} collapse={false} />
        </RFTabItem>
        

        </RFTabs>
        


        <RFSection controls={NotesSection} title={'Notes'} columns={1} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection} />
    </RetinaFormBuilder>

  );
};