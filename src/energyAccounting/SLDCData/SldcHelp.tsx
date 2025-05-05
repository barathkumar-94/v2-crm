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
import { CRM_ENERGY_ACCOUNTING } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { IPageBaseProps } from '../../common/objects';

// import { truncate } from 'lodash';

const searchInputs = ['generationyear','generationPeriod','status','substationname','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_SDLC_GENERATION_YEAR_ONCHANGE',
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
    name: 'substationname',
    label: 'Substation Name'
  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_SLDC_DATA_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'SLDCDataGrid',
    isHelpTable: true,
    columns: [
        {
          title: 'ID',
          dataField: 'id',
            
        },
      {
        title: 'Site Name',
        dataField: 'SITE_NAME',
      },
      {
        title: 'Generation Year',
        dataField: 'GENERATION_YEAR',
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
      },
      {
        title: 'Substation Name',
        dataField: 'SUBSTATION_NAME',
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
      label: 'Manage SLDC Data',
      event: {
        linkTo: '/ManageSldcData',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_SLDC_DATA_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
};

export const SldcHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
       <RFSection  controls={searchSection} columns={6} /> 
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
    </RetinaFormBuilder>
  );
};

