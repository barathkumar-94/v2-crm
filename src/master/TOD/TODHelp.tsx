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
import { CRM_MASTER, HH_MM } from '../../common/constants';

const searchInputs = ['TODCode', 'TODName', 'tod_type','state','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'TODCode',
    label: 'TOD Code',

  },
  {
    type: ControlType.TEXTBOX,
    name: 'TODName',
    label: 'TOD Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField: 'state',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'tod_type',
    label: 'TOD Type',
    masterField: 'tod_type',
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
      serviceName: 'SEARCH_TOD_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'todgrid',
    pageSize:7,
    isHelpTable: true,
    columns: [
      {
        title: 'TOD Code',
        dataField: 'TOD_CODE',
        
      },
      {
        title: 'TOD Name',
        dataField: 'TOD_NAME',
        
      },
      {
        title: 'From Time',
        dataField: 'FROM_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:HH_MM
        }
      },
      {
        title: 'To Time',
        dataField: 'TO_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'State',
        dataField: 'STATE',
      },
      {
        title: 'Tod Type',
        dataField: 'TOD_TYPE',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },
    ],
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_TOD_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const TodHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls ={searchSection} title={'Search Results'} columns={6} />
        <RFSection controls={tableSection} columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
