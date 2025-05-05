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
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['date', 'site', 'assetID','assetName','meterID', 'meterType'];

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
    name: 'assetID',
    label: 'Asset ID',
    
  },
  {
    type: ControlType.TEXTBOX,
    name: 'assetName',
    label: 'Asset Name',
    
  },
  {
    type: ControlType.TEXTBOX,
    name: 'meterID',
    label: 'Meter ID',
    
  },
  {
    type: ControlType.COMBOBOX,
    name: 'meterType',
    label: 'Meter Type',
    masterField: 'meterType'
    
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_TOD_BREAKUP_SUMMARY',
      input: searchInputs,
    },
  },
];


const todBreakupSummarySection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todBreakupSummary',
    isHelpTable: true,
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


const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_TOD_BREAKUP_HELP',
  moduleName: CRM_MASTER,
};

export const TODBreakupHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      
      <ScrollabeContainer hasHeader={false}>
        <RFSection  controls={searchSection} title={'Search Criteria'} columns={6} />
        <RFSection controls={todBreakupSummarySection} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
