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
import { IPageBaseProps } from '../../common/objects';
import { CRM_ENERGY_ACCOUNTING} from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
// import { truncate } from 'lodash';

const searchInputs = ['date','site','assetid','assetname','meterid','metertype','MonthlyMeterGrid','assettype'];

const searchSection: IControlDefinition[] = [
  // {
  //   type: ControlType.DATEPICKER,
  //   name: 'date',
  //   label: 'Date',
  
  // },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
   // required:true,
    event :{
      serviceName:'RCRM_MONTHLYMETER_ONCHANGE_ASSET',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['site']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset ID',
   // required:true,
    event :{
      serviceName:'RCRM_ONCHANGE_ASSET',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['assetid']
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
    type: ControlType.COMBOBOX,
    name: 'metertype',
    label: 'Meter Type',
    masterField:'metertype',
   // required:true,
    event :{
      serviceName:'RCRM_ONCHANGE_METER',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['metertype','assetid']
      }
  },
 
  {
    type: ControlType.TEXTBOX,
    name: 'meterid',
    label: 'Meter ID',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_ENERGY_ACCOUNTING,
      serviceName: 'RCRM_SEARCH_MONTHLY_METER_ENTRY_SUM',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'MonthlyMeterGrid',
    isHelpTable: true,
    columns: [
      {
        title: 'Monthly Meter Entry',
        dataField: 'ENTRY_ID',
    
  
      },
        {
            title: 'Generation Period',
            dataField: 'GENERATION_PERIOD',
       
            
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
      // {
      //   title: 'Generation at Controller (KWH)',
      //   dataField: 'GEN_CONTROL_KWH',
      // },
      {
        title: 'Net Energy (KWH)',
        dataField: 'NET_READING_KWH',
      },
      {
        title: 'Net Energy (KVARH)',
        dataField: 'NET_READING_KVARH',
      },
      // {
      //   title: 'Taken By',
      //   dataField: 'TAKEN_BY',
      // },
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
      label: 'Manage Monthly Meter Entry',
      event: {
        linkTo: '/ManageMonthlyMeterEntry',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_MONTHLY_METER_ENTRY_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
};

export const MonthlyMeterEntryHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
         <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      
    </RetinaFormBuilder>
  );
};

