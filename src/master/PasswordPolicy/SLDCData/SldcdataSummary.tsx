import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  RFActionBar,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';

import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
import { CRM_ENERGY_ACCOUNTING } from '../../../common/constants';
import { IPageBaseProps } from '../../../common/objects';
import { RFCRMToolbar } from '../../../common/components/toolbar';
// import { truncate } from 'lodash';

const searchInputs = ['generationyear','generationPeriod','date_h','cutomername_h','htsc_h','LDCDataGrid'];

const searchSection: IControlDefinition[] = [
  // {
  //   type: ControlType.COMBOBOX,
  //   name: 'generationyear',
  //   label: 'Generation Year',
  //   masterField:'generationyear',
  //   event :{
  //     serviceName:'RCRM_GENERATION_YEAR_ONCHANGE',
  //     moduleName :CRM_ENERGY_ACCOUNTING,
  //     input:['generationyear']
  //     }
  // },
    {
        type: ControlType.COMBOBOX,
        name: 'generationPeriod',
        label: 'Generation Period',
       masterField:'generationPeriod'
      },
  {
    type: ControlType.DATEPICKER,
    name: 'date_h',
    label: 'Date'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'cutomername_h',
    label: 'Customer Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'htsc_h',
    label: 'HT SC #',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_LDC_DATA_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'LDCDataGrid',
    isPrimeReactTable: true,
    columns: [
        {
          title: 'ID',
          dataField: 'id',
          cellRenderer:TableCellRendererType.TEXT,

          cellRendererParams: {
            event: {
              linkTo: '/ManageLdcdata',
              queryParams:[{sourceField:'id', targetField:"id"}]
          },
           
      
      },
            
        },
      {
        title: 'Date',
        dataField: 'date',
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
      },
      {
        title: 'Customer Name',
        dataField: 'customername',
      },
      {
        title: 'HT SC #',
        dataField: 'htsc',
      },
      {
        title: 'Net Reading (KWH)',
        dataField: 'NET_READING_KWH',
      },
    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage LDC Data',
      event: {
        linkTo: '/ManageLdcdata',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_LDC_DATA_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
};

export const LdcdataSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} />  */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};

