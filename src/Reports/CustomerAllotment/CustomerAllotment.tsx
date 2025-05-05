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

const PrintInputs = ['generationyear','generationperiod'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_CUSTOMER_ALLOTMENT_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    //required:true,
    masterField:'generationperiod'
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'gctype',
//     label: 'GC Type',
//     masterField:'gctype',
//     //required:true,
//   },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'wtg',
//     label: 'WTG',
//     masterField:'wtg',
//     //required:true,
//   },
  
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_CUSTOMER_ALLOTMENT_SEARCH',
      input: PrintInputs,
    },
  },
];

const WTGGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CUSTOMERALLOTMENTGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'S.No',
        dataField: 'S_NO',

      },
      {
        title: 'Consumer Name',
        dataField: 'CONSUMER_NAME',

      },
      {
        title: 'Service Number',
        dataField: 'SERVICE_NUMBER',

      },
      {
        title: 'EDC',
        dataField: 'EDC',

      },
      
      {
        groupHeaderName: 'Allocation of units for consumed Units',
        children: [
        {
            title: 'Peak Hr 1 Units (6 AM to 9 AM)',
            dataField: 'ALLOC_UNITS_P1',
            dataType:"number"

        },
        {
            title: 'Peak Hr 2 Units (6 PM to 9 PM)',
            dataField: 'ALLOC_UNITS_P2',
            dataType:"number"

        },
        {
            title: 'Peak Hr 3 Units (9 PM to 10 PM)',
            dataField: 'ALLOC_UNITS_P3',
            dataType:"number"

        },
        {
            title: 'Other Peak Hour Units (5 AM to 6 AM & 9 AM to 6 PM)',
            dataField: 'ALLOC_UNITS_OTHER',
            dataType:"number"

        },
        {
            title: 'Night Hr Units (10 PM to 5 AM)',
            dataField: 'ALLOC_UNITS_NIGHT',
            dataType:"number"

        },
        {
            title: 'Total',
            dataField: 'ALLOC_UNITS_TOTAL',
            dataType:"number"
         }
      ]
      },
    {
      groupHeaderName: 'Deduction Details @Consumer End in Rupees',
    
      children: [
        {
            title: 'Metering Charges',
            dataField: 'MET_CHARGES',
            dataType:"number"

        },
        {
            title: 'O & M Charges',
            dataField: 'O_M_CHARGES',
            dataType:"number"

        },
        {
            title: 'Transmission Charges',
            dataField: 'TRANSMISSION_CHARGES',
            dataType:"number"

        },
        {
            title: 'System Operting Charges',
            dataField: 'SYS_OPERATING_CHARGES',
            dataType:"number"

        },
        {
            title: 'Rkavh Penalty',
            dataField: 'RKAVH_PENALTY',
            dataType:"number"

        },
        {
            title: 'Negative Energy Charges',
            dataField: 'NEG_ENERGY_CHARGES',
            dataType:"number"
         },
         {
            title: 'Scheduling Charges',
            dataField: 'SCHEDULING_CHARGES',
            dataType:"number"
         },
         {
            title: 'Other Charges',
            dataField: 'OTHER_CHARGES',
            dataType:"number"
         },
         {
            title: 'DSM Charges',
            dataField: 'DSM_CHARGES',
            dataType:"number"
         },
         {
            title: 'Total',
            dataField: 'DEDUCTION_TOTAL',
            dataType:"number"
         }

    ]
  }
  
],
  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_CUSTOMER_ALLOTMENT',
  moduleName: CRM_BILLING,
};


export const CustomerAllotment :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={WTGGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
