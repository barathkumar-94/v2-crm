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

const searchInputs = ['PPA_No', 'DateType','DateFrom','DateTo','PowerProducer','Scheme','Site','status','ppaSummary', 'CUSTOMER'];

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
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_PPA_HELP_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ppaSummary',
    isHelpTable:true,
    pageSize:5,
    filter:true,
    columns: [
      {
        title: 'PPA',
        dataField: 'PPA',

      },
      {
        title: 'PPA Date',
        dataField: 'PPA_Date',
        hidden:true,
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
        format:DATE_FORMAT
        
        }
       
      },
      {
        title: 'Title',
        dataField: 'TITLE',
        hidden:true
      },
      {
        title: 'COD Date',
        dataField: 'COD_DATE',
        cellRendererParams:{
          format:DATE_FORMAT
        }
      },
      {
        title: 'Power Producer',
        dataField: 'POWER_PRODUCER',
        hidden:true
      },
      {
        title: 'Scheme',
        dataField: 'SCHEME',
        hidden:true
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
        hidden:true
      },
      {
        title: 'PPA Status',
        dataField: 'PPA_STATUS',
        hidden:true
      },
      
    ],
  },
];


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_CUSTOMER_ONCHANGE_PPA_INIT',
  moduleName: CRM_MASTER,
  input: ['CUSTOMER'],
};

export const CustomerAccountPPAHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder initialValues={props} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={false}> 
       <RFSection  controls={searchSection} title={'Search Criteria'} columns={6} /> 
        <RFSection controls={tableSection} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
