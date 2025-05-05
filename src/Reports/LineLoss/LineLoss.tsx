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

const PrintInputs = ['generationyear','generationperiod','site'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
    event :{
      serviceName:'RCRM_LINE_LOSS_YEAR_ONCHANGE_REPORT',
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
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_LINE_LOSS_SEARCH_REPORT',
      input: PrintInputs,
    },
  },
  
];

const PrintSection1: IControlDefinition[] = [
  
];

const transmissionLossCalcGrid: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'transmissionLossCalc',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'SL. No.',
        dataField: 'SL_NO',

      },
      {
        title: 'HT SC NO',
        dataField: 'HTSC_NO',
      },
      {
        title: 'Current Reading(kWh)',
        dataField: 'CURRENT_READING',
      },
      {
        title: 'Previous Month Reading(kWh)',
        dataField: 'PREVIOUS_READING',
      },
      {
        title: 'Difference',
        dataField: 'DIFFERENCE',
      },
      {
        title: 'KWH EXPORT(Units Generated)',
        dataField: 'KWH_EXPORT',
      },
],
  }
  
];

const lineMainMeterExportGrid: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'lineMainMeterExport',
      isPrimeReactTable: true, 
      columns: [
        {
            title: 'Type',
            dataField: 'TYPE',
    
          },
        {
          title: 'Date',
          dataField: 'DATE',
  
        },
        {
          title: 'Export MWh',
          dataField: 'EXPORT_MWH',
        },
        {
          title: 'Difference in MWh',
          dataField: 'DIFF_IN_MWH',
        },
        {
          title: 'MF',
          dataField: 'MF',
        },
        {
          title: 'Total Units',
          dataField: 'TOTAL_UNITS',
        },
  ],
    }
    
  ];
  const lineCheckMeterExportGrid: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'lineCheckMeterExport',
      isPrimeReactTable: true, 
      columns: [
        {
            title: 'Type',
            dataField: 'TYPE',
    
          },
        {
          title: 'Date',
          dataField: 'DATE',
  
        },
        {
          title: 'Export MWh',
          dataField: 'EXPORT_MWH',
        },
        {
          title: 'Difference in MWh',
          dataField: 'DIFF_IN_MWH',
        },
        {
          title: 'MF',
          dataField: 'MF',
        },
        {
          title: 'Total Units',
          dataField: 'TOTAL_UNITS',
        },
  ],
    }
    
  ];
  const lineMainMeterImportGrid: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'lineMainMeterImport',
      isPrimeReactTable: true, 
      columns: [
        {
            title: 'Type',
            dataField: 'TYPE',
    
          },
        {
          title: 'Date',
          dataField: 'DATE',
  
        },
        {
          title: 'Import MWh',
          dataField: 'IMPORT_MWH',
        },
        {
          title: 'Difference in MWh',
          dataField: 'DIFF_IN_MWH',
        },
        {
          title: 'MF',
          dataField: 'MF',
        },
        {
          title: 'Total Units',
          dataField: 'TOTAL_UNITS',
        },
  ],
    }
    
  ];
  const lineCheckMeterImportGrid: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'lineCheckMeterImport',
      isPrimeReactTable: true, 
      columns: [
        {
            title: 'Type',
            dataField: 'TYPE',
    
          },
        {
          title: 'Date',
          dataField: 'DATE',
  
        },
        {
          title: 'Import MWh',
          dataField: 'IMPORT_MWH',
        },
        {
          title: 'Difference in MWh',
          dataField: 'DIFF_IN_MWH',
        },
        {
          title: 'MF',
          dataField: 'MF',
        },
        {
          title: 'Total Units',
          dataField: 'TOTAL_UNITS',
        },
  ],
    }
    
  ];

  const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_LINELOSS_INIT_REPORT',
   moduleName: CRM_BILLING,
 };

export const LineLoss :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={transmissionLossCalcGrid} title={'Transmission Line Loss Calculation'} columns={1} className={'table-absolute-toolbar'}/>
        <RFSection controls={lineMainMeterExportGrid}  title={'230 KV Line Main Meter'} columns={1} className={'table-absolute-toolbar'}/>
        <RFSection controls={lineCheckMeterExportGrid} title={'230 KV Line Check Meter'} columns={1} className={'table-absolute-toolbar'}/>
        <RFSection controls={lineMainMeterImportGrid}  title={'230 KV Line Main Meter'} columns={1} className={'table-absolute-toolbar'}/>  
        <RFSection controls={lineCheckMeterImportGrid} title={'230 KV Line Check Meter'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
