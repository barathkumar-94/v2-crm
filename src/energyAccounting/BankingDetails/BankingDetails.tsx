import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  TableColDef,
  TableCellRendererType,
  RFTabs,
  RFTabItem
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CRM_ENERGY_ACCOUNTING, DATE_TIME_FORMAT } from '../../common/constants';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';
import { UpdateBankingDetails } from './UpdateBankingDetails';
import { bankingDetailsTableColumn } from './TableColumns';
import styled from 'styled-components';
import { BulkUploadBankingDetails } from './BankingDetailsBulkUpload';

const actionInputs = ['generationyear', 'generationPeriod', 'site', 'OpeningBankingUnits', 'GenerationNetEnergy', 'Consumption', 'CreditUsed', 'ExcessEnergy',
  'ClosingBankingUnits', 'BankingDetails'];

const GeneralSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField: 'generationyear',
    required: true,
    event: {
      serviceName: 'RCRM_BANK_DETAILS_GENERATION_YEAR_ONCHANGE',
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
      serviceName: 'RCRM_BANK_DETAILS_GENERATION_PERIOD_ONCHANGE',
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
    event: {
      serviceName: 'RCRM_BANKING_DETAILS_ONCHANGE',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['generationyear', 'generationPeriod', 'site'],
      processResponse: (response) => processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          { tableName: 'BankingDetails', columnDetails: bankingDetailsTableColumn }
        ])
    }
  },

];

const OverallMonthlySection: IControlDefinition[] = [

  {
    type: ControlType.DISPLAY,
    name: 'OpeningBankingUnits',
    label: 'Opening Banking Units',

  },
  {
    type: ControlType.DISPLAY,
    name: 'ReturnBankingUnits',
    label: 'Return Banking Units',

  },
  {
    type: ControlType.DISPLAY,
    name: 'GenerationNetEnergy',
    label: 'Generation Net Energy',

  },
  {
    type: ControlType.DISPLAY,
    name: 'Consumption',
    label: 'Actual Allocation',

  },
  {
    type: ControlType.DISPLAY,
    name: 'CreditUsed',
    label: 'Banking Units Utilized',


  },
  {
    type: ControlType.DISPLAY,
    name: 'ExcessEnergy',
    label: 'Excess Energy',
    hidden : true,

  },
  {
    type: ControlType.DISPLAY,
    name: 'ClosingBankingUnits',
    label: 'Closing Banking Units',
  },

];

const OpeningBankingUnitsSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'OpeningBankingUnitsGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Opening Banking Units',
        dataField: 'OPENING_BANKING_UNITS',
        dataType:'number',
        footer:{
          showTotal:true
        },

      },




    ]

  }
];

const ReturnBankingUnitsSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ReturnBankingUnitsGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Return Banking Units',
        dataField: 'RETURN_BANKING_UNITS',
        dataType:'number',
        footer:{
          showTotal:true
        },
      }
    ]
  }
];

const GenerationNetEnergySection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'GenerationNetEnergyGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Generation Net Energy',
        dataField: 'GENERATION_NET_ENERGY',
        dataType:'number',
        footer:{
          showTotal:true
        },
      }
    ]
  }
];

const ConsumptionSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ConsumptionGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Consumption',
        dataField: 'CONSUMPTION',
        dataType:'number',
        footer:{
          showTotal:true
        },
      }
    ]
  }
];

const CreditUsedSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CreditUsedGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Credit Used',
        dataField: 'CREDIT_USED',
        dataType:'number',
        footer:{
          showTotal:true
        },
      }
    ]
  }
];



const ExcessEnergySection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ExcessEnergyGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Excess Energy',
        dataField: 'EXCESS_ENERGY',
        dataType:'number',
        footer:{
          showTotal:true
        },
      }
    ]
  }
];

const ClosingBankingUnitsSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ClosingBankingUnitGrid',
    isPrimeReactTable: true,
    column: 12,
    pageSize: 7,
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
        footer:{
          text:'Total'
        }
      },
      {
        title: 'Closing Banking Units',
        dataField: 'CLOSING_BANKING_UNITS',
        dataType:'number',
        footer:{
          showTotal:true
        },
      }
    ]
  }
];




const tableSection: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'saveBtn',
    label: 'Bulk Upload',
    isPrimary: true,
    column: 12,
    className: "bulk_upload",
    event:
    {
      openModal: true,
      modalProps:
      {
        modalType: 'popup',
        // panelProps: {
        //   type: 'small',
        // },
        title: 'Bulk Upload Banking Details',
        componentName: 'BulkUploadBankingDetails',

        sendParams: [
          {parentField: 'generationPeriod', parentSource: 'page', childField: 'generationPeriod'},
          {parentField: 'site', parentSource: 'page', childField: 'site'},
          {parentField: 'generationyear', parentSource: 'page', childField: 'generationyear'}
        ],

        receiveParams: [
          {parentField: 'BankingDetails', childField: 'BankingDetails'},
          {parentField: 'BankingDetails_columns', childField: 'BankingDetails_columns'},
          {parentField: 'ClosingBankingUnits',childField: 'ClosingBankingUnits'},
          {parentField: 'OpeningBankingUnitsGrid',childField: 'OpeningBankingUnitsGrid'},
          {parentField: 'ReturnBankingUnitsGrid',childField: 'ReturnBankingUnitsGrid'},
          {parentField: 'CreditUsedGrid',childField: 'CreditUsedGrid'},
          {parentField: 'ClosingBankingUnitGrid',childField: 'ClosingBankingUnitGrid'},
          {parentField: 'GenerationNetEnergyGrid',childField: 'GenerationNetEnergyGrid'},
          {parentField: 'ConsumptionGrid',childField: 'ConsumptionGrid'},
          {parentField: 'ExcessEnergyGrid',childField: 'ExcessEnergyGrid'},
          {parentField: 'OpeningBankingUnits',childField: 'OpeningBankingUnits'},
          {parentField: 'ReturnBankingUnits',childField: 'ReturnBankingUnits'},
          {parentField: 'GenerationNetEnergy',childField: 'GenerationNetEnergy'},
          {parentField: 'Consumption',childField: 'Consumption'},
          {parentField: 'CreditUsed',childField: 'CreditUsed'},
          {parentField: 'ClosingBankingUnits',childField: 'ClosingBankingUnits'}
        ],

      },
    },

  },
  {
    type: ControlType.TABLE,
    name: 'BankingDetails',
    isPrimeReactTable: true,
    isDynamicColumn: true,
    column: 12,
    editorProps: {
      isEditable: false,
      hideAdd: false,
      hideDelete: false,
    },


    pivotProps: {
      indexVariable: ['ASSET_ID','SERVICE_NUMBER', 'ASSET_NAME'],
      columnVariable: ['HEADING', 'TOD_NAME'],
    },
    columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(bankingDetailsTableColumn)


    /*
      columns: [
        {
          groupHeaderName: 'Banking Details',
          children: [
        {
          title: 'Asset ID',
          dataField: 'ASSET_ID',
          
        },
        {
          title: 'Asset Name',
          dataField: 'ASSET_NAME'
  
      },
      {
        groupHeaderName: 'Opening Banking Units',
        children: [
        {
            title: 'TOD Code 1',
            dataField: 'OB_TOD_CODE_1',
        
        },
        {
          title: 'TOD Code 2',
          dataField: 'OB_TOD_CODE_2',
    
        },
        {
            title: 'TOD Code 3',
            dataField: 'OB_TOD_CODE_3'
        },
       {
          title: 'TOD Code 4',
          dataField: 'OB_TOD_CODE_4'
      
        },
        {
            title: 'TOD Code 5',
            dataField: 'OB_TOD_CODE_5'
      
        },
       {
          title: 'Total Units',
          dataField: 'OB_TOTAL_UNITS'
          
        },
      
      ]
    },
    {
      groupHeaderName: 'Banking Units Used',
      children: [
       {
            title: 'TOD Code 1',
            dataField: 'BU_TOD_CODE_1',
        
        },
        {
          title: 'TOD Code 2',
          dataField: 'BU_TOD_CODE_2',
    
        },
        {
            title: 'TOD Code 3',
            dataField: 'BU_TOD_CODE_3'
        },
       {
          title: 'TOD Code 4',
          dataField: 'BU_TOD_CODE_4'
      
        },
        {
            title: 'TOD Code 5',
            dataField: 'BU_TOD_CODE_5'
      
        },
       {
          title: 'Total Units',
          dataField: 'BU_TOTAL_UNITS'
          
        },
      ]
    },
    {
      groupHeaderName: 'Closing Banking Units',
      children: [
    {
            title: 'TOD Code 1',
            dataField: 'CB_TOD_CODE_1',
        
        },
        {
          title: 'TOD Code 2',
          dataField: 'CB_TOD_CODE_2',
    
        },
        {
            title: 'TOD Code 3',
            dataField: 'CB_TOD_CODE_3'
        },
       {
          title: 'TOD Code 4',
          dataField: 'CB_TOD_CODE_4'
      
        },
        {
            title: 'TOD Code 5',
            dataField: 'CB_TOD_CODE_5'
      
        },
       {
          title: 'Total Units',
          dataField: 'CB_TOTAL_UNITS'
          
        },
      ]
    },
        ] 
    } 
  ]
  */
  },
];

const helpComponents = {
  UpdateBankingDetails: UpdateBankingDetails,
  BulkUploadBankingDetails: BulkUploadBankingDetails

};

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_BANKING_DETAIL_INIT',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: actionInputs,
};

export const BankingDetails: React.FC<IPageBaseProps> = (props) => {
  return (
    <StyleContainer>
      <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} prompt>
        <RFCRMToolbar hasBackButton />
        <ScrollabeContainer hasHeader={true}>
          <RFSection controls={GeneralSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
          <RFSection controls={OverallMonthlySection} title={'Overall Monthly Summary'} columns={6} className={'section-header-bg-primary'} collapse={false} />
          <RFTabs>
            <RFTabItem headerText='Opening Banking Units' alwaysRender>
              <RFSection controls={OpeningBankingUnitsSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem>
            <RFTabItem headerText='Return Banking Units' alwaysRender>
              <RFSection controls={ReturnBankingUnitsSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem>
            <RFTabItem headerText='Generation Net Energy' alwaysRender>
              <RFSection controls={GenerationNetEnergySection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem>
            <RFTabItem headerText='Actual Allocation' alwaysRender>
              <RFSection controls={ConsumptionSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem>
            <RFTabItem headerText='Banking Units Utilized' alwaysRender>
              <RFSection controls={CreditUsedSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem>
            {/* <RFTabItem headerText='Excess Energy' alwaysRender>
              <RFSection controls={ExcessEnergySection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem> */}
            <RFTabItem headerText='Closing Banking Units' alwaysRender>
              <RFSection controls={ClosingBankingUnitsSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
            </RFTabItem>

          </RFTabs>
          <RFSection controls={tableSection} title={'Banking Details'} columns={1} className={'section-header-bg-primary'} collapse={false} />

        </ScrollabeContainer>
      </RetinaFormBuilder>
    </StyleContainer>
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

