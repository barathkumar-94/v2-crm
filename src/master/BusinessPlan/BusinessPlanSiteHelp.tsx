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
import { truncate } from 'lodash';
import { TableToolbarRenderer } from '@retina360-ai/core-ui-library-v2';

const searchInputs = ['sitecode', 'sitename', 'sitecategory', 'siteoverallcapacity',  'stage', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sitecode',
    label: 'Site code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sitename',
    label: 'Site Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'sitecategory',
    label: 'Generation Type',
    masterField: 'sitecategory',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'siteoverallcapacity',
    label: 'Site Overall Capacity',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'stage',
    label: 'Stage',
    masterField: 'stage',
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'status',
//     label: 'Status',
//     masterField: 'status',
//   },

  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: 'CRM_Master',
      serviceName: 'SEARCH_SITE_SUM_BUSINESS_PLAN',
      input: searchInputs,
    },
  },
];

const siteSummarytableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'sitesummary',
    isHelpTable: true,
    columns: [
      {
        title: 'Site Code',
        dataField: 'SITE_CODE',
        cellRenderer:TableCellRendererType.TEXT,           
        },
      
      {
        title: 'Site Name',
        dataField: 'SITE_NAME',
      },
      {
        title: 'Generation Type',
        dataField: 'SITE_CATEGORY',
      },
      {
        title: 'Site Overall Capacity',
        dataField: 'SITE_OVERALL_CAPACITY',
      },
      {
        title: 'UOM',
        dataField: 'UOM',
      },
      {
        title: 'Stage',
        dataField: 'STAGE',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },

    ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_SITE_SUM_BUSINESS_PLAN',
  moduleName: 'CRM_Master',
  input: searchInputs,
};

export const BusinessPlanSiteHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={siteSummarytableSection} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
