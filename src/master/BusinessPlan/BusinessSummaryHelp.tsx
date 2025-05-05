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
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
// import { truncate } from 'lodash';

const searchInputs = ['businessplancode', 'description', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'businessplancode',
    label: 'Business Plan Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
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
      moduleName: CRM_TRANSACTION,
      serviceName: 'SEARCH_BUSINESS_PLAN_SUMMARY',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'businesssummarygrid',
    isHelpTable: true,
    filter:true,

    columns: [
      {
        title: 'Business Plan Code',
        dataField: 'BUSINESS_PLAN_CODE',   
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'site Name',
        dataField: 'SITE_NAME',
        hidden:true
      },
      {
        title: 'Status',
        dataField: 'STATUS',
    },
    ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_BUSINESS_PLAN_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
  
};

export const BusinessSummaryHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
