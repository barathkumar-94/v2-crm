import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  RFTabs,
  RFTabItem,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
// import { truncate } from 'lodash';

const searchInputs = ['PaymentSecurityCode', 'PPA_NO','PaymentSecurityName', 'CustomerName','paymentsecuritysummarygrid'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'PaymentSecurityCode',
    label: 'Payment Security Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'PaymentSecurityName',
    label: 'Payment Security Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'PPA_NO',
    label: 'PPA#',
  },

  {
    type: ControlType.TEXTBOX,
    name: 'CustomerName',
    label: 'Customer Name',
  },
 

  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'TransactionType',
  //   label: 'Transaction Type',
  //   masterField: 'TransactionType',
  // },
  // {
  // type: ControlType.TEXTBOX,
  // name: 'TransactionReference',
  // label: 'Transaction Reference',
  // },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_SEARCH_PAYMENTSECURITY_SUM',
      input: searchInputs,
    },
  },
];



const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'paymentsecuritysummarygrid',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'Payment Security Code',
        dataField: 'PAYMENT_SECURITY_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManagePaymentSecurity',
            queryParams:[{sourceField:'PAYMENT_SECURITY_CODE',targetField:'id'},
            {sourceField:'PAYMENT_SECURITY_NAME',targetField:'name'}
            ]
          },
        },
      },
      {
        title: 'Payment Security Name',
        dataField: 'PAYMENT_SECURITY_NAME',
       
      },
      {
        title: 'PPA#',
        dataField: 'PPA',
       
      },

      {
        title: 'Power Producer',
        dataField: 'POWER_PRODUCER',
      },
      // {
      //   title: 'Transaction Type',
      //   dataField: 'TRANSACTION_TYPE',
      // },
      // {
      //   title: 'Transaction Reference',
      //   dataField: 'TRANSACTION_REFERENCE',
      // },

      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
      },
      {
        title: 'Amount',
        dataField: 'AMOUNT',
      },

    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Payment Security',
      event: {
        linkTo: '/ManagePaymentSecurity',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_PAYMENT_SUM',
  moduleName: CRM_TRANSACTION,
  // input: searchInputs,
};

export const Paymentsecuritysummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection}columns={6} /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
