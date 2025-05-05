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
      serviceName:'CUSTOMER_TARIFF_ONCHANGE',
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
      serviceName: 'CUSTOMER_TARIFF_SEARCH_SUMMARY_RPT',
      input: PrintInputs,
    },
  },
];

const CustomerTariffGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerTariffGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'S.No.',
        dataField: 'SR_NO',

      },
      {
        title: 'Capative Customers',
        dataField: 'CAP_CUSTOMERS',
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
        title: 'Line Loss',
        dataField: 'LINE_LOSS',
      },
      {
        title: 'Voltage Level',
        dataField: 'VOL_LEVEL',
      },
      {
        title: 'Contract Ref',
        dataField: 'CONTRACT_REF',
      },
      {
        title: 'Contract Rate',
        dataField: 'CONTRACT_RATE',
      },

        {
            title: 'Metering Charges',
            dataField: 'METERING_CH',
        },
        {
            title: 'RKVAH',
            dataField: 'RKVAH'
        },
        {
            title: 'Sys Opr Charges',
            dataField: 'SYS_OPR_CH',
        },
        {
            title: 'Scheduling Charges',
            dataField: 'SCHEDULING_CH',
         },
         {
            title: 'Other Charges',
            dataField: 'OTHER_CH',
         },
         {
            title: 'Transmission Charges',
            dataField: 'TRANS_CH',
         },
         {
            title: 'Wheeling Charges',
            dataField: 'WHEELING_CH',
         },
         {
            title: 'Self Gen Tax',
            dataField: 'SELF_GEN_TAX',
         },
         {
            title: 'Reverse Charge',
            dataField: 'REVERSE_CH',
         },
         {
            title: 'WTG Category',
            dataField: 'WTG_CATEGORY',
         },
         {
            title: 'Updated Date',
            dataField: 'UPDATED_DATE',

            	
         },
         {
            title: 'Negative Charges',
            dataField: 'NEGATIVE_CH',
         }

      ]
    },
   
 ];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_CUSTOMER_TARIFF_RPT',
  moduleName: CRM_BILLING,
};


export const CustomerTariff :React.FC<IPageBaseProps> = (props) => {
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
