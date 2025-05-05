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
      serviceName: 'RCRM_LOI_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const tileSection: IControlDefinition[] = [
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'totalLoi',
    label: 'Total LOI/Term Sheet',
    icon:'images/icons/sum.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'first-stat-card stat-card-total'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'loiValue',
    label: 'Total LOI/Term Sheet Value',
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
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'MWsigned',
    label: 'Total MW Signed',
    icon: 'images/icons/contract.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'fourth-stat-card'
  },                                                                                                   
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'pendingMW',
    label: 'Total Pending MW',
    icon: 'images/icons/contract.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'sixth-stat-card'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'avgTariff',
    label: 'Avg Tariff of LOI/TermSheet signed',
    icon: 'images/icons/contract.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'seventh-stat-card'
  }
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'loiSummary',
    isPrimeReactTable: true,
    pageSize:7,
    filter:true,
    columns: [
      {
        title: 'LOI/Term Sheet #',
        dataField: 'LOI',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams: {
        event: {
            linkTo: '/ManageLOI',
            queryParams:[{sourceField:'LOI', targetField:"code"}]
          },
        },
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
      },
      {
        title: 'Version #',
        dataField: 'AMENDMENT',
      },
      {
        title: 'LOI/Term Sheet Status',
        dataField: 'LOI_STATUS',
      },
      {
        title: 'Convert to PPA',
        dataField: 'CONVERT_TO_PPA',
        cellRenderer: TableCellRendererType.DYNAMIC_CONTROL,
        conditionalControls: [
          {
            canRenderControl: (rowData) => rowData. LOI_STATUS=== 'Confirmed' ,
            control: {
              dataField: 'CONVERT_TO_PPA',
              cellRenderer: TableCellRendererType.BUTTON,
              cellRendererParams: {
                iconName: 'PageLink',
                iconTooltipText: 'Click here to go to LOI PPA',
                event: {
                  linkTo: '/ManagePPA',
                  queryParams: [{ sourceField: 'LOI', targetField: "code" }]
                }
              }
            }
          }
        ]
      },

    ],
    // dimension:{
    //   columns:[
    //     {
    //       title:'LOI',
    //       dataField:'LOI_SUMMARY',
    //       suffixText:'Leads',
    //       tileType:'ICON_TEXT',
    //       tileConfig:[
    //         {
    //           value:'Total LOI/Term Sheet',
    //           icon:'images/icons/sum.svg',
    //           color:'#8ED299'
    //         },
    //         {
    //           value:'Total LOI/Term Sheet Value',
    //           icon:'images/icons/inr.svg',
    //           color:'#C69656'
    //         },
          
    //       ]
    //     },
    //   ],
    //   showTotalCount:{
    //     title:'Total LOI',
    //     color:'rgb(246, 128, 89)'
    //   },
    //   },
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage LOI/Term Sheet',
      event: {
        linkTo: '/ManageLOI',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_LOI_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};

export const LOISummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} />  */}
        <RFSection controls={tileSection} columns={3} transparent />
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
