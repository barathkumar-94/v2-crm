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
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';

const searchInputs = ['date','site','assetid','assetname','meterid','metertype'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField: 'site'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'assetid',
    label: 'Asset ID',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'assetname',
    label: 'Asset Name',
    
  },
  {
    type: ControlType.TEXTBOX,
    name: 'meterid',
    label: 'Meter ID',
    
  },
  {
    type: ControlType.COMBOBOX,
    name: 'metertype',
    label: 'Meter Type',
    masterField:'metertype' 
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'SEARCH_TOD_BREAKUP_SUMMARY',
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

const todBreakupSummarySection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todBreakupSummary',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Date',
        dataField: 'DATE',
      },
      {
        title: 'Site',
        dataField: 'SITE',

      },
      {
        title: 'Asset ID',
        dataField: 'ASSET_ID',
        cellRendererParams: {
            event: {
              linkTo: '/ManageTodBreakup',
              queryParams:[{sourceField:'ASSET_ID', targetField:"id"}]
            },
          },
      },
      {
        title: 'Asset Name',
        dataField: 'ASSET_NAME',

      },
      {
        title: 'Meter ID',
        dataField: 'METER_ID',

      },
      {
        title: 'Meter Type',
        dataField: 'METER_TYPE',

      },
      {
        title: 'Net Reading',
        dataField: 'NET_READING',

      },
      {
        title: 'UOM',
        dataField: 'UOM',

      },

    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'manageTod',
      isPrimary: true,
      label: 'Manage TOD Breakup',
      event: {
        linkTo: '/ManageTodBreakup',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_TOD_BREAKUP_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
};

export const TODBreakupSummary:React.FC<IPageBaseProps> = (props) => {

  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={todBreakupSummarySection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
