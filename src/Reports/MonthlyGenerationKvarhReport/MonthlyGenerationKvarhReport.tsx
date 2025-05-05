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

const PrintInputs = ['generationyear','generationperiod','site','assetid'];
 
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
    masterField:'generationperiod'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    event :{
      serviceName:'RCRM_REPORT_SITE_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['site']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset Id',
    masterField:'assetid'
  },
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_MONTHLY_GENERATION_KVARH_RPT',
      input: PrintInputs,
    },
  },
];

const MonthlyKVARHGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'MonthlyKVARHGrid',
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
        title: 'W/F Owner',
        dataField: 'WF_OWNER',
      },
      {
        title: 'Installed capacity',
        dataField: 'INSTALLED_CAPACITY',
      },
      {
        title: 'Elect Gen as per WTG/SOLAR  Controller',
        dataField: 'GEN_CONTROLLER',
      },
         
      {
        groupHeaderName: 'KVARH',
        children: [
          {
            title: 'GEN as per indv meter at WF end',
            dataField: 'GEN_INDV_METER_WF_END',
            dataType:"number"

         },
        {
          title: 'Kvarh As Per Indv Meter At Wf End',
          dataField: 'KVARH_WF_END',
       },
      {
        groupHeaderName: 'Export Reading',
        children: [
        {
            title: 'Final Reading Kvarh (Imp Lag)',
            dataField: 'EXP_FINAL_READ_KVARH',
            dataType:"number"
        },
        {
            title: 'Intial Reading Kvarh (Imp Lag)',
            dataField: 'EXP_INITIAL_READ_KVARH',
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
            title: 'KVARH',
            dataField: 'EXP_KVARH',
         }
      ]
    },
    {
      groupHeaderName: 'Import Reading',
      children: [
      {
          title: 'Final Reading Kvarh (Imp Lead)',
          dataField: 'IMP_FINAL_READ_KVARH',
          dataType:"number"
      },
      {
          title: 'Initial Reading Kvarh (Imp Lead)',
          dataField: 'IMP_INITIAL_READ_KVARH',
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
          title: 'KWH',
          dataField: 'IMP_KVARH',
       }
    ]
  },
  {
    title: 'Net At Indi. Meter [KVARH]',
    dataField: 'NET_METER_KVARH',
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
   serviceName: 'RCRM_INIT_MONTHLY_GENERATION_KVARH_RPT',
  moduleName: CRM_BILLING,
};


export const MonthlyGenerationKvarhReport :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={MonthlyKVARHGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
