
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
  TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_ENERGY_ACCOUNTING, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { GroupCaptiveAllotmentHelp } from './GroupCaptiveAllotmentHelp';
import { Dictionary } from 'lodash';
import { UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';
import styled from 'styled-components';
import { GroupCaptiveUploadAllocation } from './GroupCaptiveUploadAllocation';



const actionInputs = ['id', 'generationyear', 'generationPeriod', 'site', 'transactionDate', 'status', 'openingBaningUnits','returnBanking', 'generationNetEnergy',
  'consumerDemand','consumption', 'bankingUnitsUtilized',  'closingBankingUnits', 'netEnergyinkWh',
  'MonthlyTODBreakupGrid', 'MonthlyGenerationSummaryByAssetSectionGrid', 'CustomerDemandAllocationSectionGrid',
  'CustomerDemandAllocationByAssetGrid','bulkupload','manualSolar','manualPhase2','manualPhase1'];

const onEnterEvent: IRFEventParams = {
  input: ['id'],
  moduleName: CRM_ENERGY_ACCOUNTING,
  //serviceName: 'RCRM_GROUP_CAPTIVE_ONENTER_MST',
  serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_ONENTER_MST',
};

const helpComponents = {
  GroupCaptiveAllotmentHelp: GroupCaptiveAllotmentHelp,
  GroupCaptiveUploadAllocation:GroupCaptiveUploadAllocation
  
};

const generalSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'id',
    label: 'ID',
    //required: true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Group Captive Allotment',
      componentName: 'GroupCaptiveAllotmentHelp',
      receiveParams: [{ parentField: 'id', childField: 'ID' },
      { parentField: 'generationyear', childField: 'GENERATION_YEAR' },
      { parentField: 'generationPeriod', childField: 'GENERATION_PERIOD' },
      { parentField: 'site', childField: 'SITE' },
      { parentField: 'transactionDate', childField: 'TRANSACTION_DATE' },
      { parentField: 'status', childField: 'STATUS' },
      { parentField: 'openingBaningUnits', childField: 'OPENING_BANKING_UNIT' },
      { parentField: 'generationNetEnergy', childField: 'GENERATION_BET_ENERGY' },
      { parentField: 'consumption', childField: 'CONSUMPTION' },
      { parentField: 'bankingUnitsUtilized', childField: 'BANKING_UNIT_UTILLIZED' },
      { parentField: 'excessEnergy', childField: 'EXCESS_ENERGY' },
      { parentField: 'closingBankingUnits', childField: 'CLOSING_BANKING_UNIT' },
      { parentField: 'netEnergyinkWh', childField: 'NET_EENERGY_KWH' }

      ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField: 'generationyear',
    event: {
      serviceName: 'RCRM_GC_YEAR_ONCHANGE',
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
      serviceName: 'RCRM_GROUP_CAPTIVE_PERIOD_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['generationPeriod']
    }

  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField: 'site',
    required: true,
    // event: {
    //   serviceName: 'RCRM_GROUP_CAPTIVE_SITE_ONCHANGE',
    //   moduleName: CRM_ENERGY_ACCOUNTING,
    //   input: ['generationPeriod', 'site']
    // }
    event: {
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOCATION_SITE_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['generationPeriod', 'site']
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'transactionDate',
    label: 'Transaction Date',
    required: true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },


];

const OverallMonthlySummarySection: IControlDefinition[] = [


  {
    type: ControlType.DISPLAY,
    name: 'openingBaningUnits',
    label: 'Opening Banking Units',
  },
  {
    type: ControlType.DISPLAY,
    name: 'returnBanking',
    label: 'Return Banking Units',
  },
  {
    type: ControlType.DISPLAY,
    name: 'generationNetEnergy',
    label: 'Generation Net Energy',
  },
  {
    type: ControlType.DISPLAY,
    name: 'consumerDemand',
    label: 'Consumer Demand',
  },
  {
    type: ControlType.DISPLAY,
    name: 'consumption',
    //label: 'Consumption',
    label: 'Actual Allocation',
  },
  {
    type: ControlType.DISPLAY,
    name: 'bankingUnitsUtilized',
    label: 'Banking Units Utilized',
  },
  {
    type: ControlType.DISPLAY,
    name: 'excessEnergy',
    label: 'Excess Energy',
    hidden : true,
  },

  {
    type: ControlType.DISPLAY,
    name: 'closingBankingUnits',
    label: 'Closing Banking Units',
  },


];


const MonthlyGenerationSummarySection: IControlDefinition[] = [

  {
    type: ControlType.DISPLAY,
    name: 'netEnergyinkWh',
    label: 'Net Energy in kWh',
  },

];


const MonthlyTODBreakupSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'MonthlyTODBreakupGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    noPagination:true,
    columns: [

      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        }

      },
      {
        title: 'To Time',
        dataField: 'TO_TIME',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: HH_MM
        },
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING',
        dataType: 'number',
        footer:{
          showTotal:true
        },
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'Seq No',
        dataField: 'SEQ_NO',
        hidden: true
      }


    ]

  }
];

const MonthlyGenerationSummaryByAssetSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'MonthlyGenerationSummaryByAssetSectionGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    isDynamicColumn: true,
    pivotProps: {
      indexVariable: ['SEQ_NO','ASSET_ID', 'ASSET_NAME','ASSET_GROUP','ASSET_CATEGORY'],
      columnVariable: ['TOD_NAME'],
    },
    columns: [
      {
        dataField: null,
        applyToDynamicColumns: (columnName, dataField, pivotVariableType) => pivotVariableType === 'COLUMN' && columnName==='ASSET CATEGORY',
        footer:{
         text:'Total'
       },
      },
      {
        dataField: null,
        applyToDynamicColumns: (columnName, dataField, pivotVariableType) => pivotVariableType === 'COLUMN' && columnName==='NET READING',
        dataType: 'number',
        footer:{
         showTotal:true
       },
      },
    ]
  }
];


const AssetAllocationSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'AssetAllocationSection',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    isDynamicColumn: true,
    pivotProps: {
      indexVariable: ['SEQ_NO','ASSET_ID', 'ASSET_NAME','ASSET_GROUP','ASSET_CATEGORY','NEW_HTSC_NUMBER'],
      columnVariable: ['TOD_NAME'],
    },
    columns: [
      {
        dataField: null,
        applyToDynamicColumns: (columnName, dataField, pivotVariableType) => pivotVariableType === 'COLUMN' && columnName==='ASSET CATEGORY',
        footer:{
         text:'Total'
       },
      },
      {
        dataField: null,
        applyToDynamicColumns: (columnName, dataField, pivotVariableType) => pivotVariableType === 'COLUMN' && columnName==='ALLOCATION',
        dataType: 'number',
        footer:{
         showTotal:true
       },
      },
      {
        dataField: null,
        applyToDynamicColumns: (columnName, dataField, pivotVariableType) => pivotVariableType === 'COLUMN' && columnName==='FROM BANKING',
        dataType: 'number',
        footer:{
         showTotal:true
       },
      },
      {
        dataField: null,
        applyToDynamicColumns: (columnName, dataField, pivotVariableType) => pivotVariableType === 'COLUMN' && columnName==='TOTAL',
        dataType: 'number',
        footer:{
         showTotal:true
       },
      },
    ]
  }
];


const CustomerDemandAllocationSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerDemandAllocationSectionGrid',
    title: '',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    columns: [

      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'PPA #',
        dataField: 'PPA_NO',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'Equity %',
        dataField: 'EQUITY_PER',
        // cellEditor: TableCellEditorType.TEXTBOX,

      },
          
     {
        title: 'Units as Per PPA',
        dataField: 'UNIT_PER_PPA',
        dataType: 'number'
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'HT SC #',
        dataField: 'HTSC',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
 

      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        hidden :true,
        cellEditorParams: {
          required: true,
          masterField: 'TOD_CODE',
          disable: true
        }
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        footer:{
          text:'Total'
        }
      },
  
      {
        title: 'Consumer Demand',
        dataField: 'CUSTOMER_DEMAND',
        dataType: 'number',
        footer:{
         showTotal:true
        }
      },

      
      {
        title: 'Equity Allocation',
        dataField: 'ACTUAL_ALLOCATION',
        dataType: 'number',
        footer:{
         showTotal:true
        }
      },
      {
        title: 'Additional Allocation',
        dataField: 'MANUAL_ALLOCATION',
        dataType: 'number',
        footer:{
         showTotal:true
        }
      },
      {
        title: 'Allocation From Banking',
        dataField: 'BANKING_ALLOCATION',
        dataType: 'number',
        footer:{
         showTotal:true
        }
      },
      {
        title: 'Manual Allocation From Banking',
        dataField: 'MANUAL_BANKING_ALLOCATION',
        hidden:true,
        dataType: 'number',
        footer:{
         showTotal:true
        }
      },
      {
        title: 'Total',
        dataField: 'TOTAL',
        dataType: 'number',
        footer:{
         showTotal:true
        }
      },

    ]
  }
];

const ConsumerDemandSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerDemandSectionGrid',
    title: '',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    columns: [
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        
      },
      {
        title: 'PPA #',
        dataField: 'PPA_NO',
        
      },
      {
        title: 'HT SC #',
        dataField: 'HTSC',
        footer:{
          text:'Total'
        }
        
      },
      {
        title: 'C1',
        dataField: 'DEMAND_C1',
        dataType: 'number',
        footer:{
          showTotal:true
         }
        
      },
      {
        title: 'C2',
        dataField: 'DEMAND_C2',
        dataType: 'number',
        footer:{
          showTotal:true
         }
        
      },
      {
        title: 'C3',
        dataField: 'DEMAND_C3',
        dataType: 'number',
        footer:{
          showTotal:true
         }
        
      },
      {
        title: 'C4',
        dataField: 'DEMAND_C4',
        dataType: 'number',
        footer:{
          showTotal:true
         }
        
      },
      {
        title: 'C5',
        dataField: 'DEMAND_C5',
        dataType: 'number',
        footer:{
          showTotal:true
         }
        
      },

      {
        title: 'Total',
        dataField: 'DEMAND_TOTAL',
        dataType: 'number',
        footer:{
          showTotal:true
         }
        
      },
      
    ]
  }
];


const ExcessEnergySection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ExcessEnergySection',
    title: '',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    noPagination:true,
    columns: [


      {
        title: 'Category',
        dataField: 'CATEGORY',
        footer:{
          text:'Total'
        }
      },
      {
        title: 'C1',
        dataField: 'C1',
        dataType: 'number',
        footer:{
          text:'Total',
          showTotal:true
        },
      },
      {
        title: 'C2',
        dataField: 'C2',
        dataType: 'number',
        footer:{
          text:'Total',
          showTotal:true
        },

      },
      {
        title: 'C3',
        dataField: 'C3',
        dataType: 'number',
        footer:{
          text:'Total',
          showTotal:true
        },
      },
      {
        title: 'C4',
        dataField: 'C4',
        dataType: 'number',
        footer:{
          text:'Total',
          showTotal:true
        },
      },
      {
        title: 'C5',
        dataField: 'C5',
        dataType: 'number',
        footer:{
          text:'Total',
          showTotal:true
        },
      },
      {
        title: 'Total',
        dataField: 'TOTAL',
        dataType: 'number',
        footer:{
          text:'Total',
          showTotal:true
        },
      }
    ]
  }
];


const cols: Dictionary<TableColDef[]> = {
  'Monthly Generation Summary - By Asset': [
    {
      title: 'PPA #',
      dataField: 'PPA_NO',
      // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
      title: 'Asset Id',
      dataField: 'ASSET_ID',
      // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
      title: 'Asset Name',
      dataField: 'ASSET_NAME',
      // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
      title: 'Total Units Generated',
      dataField: 'TOTAL_UNITS_GENERATED',
      // cellEditor: TableCellEditorType.TEXTBOX,

    },
    {
      title: 'HT SC #',
      dataField: 'HTSC',
      // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
      title: 'Equity Percentage',
      dataField: 'EQUITY_PERCENTAGE',
      // cellEditor: TableCellEditorType.TEXTBOX,
    },

    {
      title: 'Customer Name',
      dataField: 'CUSTOMER_NAME',
      // cellEditor: TableCellEditorType.TEXTBOX,

    },

  ]
}
const CustomerDemandAllocationByAssetSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerDemandAllocationByAssetGrid',
    title: '',
    isPrimeReactTable: true,
    isDynamicColumn: true,
    column: 12,
    pageSize: 7,
    pivotProps: {
      indexVariable: ['HEADING', 'ASSET_ID', 'ASSET_NAME', 'TOTAL_UNITS_GENERATED', 'HTSC', 'CUSTOMER_NAME'],
      columnVariable: ['HEADING', 'TOD_NAME'],
    },
    columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
  },
];


const GenerationAllotmentSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'GenerationAllotmentSectionGrid',
    title: '',
    isPrimeReactTable: true,
    isDynamicColumn: true,
    column: 12,
    pageSize: 7,
    pivotProps: {
      indexVariable: ['HEADING', 'CUSTOMER_NAME', 'PPA_NO', 'EQUITY_PERCENTAGE','HTSC','SEQ_NO'],
      columnVariable: ['HEADING', 'TOD_NAME'],
    },
    columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
  }
];




const actionBarButtons: IControlDefinition[] = [


  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'generate',
    label: 'Generate',
    // event: {
    //   serviceName: 'RCRM_GROUP_CAPTIVE_GENERATE_MST',
    //   moduleName: CRM_ENERGY_ACCOUNTING,
    //   input: [...actionInputs],
    // },
    event: {
      serviceName: 'RCRM_GROUP_CAPTIVE_GENERATE_ALLOCATION_MST',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'Suggest Banking',
    label: 'Suggest Banking',
    // event: {
    //   serviceName: 'RCRM_GROUP_CAPTIVE_BANKING_MST',
    //   moduleName: CRM_ENERGY_ACCOUNTING,
    //   input: [...actionInputs],
    // },

    event: {
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_BANKING_MST',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },

  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'Compute Charges',
    label: 'Compute Charges',
    hidden:(pageData)=>!( pageData.status == 'Working'),  
    event: {
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_COMPUTE_CHARGES',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },

  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'Generate Provisional Bill',
    label: 'Generate Provisional Bill',
    hidden:(pageData)=>!( pageData.status == 'Working'),  
    event: {
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_GEN_PROVISIONAL_BILL',
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
      //serviceName: 'RCRM_GROUP_CAPTIVE_SUBMIT_MST',
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_SUBMIT_MST',
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
    name: 'Generate Final Bill',
    label: 'Generate Final Bill',
    hidden:(pageData)=>!( pageData.status == 'Confirmed'),  
    event: {
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_GEN_FINAL_BILL',
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
      //serviceName: 'RCRM_GROUP_CAPTIVE_ROLLBACK_MST',
      serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_ROLLBACK_MST',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs],
    },
  },

 
  // {
  //   type: ControlType.BUTTON,
  //   isPrimary: true,
  //   name: 'Save manual',
  //   label: 'Save Manual Allocation',
  //   event: {
  //     serviceName: 'RCRM_GROUP_CAPTIVE_SAVE_MANUAL_MST',
  //     moduleName: CRM_ENERGY_ACCOUNTING,
  //     input: [...actionInputs],
  //   },
  // },
 
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
const componentTableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'bulkupload',
    isPrimeReactTable: true,
    editorProps: {
      isEditable: false,
      hideRowDuplicate: true,
      enableBulkUpload: true,
      bulkUploadTemplateFileName: "Group_Captive_Bulk_upload_Manual_Asset.xls"
    },
    columns: [
      {
        groupHeaderName: 'General',
        children: [
          {
            title: 'Customer Name',
            dataField: 'CUSTOMER_NAME'
          },

          {
            title: 'PPA #',
            dataField: 'PPA_NO'
          },
          {
            title: 'HTSC #',
            dataField: 'HTSC_NO'
          },
          {
            title: 'Asset Name',
            dataField: 'ASSET_NAME'
          },
        ],
      },
      {
        groupHeaderName: 'Generation TOD Details',
        children: [
          {
            title: 'TOD(C1)',
            dataField: 'GENERATION_TOD1',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C2)',
            dataField: 'GENERATION_TOD2',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C3)',
            dataField: 'GENERATION_TOD3',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C4)',
            dataField: 'GENERATION_TOD4',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C5)',
            dataField: 'GENERATION_TOD5',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        ],
      },
      {
        groupHeaderName: 'Banking TOD Details',
        children: [
          {
            title: 'TOD(C1)',
            dataField: 'BANKING_TOD1',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C2)',
            dataField: 'BANKING_TOD2',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C3)',
            dataField: 'BANKING_TOD3',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C4)',
            dataField: 'BANKING_TOD4',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        {
            title: 'TOD(C5)',
            dataField: 'BANKING_TOD5',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              inputType:"number",
            }
        },
        ],
      }
    ],
  },
];


const manualSolar: IControlDefinition[] = [
  {
    type: ControlType.HIDDEN,
    name:'solarCategory'
  },
  {
    type: ControlType.HIDDEN,
    name:'gc1Category'
  },
  {
    type: ControlType.HIDDEN,
    name:'gc2Category'
  },
  {
    type: ControlType.BUTTON,
    name: 'saveBtn',
    label: 'Upload Manual Allocation',
    isPrimary: true,
    column: 12,
    className: "bulk_upload",
    event:
    {
      openModal: true,
      modalProps:
      {
        modalType: 'popup',
        title: 'Upload Allocation Details',
        componentName: 'GroupCaptiveUploadAllocation',

        sendParams: [
          {parentField: 'generationPeriod', parentSource: 'page', childField: 'generationPeriod'},
          {parentField: 'site', parentSource: 'page', childField: 'site'},
          {parentField: 'id', parentSource: 'page', childField: 'id'},
          {parentField: 'generationyear', parentSource: 'page', childField: 'generationyear'},
          {parentField: 'solarCategory', parentSource: 'page', childField: 'category'},
        ],

        receiveParams: [
          {parentField: 'manualSolar', childField: 'manualSolar'},
          {parentField: 'consumption', childField: 'consumption'},
          {parentField: 'bankingUnitsUtilized', childField: 'bankingUnitsUtilized'},
          {parentField: 'excessEnergy', childField: 'excessEnergy'},
          {parentField: 'closingBankingUnits', childField: 'closingBankingUnits'},
          {parentField: 'CustomerDemandAllocationSectionGrid', childField: 'CustomerDemandAllocationSectionGrid'},
          {parentField: 'ExcessEnergySection', childField: 'ExcessEnergySection'},
          {parentField: 'manualPhase2', childField: 'manualPhase2'},
          {parentField: 'manualPhase1', childField: 'manualPhase1'}
        ],

      },
    },

  },
  {
    type: ControlType.TABLE,
    name: 'manualSolar',
    title: '',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    editorProps: {
      isEditable: false
    },
    columns: [
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'HT SC #',
        dataField: 'HTSC',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },

      {
        title: 'PPA #',
        dataField: 'PPA_NO',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required: true,
          masterField: 'TOD_CODE',
          disable: true
        }
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        footer:{
          text:'Total'
         }
      },
      /*
      {
        title: 'Customer Demand',
        dataField: 'CUSTOMER_DEMAND',
      },*/
      {
        title: 'Actual Allocation',
        dataField: 'ACTUAL_ALLOCATION',
        dataType:'number',
        footer:{
          showTotal:true
         }
      },
      {
        title: 'Manual Allocation',
        dataField: 'MANUAL_ALLOCATION',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataType:'number',
        cellEditorParams: {
          inputType:"number",
        },
        footer:{
          showTotal:true
         }
      },
      {
        title: 'From Banking',
        dataField: 'FROM_BANKING',
        dataType:'number',
        footer:{
          showTotal:true
         }
      },
      {
        title: 'Total',
        dataField: 'TOTAL',
        dataType:'number',
        footer:{
          showTotal:true
         }
      }
    ]
  }
];

const manualPhase2: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'saveBtn',
    label: 'Upload Manual Allocation',
    isPrimary: true,
    column: 12,
    className: "bulk_upload",
    event:
    {
      openModal: true,
      modalProps:
      {
        modalType: 'popup',
        title: 'Upload Allocation Details',
        componentName: 'GroupCaptiveUploadAllocation',

        sendParams: [
          {parentField: 'generationPeriod', parentSource: 'page', childField: 'generationPeriod'},
          {parentField: 'site', parentSource: 'page', childField: 'site'},
          {parentField: 'id', parentSource: 'page', childField: 'id'},
          {parentField: 'generationyear', parentSource: 'page', childField: 'generationyear'},
          {parentField: 'gc2Category', parentSource: 'page', childField: 'category'},
        ],

        receiveParams: [
          {parentField: 'manualSolar', childField: 'manualSolar'},
          {parentField: 'consumption', childField: 'consumption'},
          {parentField: 'bankingUnitsUtilized', childField: 'bankingUnitsUtilized'},
          {parentField: 'excessEnergy', childField: 'excessEnergy'},
          {parentField: 'closingBankingUnits', childField: 'closingBankingUnits'},
          {parentField: 'CustomerDemandAllocationSectionGrid', childField: 'CustomerDemandAllocationSectionGrid'},
          {parentField: 'ExcessEnergySection', childField: 'ExcessEnergySection'},
          {parentField: 'manualPhase2', childField: 'manualPhase2'},
          {parentField: 'manualPhase1', childField: 'manualPhase1'}
        ],

      },
    },

  },
  {
    type: ControlType.TABLE,
    name: 'manualPhase2',
    title: '',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    editorProps: {
      isEditable: false
    },
    columns: [
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'HT SC #',
        dataField: 'HTSC',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },

      {
        title: 'PPA #',
        dataField: 'PPA_NO',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required: true,
          masterField: 'TOD_CODE',
          disable: true
        }
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        footer:{
          text:'Total'
         }
      },/*
      {
        title: 'Customer Demand',
        dataField: 'CUSTOMER_DEMAND',
      },*/
      {
        title: 'Actual Allocation',
        dataField: 'ACTUAL_ALLOCATION',
        dataType:'number',
        footer:{
          showTotal:true
         }
      },
      {
        title: 'Manual Allocation',
        dataField: 'MANUAL_ALLOCATION',
        dataType:'number',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          inputType:"number",
        },
        footer:{
          showTotal:true
         }
      },
      {
        title: 'From Banking',
        dataField: 'FROM_BANKING',
        dataType:'number',
        footer:{
          showTotal:true
         }
      },
      {
        title: 'Total',
        dataField: 'TOTAL',
        dataType:'number',
        footer:{
          showTotal:true
         }
      }
    ]
  }
];
const manualPhase1: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'saveBtn',
    label: 'Upload Manual Allocation',
    isPrimary: true,
    column: 12,
    className: "bulk_upload",
    event:
    {
      openModal: true,
      modalProps:
      {
        modalType: 'popup',
        title: 'Upload Allocation Details',
        componentName: 'GroupCaptiveUploadAllocation',

        sendParams: [
          {parentField: 'generationPeriod', parentSource: 'page', childField: 'generationPeriod'},
          {parentField: 'site', parentSource: 'page', childField: 'site'},
          {parentField: 'id', parentSource: 'page', childField: 'id'},
          {parentField: 'generationyear', parentSource: 'page', childField: 'generationyear'},
          {parentField: 'gc1Category', parentSource: 'page', childField: 'category'},
        ],

        receiveParams: [
          {parentField: 'manualSolar', childField: 'manualSolar'},
          {parentField: 'consumption', childField: 'consumption'},
          {parentField: 'bankingUnitsUtilized', childField: 'bankingUnitsUtilized'},
          {parentField: 'excessEnergy', childField: 'excessEnergy'},
          {parentField: 'closingBankingUnits', childField: 'closingBankingUnits'},
          {parentField: 'CustomerDemandAllocationSectionGrid', childField: 'CustomerDemandAllocationSectionGrid'},
          {parentField: 'ExcessEnergySection', childField: 'ExcessEnergySection'},
          {parentField: 'manualPhase2', childField: 'manualPhase2'},
          {parentField: 'manualPhase1', childField: 'manualPhase1'}
        ],

      },
    },

  },
  {
    type: ControlType.TABLE,
    name: 'manualPhase1',
    title: '',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
    editorProps: {
      isEditable: false
    },
    columns: [
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'HT SC #',
        dataField: 'HTSC',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },

      {
        title: 'PPA #',
        dataField: 'PPA_NO',
        // cellEditor: TableCellEditorType.TEXTBOX,
      },
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required: true,
          masterField: 'TOD_CODE',
          disable: true
        }
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        footer:{
          text:'Total'
         }
      },/*
      {
        title: 'Customer Demand',
        dataField: 'CUSTOMER_DEMAND',
      },*/
      {
        title: 'Actual Allocation',
        dataField: 'ACTUAL_ALLOCATION',
        dataType:'number',
        footer:{
          showTotal:true
         }
      },
      {
        title: 'Manual Allocation',
        dataField: 'MANUAL_ALLOCATION',
        cellEditor: TableCellEditorType.TEXTBOX,
        dataType:'number',
        cellEditorParams: {
          inputType:"number",
        },
        footer:{
          showTotal:true
         }
      },
      {
        title: 'From Banking',
        dataField: 'FROM_BANKING',
        dataType:'number',
        footer:{
          showTotal:true
         }
      },
      {
        title: 'Total',
        dataField: 'TOTAL',
        dataType:'number',
        footer:{
          showTotal:true
         }
      }
    ]
  }
];
// const onLoadEventParams: IRFEventParams = {
//   serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_INIT_MST',
//   moduleName: CRM_ENERGY_ACCOUNTING,
//   input: ['id'],
// };


const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_GROUP_CAPTIVE_ALLOTMENT_HUB_INIT_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id'],
};





export const ManageGroupCaptiveAllotment: React.FC<IPageBaseProps> = (props) => {
  const { code } = usePageQueryParam();

  const initialData: IRFData = {
    id: code,
    solarCategory:'Solar',
    gc1Category:'GC1',
    gc2Category:'GC2'
  };


  return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar  hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={OverallMonthlySummarySection} title={'Overall Monthly Summary'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={MonthlyGenerationSummarySection} title={'Monthly Generation Summary'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFTabs>
          <RFTabItem headerText='Monthly TOD Breakup' alwaysRender>
            <RFSection controls={MonthlyTODBreakupSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
          <RFTabItem headerText='Monthly Generation Summary- By Asset' alwaysRender>
            <RFSection controls={MonthlyGenerationSummaryByAssetSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>

          <RFTabItem headerText='Generation Allotment as per Equity' alwaysRender>
            <RFSection controls={GenerationAllotmentSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
          
          <RFTabItem headerText='Consumer Demand' alwaysRender>
            <RFSection controls={ConsumerDemandSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
          
          <RFTabItem headerText='WTG Wise Allocation' alwaysRender>
            <RFSection controls={AssetAllocationSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
         
          <RFTabItem headerText='Actual Allocation' alwaysRender>
            <RFSection controls={CustomerDemandAllocationSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
          {/* <RFTabItem headerText='Excess Energy' alwaysRender>
            <RFSection controls={ExcessEnergySection} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>  */}
        </RFTabs>

        {/* <RFTabs>
        <RFTabItem headerText='Manual Customer Allocation - Solar' alwaysRender>
            <RFSection controls={manualSolar} columns={1} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
          <RFTabItem headerText='Manual Customer Allocation - Phase2' alwaysRender>
            <RFSection controls={manualPhase2} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
          
          <RFTabItem headerText='Manual Customer Allocation - Phase1' alwaysRender>
            <RFSection controls={manualPhase1} columns={6} className={'section-header-bg-primary'} collapse={false} />
          </RFTabItem>
        </RFTabs> */}
        
        {/* <RFSection controls={CustomerDemandAllocationSection} title={'Customer Demand Allocation'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={CustomerDemandAllocationByAssetSection} title={'Customer Demand Allocation- By Asset'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={componentTableSection} title={'Asset Allocation- Manual'} columns={1} className={'section-header-bg-primary'} collapse={false} /> */}
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection} />
    </RetinaFormBuilder>
  );
};


const StyleContainer = styled.div`
 .bulk_upload .ms-Button{
          left: 85%;
    top: 10px;
    position:absolute;
    z-index:1;
 
 }
`;