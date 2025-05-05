import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['bill', 'bill_status','dateType','bill_type','bill_period','generation_period','financial_year','dateFrom','dateTo','bill_category','discom','customer', 'htsc','sbu','scheme','directBillSummary'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'bill',
    label: 'Bill #',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'bill_status',
    label: 'Bill Status',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'bill_category',
    label: 'Bill Category',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'bill_type',
    label: 'Bill Type',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'financial_year',
    label: 'Financial Year',
    event :{
      serviceName:'RCRM_ONCHANGE_DIRECTBILL_FINANCIAL_YEAR',
      moduleName :CRM_BILLING,
      input:['financial_year']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'bill_period',
    label: 'Billing Period',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generation_period',
    label: 'Generation Period',
   
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'sbu',
//     label: 'SBU',
//     event :{
//       serviceName:'RCRM_ONCHANGE_DIRECT_SBU',
//       moduleName :CRM_BILLING,
//       input:['sbu']
//       }
//   },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'scheme',
//     label: 'Scheme',
//   },
  {
    type: ControlType.COMBOBOX,
    name: 'customer',
    label: 'Customer',
    event :{
      serviceName:'RCRM_ONCHANGE_DIRECTBILL_CUSTOMER',
      moduleName :CRM_BILLING,
      input:['customer']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'htsc',
    label: 'HTSC #',
  },

  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_BILLING,
      serviceName: 'SEARCH_PPA_DIRECT_BILL_HELP_SUM', 
      input: searchInputs,
    }, 
  },
];


const finalBillSumGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'directBillSummary',
    isHelpTable: true, 
    columns: [
      {
        title: 'Bill #',
        dataField: 'BILL',
       
      },
      {
        title: 'Bill Date',
        dataField: 'BILL_DATE',

      },
      {
        title: 'Bill Status',
        dataField: 'STATUS',
      },
      {
        title: 'Bill Category',
        dataField: 'BILL_CATEGORY',
      },
      {
        title: 'Bill Type',
        dataField: 'BILL_TYPE',
      },
      {
        title: 'Financial Year',
        dataField: 'FINANCIAL_YEAR',
      },
      {
        title: 'Bill Period',
        dataField: 'BILL_PERIOD',
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
      },
      {
        title: 'PPA #',
        dataField: 'PPA',
      },
      {
        title: 'SBU',
        dataField: 'SBU',
      },
      {
        title: 'Scheme',
        dataField: 'SCHEME',
      },
      
      {
        title: 'Customer',
        dataField: 'CUSTOMER',
      },
      {
        title: 'HTSC #',
        dataField: 'HT_SC',
      },
      {
        title: 'DISCOM',
        dataField: 'DISCOM',
      },
    {
        title: 'Value',
        dataField: 'VALUE',
      },
    ],
  },
];

// const actionBarButtons: IControlDefinition[] = [
//     {
//       type: ControlType.BUTTON,
//       isPrimary: true,
//       name: 'bulkAuthorize',
//       label: 'Bulk Authorize',
//       event: {
//         serviceName: 'BULK_AUTHORIZE',
//         moduleName: CRM_BILLING,
//         //input: [...actionInputs],
//       },
//     },
// ]

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'manageFinalBill',
      isPrimary: true,
      label: 'PPA Based Direct Bill',
      event: {
        linkTo: '/PPABasedDirectBill',
      },
    },
    {
      type: ControlType.BUTTON,
      name: 'manageFinalBill',
      isPrimary: true,
      label: 'Direct Bill',
      event: {
        linkTo: '/DirectBill',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_PPA_DIRECT_BILL_HELP_SUM',
  moduleName: CRM_BILLING,
};


export const PPABasedDirectBillHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
   <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={finalBillSumGridSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
     
    </RetinaFormBuilder>
  );
};
