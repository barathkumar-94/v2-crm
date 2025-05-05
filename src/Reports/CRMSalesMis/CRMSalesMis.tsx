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
    name: 'Customer_Name',
    label: 'Customer Name',
    masterField:'Customer_Name',
    event :{
      serviceName:'RCRM_SALES_MIS_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'PPA#',
    label: 'PPA#',
    //required:true,
    masterField:'PPA#'
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
      serviceName: 'RCRM_SALES_MIS_SEARCH',
      input: PrintInputs,
    },
  },
];

const WTGGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CRMSalesMisGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'SI.No',
        dataField: 'SI_NO',

      },
      {
        title: 'Name of Customer',
        dataField: 'NAME_OF_CUSTOMER',

      },
      {
        title: 'Credit Rating (Long Term)',
        dataField: 'CREDIT_RATING_LONG_TERM',

      },
      {
        title: 'Type of Contract (CGP / TPS)',
        dataField: 'TYPE_OF_CONTRACT',

      },
      
      {
            title: 'Contracted Energy (MU)',
            dataField: 'CONTRACTED_ENERGY',


      },
      {
            title: 'Approx. Contract Capacity (MW)',
            dataField: 'CONTRACT_CAPACITY',
         

      },
      {
            title: 'Sanction Demand (kVA)',
            dataField: 'SANCTION_DEMAND',


      },
      {
            title: 'Drawal Voltage kV',
            dataField: 'DRAWAL_VOLTAGE',

      },
      {
            title: 'Capacity already under OA Contract (MW or MU)',
            dataField: 'CAPACITY_UNDER_OA_CONTRACT',
           

      },
      {
            title: 'Other Power Supplier of Consumer',
            dataField: 'OTHER_POWER_SUPPLIER',
       
      },


      {
            title: 'Consumer End - Point of Contact',
            dataField: 'CONSUMER_END_POC',

       },
       {
            title: 'PPA Lock-in',
            dataField: 'PPA_LOCK_IN',

        },
        {
            title: 'Offered PPA Tariff(Rs./kWh)',
            dataField: 'OFFERED_PPA_TARIFF',

        },
        {
            title: 'Landed / Bus Bar',
            dataField: 'LANED_BUS_BAR',

        },
        {
            title: "CGEPL's Realization(Rs./kWh)",
            dataField: 'CGEPL_REALIZATION',

        },
        {
            title: 'Variation Sharing - DISCOM & OA(Yes / No)',
            dataField: 'VARIATION_SHARING',
            
        },
        {
            title: 'Required Equity Investment (INR)',
            dataField: 'EQUITY_INVESTMENT',
           
        },
        {
            title: 'Expected date of SCOD',
            dataField: 'EXP_DATE_OF_SCOD',
        },
        {
            title: 'Expected Term Sheet/LOI signing Date',
            dataField: 'EXPECTED_TERM_SHEET',
            
        },
        {
            title: 'Date of 1st Term Sheet submission',
            dataField: 'FIRST_TERM_SHEET_SUBMISSON',
            
        },
        {
            title: 'Latest Comments / Current Status',
            dataField: 'LATEST_COMMENTS',
            
        },
        {
            title: 'Channel Partner (If any)',
            dataField: 'CHANEL_PARTNER',
            
        },
        {
            title: 'Responsible Person in CGEPL',
            dataField: 'RESPOSIBLE_PERSON_IN_CGEPL',
            
        }

 
],
  },
      ]
    
   
 



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_CRM_SALES_MIS',
  moduleName: CRM_BILLING,
};


export const CRMSalesMis :React.FC<IPageBaseProps> = (props) => {
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
