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
import { CREATE_NOTIFICATION } from '@retina360-ai/core-ui-library-v2';
// import { truncate } from 'lodash';

const searchInputs = ['LOI', 'DateType','DateFrom','DateTo','PowerProducer','Scheme','Site','status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'LOI',
    label: 'LOI/Term Sheet #',
  
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
    label: 'Schema',
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
      serviceName: 'RCRM_LOI_SEARCH_SUM',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'loiSummary',
    isHelpTable: true,
    pageSize:5,
    filter:true,
    columns: [
      {
        title: 'LOI/Term Sheet',
        dataField: 'LOI',
      },
      {
        title: 'LOI/Term Sheet Date',
        dataField: 'LOI_Date',  
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
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
        format:DATE_FORMAT
        
        }
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
        hidden:true,
      },
      {
        title: 'Version #',
        dataField: 'AMENDMENT',
      },
      {
        title: 'LOI/Term Sheet Status',
        dataField: 'LOI_STATUS',
      },

    ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_LOI_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};

export const LOIHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection} title={'Search Criteria'}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
