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

const searchInputs = ['ChannelPartnerCode','ChannelPartnerName','ChannelPartnerType','state','district', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'ChannelPartnerCode',
    label: 'Channel Partner Code',
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'ChannelPartnerName',
    label: 'Channel Partner Name',
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'ChannelPartnerType',
//     label: 'Channel Partner Type',
//   },
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
      serviceName: 'SEARCH_CHANNELPARTNER_MASTER',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'channelpartnermastersummary',
    isHelpTable: true,
    columns: [
      {
        title: 'Channel Partner Code',
        dataField: 'ChannelPartnerCode',
        cellRenderer:TableCellRendererType.TEXT,
      
      },
      {
        title: 'Channel Partner Name ',
        dataField: 'ChannelPartnerName',
        
      },
    //   {
    //     title: 'Channel Partner Type',
    //     dataField: 'ChannelPartnerType',
    //   },
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
      label: 'Manage Channel Partner',
      event: {
        linkTo: '/ManageChannelPartner',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_CHANNELPARTNER_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const ChannelPartnerHelp:React.FC<IPageBaseProps> = (props) => {
  return (
  //  <StyleContainer>
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
     
    </RetinaFormBuilder>
  // </StyleContainer>
  );
};

