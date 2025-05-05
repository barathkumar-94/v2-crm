import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFScreenToolbar,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  WithConfiguratorPageContainer,
} from '@retina360-ai/core-ui-library-v2';import { CRM_MASTER } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
; 

const searchInputs = ['workFlowCode','workFlowName','component','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'workFlowCode',
    label: 'Workflow Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'workFlowName',
    label: 'Workflow Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'component',
    label: 'Component'
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
      moduleName:CRM_MASTER,
      serviceName: 'SEARCH_WORKFLOW_SUM',
      input: searchInputs, 
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'workflowSummary',
    isHelpTable: true,
    columns: [
      {
        title: 'Workflow Code',
        dataField: 'WORKFLOW_CODE',
        // cellRendererParams: {
        //   event: {
        //     linkTo: '/manageWorkflow',
        //     linkParams: ['WORKFLOW_CODE'],
        //   },
        // },
      },
     
      
      {
        title: 'Workflow Name',
        dataField: 'WORKFLOW_NAME',
      },
      {
        title: 'Component',
        dataField: 'COMPONENT',
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
    label: 'Manage WorkFlow',
    event: {
      linkTo: '/manageWorkflow',
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_WORKFLOW_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const WorkFlowHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams}>
      <RFSection controls={searchSection} />
   <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
    </RetinaFormBuilder>
  );
};