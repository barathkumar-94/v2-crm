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

const PrintInputs = ['generationyear','generationperiod','site','assetid'];
 
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
    masterField:'site',
    event :{
      serviceName:'RCRM_REPORT_SITE_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['site']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset Id',
    masterField:'assetid'
  },
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_WTG_CONSUMER_ALLOCATION_RPT_SEARCH',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'WTGConsumerAllocation',columnDetails:cols}
        ]),
    },
  },
];

const WTGGenerationGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGConsumerAllocation',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Sr. No.',
        dataField: 'SR_NO',

      },
      {
        title: 'WTG HTSC',
        dataField: 'WTG_HTSC',
      },
      {
        title: 'Captive Consumers',
        dataField: 'CAPTIVE_CONSUMERS',
      },
      {
        title: 'Month',
        dataField: 'MONTH',
      },
      {
        title: 'HT.Sc.No',
        dataField: 'HTSC_NO',
      },
      {
        title: 'Drawl Voltage',
        dataField: 'DRAWL_VOLTAGE',
      },
      {
        title: 'T&D Loss',
        dataField: 'TD_LOSS',
      },
      {
        title: 'Peak Hr 1 Units (6 AM to 9 AM)',
        dataField: 'PEAK_1',
      },
      {
        title: 'Peak Hr 2 Units (6 PM to 9 PM)',
        dataField: 'PEAK_2',
      },
      {
        title: 'Peak Hr 3 Units (9 PM to 10 PM)',
        dataField: 'PEAK_3',
      },
      {
        title: 'Other Peak Hour Units (5 AM to 6 AM & 9 AM to 6 PM)',
        dataField: 'OTHER_PEAK_HOUR',
      },
      {
        title: 'Night Hr Units (10 PM to 5 AM)',
        dataField: 'NIGHT_HR',
      },
      {
        title: 'Total Allocation',
        dataField: 'TOTAL_ALLOCATION',
      },
      {
        title: 'Metering Charges',
        dataField: 'METERING_CHARGES',
      },
      {
        title: 'Kvarh Penalty Charges',
        dataField: 'KVARH_PENALTY_CHARGES',
      },
      {
        title: 'System Operating Charges',
        dataField: 'SYSTEM_OPERATING_CHARGES',
      },
      {
        title: 'Scheduling Charges',
        dataField: 'SCHEDULING_CHARGES',
      },
      {
        title: 'Transmission Charges',
        dataField: 'TRANSMISSION_CHARGES',
      },
      {
        title: 'Other Charges',
        dataField: 'OTHER_CHARGES',
      },
      {
        title: 'Total Charges',
        dataField: 'TOTAL_CHARGES',
      },
 
],
  }
  
];

const cols : Dictionary<TableColDef[]> = {
  '': [
    {
      title: 'Sr. No.',
      dataField: 'SR_NO',

    },
    {
      title: 'WTG HTSC',
      dataField: 'WTG_HTSC',
    },
    {
      title: 'Captive Consumers',
      dataField: 'CAPTIVE_CONSUMERS',
    },
    {
      title: 'Month',
      dataField: 'MONTH',
    },
    {
      title: 'HT.Sc.No',
      dataField: 'HTSC_NO',
    },
    {
      title: 'Drawl Voltage',
      dataField: 'DRAWL_VOLTAGE',
    },
    // {
    //   title: 'Total Allocation',
    //   dataField: 'TOTAL_ALLOCATION',
    // },
    // {
    //   title: 'Metering Charges',
    //   dataField: 'METERING_CHARGES',
    // },
    // {
    //   title: 'Kvarh Penalty Charges',
    //   dataField: 'KVARH_PENALTY_CHARGES',
    // },
    // {
    //   title: 'System Operating Charges',
    //   dataField: 'SYSTEM_OPERATING_CHARGES',
    // },
    // {
    //   title: 'Scheduling Charges',
    //   dataField: 'SCHEDULING_CHARGES',
    // },
    // {
    //   title: 'Transmission Charges',
    //   dataField: 'TRANSMISSION_CHARGES',
    // },
    // {
    //   title: 'Other Charges',
    //   dataField: 'OTHER_CHARGES',
    // },
    // {
    //   title: 'Total Charges',
    //   dataField: 'TOTAL_CHARGES',
    // },
  ]
}

const CustomerDemandAllocationByAssetSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGConsumerAllocation',
    title: '',
    isPrimeReactTable: true,
    isDynamicColumn:true,
    column: 12,
    pageSize: 7,
    pivotProps: {
      indexVariable: ['WTG_HTSC','CAPTIVE_CONSUMERS','MONTH','HTSC_NO', 'DRAWL_VOLTAGE'],
      columnVariable: ['HEADING'],
    },
    columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_WTG_CONSUMER_ALLOCATION_RPT_INIT',
  moduleName: CRM_BILLING,
};


export const WTGConsumerAllocation :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        {/* <RFSection controls={WTGGenerationGridSection} columns={1} className={'table-absolute-toolbar'}/> */}
        <RFSection controls={CustomerDemandAllocationByAssetSection}  columns={6} className={'section-header-bg-primary'} collapse={false} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
