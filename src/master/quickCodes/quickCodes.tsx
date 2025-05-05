import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['component', 'category','GRD_CODE','GRD_DESCRIPTION','GRD_ACTIVE'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component',
    masterField:'component',
    required:true,
    event:{
      serviceName:'ONCHANGE_COMPONENT',
      moduleName:'CRM_Master',
      input:['component']
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'category',
    label: 'Category',
    masterField:'category',
    required:true,
    event:{
      serviceName:'ONCHANGE_CATEGORY',
      moduleName:'CRM_Master',
      input:['component','category']
    }
  },
  
]
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'quickCodessummary',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
      hideDelete:true,
      resetFieldsOnRowDuplicate:['HDN_GRD_CODE']
  },
    columns: [
      {
        title: 'Code',
        dataField: 'HDN_GRD_CODE',
        hidden:true
      },
      {
        title: 'Code',
        dataField: 'GRD_CODE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          maxLength:80
        }
        // cellRendererParams: {
          // event: {
          //   linkTo: '/assetType',
          //   linkParams: ['GRD_ASSET_TYPE_ID', 'GRD_ASSET_TYPE_CODE'],
          // }
        // },
      },
      {
        title: 'Description',
        dataField: 'GRD_DESCRIPTION',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          maxLength:100
        }
      },
      {
        title: 'Active',
        dataField: 'GRD_ACTIVE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams:{
          required:true,
          masterField:'GRD_ACTIVE'
        }
      },
    ],
  },
];
const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'save',
    label: 'Save',
    event: {
      serviceName: 'SAVE_QUICKCODES_MST',
      moduleName: 'CRM_Master',
      input: ['quickCodessummary','component','category'],
    },
  },
];
const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_QUICKCODE_MST',
  moduleName: 'CRM_Master',
  // input: actionInputs,
};

export const QuickCodes = () => {
  return (
    <RetinaFormBuilder onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn'} prompt>
      <RFCRMToolbar/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Values'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons}/>
    </RetinaFormBuilder>
  );
};
