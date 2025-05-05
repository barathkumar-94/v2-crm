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
      serviceName:'RCRM_WTG_BANK_OUTPUT_GC2_YEAR_ONCHANGE',
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
      serviceName: 'RCRM_WTG_BANK_OUTPUT_GC2_SEARCH',
      input: PrintInputs,
    },
  },
];

const WTGGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGbankoutputGC2Grid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Service Number',
        dataField: 'SL_NO',

      },
      {
        title: 'Name of Generating EDC',
        dataField: 'NAME_GEN_EDC',

      },
      {
        title: 'OLD HTSC NO.',
        dataField: 'OLD_HTSC_NO',

      },
      {
        title: 'New HTSC NO.',
        dataField: 'NEW_HTSC_NO',

      },
      
      {
        groupHeaderName: 'Slot Wise Net Generation in Aug 2024',
        children: [
        {
            title: 'C1(6AMto9AM)',
            dataField: 'SLOT_NET_C1',
            dataType:"number"

        },
        {
            title: 'C2(6PMto9PM)',
            dataField: 'SLOT_NET_C2',
            dataType:"number"

        },
        {
            title: 'C3(9PMt010PM)',
            dataField: 'SLOT_NET_C3',
            dataType:"number"

        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)',
            dataField: 'SLOT_NET_C4',
            dataType:"number"

        },
        {
            title: 'C5(10PMto5AM)',
            dataField: 'SLOT_NET_C5',
            dataType:"number"

        },
        {
            title: 'Total',
            dataField: 'SLOT_NET_TOTAL',
            dataType:"number"
         }
      ]
      },
    {
      groupHeaderName: 'Slot wise Allotment in Aug 2024',
    
      children: [
        {
            title: 'C1(6AMto9AM)',
            dataField: 'SLOT_ALLOT_C1',
            dataType:"number"

        },
        {
            title: 'C2(6PMto9PM)',
            dataField: 'SLOT_ALLOT_C2',
            dataType:"number"

        },
        {
            title: 'C3(9PMt010PM)',
            dataField: 'SLOT_ALLOT_C3',
            dataType:"number"

        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)',
            dataField: 'SLOT_ALLOT_C4',
            dataType:"number"

        },
        {
            title: 'C5(10PMto5AM)',
            dataField: 'SLOT_ALLOT_C5',
            dataType:"number"

        },
        {
            title: 'Total',
            dataField: 'SLOT_ALLOT_TOTAL',
            dataType:"number"
         }

    ]
  },
  {
    groupHeaderName: 'To Bank in Aug 2024(After 14% Banking charges)',
  
    children: [
      {
          title: 'C1(6AMto9AM)',
          dataField: 'TO_BANK_C1',
          dataType:"number"

      },
      {
          title: 'C2(6PMto9PM)',
          dataField: 'TO_BANK_C2',
          dataType:"number"

      },
      {
          title: 'C3(9PMt010PM)',
          dataField: 'TO_BANK_C3',
          dataType:"number"

      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)',
          dataField: 'TO_BANK_C4',
          dataType:"number"

      },
      {
          title: 'C5(10PMto5AM)',
          dataField: 'TO_BANK_C5',
          dataType:"number"

      },
      {
          title: 'Total',
          dataField: 'TO_BANK_TOTAL',
          dataType:"number"
       }

  ]
},
{
    groupHeaderName: 'From Bank in Aug 2024',
  
    children: [
      {
          title: 'C1(6AMto9AM)',
          dataField: 'FROM_BANK_C1',
          dataType:"number"

      },
      {
          title: 'C2(6PMto9PM)',
          dataField: 'FROM_BANK_C2',
          dataType:"number"

      },
      {
          title: 'C3(9PMt010PM)',
          dataField: 'FROM_BANK_C3',
          dataType:"number"

      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)',
          dataField: 'FROM_BANK_C4',
          dataType:"number"

      },
      {
          title: 'C5(10PMto5AM)',
          dataField: 'FROM_BANK_C5',
          dataType:"number"

      },
      {
          title: 'Total',
          dataField: 'FROM_BANK_TOTAL',
          dataType:"number"
       }

  ]
},
{
    groupHeaderName: 'Return Bank in Jul  2024(after 14% banking charges)',
  
    children: [
      {
          title: 'C1(6AMto9AM)',
          dataField: 'RETURN_BANK_C1',
          dataType:"number"

      },
      {
          title: 'C2(6PMto9PM)',
          dataField: 'RETURN_BANK_C2',
          dataType:"number"

      },
      {
          title: 'C3(9PMt010PM)',
          dataField: 'RETURN_BANK_C3',
          dataType:"number"

      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)',
          dataField: 'RETURN_BANK_C4',
          dataType:"number"

      },
      {
          title: 'C5(10PMto5AM)',
          dataField: 'RETURN_BANK_C5',
          dataType:"number"

      },
      {
          title: 'Total',
          dataField: 'RETURN_BANK_TOTAL',
          dataType:"number"
       }

  ]
},
{
    groupHeaderName: 'Total Banked units for the Year FY 2023 - 2024(after Jul24 Allotment)',
  
    children: [
      {
          title: 'C1(6AMto9AM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_JUL_2024_C1',
          dataType:"number"

      },
      {
          title: 'C2(6PMto9PM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_JUL_2024_C2',
          dataType:"number"

      },
      {
          title: 'C3(9PMt010PM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_JUL_2024_C3',
          dataType:"number"

      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_JUL_2024_C4',
          dataType:"number"

      },
      {
          title: 'C5(10PMto5AM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_JUL_2024_C5',
          dataType:"number"

      },
      {
          title: 'Total',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_JUL_2024_TOTAL',
          dataType:"number"
       }

  ]
},
{
    groupHeaderName: 'Total Banked units with Return Banking',
  
    children: [
      {
          title: 'C1(6AMto9AM)',
          dataField: 'TOTAL_BANKED_UNITS_WITH_RETURN_C1',
          dataType:"number"

      },
      {
          title: 'C2(6PMto9PM)',
          dataField: 'TOTAL_BANKED_UNITS_WITH_RETURN_C2',
          dataType:"number"

      },
      {
          title: 'C3(9PMt010PM)',
          dataField: 'TOTAL_BANKED_UNITS_WITH_RETURN_C3',
          dataType:"number"

      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)',
          dataField: 'TOTAL_BANKED_UNITS_WITH_RETURN_C4',
          dataType:"number"

      },
      {
          title: 'C5(10PMto5AM)',
          dataField: 'TOTAL_BANKED_UNITS_WITH_RETURN_C5',
          dataType:"number"

      },
      {
          title: 'Total',
          dataField: 'TOTAL_BANKED_UNITS_WITH_RETURN_TOTAL',
          dataType:"number"
       }

  ]
},
{
    groupHeaderName: 'Total Banked units for the Year FY 2023 - 2024(after Aug24 Allotment)',
  
    children: [
      {
          title: 'C1(6AMto9AM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_AUG_2024_C1',
          dataType:"number"

      },
      {
          title: 'C2(6PMto9PM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_AUG_2024_C2',
          dataType:"number"

      },
      {
          title: 'C3(9PMt010PM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_AUG_2024_C3',
          dataType:"number"

      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_AUG_2024_C4',
          dataType:"number"

      },
      {
          title: 'C5(10PMto5AM)',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_AUG_2024_C5',
          dataType:"number"

      },
      {
          title: 'Total',
          dataField: 'TOTAL_BANKED_UNITS_AFTER_AUG_2024_TOTAL',
          dataType:"number"
       }

  ]
}
],
  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_WTG_BANKOUTPUT_GC2',
  moduleName: CRM_BILLING,
};


export const WTGBankOutputGC2 :React.FC<IPageBaseProps> = (props) => {
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
