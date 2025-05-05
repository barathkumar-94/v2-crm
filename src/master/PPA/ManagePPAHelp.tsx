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
import { RFCRMToolbar } from '../../common/components/toolbar';
// import { truncate } from 'lodash';

const searchInputs = ['PPA_No', 'DateType','DateFrom','DateTo','PowerProducer','Scheme','Site','status','ppaSummary'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'PPA_No',
    label: 'PPA',
  
  },
  {
    type: ControlType.COMBOBOX,
    name: 'DateType',
    label: 'Date Type',
    masterField :'DateType'
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateFrom',
    label: 'Date From',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateTo',
    label: 'Date To',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'PowerProducer',
    label: 'Power Producer',
    masterField: 'PowerProducer',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Scheme',
    label: 'Scheme',
    masterField: 'Scheme',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Site',
    label: 'Site',
    masterField: 'Site',
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
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_MANAGE_PPA_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ppaSummary',
    isHelpTable:true,
    filter:true,
    columns: [
      {
        title: 'PPA',
        dataField: 'PPA',

      },
      {
        title: 'PPA Date',
        dataField: 'PPA_Date',
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
        format:DATE_FORMAT
        
        }
       
      },
      {
        title: 'Title',
        dataField: 'TITLE',
      },
      {
        title: 'COD Date',
        dataField: 'COD_DATE',
      },
      {
        title: 'Power Producer',
        dataField: 'POWER_PRODUCER',
      },
      {
        title: 'Scheme',
        dataField: 'SCHEME',
      },
      {
        title: 'Site',
        dataField: 'SITE',
      },
      {
        title: 'Customer',
        dataField: 'CUSTOMER',
      },
      {
        title: 'Total Contracted Quantum',
        dataField: 'TOTAL_CONTRACTED_QUANTUM',
      },
      {
        title: 'Amendment #',
        dataField: 'AMENDMENT',
      },
      {
        title: 'PPA Status',
        dataField: 'PPA_STATUS',
      },
      
    ],
  },
];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_MANAGE_PPA_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};

export const ManagePPAHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={false}> 
       <RFSection  controls={searchSection} title={'Search Criteria'} columns={6} /> 
        <RFSection controls={tableSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
