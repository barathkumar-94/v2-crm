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
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
// import { truncate } from 'lodash';
 
const searchInputs = ['PPA_No', 'DateType','DateFrom','DateTo','PowerProducer','Scheme','Site','status','ppaSummary'];
 
const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'PPA_No',
    label: 'PPA #',
 
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
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'DateTo'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'DateTo',
    label: 'Date To',
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'DateFrom'
    }
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
      serviceName: 'RCRM_PPA_SEARCH_SUM',
      input: searchInputs,
    },
  },
];
 
const tileSection: IControlDefinition[] = [
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'totalPpa',
    label: 'Total PPA',
    icon:'images/icons/sum.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'first-stat-card stat-card-total'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'ppaValue',
    label: 'Total PPA Value',
    icon: 'images/icons/inr.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'second-stat-card'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'contractedQuantum',
    label: 'Total Contracted Quantum',
    icon: 'images/icons/contract.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'third-stat-card'
  }
];
 
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ppaSummary',
    isPrimeReactTable: true,
    filter:true,
    columns: [
      {
        title: 'PPA #',
        dataField: 'PPA',
        cellRenderer:TableCellRendererType.DYNAMIC_CONTROL,
        conditionalControls:[
          {
            canRenderControl:(rowData)=>rowData.LOI=='Y',
            control:{
              dataField:'PPA',
                cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams: {
                event: {
                  linkTo: '/ManagePPAAmendment',
                  queryParams:[{sourceField:'PPA', targetField:"CODE"}
                  ]
                },
              },
            }
          },
          {
            canRenderControl:(rowData)=>rowData.LOI=='N',
            control:{
              dataField:'PPA',
                cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams: {
                event: {
                  linkTo: '/DirectPPAAmmendment',
                  queryParams:[{sourceField:'PPA', targetField:"code"}]
                },
              },
            }
          }
        ]
      },
      {
        title: 'PPA Date',
        dataField: 'PPA_Date',
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
        title: 'PPA Value',
        dataField: 'PPA_VALUE',
      },
      {
        title: 'COD Date',
        dataField: 'COD_DATE',
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
      },
      {
        title: 'Amendment',
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
   serviceName: 'RCRM_PPAAMMEND_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};
 
export const PPAAmendment:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'}columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
 
