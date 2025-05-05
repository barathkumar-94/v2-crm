import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  IRFData,
  usePageQueryParam,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { DataSection } from '../../master/Rolemaster/managerole';

const searchInputs = ['generationyear','generationperiod','site'];
const searchSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear', 
    event :{
      serviceName:'RCRM_REPORT_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      },
      required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    masterField:'generationperiod',
    required:true,
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
        },
    required:true,
  },
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'print',
    label: 'Print',
    event: {
      serviceName: 'RCRM_PRINT_HTSC_REPORT',
      moduleName: CRM_BILLING,
      input: [...searchInputs],
      downloadFile:{
        jasperReportTemplate: 'HTSCWiseDemandPlan',
        fileName:'HTSCWiseDemandPlan.pdf',
        input : ['guid']
      }
    },
  },

];

const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'print',
    label: 'Print',
    event: {
      serviceName: 'RCRM_PRINT_HTSC_REPORT',
      moduleName: CRM_BILLING,
      input: [...searchInputs],
    },
  },

];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_HTSC_REPORT',
  moduleName: CRM_BILLING,
  input: ['id']
};

export const HTSCWiseDemandPlan: React.FC<IPageBaseProps> = (props) => {
  const { id } = usePageQueryParam();


  const initialData: IRFData = {
    id: id
  };
  return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'}>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={searchSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
             </ScrollabeContainer>
      {/* <RFFooter buttons={actionBarButtons} metaData={DataSection} /> */}
    </RetinaFormBuilder>
  );
};
