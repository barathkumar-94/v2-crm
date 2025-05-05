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
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','site','state'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
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
    masterField:'generationperiod',
    required:true,

  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField:'state',
    required:true,
  
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    // event :{
    //   serviceName:'RCRM_REPORT_SITE_ONCHANGE',
    //   moduleName :CRM_BILLING,
    //   input:['site']
    //   }
  },
  /*
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset Id',
    masterField:'assetid'
  },*/
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_SEARCH_OVERALL_GC_RPT',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'EnergyDataGrid',columnDetails:cols}
        ]),
    },
  },
];


const cols : Dictionary<TableColDef[]> = {
  '': [
  // {
  //         title: 'Ref Month',
  //         dataField: 'REF_MONTH',
  // },
  {
    title: 'Asset Name',
    dataField: 'ASSET_NAME',
},

  ]
}

const OverallGcSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'OverallGCGrid',
    title: '',
    isPrimeReactTable: true,
    filter: false,
    sortable :false,
    isDynamicColumn:true,
    column: 12,
    pageSize: 7,
    pivotProps: {
      indexVariable: ['ASSET_NAME'],
      columnVariable: ['HEADING','TOD_NAME'],
    },
    columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)

  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_OVERALL_GC_RPT',
  moduleName: CRM_BILLING,
};


export const OverallGCRpt :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={OverallGcSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
