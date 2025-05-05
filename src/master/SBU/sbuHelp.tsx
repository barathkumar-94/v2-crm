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

const searchInputs = ['sbucode', 'sbuname', 'state', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sbucode',
    label: 'SBU code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sbuname',
    label: 'SBU Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField: 'state',
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
      serviceName: 'SEARCH_SBU_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'sbusummary',
    isHelpTable:true,
    columns: [
      {
        title: 'SBU Code',
        dataField: 'SBU_CODE',
      },
      {
        title: 'SBU Name',
        dataField: 'SBU_NAME'
      },
      {
        title: 'Registered Company Name',
        dataField: 'REGISTERED_COMPANY_NAME',
      },
      {
        title: 'CIN',
        dataField: 'CIN',
      },
      {
        title: 'PAN',
        dataField: 'PAN',
      },
      {
        title: 'GST',
        dataField: 'GST',
      },
      {
        title: 'HSN Code',
        dataField: 'HSN_CODE',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
      /*
      {
        title: 'State',
        dataField: 'STATE',
      },
      {
        title: 'District',
        dataField: 'DISTRICT',
      },
      {
        title: 'Scheme Name',
        dataField: 'SCHEME_NAME',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
      */


    ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_SBU_SUMMARY',
  moduleName: 'CRM_Master',
 
};

export const sbuHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} title={'Search Criteria'} columns={6} />
        <RFSection controls={tableSection}  columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
