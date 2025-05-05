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
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['checklistcode', 'description', 'component','transactiontype','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'checklistcode',
    label: 'Checklist code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component',
    masterField: 'component',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'transactiontype',
    label: 'Transaction Type',
    masterField: 'transactiontype',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField: 'status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_CHECKLIST_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const checklisttableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'checklistgrid',
    isHelpTable: true, 
    columns: [
      {
        title: 'Checklist Code',
        dataField: 'CHECKLIST_CODE',
        cellRenderer:TableCellRendererType.TEXT,
       
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',

      },
      {
        title: 'Compontent',
        dataField: 'COMPONENT',
      },
      {
        title: 'Transaction Type',
        dataField: 'TRANSACTION_TYPE',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Checklist',
      event: {
        linkTo: '/ManageChecklist',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CHECKLIST_INIT_SUM',
  moduleName: CRM_MASTER,
 // input: searchInputs,
};

export const ChecklistHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
     <RFSection  controls={searchSection}  columns={6} />
        <RFSection controls={checklisttableSection} title={'Search Results'}  columns={1} className={'table-absolute-toolbar'}/>
    </RetinaFormBuilder>
  );
};
