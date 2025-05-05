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
import { CRM_BILLING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const PrintInputs = ['generationyear','generationperiod','site', 'assetid', 'meterid'];
 
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
    masterField:'generationperiod',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    required:true,
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
    masterField:'assetid',
    required:true,
    event :{
      serviceName:'RCRM_REPORT_ASSET_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['assetid']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'meterid',
    label: 'Meter Id',
    masterField:'meterid',
    required:true,
  },
  {
    type: ControlType.BUTTON,
    name: 'printBtn',
    label: 'Print',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_PRINT_DGR_MIN_BLOCK_RPT',
      input: PrintInputs,
      downloadFile:{
        jasperReportTemplate:'DGR15Block',
        fileName :'DGR15minBlock.pdf',
        input :['guid']
      }
    },
  },
];




const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_DGR_MIN_BLOCK_RPT',
  moduleName: CRM_BILLING,
};


export const DGR15minBlock :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
