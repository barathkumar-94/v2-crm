import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const PrintInputs = ['generationyear','generationperiod','site','assetid','assettype','metertype'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_REPORT_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    required:true,
    masterField:'generationperiod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assettype',
    label: 'Asset Type',
    masterField:'assettype',
    required:true,
    event :{
        serviceName:'RCRM_REPORT_ASSET_TYPE_ONCHANGE',
        moduleName :CRM_BILLING,
        input:['assettype','site']
        }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset id',
    masterField:'assetid',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'metertype',
    label: 'Meter Type',
    masterField:'metertype',
    required:true,
  },
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_SEARCH_DGR_SUMMARY_RPT',
      input: PrintInputs,
    },
  },
];

const MonthlyKWHGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'DGRSummaryGrid',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Sr. No.',
        dataField: 'SR_NO',

      },
      {
        title: 'Site Name',
        dataField: 'SITE_NAME',
      },
      {
        title: 'Asset Id',
        dataField: 'ASSET_ID',
      },
      {
        title: 'Installed capacity',
        dataField: 'INSTALLED_CAPACITY',
      },
      {
        title: 'Meter Type',
        dataField: 'METER_TYPE',
      },
      {
        title: 'Meter Id',
        dataField: 'METER_ID',
      },
      {
        title: 'Net Energy (KW)',
        dataField: 'NET_ENERGY',
      },
      {
        title: 'Net Energy (kWh) (TOD)',
        dataField: 'NET_ENERGY_TOD',
      },
  
      {
        groupHeaderName: 'KWh',
        children: [
      {
        groupHeaderName: 'Export Reading',
        children: [
        {
            title: 'Final Read KWH',
            dataField: 'EXP_FINAL_READ_KWH',
            dataType:"number"

        },
        {
            title: 'Initial Read KWH',
            dataField: 'EXP_INITIAL_READ_KWH',
        },
        {
            title: 'Diffrence',
            dataField: 'EXP_DIFFERENCE'
        },
        {
            title: 'MF',
            dataField: 'EXP_MF',
        },
        {
            title: 'KWh',
            dataField: 'EXP_KWH',
         }
      ]
    },
    {
      groupHeaderName: 'Import Reading',
    
      children: [
      {
          title: 'Final Read KWH',
          dataField: 'IMP_FINAL_READ_KWH',
          dataType:"number"
      },
      {
          title: 'Initial Read KWH',
          dataField: 'IMP_INITIAL_READ_KWH',
      },
      {
          title: 'Diffrence',
          dataField: 'IMP_DIFFERENCE'
      },
      {
          title: 'MF',
          dataField: 'IMP_MF',
      },
      {
          title: 'KWh',
          dataField: 'IMP_KWH',
       }
    ]
  },
  {
    title: 'Net Meter [KWh]',
    dataField: 'NET_METER_KWH',
 },
],
  },
  {
    title: 'Remarks',
    dataField: 'REMARKS',
 },
],
  }
  
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_DGR_SUMMARY_RPT',
  moduleName: CRM_BILLING,
};


export const DGRSummary :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={MonthlyKWHGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
