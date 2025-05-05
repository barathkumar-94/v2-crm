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
import { stateHelp } from './stateHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['statecode', 'statename','stateid', 'status','districtdetails'];

const onEnterEvent: IRFEventParams = {
  input: ['statecode'],
  moduleName: 'CRM_Master',
  serviceName: 'ONENTER_STATE_MST',
};

const helpComponents = {
  stateHelp: stateHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'statecode',
    label: 'State Code',
    required: true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On State',
      componentName: 'stateHelp',
      receiveParams: [{parentField: 'statecode', childField: 'STATE_CODE'},
                      {parentField: 'statename', childField: 'STATE_NAME'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'statename',
    label: 'State Name',
    required: true,
    maxLength:100
  },

  {
    type: ControlType.TEXTBOX,
    name: 'stateid',
    label: 'State ID',
    maxLength:100,
    inputType:"number",
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
];

const districtDetailstableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'districtdetails',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
        resetFieldsOnRowDuplicate:['HDN_DISTRICT_CODE']
    },
      columns: [
        {
          title: 'District Code',
          dataField: 'HDN_DISTRICT_CODE',
          hidden:true,
        },

        {
          title: 'District Code',
          dataField: 'DISTRICT_CODE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:80
          }
        },

        {
            title: 'District Name',
            dataField: 'DISTRICT_NAME',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:100
            }
          },
          {
            title: 'Active',
            dataField: 'ACTIVE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'ACTIVE',
            }
          },
        ] 

    }    
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'CREATE_STATE_MST',
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
      serviceName: 'ACTIVATE_STATE_MST',
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
      serviceName: 'INACTIVATE_STATE_MST',
      moduleName: 'CRM_Master',
      input: [...actionInputs],
    },
  },
   
  ];
export const DataSection: IControlDefinition[] = [
    
   
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
    },
    
  ];
  const onLoadEventParams: IRFEventParams = {
    serviceName: 'INIT_STATE_MST',
    moduleName: 'CRM_Master',
    input: ['statecode']
 };
 

export const ManageState:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();
  

    const initialData: IRFData = {
      statecode: code,

      };

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} 
    scrollKey={props.scrollKey} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/> 
      <ScrollabeContainer hasHeader={true}>
      <RFSection  controls={searchSection} columns={6} title={'State Details'} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={districtDetailstableSection}  title={'District Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
