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
import { UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','gctype'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    required:true,
    masterField:'generationyear',
    event :{
      serviceName:'PARK_TOTAL_ONCHANGE',
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
    name: 'gctype',
    label: 'Report Type',
    required:true,
    masterField:'gctype'
  },

  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_PARK_INVOICE_SLOT_WISE_SEARCH_SUMMARY_RPT',
      input: PrintInputs,
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
      title: 'Customer Name',
      dataField: 'CUSTOMER_NAME'
    },
     {
       title: 'Service Number',
       dataField: 'SERVICE_NUMBER'
              
     },
     {
      title: 'Drawal Voltage',
      dataField: 'DRAWL_VOLTAGE'             
    },
    {
      title: 'Gross Electrical Energy injected',
      dataField: 'GROSS_ELECTRICAL_ENERGY_INJECTED'             
    },
    {
      title: 'T and D Loss %',
      dataField: 'TD_LOSS_PER'             
    },
    {
      title: 'T and D loss KWH',
      dataField: 'TD_LOSS'             
    },
      {
        title: 'NET Energy(C1)',
        dataField: 'NET_ENERGY_C1'             
      },
      {
        title: 'NET Energy(C2)',
        dataField: 'NET_ENERGY_C2'             
      },
      {
        title: 'NET Energy(C3)',
        dataField: 'NET_ENERGY_C3'             
      },
      {
        title: 'NET Energy(C4)',
        dataField: 'NET_ENERGY_C4'             
      },
      {
        title: 'NET Energy(C5)',
        dataField: 'NET_ENERGY_C5'             
      },

      {
      title: 'NET Energy(Total)',
      dataField: 'NET_ENERGY'             
      },

    {
      title: 'Contract Rate',
      dataField: 'CONTRACT_RATE'             
    },
    {
      title: 'Gross Revenue',
      dataField: 'GROSS_REVENUE'             
    },
    {
      title: 'Invoice Date',
      dataField: 'INVOICE_DATE'             
    },

  ]
 } 

const CustomerTariffGridSection: IControlDefinition[] = [
  {
  type: ControlType.TABLE,
  name: 'ParkTotalSlotWiseGrid',
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
  indexVariable: ['SE_NO','CUSTOMER_NAME','SERVICE_NUMBER','DRAWL_VOLTAGE','GROSS_ELECTRICAL_ENERGY_INJECTED','TD_LOSS_PER','TD_LOSS','NET_ENERGY','CONTRACT_RATE','GROSS_REVENUE','INVOICE_DATE'],
  columnVariable: ['GRID_COLUMN_NAME'],
  },
  columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
  },
  ]

const CustomerTariffGridSection1: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ParkTotalGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'S.No.',
        dataField: 'SR_NO',

      },
      {
        title: 'Name of the Group Capative Consumers',
        dataField: 'CAP_CONSUMERS',
      },
      {
        title: 'HTSC No',
        dataField: 'HTSC_NO',
      },
      {
        title: 'Drawal Voltage',
        dataField: 'DRAWAL_VOL',
      },
      {
        title: 'Gross Electrical Energy injected',
        dataField: 'GROSS_ELEC_ENERGY',
      },
      {
        title: 'T and D Loss %',
        dataField: 'TD_LOSS',
      },
      {
        title: 'T and D loss KWH',
        dataField: 'TD_LOSS_KWH',
      },

        {
            title: 'NET Energy',
            dataField: 'NET_ENERGY',
        },
        {
            title: 'Contract Rate',
            dataField: 'CON_RATE'
        },
        {
            title: 'Gross Revenue',
            dataField: 'GROSS_REVENUE',
        },
        {
            title: 'Metering Charges',
            dataField: 'METERING_CH',
         },
         {
            title: 'RKVAH Charges',
            dataField: 'RKVAH_CH',
         },
         {
            title: 'Sys Opr Charges',
            dataField: 'SYS_OPR_CH',
         },
         {
            title: 'Scheduling ChargeS',
            dataField: 'SCHEDULE_CH',
         },
         {
            title: 'Other Charges',
            dataField: 'OTHER_CH',
         },
         {
            title: 'DSM Charges',
            dataField: 'DSM_CH',
         },
         {
            title: 'Transmission Charges',
            dataField: 'TRANS_CH',
         },
         {
            title: 'Negative Charges',
            dataField: 'NEGATIVE_CH',
         },
         {
            title: 'Wheeling Charges',
            dataField: 'WHEELING_CH',
         },
         {
            title: 'Reverse Charge',
            dataField: 'REVERSE_CH',
         },
         {
            title: 'Net Invoice',
            dataField: 'NET_INVOICE',
         },
         {
            title: 'Self Gen Tax',
            dataField: 'SELF_GEN_TAX',

            	
         },
         {
            title: 'TCS Amount',
            dataField: 'TCS_AMOUNT',
         },
         {
            title: 'Total Amount payable by customer',
            dataField: 'TOTAL_AMOUNT',
         },
         {
         title: 'Invoice Date',
         dataField: 'INVOICE_DATE',
         }


      ]
    },
   
 ];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_PARK_TOTAL_RPT',
   moduleName: CRM_BILLING,
};


export const ParkTotalInvoiceSlotWise :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={CustomerTariffGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
