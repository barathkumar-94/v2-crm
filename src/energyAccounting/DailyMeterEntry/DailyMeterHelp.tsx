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

const searchInputs = ['date', 'site', 'assetid', 'assetname', 'meterid', 'metertype', 'Status', 'Dailymetergrid','assettype'];

const searchSection: IControlDefinition[] = [

  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField: 'site',
    //required:true,
    event: {
      serviceName: 'RCRM_SUMMARY_MONTHLYMETER_ONCHANGE_ASSET',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['site']
    }
  },

  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset ID',
    masterField: 'assetid',
    event: {
      serviceName: 'RCRM_SUMMARY_ONCHANGE_ASSET',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['assetid']
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'assetname',
    label: 'Asset Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assettype',
    label: 'Asset Type',
    masterField:'assettype',
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
    masterField: 'metertype',
    event: {
      serviceName: 'RCRM_SUMMARY_ONCHANGE_METER',
      moduleName: CRM_ENERGY_ACCOUNTING,
      input: ['metertype', 'assetid']
    }


  },
  // {
  //   type: ControlType.DATEPICKER,
  //   name: 'date',
  //   label: 'Date'
  // },

  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_DAILYMETER_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'Dailymetergrid',
    isHelpTable: true,
    columns: [
      {
        title: 'Daily Meter Entry',
        dataField: 'dailymeter_id'
      },
      {
        title: 'Date',
        dataField: 'DATE',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
          format: DATE_FORMAT
        }

      },
      {
        title: 'Site',
        dataField: 'SITE',

      },
      {
        title: 'Asset ID',
        dataField: 'ASSET_ID',

      },
      {
        title: 'Asset Name',
        dataField: 'ASSET_NAME',

      },
      {
        title: 'Asset Type',
        dataField: 'ASSET_TYPE',
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
        title: 'Daily Net Energy',
        dataField: 'NET_READING',

      },
      {
        title: 'TOD Net Energy - 15Mins Block',
        dataField: 'TOD_Net_Reading-15Mins_Block',

      },
      {
        title: 'TOD Net Energy',
        dataField: 'TOD_Net_Reading',

      },
      {
        title: 'UOM',
        dataField: 'UOM',

      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },

    ],
  },
];

// const toolbarControls: IControlDefinition[] = [
//     {
//       type: ControlType.BUTTON,
//       name: 'managebtn',
//       isPrimary: true,
//     //   iconName:'Circleplus',
//       label: 'Manage Daily Meter Entry',
//       event: {
//         linkTo: '/ManageDailyMeterEntry',

//       },
//     },
//   ];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_DAILYMETER_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
  // input: searchInputs,
};

export const DailyMeterHelp: React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={searchSection} columns={6} />
        {/* <RFSection controls={tileSection} columns={3} transparent /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
