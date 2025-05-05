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

const PrintInputs = ['generationyear','generationperiod','site', 'assetid'];
 
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
      serviceName: 'RCRM_WTG_GENERATION_RPT_SEARCH',
      input: PrintInputs,
    },
  },
];

const WTGGenerationGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGGeneration',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'Sr. No.',
        dataField: 'SR_NO',

      },
      {
        title: 'WTG HTSC No',
        dataField: 'WTG_HTSC_NO',
      },
      {
        title: 'WTG Category',
        dataField: 'WTG_CATEGORY',
      },
      {
        title: 'Month',
        dataField: 'MONTH',
      },
      {
        title: 'Import KWH',
        dataField: 'IMPORT_KWH',
      },
      {
        title: 'Export KWH',
        dataField: 'EXPORT_KWH',
      },
      {
        title: 'Import KVAH',
        dataField: 'IMPORT_KVAH',
      },
      {
        title: 'Export KVAH',
        dataField: 'EXPORT_KVAH',
      },
      {
        title: 'Import Kvarh',
        dataField: 'IMPORT_KVARH',
      },
      {
        title: 'Export Kvarh',
        dataField: 'EXPORT_KVARH',
      },
      {
        title: 'Line Loss KWH',
        dataField: 'LINE_LOSS_KWH',
      },
      {
        title: 'Export after Line Loss KWH',
        dataField: 'EXPORT_AFTER_LINE_LOSS_KWH',
      },
      {
        title: 'Net Reading KWH',
        dataField: 'NET_READING_KWH',
      },
      {
        title: 'KVARH Penalty(Rs)',
        dataField: 'KVARH_PENALTY',
      },
 
],
  }
  
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_WTG_GENERATION_RPT_INIT',
  moduleName: CRM_BILLING,
};


export const WTGGeneration :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={WTGGenerationGridSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
