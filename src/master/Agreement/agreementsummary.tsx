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
import { CRM_TRANSACTION, DATE_FORMAT} from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
// import { truncate } from 'lodash';
 
const searchInputs = ['agreement','dateType','dateFrom','dateTo','title','agreementType','ppa_no'];
 
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'agreement',
    label: 'Agreement #',
 
  },
  {
    type: ControlType.COMBOBOX,
    name: 'dateType',
    label: 'Date Type',
    masterField:'dateType'
  },
  {
    type: ControlType.DATEPICKER,
    name: 'dateFrom',
    label: 'Date From',
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'dateTo'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'dateTo',
    label: 'Date To',
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'dateFrom'
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'title',
    label: 'Title',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'agreementType',
    label: 'Agreement Type',
    masterField:'agreementType'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'ppa_no',
    label: 'PPA #',
  },
 
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_SEARCH_AGREEMENT_SUM',
      input: searchInputs,
    },
  },
];
 
1
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'agreementSummary',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'Agreement #',
        dataField: 'AGREEMENT',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
          event: {
            linkTo: '/ManageAgreement',
            queryParams:[{sourceField:'AGREEMENT', targetField:"code"}
            ],
           
          },
        },
      },
      {
        title: 'Agreement Date',
        dataField: 'AGREEMENT_DATE',
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
        title: 'Agreement Type',
        dataField: 'AGREEMENT_TYPE',
      },
      {
        title: 'Effective Start Date',
        dataField: 'EFFECTIVE_START_DATE',
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
        format:DATE_FORMAT
       
        }
      },
      {
        title: 'Effective End Date',
        dataField: 'EFFECTIVE_END_DATE',
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
        format:DATE_FORMAT
       
        }
      },
      {
        title: 'PPA #',
        dataField: 'PPA_NO',
     
      },

      {
        title: 'Amendment #',
        dataField: 'AMENDMENT_NO',
     
      },
    ],
  },
];
 
const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Agreement',
      event: {
        linkTo: '/ManageAgreement',
      },
    },
  ];
 
const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_AGREEMENT_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};
 
export const AgreementSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tableSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};