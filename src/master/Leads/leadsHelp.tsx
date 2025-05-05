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
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
// import { truncate } from 'lodash';

const searchInputs = ['leadcode', 'leaddescription','industry','leadstatus','leadsource','leadrating'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'leadcode',
    label: 'Lead Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'leaddescription',
    label: 'Lead Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField: 'industry',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadsource',
    label: 'Lead Source',
    masterField: 'leadsource',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadrating',
    label: 'Lead Rating',
    masterField: 'leadrating',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadstatus',
    label: 'Lead Status',
    masterField: 'leadstatus',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_LEADS_SEARCH_SUM',
      input: searchInputs,
    },
  },
];
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'LeadSummary',
    isHelpTable: true, 
    pageSize:5,
    columns: [
      {
        title: 'Lead Code',
        dataField: 'LEAD_CODE',
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'Industry',
        dataField: 'INDUSTRY',
      },
      {
        title: 'Lead Source',
        dataField: 'LEAD_SOURCE',
      },
      {
        title: 'Lead Rating',
        dataField: 'LEAD_RATING',
      },
      {
        title: 'Lead Status',
        dataField: 'LEAD_STATUS',
      },
      {
        title: '',
        dataField: 'OPPORTUNITY',
      },

    ],
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_LEAD_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  // input: searchInputs,
};

export const leadsHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
