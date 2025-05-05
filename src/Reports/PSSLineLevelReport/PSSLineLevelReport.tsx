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

const PrintInputs = ['generationyear','generationperiod','site'];
 
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
    masterField:'site'
  },
 
  {
    type: ControlType.BUTTON,
    name: 'printBtn',
    label: 'Print',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_PRINT_LINE_LEVEL_RPT',
      input: PrintInputs,
      downloadFile:{
        jasperReportTemplate:'PSSLineLevelRpt',
        fileName :'PSSLineLevel.pdf',
        input :['guid']
      }
    },
  },
];




const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_PSS_LINE_LEVEL_RPT',
  moduleName: CRM_BILLING,
};


export const PSSLineLevelReport:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
