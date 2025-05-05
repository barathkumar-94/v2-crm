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
    required:true
    // event :{
    //   serviceName:'RCRM_REPORT_GENERATION_YEAR_ONCHANGE',
    //   moduleName :CRM_BILLING,
    //   input:['generationyear']
    //   }
  },
  
//   {
//     type: ControlType.COMBOBOX,
//     name: 'generationperiod',
//     label: 'Generation Period',
//     masterField:'generationperiod'
//   },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    required:true
  },
 
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_SEARCH_GROSS_ALLOC_PLANT_RPT',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'GrossAllocationPlantGrid',columnDetails:cols}
        ]),
    //   downloadFile:{
    //     jasperReportTemplate:'PSSLineLevelRpt',
    //     fileName :'PSSLineLevel.pdf',
    //     input :['guid']
    //   }
    },
  },
];

const cols : Dictionary<TableColDef[]> = {
    '': [
    // {
    //         title: 'S.No',
    //         dataField: 'SNO',
    // },
    {
            title: 'Customer Name',
            dataField: 'CUSTOMER_NAME',
    },
  
    ]
  }
const GrossAllocationPlant: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'GrossAllocationPlantGrid',
      title: '',
      isPrimeReactTable: true,
      isDynamicColumn:true,
      column: 12,
      pageSize: 7,
      pivotProps: {
        indexVariable: ['CUSTOMER_NAME'],
        columnVariable: ['GENERATION_MONTH'],
      },
      columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
    },
  ];
  


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_GROSS_ALLOC_PLANT_RPT',
  moduleName: CRM_BILLING,
};


export const GrossAllocationPlantWise:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} />
        <RFSection controls={GrossAllocationPlant} columns={1}  className={'table-absolute-toolbar'}/>
 
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
