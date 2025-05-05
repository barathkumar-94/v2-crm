import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
// import { truncate } from 'lodash';

const searchInputs = ['businessplancode','description', 'Site','status'];

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
    name: 'Site',
    label: 'Site',
    masterField: 'Site',
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

const tileSection: IControlDefinition[] = [
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'totalCapacity',
    label: 'Total Capacity',
    icon:'images/icons/sum.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'first-stat-card stat-card-total'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'windCapacity',
    label: 'Wind',
    icon: 'images/icons/wind.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'second-stat-card'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'solarCapacity',
    label: 'Solar',
    icon: 'images/icons/solar.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'third-stat-card'
  }
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'businesssummarygrid',
    isPrimeReactTable: true,
    filter:true,

    columns: [
      {
        title: 'Business Plan Code',
        dataField: 'BUSINESS_PLAN_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/managebusinessplan',
            queryParams:[{sourceField:'BUSINESS_PLAN_CODE', targetField:"code"}]
          },
        },
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'Site Name',
        dataField: 'SITENAME',
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
      label: 'Manage Business Plan',
      event: {
        linkTo: '/ManageBusinessPlan',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_BUSINESS_PLAN_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};

export const BusinessPlanSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
