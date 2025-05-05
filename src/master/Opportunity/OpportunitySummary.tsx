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


const searchInputs = ['opportunitycode', 'description','industry','opportunitysource','opportunityrating', 'opportunitystage', 'opportunitystatus'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'opportunitycode',
    label: 'Opportunity Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField: 'industry',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitysource',
    label: 'Opportunity Source',
    masterField: 'opportunitysource',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunityrating',
    label: 'Opportunity Rating',
    masterField: 'opportunityrating',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitystage',
    label: 'Opportunity Stage',
    masterField: 'opportunitystage',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'opportunitystatus',
    label: 'Opportunity Status',
    masterField: 'opportunitystatus',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_OPPORTUNITY_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const tileSection: IControlDefinition[] = [
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'totalOpportunity',
    label: 'Total Opportunity',
    icon:'images/icons/sum.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'first-stat-card stat-card-total'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'opportunityValue',
    label: 'Opportunity Value',
    icon: 'images/icons/inr.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'second-stat-card'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'probability',
    label: 'Probability',
    icon: 'images/icons/statistics.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'third-stat-card'
  }
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'opportunitySummary',
    isPrimeReactTable: true,
    pageSize: 7,
    columns: [
      {
        title: 'Opportunity Code',
        dataField: 'OPPORTUNITY_CODE',
        cellRenderer:TableCellRendererType.DYNAMIC_CONTROL,
        conditionalControls:[
          {
            canRenderControl:(rowData)=>rowData.LEAD=='Y',
            control:{
              dataField:'OPPORTUNITY_CODE',
                cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams: {
                event: {
                  linkTo: '/ManageLeadOpportunity',
                  queryParams:[{sourceField:'OPPORTUNITY_CODE',targetField:"CODE"}]
                },
              },
            }
          },
          {
            canRenderControl:(rowData)=>rowData.LEAD=='N',
            control:{
              dataField:'OPPORTUNITY_CODE',
                cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams: {
                event: {
                  linkTo: '/ManageOpportunity',
                  queryParams:[{sourceField:'OPPORTUNITY_CODE', targetField:"code"}]
                },
              },
            }
          }
        ]
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
      },
      {
        title: 'Industry',
        dataField: 'INDUSTRY',
      },
      {
        title: 'Opportunity Source',
        dataField: 'OPPORTUNITY_SOURCE',
      },
      {
        title:'Opportunity Rating',
        dataField: 'OPPORTUNITY_RATING',
      },
      {
        title: 'Opportunity Stage',
        dataField: 'OPPORTUNITY_STAGE',
      },
      {
        title: 'Probable Close Date',
        dataField: 'PROBABLE_CLOSE_DATE',
        dataType:'dateTime',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:DATE_FORMAT
        }
      },
      {
        title: 'Probability',
        dataField: 'PROBABILITY',
      },
      {
        title: 'Opportunity Owner',
        dataField: 'OPPORTUNITY_OWNER',
      },  
      {
        title: 'Opportunity Status',
        dataField: 'OPPORTUNITY_STATUS',
      },
      {
        title:'Lead',
        dataField:'LEAD',
        hidden: true,
      },
      {
        title:'Created From',
        dataField:'CREATED_FROM'
      }
    ],
    dimension:{
      columns:[
        {
          title: 'Opportunity Source',
          dataField: 'OPPORTUNITY_SOURCE',
          suffixText:'Source'
        },
        {
          title:'Opportunity Rating',
          dataField: 'OPPORTUNITY_RATING',
        },
        {
          title: 'Opportunity Stage',
          dataField: 'OPPORTUNITY_STAGE',
        },
        {
          title: 'Industry',
          dataField: 'INDUSTRY',
          suffixText:'Industry'
        },
      ],
      showTotalCount:{
        title:'Total Opportunity',
        color:'rgb(246, 128, 89)'
      },
      renderListAs:'RADIO_BUTTON'
    }
  },
];

// const toolbarControls: IControlDefinition[] = [
//     {
//       type: ControlType.BUTTON,
//       name: 'managebtn',
//       isPrimary: true,
//       label: 'Manage Opportunity',
//       event: {
//         linkTo: '/ManageOpportunity',
//       },
//     },
//   ];
// toolbarControls={toolbarControls} 
const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_OPPORTUNITY_INIT_SUM',
  moduleName: CRM_TRANSACTION,
  input: searchInputs,
};

export const OpportunitySummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        {/* <RFSection controls={tileSection} columns={3} transparent /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
