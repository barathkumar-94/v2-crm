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
import styled from 'styled-components';
import { CRM_MASTER } from '../../common/constants';

const searchInputs = ['AgencyCode','AgencyName','AgencyType','state','district', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'AgencyCode',
    label: 'Agency Code',
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'AgencyName',
    label: 'Agency Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'AgencyType',
    label: 'Agency Type',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
   
    masterField:'state',
    event :{
      serviceName:'ONCHANGE_STATE_SUM',
      moduleName :'CRM_Master',
      input:['state']
      },
  },
  {
    type: ControlType.COMBOBOX,
    name: 'district',
    label: 'District',
   // required:true,
  },

  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField:'status'
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    className:'widget-title',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_AGENCY_MASTER',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'agencymastersummary',
    isHelpTable: true,
    columns: [
      {
        title: 'Agency Code',
        dataField: 'AgencyCode',
        cellRenderer:TableCellRendererType.TEXT,
      
      },
      {
        title: 'Agency Name ',
        dataField: 'AgencyName',
        
      },
      {
        title: 'Agency Type',
        dataField: 'AgencyType',
      },
      {
        title: 'State',
        dataField: 'state',
      },
      {
        title: 'District',
        dataField: 'district',
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
    //   iconName:'Circleplus',
      label: 'Manage Agency',
      event: {
        linkTo: '/ManageAgency',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_AGENCY_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const AgencyMasterHelp:React.FC<IPageBaseProps> = (props) => {
  return (
  //  <StyleContainer>
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
     
    </RetinaFormBuilder>
  // </StyleContainer>
  );
};

