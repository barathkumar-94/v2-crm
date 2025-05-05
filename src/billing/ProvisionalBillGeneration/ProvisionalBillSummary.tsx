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
import { CRM_BILLING, CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';

const searchInputs = ['BatchId', 'BatchStatus', 'FinancialYear','BillingPeriod','GenerationPeriod', 'batchSummary','SBU','Scheme'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'BatchId',
    label: 'Batch Id',
  },
    {
    type: ControlType.COMBOBOX,
    name: 'BatchStatus',
    label: 'Batch Status',
    masterField:'BatchStatus',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'FinancialYear',
    label: 'Financial Year',
    masterField:'FinancialYear',
    event: {
      input: ['FinancialYear'],
      moduleName: CRM_BILLING,
      serviceName: 'RCRM_ONCHANGE_BILLING_FINANCIAL_YEAR_SUM',
    },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'BillingPeriod',
    label: 'Billing Period',
    masterField:'BillingPeriod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'GenerationPeriod',
    label: 'Generation Period',
    masterField:'GenerationPeriod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'SBU',
    label: 'SBU',
    masterField:'SBU',
    event: {
      input: ['SBU'],
      moduleName: CRM_BILLING,
      serviceName: 'RCRM_ONCHANGE_BILLING_SBU',
    },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Scheme',
    label: 'Scheme',
    masterField:'Scheme'
    
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_BILLING,
      serviceName: 'RCRM_SEARCH_PROVISIONAL_BILL_SUM',
      input: searchInputs,
    },
  },
];

const tileSection: IControlDefinition[] = [
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'noOfSites',
    label: 'No. of Sites',
    icon:'images/icons/location.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'first-stat-card stat-card-total'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'noOfMeters',
    label: 'No. of Meters',
    icon: 'images/icons/meter.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'second-stat-card'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'totalUnits',
    label: 'Total Units (kWh)',
    icon: 'images/icons/coins.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'third-stat-card'
  }
];

const tableSection: IControlDefinition[] = [
  
  
  {
    type: ControlType.TABLE,
    name: 'batchSummary',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'Batch Id',
        dataField: 'ID',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
        //   event: {
        //     linkTo: '/ProvisionalBillGeneration',
        //     queryParams:[{sourceField:'ID', targetField:"id"}]
        // },

        event: {
              linkTo: '/ProvisionalViewBills',
              queryParams:[{sourceField:'ID', targetField:"code"}]
          },
      },
        
      },
      {
        title: 'Batch Status',
        dataField: 'BATCH_STATUS',
        
      },
      {
        title: 'Processed Date',
        dataField: 'PROCESSED_DATE',
        dataType :'dateTime',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:DATE_FORMAT,
              },
         
      },
      {
        title: 'Processed Time',
        dataField: 'PROCESSED_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
    },
      
      {
        title: 'Financial Year',
        dataField: 'FINANCIAL_YEAR',
        
      },
      {
        title: 'Billing Period',
        dataField: 'BILLING_PERIOD',
         
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
        
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
        hidden:true
      },
      {
        title: '# of Bills Generated',
        dataField: 'NO_OF_BILLS_GEN',
              cellRenderer: TableCellRendererType.BUTTON,
              cellRendererParams: {
                iconName: 'PageLink',
                iconTooltipText: 'View Bills',
                event: {
                  linkTo: '/ProvisionalViewBills',
                  queryParams: [{ sourceField: 'ID', targetField: "code" }]
                }
              } 
      },
      {
        title: 'Error Log',
        dataField: 'ERROR_LOG',
        cellRenderer: TableCellRendererType.BUTTON,
              cellRendererParams: {
                iconName: 'PageLink',
                iconTooltipText: 'View Error Log',
                event: {
                  linkTo: '/ProvisionalErrorLog',
                  queryParams: [{ sourceField: 'ID', targetField: "code" }]
                }
              } 
      },
      {
        title: '',
        dataField: 'ROLLBACK',
        cellRenderer: TableCellRendererType.BUTTON,
        cellRendererParams: {
          text:'Rollback',
          event: {
            serviceName:'RCRM_ROLLBACK_PROVISIONAL_BILL',
            moduleName:CRM_BILLING,
            input:['ID','BATCH_STATUS','FINANCIAL_YEAR','BILLING_PERIOD','GENERATION_PERIOD','SBU',
              'SCHEME','CUSTOMER'
            ]
          }
        } 
      },
    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
    //   iconName:'Circleplus',
      label: 'Batch Process',
      event: {
        linkTo: '/ProvisionalBillGeneration',
        
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_PROVISIONAL_BILL_SUM',
  moduleName: CRM_BILLING,
  input: searchInputs,
};

export const ProvisionalBillSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        {/* <RFSection controls={tileSection} columns={3} transparent /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
