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
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';

const searchInputs = ['generationyear','generationPeriod', 'customer_name','htsc','status','consumerBillDataGrid'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_SUMMARY_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationyear']
      }
  },
    {
        type: ControlType.COMBOBOX,
        name: 'generationPeriod',
        label: 'Generation Period',
        masterField:'generationPeriod'
      },
  {
    type: ControlType.TEXTBOX,
    name: 'customer_name',
    label: 'Customer Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'htsc',
    label: 'HT SC #',
    masterField:'htsc'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField:'status'
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_CONSUMERBILLDATA_SUM',
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
    name: 'consumerBillDataGrid',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'ID',
        dataField: 'ID',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ConsumerBillData',
            queryParams:[{sourceField:'ID', targetField:"id"}]
        },
      },
        
      },
      {
        title: 'Generation Year',
        dataField: 'GENERATION_YEAR',
        
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
        cellRenderer:TableCellRendererType.TEXT,
         
      },
      {
        title: 'Date',
        dataField: 'DATE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        } 
    },
      
      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
        
      },
      {
        title: 'HT SC#',
        dataField: 'HT_SC',
         
      },
      {
        title: 'Net Reading(kWh)',
        dataField: 'NET_READING',
        
      },
      {
        title: 'Status',
        dataField: 'STATUS',
        
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
      label: 'Manage HT Bill Entry',
      event: {
        linkTo: '/ConsumerBillData',
        
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CONSUMERBILLDATA_INIT_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: searchInputs,
};

export const ConsumerDiscomSummary:React.FC<IPageBaseProps> = (props) => {
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
