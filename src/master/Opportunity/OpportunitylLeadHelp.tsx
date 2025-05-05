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
import { CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT } from '../../common/constants';
// import { truncate } from 'lodash';

const searchInputs = ['opportunitycode', 'description','industry','opportunitysource','opportunityrating', 'opportunitystage', 'opportunitystatus','sitename','Site'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'opportunitycode',
    label: 'Opportunity Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField: 'industry',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitysource',
    label: 'Opportunity Source',
    masterField: 'opportunitysource',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunityrating',
    label: 'Opportunity Rating',
    masterField: 'opportunityrating',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitystage',
    label: 'Opportunity Stage',
    masterField: 'opportunitystage',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitystatus',
    label: 'Opportunity Status',
    masterField: 'opportunitystatus',
  },
  {
    type: ControlType.HIDDEN,
    name: 'sitename',
    label: 'Site Name',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_OPPORTUNITY_LEAD_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'opportunitySummary',
    isHelpTable: true,
    pageSize:5,
    columns: [
      {
        title: 'Opportunity Code',
        dataField: 'OPPORTUNITY_CODE',
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
        title: 'Opportunity Source',
        dataField: 'OPPORTUNITY_SOURCE',
      },
      {
        title:'Opportunity Rating',
        dataField: 'OPPORTUNITY_RATING',
      },
      {
        title: 'Opportunity Stage',
        dataField: 'OPPORTUNITY_STAGE',
      },
      {
        title: 'Probable Close Date',
        dataField: 'PROBABLE_CLOSE_DATE',
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        }
      },
      {
        title: 'Probability',
        dataField: 'PROBABILITY',
      },
      {
        title: 'Opportunity Owner',
        dataField: 'OPPORTUNITY_OWNER',
      },  
      {
        title: 'Opportunity Status',
        dataField: 'OPPORTUNITY_STATUS',
      },
      {
        title: 'Business Plan Code',
        dataField: 'BP_CODE',
        hidden:true,
      },
      {
        title: 'Description',
        dataField: 'BP_DESCRIPTION',
        hidden:true,
      },
      {
        title: 'Site Name',
        dataField: 'SITE_NAME',
        hidden:true
      }
      

    ],
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_OPPORTUNITY_LEAD_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs
};
export const opportunityLeadHelp:React.FC<{Site:string}> = (props) => {
  //console.log('props', props);

  return (
    <RetinaFormBuilder  initialValues={props} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
