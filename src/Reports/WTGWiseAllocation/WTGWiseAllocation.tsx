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
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','assettype','asset'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
    event :{
      serviceName:'WTG_REPORT_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    required:true,
    masterField:'generationperiod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assettype',
    label: 'Asset Type',
    masterField:'assettype',
    required:true,
    event :{
      serviceName:'WTG_REPORT_ASSET_TYPE_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['assettype']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'asset',
    label: 'Asset',
    masterField:'asset',
    required:true,
  },
  
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'WTG_SEARCH_SUMMARY_RPT',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'WTGwiseallocationGrid',columnDetails:cols}
        ])
    },
  },
];

const cols: Dictionary<TableColDef[]> = {
  '': [
    {
      title: 'Seq No',
      dataField: 'sort_order' ,
      hidden:true     
    },
    {
      title: 'S. No.',
      dataField: 'SE_NO'
             
    },
     {
       title: 'Service Number',
       dataField: 'SERVICE_NUMBER'
              
     },
     
  ]
 } 

const WTGGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGwiseallocationGrid',
    isPrimeReactTable: true,
    isDynamicColumn:true,
    noPagination: true,
    column: 12,
    editorProps:{
      isEditable:false,
      hideAdd:false,
      hideDelete:false,
  },
  pivotProps: {
    indexVariable: ['SE_NO','SERVICE_NUMBER'],
    columnVariable: ['HEADING', 'GRID_COLUMN_NAME'],
  },
  columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols) 
//     isPrimeReactTable: true, 
//     columns: [
//       {
//         title: 'Service Number',
//         dataField: 'SR_NO',

//       },
      
//       {
//         groupHeaderName: 'Allocation of units for consumed Units',
//         children: [
//         {
//             title: 'Peak Hr 1 Units (6 AM to 9 AM)',
//             dataField: 'PEAK_HR_1_UNIT',
//             dataType:"number"

//         },
//         {
//             title: 'Peak Hr 2 Units (6 PM to 9 PM)',
//             dataField: 'PEAK_HR_2_UNIT',
//             dataType:"number"
//         },
//         {
//             title: 'Peak Hr 3 Units (9 PM to 10 PM)	',
//             dataField: 'PEAK_HR_3_UNIT',
//             dataType:"number"
//         },
//         {
//             title: 'Other Peak Hour Units (5 AM to 6 AM & 9 AM to 6 PM)',
//             dataField: 'OTHER_PEAK_HR_UNIT',
//             dataType:"number"
//         },
//         {
//             title: 'Night Hr Units (10 PM to 5 AM)',
//             dataField: 'NIGHT_HR_UNIT',
//             dataType:"number"
//          }
//       ]
//       },
//     {
//       groupHeaderName: 'Deduction Details @Consumer End in Rupees',
    
//       children: [
//       {
//           title: 'Metering Charges',
//           dataField: 'METER_CHARGES',
//           dataType:"number"
//       },
//       {
//           title: 'O & M Charges',
//           dataField: 'OM_CHARGES',
//           dataType:"number"
//       },
//       {
//           title: 'Transmission Charges',
//           dataField: 'TRANS_CHARGES',
//           dataType:"number"
//       },
//       {
//           title: 'System Operting Charges',
//           dataField: 'SYSTEM_OPERA_CHARGE',
//           dataType:"number"
//       },
//       {
//           title: 'Rkavh Penalty',
//           dataField: 'RKAVH_PENALTY',
//           dataType:"number"
//        },

//        {
//         title: 'Negative Energy Charges',
//         dataField: 'NEG_ENERGY_CHARGES',
//         dataType:"number"
//       },
//        {
//         title: 'Scheduling Charges',
//         dataField: 'SCEDULE_CHARGES',
//         dataType:"number"
//      },
//      {
//         title: 'Other Charges',
//         dataField: 'OTHER_CHARGES',
//         dataType:"number"
//      },
//      {
//         title: 'Parallel Operation Charges',
//         dataField: 'PARLLEL_OPE_CHARGES',
//         dataType:"number"
//      },
//      {
//         title: 'DSM Charges',
//         dataField: 'DSM_CHARGES',
//         dataType:"number"
//      },
//     ]
//   }
// ],
  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_WTG_RPT',
  moduleName: CRM_BILLING,
};


export const WTGWiseAllocation :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={WTGGridSection} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
