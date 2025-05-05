import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  usePageQueryParam,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { FinancialYearHelp } from './FinanceHelp';
import { DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['FinancialYearCode','finyeargrid', 'Description','Frequency','StartDate','EndDate','status'];

const onEnterEvent: IRFEventParams = {
  input: ['FinancialYearCode'],
  moduleName: 'CRM_Master',
  serviceName: 'RCRM_FIN_PERIOD_ONENTER_MST',
};




const  helpComponents = {
  FinancialYearHelp: FinancialYearHelp
};
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'FinancialYearCode',
    label: 'Financial Year Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Financial Year/Period',
      componentName: 'FinancialYearHelp',
      receiveParams: [{parentField: 'FinancialYearCode', childField: 'FINANCIAL_YEAR_CODE'},
                     ],

                   event:onEnterEvent
    
    }
    },

  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
    required:true,
    maxLength:100
  },
  {
    type: ControlType.DATEPICKER,
    name: 'StartDate',
    label: 'Start Date',
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'EndDate',
    label: 'End Date',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Frequency',
    label: 'Frequency',
    // required:true,
    // masterField:'Frequency',
    // multiSelect:true,
   
    // multiSelectFor: 'save',
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
]
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'finyeargrid',
    isPrimeReactTable: true,
    columns: [

      {
        title: 'Financial Period Code',
        dataField: 'GRD_FINANCIAL_PERIOD_CODE',
      },
      {
        title: 'Description',
        dataField: 'GRD_DISCRIPTION',
      },
      {
        title: 'Start Date',
        dataField: 'GRD_START_DATE',
      },
      {
        title: 'End Date',
        dataField: 'GRD_END_DATE',
      },
      {
        title: 'Frequency',
        dataField: 'GRD_FREQUENCY',
      },
    ],
  },
];
const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'create',
    label: 'Create',
    event: {
      serviceName: 'RCRM_FIN_PERIOD_CREATE_MST',
      moduleName: 'CRM_Master',
      input: [...actionInputs],
    },
},
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'Activate',
        label: 'Activate',
        event: {
          serviceName: 'RCRM_FIN_PERIOD_ACTIVATE_MST',
          moduleName: 'CRM_Master',
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'Inactivate',
        label: 'Inactivate',
        event: {
          serviceName: 'RCRM_FIN_PERIOD_INACTIVATE_MST',
          moduleName: 'CRM_Master',
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
        format:DATE_TIME_FORMAT

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
    format:DATE_TIME_FORMAT

  },
  {
    type: ControlType.LABEL,
    name: 'strModifiedBy',
    isStatic: false,
    prefixText: 'Modified By : ',
  },
  
];
const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_FIN_PERIOD_INIT_MST',
  moduleName: 'CRM_Master',
  input: ['FinancialYearCode']
};

export const ManageFinancialYearPeriod = () => {
  const {code} = usePageQueryParam();
  

  const initialData: IRFData = {
    FinancialYearCode: code,

    };

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection}  title={'General'}  columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={tableSection} title={'Financial Period Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
