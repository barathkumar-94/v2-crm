import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { UomMasterHelp } from '../UomMaster/UomMasterHelp';
import { PayTermSummary } from './PayTermSummary';
import { PayTermHelp } from './PayTermHelp';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';


const actionInputs = ['paytermcode', 'Description','DueDays','Penaltyper','RebateDays','Rebateper','status','penalty_type','GraceDays','RebateType'];


const onEnterEvent: IRFEventParams = {
  input: ['paytermcode'],
  moduleName: CRM_MASTER,
  serviceName: 'RCRM_ONENTER_PAYTERM_MST',
};

const helpComponents = {
  PayTermHelp: PayTermHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'paytermcode',
    label: 'Pay Term Code',
    required:true,
    event: onEnterEvent,
    maxLength:80,
    help: {
      panelTitle: 'Help On Pay Term Summary',
      componentName: 'PayTermHelp',
      receiveParams: [{parentField: 'paytermcode', childField: 'PAY_TERM_CODE'},
                      {parentField: 'Description', childField: 'DESCRIPTION'},
                      {parentField: 'DueDays', childField: 'DUE_DAYS'},
                      {parentField: 'Penaltyper', childField: 'PENALTY_%'},
                      {parentField: 'RebateDays', childField: 'REBATE_DAYS'},
                      {parentField: 'Rebateper', childField: 'REBATE_%'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
    maxLength:100,
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'DueDays',
    label: 'Due Days',
    required:true,
    inputType: 'integer'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'penalty_type',
    label: 'Penalty Type',
    required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Penaltyper',
    label: 'Penalty ',
    required:true,
    inputType: 'number'
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'GraceDays',
    label: 'Grace Days',
    required:true,
    inputType: 'integer'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'RebateDays',
    label: 'Rebate Days',
    required:true,
    inputType: 'integer'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'RebateType',
    label: 'Rebate Type',
    required:true,
  },

 
  {
    type: ControlType.TEXTBOX,
    name: 'Rebateper',
    label: 'Rebate',
    required:true,
    inputType: 'number'
  },
 

];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_PAYTERM_CREATE_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'RCRM_PAYTERM_ACTIVATE_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'RCRM_PAYTERM_INACTIVATE_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },
  ];
export const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
  },
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
    
  ];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_PAYTERM_MST',
  moduleName: CRM_MASTER,
    input: ['paytermcode']
};

export const ManagePayTerm:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();


  const initialData: IRFData = {
    paytermcode: code

    };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} title={'Pay Term Details'} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
