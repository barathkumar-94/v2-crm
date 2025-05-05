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

const PrintInputs = ['generationyear','generationperiod','site','assetid','assettype','metertype', 'summary'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'ALLOCATION_REPORT_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'generationperiod',
  //   label: 'Generation Period',
  //   required:true,
  //   masterField:'generationperiod'
  // },
  {
    type: ControlType.COMBOBOX,
    name: 'summary',
    label: 'Allotment Type',
    masterField:'summary',
    //required:true,
  },
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'allocation',
  //   label: 'Allocation',
  //   masterField:'allocation',
  //   //required:true,
  // },
  
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'ALLOCATION_SEARCH_ALLOCATION_SUMMARY_RPT',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'AllocationSummaryGrid',columnDetails:cols}
        ]),
    },
  },
];

const SummaryAllocationSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'GrossallocationGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Sr. No.',
        dataField: 'SR_NO',

      },
      {
        title: 'Capative Consumers',
        dataField: 'CAP_CONSUMERS',
      },
      {
        title: 'HT.Sc.No Id',
        dataField: 'HTSC_NO',
      },
      // {
      //   title: 'EDC',
      //   dataField: 'EDC',
      // },
      {
        title: 'Apr',
        dataField: 'APR',
      },
      {
        title: 'May',
        dataField: 'MAY',
      },
      {
        title: 'June',
        dataField: 'JUNE',
      },
      {
        title: 'July',
        dataField: 'JULY',
      },

        {
            title: 'Aug',
            dataField: 'AUG',
        },
        {
            title: 'Sep',
            dataField: 'SEP'
        },
        {
            title: 'Oct',
            dataField: 'OCT',
        },
        {
            title: 'Nov',
            dataField: 'NOV',
         },
         {
            title: 'Dec',
            dataField: 'DEC',
         },
         {
            title: 'Jan',
            dataField: 'JAN',
         },
         {
            title: 'Feb',
            dataField: 'FEB',
         },
         {
            title: 'Mar',
            dataField: 'MAR',
         },
         {
            title: 'Total',
            dataField: 'TOTAL',
         },
         {
            title: '%',
            dataField: 'PERCENTAGE',
         }
      ]
    },
   
 ];

 const cols : Dictionary<TableColDef[]> = {
  '': [
  // {
  //         title: 'S.No',
  //         dataField: 'SNO',
  // },
  {
    title: 'Capative Consumers',
    dataField: 'CAP_CONSUMERS',
  },
  {
    title: 'HT.Sc.No Id',
    dataField: 'HTSC_NO',
  },

  ]
}

 const SummaryAllocationGrid: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'AllocationSummaryGrid',
    title: '',
    isPrimeReactTable: true,
    isDynamicColumn:true,
    column: 12,
    pageSize: 7,
    pivotProps: {
      indexVariable: ['CAP_CONSUMERS', 'HTSC_NO'],
      columnVariable: ['GENERATION_MONTH'],
    },
    columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
  },
];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_ALLOCATION_SUMMARY_RPT',
  moduleName: CRM_BILLING,
};


export const AllocationSummary :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={SummaryAllocationGrid} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
