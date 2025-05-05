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
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['TCDCode','Description','Type','state','status','group'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'TCDCode',
    label: 'TCD Code'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Type',
    label: 'TCD Type'
  },  
  {
    type: ControlType.COMBOBOX,
    name: 'group',
    label: 'TCD Group'
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
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_TCD_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'TcdSummarygrid',
    isHelpTable: true,
    columns: [
      {
        title: 'TCD Code',
        dataField:'TCD_CODE',
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',

    },
      {
        title: 'TCD Type',
        dataField: 'TYPE',
        
      },
      {
        title: 'TCD Group',
        dataField: 'GROUP',
        
      },
      {
        title: 'State',
        dataField: 'STATE',
        
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
    ],
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_TCD_INIT_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const TcdMasterHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
