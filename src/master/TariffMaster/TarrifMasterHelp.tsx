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

const searchInputs = ['tarrifCode', 'tarrifName','state','agencyName','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'tarrifCode',
    label: 'Tarrif Code',
    //required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'tarrifName',
    label: 'Tarrif Name',
    //required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    //required:true
  },

  {
    type: ControlType.COMBOBOX,
    name: 'agencyName',
    label: 'Agency Name',
    //required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
   // masterField: 'status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_TARRIF_MASTER',
      input: searchInputs,
    },
  },
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'tarrifmastergridsummary',
    isHelpTable:true,
    columns: [
      {
        title: 'Tarrif Code',
        dataField: 'TARRIF_CODE',
        
      },
      {
        title: 'Tarrif Name',
        dataField: 'TARRIF_NAME',
        
      },
      {
        title: 'State',
        dataField: 'STATE',
        
      },
      {
        title: 'Agency Name',
        dataField: 'AGENCY_NAME',
        
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },

    ],
  },
];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_TARRIF_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const TarrifMasterHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
