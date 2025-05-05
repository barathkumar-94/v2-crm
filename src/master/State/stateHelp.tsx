import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';

const searchInputs = ['statecode', 'statename', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'statecode',
    label: 'State code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'statename',
    label: 'State Name',
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
      moduleName: 'CRM_Master',
      serviceName: 'SEARCH_STATE_SUM',
      input: searchInputs,
    },
  },
];


const stateSummarytableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'statesummary',
    isHelpTable: true,
  
    columns: [
      {
        title: 'State Code',
        dataField: 'STATE_CODE',
      },
      {
        title: 'State Name',
        dataField: 'STATE_NAME',
      },
      {
        title: 'State',
        dataField: 'STATUS',
      },
    ],
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_STATE_SUM',
  moduleName: 'CRM_Master',
  input: searchInputs,
};

export const stateHelp=()=> {
  return (
    <RetinaFormBuilder onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={stateSummarytableSection} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
