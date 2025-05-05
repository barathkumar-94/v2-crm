import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','site'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_REPORT_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    masterField:'generationperiod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site'
  },
 
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_SEARCH_HTSC_WISE_ASSET_RPT',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'HTSCWISEActualAllocationByAssetGrid',columnDetails:cols}
        ]),
      // downloadFile:{
      //   jasperReportTemplate:'PSSLineLevelRpt',
      //   fileName :'PSSLineLevel.pdf',
      //   input :['guid']
      // }
    },
  },
];

const cols : Dictionary<TableColDef[]> = {
    '': [
    {
            title: 'Generation Period',
            dataField: 'GENERATION_PERIOD',
            // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
            title: 'Opening Banking Units',
            dataField: 'OPENING_BANKING',
            // cellEditor: TableCellEditorType.TEXTBOX,
    },

    {
        title: 'Generation Net Energy',
        dataField: 'GENERATION_NET_ENERGY',
        // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
        title: 'Consumption',
        dataField: 'CONSUMPTION',
        // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
        title: 'Banking Units Utilized',
        dataField: 'BANKING_UNIT_UTILIZED',
        // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
        title: 'Excess Energy',
        dataField: 'EXCESS_ENERGY',
        // cellEditor: TableCellEditorType.TEXTBOX,
    },
    {
        title: 'Closing Banking Units',
        dataField: 'CLOSING_BANKING_UNIT',
        // cellEditor: TableCellEditorType.TEXTBOX,
    },
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
      
  
    ]
  }
const HTSCWiseAsset: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'HTSCWISEActualAllocationByAssetGrid',
      title: '',
      isPrimeReactTable: true,
      isDynamicColumn:true,
      column: 12,
      pageSize: 7,
      pivotProps: {
        indexVariable: ['HEADING','OPENING_BANKING','GENERATION_NET_ENERGY','GENERATION_PERIOD','CONSUMPTION',
            'BANKING_UNIT_UTILIZED','EXCESS_ENERGY','CLOSING_BANKING_UNIT','ASSET_ID','ASSET_NAME','TOTAL_UNITS_GENERATED','HTSC'],
        columnVariable: ['HEADING', 'TOD_NAME'],
      },
      columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
    },
  ];
  


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_HTSC_WISE_ASSET_RPT',
  moduleName: CRM_BILLING,
};


export const HTSCWiseActualAlloctionAsset:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} />
        <RFSection controls={HTSCWiseAsset} columns={1}  className={'table-absolute-toolbar'}/>
 
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
