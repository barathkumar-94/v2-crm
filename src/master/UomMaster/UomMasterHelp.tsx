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

const searchInputs = ['unitCode', 'description', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'unitCode',
    label: 'Unit Code',
    // required:true,
    // column:20,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
   // required:true
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
      serviceName: 'SEARCH_UOM_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'uommastergridsummary',
    //isPrimeReactTable: true,
    isHelpTable:true,
    columns: [
      {
        title: 'Unit Code',
        dataField: 'UNIT_CODE',
        cellRenderer:TableCellRendererType.TEXT,
        // cellRendererParams: {
        //   event: {
        //     linkTo: '/ManageUom',
        //     queryParams:[{sourceField:'UNIT_CODE', targetField:"code"}

        //     ],
        //   },
        // },
        
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },

    ],
  },
];

// const toolbarControls: IControlDefinition[] = [
//     {
//       type: ControlType.BUTTON,
//       name: 'managebtn',
//       isPrimary: true,
//     //   iconName:'Circleplus',
//       label: 'Manage UOM',
//       event: {
//         linkTo: '/ManageUom',
//       },
//     },
//   ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_UOM_SUM',
  moduleName: 'CRM_Master',
  input: searchInputs,
};

export const UomMasterHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFSection  controls ={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Results'}columns={1} />
      
    </RetinaFormBuilder>
  );
};
