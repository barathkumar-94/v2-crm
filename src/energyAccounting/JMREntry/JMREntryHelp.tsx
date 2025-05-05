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

const searchInputs = ['date', 'site', 'generationPeriod','assetid','assetname','meterid','metertype','EnergyDemandPlanninggrid','assettype'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'generationPeriod',
    label: 'Generation Period',
    masterField :'generationPeriod',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
   // required:true,
    event :{
      serviceName:'RCRM_SUMMARY_MONTHLYMETER_ONCHANGE_ASSET',
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
      serviceName:'RCRM_SUMMARY_ONCHANGE_ASSET',
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
      serviceName: 'RCRM_SEARCH_JMR_ENTRY_SUM',
      input: searchInputs,
    },
  },
];



const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'JMREntryGrid',
    isHelpTable: true,
    columns: [
      {
        title: 'ID',
        dataField: 'ENTRY_ID',
      
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
        
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
        title: 'Site',
        dataField: 'SITE',
        
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
        title: 'Meter Type',
        dataField: 'METER_TYPE',
      },
      {
        title: 'Meter ID',
        dataField: 'METER_ID',
      },
     
      // {
      //   title: 'Generation at Controller (KWH)',
      //   dataField: 'GEN_CONTROL_KWH',
      // },
      {
        title: 'Net Energy (kWh)',
        dataField: 'NET_READING_KWH',
      },
      {
        title: 'Net KVARH',
        dataField: 'NET_READING_KVARH',
      },
     
      {
        title: 'Net kVAh',
        dataField: 'NET_KVAH',
        
      },
      {
        title: 'Net Energy (kWh) (TOD)',
        dataField: 'NET_ENERGY_KWH_TOD',
        
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
      label: 'Manage JMR Entry',
      event: {
        linkTo: '/ManageJMREntry',
        
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_JMR_ENTRY_SUM',
  moduleName: CRM_ENERGY_ACCOUNTING,
  // input: searchInputs,
};

export const JMREntryHelp :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
        <RFSection  controls={searchSection} columns={6} />
        {/* <RFSection controls={tileSection} columns={3} transparent />  */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
    </RetinaFormBuilder>
  );
};
