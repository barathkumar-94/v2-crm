import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
// import { truncate } from 'lodash';

const searchInputs = ['leadcode', 'leaddescription','industry','Site','leadstatus','leadsource','leadrating'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'leadcode',
    label: 'Lead Code',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'leaddescription',
    label: 'Lead Description',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField: 'industry',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Site',
    label: 'Site',
    masterField: 'Site',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadsource',
    label: 'Lead Source',
    masterField: 'leadsource',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadrating',
    label: 'Lead Rating',
    masterField: 'leadrating',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'leadstatus',
    label: 'Lead Status',
    masterField: 'leadstatus',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_LEADS_SEARCH_SUM',
      input: searchInputs,
    },
  },
];

const tileSection: IControlDefinition[] = [
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'totalLeads',
    label: 'Total Leads',
    icon:'images/icons/sum.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'first-stat-card stat-card-total'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'hotLeads',
    label: 'Hot Leads',
    icon: 'images/icons/sun.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'second-stat-card'
  },
  {
    type:ControlType.ICON_STAT_CARD,
    name: 'coldLeads',
    label: 'Cold Leads',
    icon: 'images/icons/snow.svg',
    iconType:VectorFamilyIconEnum.SVG,
    className: 'third-stat-card'
  }
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'LeadSummary',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        title: 'Lead Code',
        dataField: 'LEAD_CODE',
        cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams: {
                event: {
                  linkTo: '/ManageLead',
                  queryParams:[{sourceField:'LEAD_CODE', targetField:"code"}]
                },
              },
  
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
        title: 'Site Name',
        dataField: 'SITENAME',
      },
      {
        title: 'Lead Source',
        dataField: 'LEAD_SOURCE',
      },
      {
        title: 'Lead Rating',
        dataField: 'LEAD_RATING',
      },
      {
        title: 'Lead Owner',
        dataField: 'LEAD_OWNER',
      },
      {
        title: 'Lead Status',
        dataField: 'LEAD_STATUS',
      },
      {
        title: 'Converted to Opportunity',
        dataField: 'OPPORTUNITY',
        cellRenderer: TableCellRendererType.DYNAMIC_CONTROL,
        conditionalControls: [
          {
            canRenderControl: (rowData) => rowData.LEAD_STATUS === 'Working' ,
            //|| rowData.LEAD_STATUS === 'Dropped',
            control: {
              dataField: 'OPPORTUNITY',
              cellRenderer: TableCellRendererType.BUTTON,
              cellRendererParams: {
                iconName: 'PageLink',
                iconTooltipText: 'Click here to go to Lead Opporunity',
                event: {
                  linkTo: '/ManageLeadOpportunity',
                  queryParams: [{ sourceField: 'LEAD_CODE', targetField: "code" }]
                }
              }
            }
          }
        ]
      },
      // {
      //   title: 'Opportunity',
      //   dataField: 'OPPORTUNITY',
      //   cellRenderer:TableCellRendererType.BUTTON,
      //   cellRendererParams:{
      //     iconName:'PageLink',
      //     iconTooltipText:'Click here to go to Lead Opporunity',
      //     event:{
      //       linkTo:'/ManageLeadOpportunity',
      //       queryParams:[{sourceField:'LEAD_CODE', targetField:"code"}]
      //     }
      //   }
      // },

    ],
    dimension:{
      columns:[
        {
          title:'Lead Rating',
          dataField:'LEAD_RATING',
          suffixText:'Leads',
          tileType:'ICON_TEXT',
          tileConfig:[
            {
              value:'Hot',
              icon:'images/icons/sun.svg',
              color:'#8ED299'
            },
            {
              value:'Cold',
              icon:'images/icons/snow.svg',
              color:'#C69656'
            },
            {
              value:'Warm',
              icon:'images/icons/warm.svg',
              color:'#ffbf3a'
            }
          ]
        },
        {
          title:'Lead Source',
          dataField:'LEAD_SOURCE',
          tileType:'TEXT',
        },
        {
          title:'Lead Status',
          dataField:'LEAD_STATUS'
        }
      ],
      showTotalCount:{
        title:'Total Leads',
        color:'rgb(246, 128, 89)'
      },
      renderListAs:'RADIO_BUTTON'
    }
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Lead',
      event: {
        linkTo: '/ManageLead',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_LEAD_INIT_SUM',
  moduleName: CRM_TRANSACTION ,
  // input: searchInputs,
};

export const LeadSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        {/* <RFSection controls={tileSection} columns={3} transparent /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
