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
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { TodHelp } from './TODHelp';
import { DatePickerMode } from '@retina360-ai/core-ui-library-v2';
import { DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';


const actionInputs = ['TODCode','TODName','FromTime','ToTime','status','tod_type','state','Seq_no','todGrid'];

const onEnterEvent: IRFEventParams = {
  input: ['TODCode'],
  moduleName: 'CRM_Master',
  serviceName: 'ONENTER_TOD_MST',
};

const helpComponents = {
    TodHelp:TodHelp,
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'TODCode',
    label: 'TOD Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Tod Master',
      componentName: 'TodHelp',
      receiveParams: [{parentField: 'TODCode', childField: 'TOD_CODE'},
                      {parentField: 'TODName', childField: 'TOD_NAME'},
                      {parentField: 'FromTime', childField: 'FROM_TIME'},
                      {parentField: 'ToTime', childField: 'TO_TIME'},
                      {parentField: 'state', childField: 'STATE'},
                      {parentField: 'tod_type', childField: 'TOD_TYPE'},
                      {parentField: 'status', childField: 'STATUS'},
                    ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'TODName',
    label: 'TOD Name',
    required:true,
    maxLength:100
  },
  {
    type: ControlType.TIMEPICKER,
    name: 'FromTime',
    label: 'From Time',
    required:true,
  },
  {
    type: ControlType.TIMEPICKER,
    name: 'ToTime',
    label: 'To Time',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField: 'state',
    required:true,

  },
 
  {
    type: ControlType.COMBOBOX,
    name: 'tod_type',
    label: 'TOD Type',
    masterField: 'tod_type',
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Seq_no',
    label: 'Seq No',
    hidden:true
  },
];

const todGrid: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todGrid',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
    },
    columns: [
     
        {
          title: 'From Time',
          dataField: 'FROM_TIME', 
          cellEditor: TableCellEditorType.TIME_PICKER,
     
        },
      {
        title: 'To Time',
        dataField: 'TO_TIME',
        cellEditor: TableCellEditorType.TIME_PICKER,

      },
  ],
},
]

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'CREATE_TOD_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },

    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'ACTIVATE_TOD_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_TOD_MST',
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
  serviceName: 'INIT_TOD_MST',
  moduleName: 'CRM_Master',
    input: ['TODCode']
};

export const ManageTod:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
        TODCode: code
      };

  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} title={'TOD Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        {/* <RFSection  controls={todGrid} title={'Time Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/> */}
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
