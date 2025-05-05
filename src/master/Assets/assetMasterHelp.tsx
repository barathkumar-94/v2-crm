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

const searchInputs = ['assetID','DateTo','assetName','DateType','assetType','DateFrom','model', 'manufacturer','site','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'assetID',  
    label: 'Asset ID',
  },
  
  {
    type: ControlType.TEXTBOX,
    name: 'assetName',
    label: 'Asset Name',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetType',
    label: 'Asset Type',
    masterField:'assetType'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'model',
    label: 'Model',
  },

  {
    type: ControlType.COMBOBOX,
    name: 'manufacturer',
    label: 'Manufacturer',
    masterField:'manufacturer'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField:'status'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site'
  },

  {
    type: ControlType.COMBOBOX,
    name: 'DateType',
    label: 'Date Type',
    masterField :'DateType',
    hidden : true
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateFrom',
    label: 'Date From',
    hidden : true,
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'DateTo'
     

    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateTo',
    label: 'Date To',
    hidden : true,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateFrom'
     
    }
  },

  
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    className:'widget-title',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: 'CRM_Master',
      serviceName: 'RCRM_ASSET_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'assetsummary',
    isHelpTable: true,
    pageSize:5,
    columns: [
      {
        title: 'Asset ID',
        dataField: 'ASSET_ID',
       
      },
      {
        title: 'Asset Name ',
        dataField: 'ASSET_NAME',
        
      },
      {
        title: 'Asset Type',
        dataField: 'ASSET_TYPE',
      },
      {
        title: 'Model',
        dataField: 'MODEL',
      },
      {
        title: 'Manufacturer',
        dataField: 'MANUFACTURER',
      },
      {
        title: 'Capacity',
        dataField: 'CAPACITY',
      },
      {
        title: 'UOM',
        dataField: 'UOM',
      },
      {
        title: 'Site',
        dataField: 'SITE',
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
      label: 'Manage Asset',
      event: {
        linkTo: '/ManageAsset',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_ASSET_INIT_SUM',
  moduleName: 'CRM_Master',
  input: searchInputs,
};

export const AssetMasterHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
       <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
    </RetinaFormBuilder>
 
  );
};

