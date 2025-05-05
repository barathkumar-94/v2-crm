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

const PrintInputs = ['generationyear','generationperiod','site','assetid','assettype','metertype'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'SECL2GC_REPORT_ONCHANGE',
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
  
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'SECL2GC_SEARCH_SUMMARY_RPT',
      input: PrintInputs,
    },
  },
];

const SECL2GCGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'SECL2GCGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'S.No',
        dataField: 'SR_NO',

      },
      {
        title: 'Capative Consumers',
        dataField: 'CAP_CONSUMERS',

      },
      {
        title: 'HTSC No',
        dataField: 'HTSC_NO',
      },
      {
        title: 'EDC',
        dataField: 'EDC',
      },
      
      {
        groupHeaderName: 'Slot wise allotted',
        children: [
        {
            title: 'Peak Hr 1 Units (6 AM to 9 AM)',
            dataField: 'PEAK_HR_1_UNIT',
            dataType:"number"

        },
        {
            title: 'Peak Hr 2 Units (6 PM to 9 PM)',
            dataField: 'PEAK_HR_2_UNIT',
            dataType:"number"
        },
        {
            title: 'Peak Hr 3 Units (9 PM to 10 PM)	',
            dataField: 'PEAK_HR_3_UNIT',
            dataType:"number"
        },
        {
            title: 'Other Peak Hour Units (5 AM to 6 AM & 9 AM to 6 PM)',
            dataField: 'OTHER_PEAK_HR_UNIT',
            dataType:"number"
        },
        {
            title: 'Night Hr Units (10 PM to 5 AM)',
            dataField: 'NIGHT_HR_UNIT',
            dataType:"number"
         },
         {
          title: 'Total',
          dataField: 'TOTAL_SLOT',
          dataType:"number"
       }
      ]
      },
    {
      groupHeaderName: 'Deduction Details',
    
      children: [
      {
          title: 'Metering Charges',
          dataField: 'METER_CHARGES',
          dataType:"number"
      },
      {
        title: 'Kvarh Penality',
        dataField: 'KVARH_PENALTY',
        dataType:"number"
     },
     {
      title: 'System Operting Charges',
      dataField: 'SYSTEM_OPERA_CHARGE',
      dataType:"number"
     },
     {
      title: 'Scheduling Charges',
      dataField: 'SCEDULE_CHARGES',
      dataType:"number"
   },
   {
      title: 'Other Charges',
      dataField: 'OTHER_CHARGES',
      dataType:"number"
   },
   {
    title: 'Transmission Charges',
    dataField: 'TRANS_CHARGES',
    dataType:"number"
    },
    {
      title: 'Import KWH Penality',
      dataField: 'IMPORT_KWH_PENALITY',
      dataType:"number"
    },
    {
      title: 'E.Tax',
      dataField: 'E_TAX',
      dataType:"number"
    },
    {
      title: 'Total',
      dataField: 'TOTAL_DEDUCTION',
      dataType:"number"
    },


    ]
  }
],
  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_SECL2CG_RPT',
  moduleName: CRM_BILLING,
};


export const SECL2CG :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={SECL2GCGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
