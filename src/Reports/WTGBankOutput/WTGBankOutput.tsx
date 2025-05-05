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

const PrintInputs = ['generationyear','generationmonth','site','assetid','assettype','metertype'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'WTG_BANK_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
//   {
//     type: ControlType.COMBOBOX,
//     name: 'generationmonth',
//     label: 'Generation Month',
//     //required:true,
//     masterField:'generationmonth'
//   },
{
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
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
      serviceName: 'WTG_BANK_SEARCH_SUMMARY_RPT',
      input: PrintInputs,
    },
  },
];

const WTGBANKGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGBANKGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'SL.NO',
        dataField: 'SL_NO',

      },
      {
        title: 'Name of Generating EDC',
        dataField: 'GENERATING_ECD',

      },
      {
        title: 'OLD HTSC.NO',
        dataField: 'OLD_HTSC_NO',

      },
      {
        title: 'New HTSC No	',
        dataField: 'NEW_HTSC_NO',

      },
      
      {
        groupHeaderName: 'Slot wise Net Generation in Aug 2024',
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
            title: 'C3(9PMto10PM)',
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
          title: 'C3(9PMto10PM)	',
          dataField: 'SLOT_ALLOT_C3',
          dataType:"number"
      },
      {
          title: 'C4(5AMto6AM&9AMto6PM)	',
          dataField: 'SLOT_ALLOT_C4',
          dataType:"number"
      },
      {
          title: 'C5(10PMto5AM)	',
          dataField: 'SLOT_ALLOT_C5',
          dataType:"number"
       },

       {
        title: 'Total',
        dataField: 'SLOT_ALLOT_TOTAL',
        dataType:"number"
      },
      
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
        title: 'C3(9PMto10PM)	',
        dataField: 'TO_BANK_C3',
        dataType:"number"
    },
    {
        title: 'C4(5AMto6AM&9AMto6PM)	',
        dataField: 'TO_BANK_C4',
        dataType:"number"
    },
    {
        title: 'C5(10PMto5AM)	',
        dataField: 'TO_BANK_C5',
        dataType:"number"
     },

     {
      title: 'Total',
      dataField: 'TO_BANK_TOTAL',
      dataType:"number"
    },
    
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
            title: 'C3(9PMto10PM)	',
            dataField: 'FROM_BANK_C3',
            dataType:"number"
        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)	',
            dataField: 'FROM_BANK_C4',
            dataType:"number"
        },
        {
            title: 'C5(10PMto5AM)	',
            dataField: 'FROM_BANK_C5',
            dataType:"number"
         },
    
         {
          title: 'Total',
          dataField: 'FROM_BANK_TOTAL',
          dataType:"number"
        },
        
      ]
      },
      {
        groupHeaderName: 'Return Bank in Jul 2024(after 14% banking charges)',
      
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
            title: 'C3(9PMto10PM)	',
            dataField: 'RETURN_BANK_C3',
            dataType:"number"
        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)	',
            dataField: 'RETURN_BANK_C4',
            dataType:"number"
        },
        {
            title: 'C5(10PMto5AM)	',
            dataField: 'RETURN_BANK_C5',
            dataType:"number"
         },
    
         {
          title: 'Total',
          dataField: 'RETURN_BANK_TOTAL',
          dataType:"number"
        },
        
      ]
      },
      {
        groupHeaderName: 'Total Banked units for the Year FY 2023 - 2024(after Jul24 Allotment)	',
      
        children: [
        {
            title: 'C1(6AMto9AM)',
            dataField: 'TOTAL_BANK_C1',
            dataType:"number"
        },
        {
            title: 'C2(6PMto9PM)',
            dataField: 'TOTAL_BANK_C2',
            dataType:"number"
        },
        {
            title: 'C3(9PMto10PM)	',
            dataField: 'TOTAL_BANK_C3',
            dataType:"number"
        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)	',
            dataField: 'TOTAL_BANK_C4',
            dataType:"number"
        },
        {
            title: 'C5(10PMto5AM)	',
            dataField: 'TOTAL_BANK_C5',
            dataType:"number"
         },
    
         {
          title: 'Total',
          dataField: 'TOTAL_BANK_TOTAL',
          dataType:"number"
        },
        
      ]
      },
      {
        groupHeaderName: 'Total Banked units with Return Banking',
      
        children: [
        {
            title: 'C1(6AMto9AM)',
            dataField: 'TOTAL_BANK_UNITS_C1',
            dataType:"number"
        },
        {
            title: 'C2(6PMto9PM)',
            dataField: 'TOTAL_BANK_UNITS_C2',
            dataType:"number"
        },
        {
            title: 'C3(9PMto10PM)	',
            dataField: 'TOTAL_BANK_UNITS_C3',
            dataType:"number"
        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)	',
            dataField: 'TOTAL_BANK_UNITS_C4',
            dataType:"number"
        },
        {
            title: 'C5(10PMto5AM)	',
            dataField: 'TOTAL_BANK_UNITS_C5',
            dataType:"number"
         },
    
         {
          title: 'Total',
          dataField: 'TOTAL_BANK_UNITS_TOTAL',
          dataType:"number"
        },
        
      ]
      },
      {
        groupHeaderName: 'Total Banked units for the Year FY 2023 - 2024(after Aug24 Allotment)',
      
        children: [
        {
            title: 'C1(6AMto9AM)',
            dataField: 'ALLOT_C1',
            dataType:"number"
        },
        {
            title: 'C2(6PMto9PM)',
            dataField: 'ALLOT_C2',
            dataType:"number"
        },
        {
            title: 'C3(9PMto10PM)	',
            dataField: 'ALLOT_C3',
            dataType:"number"
        },
        {
            title: 'C4(5AMto6AM&9AMto6PM)	',
            dataField: 'ALLOT_C4',
            dataType:"number"
        },
        {
            title: 'C5(10PMto5AM)	',
            dataField: 'ALLOT_C5',
            dataType:"number"
         },
    
         {
          title: 'Total',
          dataField: 'ALLOT_TOTAL',
          dataType:"number"
        },
        
      ]
      },
      

],
  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_WTG_BANK_RPT',
  moduleName: CRM_BILLING,
};


export const WTGBankOutput :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={WTGBANKGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
