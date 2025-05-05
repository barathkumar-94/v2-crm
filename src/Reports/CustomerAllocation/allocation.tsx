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

const PrintInputs = ['generationyear','generationperiod'];
 
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
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_ALLOCATION_SEARCH',
      input: PrintInputs,
    },
  },
  
];

const allocationOfUnits: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'allocation',
    isPrimeReactTable: true, 
    columns: [
      {
        title: 'S. No.',
        dataField: 'SL_NO',

      },
      {
        title: 'Cust Id',
        dataField: 'CUST_ID',
      },
      {
        title: 'HTSC No',
        dataField: 'HTSC_NO',
      },
      {
        title: 'EDC',
        dataField: 'EDC',
      },
      {
        title: 'Peak Hr 1 Unit',
        dataField: 'PEAK_HR_1_UNIT',
      },
      {
        title: 'Peak Hr 2 Unit',
        dataField: 'PEAK_HR_2_UNIT',
      },
      {
        title: 'Peak Hr 3 Unit',
        dataField: 'PEAK_HR_3_UNIT',
      },
      {
        title: 'Other Peak Hr Unit',
        dataField: 'OTHER_PEAK_HR_UNIT',
      },
      {
        title: 'Night Hr Unit',
        dataField: 'NIGHT_HR_UNIT',
      },
      {
        title: 'Total',
        dataField: 'TOTAL',
      },
      

],
  }
  
];



  const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_ALLOCATION_INIT_REPORT',
   moduleName: CRM_BILLING,
 };

export const Allocation :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={allocationOfUnits} title={'Transmission Line Loss Calculation'} columns={1} className={'table-absolute-toolbar'}/>
              </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
