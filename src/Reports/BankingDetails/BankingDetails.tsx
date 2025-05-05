import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','site','assetid','assettype','metertype'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
    event :{
      serviceName:'RCRM_BANKING_DETAILS_ONCHANGE_RPT',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    required:true,
    masterField:'generationperiod'
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    required:true,
    masterField:'site',
    event :{
      serviceName:'RCRM_BANKING_DETAILS_ONCHANGE_SITE_RPT',
      moduleName :CRM_BILLING,
      input:['site']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assettype',
    label: 'Asset Type',
    //required:true,
    masterField:'assettype',
    event :{
      serviceName:'RCRM_BANKING_DETAILS_ONCHANGE_ASSETTYPE_RPT',
      moduleName :CRM_BILLING,
      input:['site','assettype']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset ID',
    //required:true,
    masterField:'assetid',
    event :{
      serviceName:'RCRM_BANKING_DETAILS_ONCHANGE_ASSETID_RPT',
      moduleName :CRM_BILLING,
      input:['assetid']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'metertype',
    label: 'Meter Type',
    //required:true,
    masterField:'metertype'
  },

  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_BANKING_DETAILS_SEARCH_SUMMARY_RPT',
      input: ['generationyear','generationperiod','site','assettype','assetid','metertype'],
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'BankDetailsGrid',columnDetails:cols}
        ])
    },
  },
];

const cols: Dictionary<TableColDef[]> = {
  'Banking Details': [
     {
       title: 'Asset ID',
       dataField: 'ASSET_ID'        
     },
     {
       title: 'Asset Name',
       dataField: 'ASSET_NAME'
   }
  ]
 } 

const BankdetailsGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'BankDetailsGrid',
    isPrimeReactTable: true,
    isDynamicColumn:true,
    column: 12,
    editorProps:{
      isEditable:false,
      hideAdd:false,
      hideDelete:false,
  },
  pivotProps: {
    indexVariable: ['ASSET_ID','ASSET_NAME'],
    columnVariable: ['HEADING', 'TOD_NAME'],
  },
  columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols) 
    
  /*columns: [
        {
            groupHeaderName: 'Banking Details',
            children: [
            {
                title: 'Asset ID',
                dataField: 'ASSET_ID'
            },
            {
                title: 'Asset Name',
                dataField: 'ASSET_NAME'
    
            },
           
          ]
        },
        {
            groupHeaderName: 'Opening Banking Units',
            children: [
            {
                title: 'Peak 1',
                dataField: 'PEAK1_OPEN'
            },
            {
                title: 'Peak 2',
                dataField: 'PEAK2_OPEN'
    
            },
            {
                title: 'Normal Hour 1',
                dataField: 'NORMAL_HOUR1_OPEN'
            },
            {
                title: 'Normal Hour 2',
                dataField: 'NORMAL_HOUR2_OPEN'
            },
            {
                title: 'Night Hour',
                dataField: 'NIGHT_HOUR_OPEN'
            },
            {
                title: 'Total Units',
                dataField: 'TOTAL_OPEN'
            },
           
          ]
        },
        {
            groupHeaderName: 'Banking Units Used',
            children: [
            {
                title: 'Peak 1',
                dataField: 'PEAK1_USED'
            },
            {
                title: 'Peak 2',
                dataField: 'PEAK2_USED'
    
            },
            {
                title: 'Normal Hour 1',
                dataField: 'NORMAL_HOUR1_USED'
            },
            {
                title: 'Normal Hour 2',
                dataField: 'NORMAL_HOUR2_USED'
            },
            {
                title: 'Night Hour',
                dataField: 'NIGHT_HOUR_USED'
            },
            {
                title: 'Total Units',
                dataField: 'TOTAL_HOUR_USED'
            },
           
          ]
        },
        {
            groupHeaderName: 'Closing Banking Units',
            children: [
            {
                title: 'Peak 1',
                dataField: 'PEAK1_CLOSE'
            },
            {
                title: 'Peak 2',
                dataField: 'PEAK2_CLOSE'
    
            },
            {
                title: 'Normal Hour 1',
                dataField: 'NORMAL_HOUR1_CLOSE'
            },
            {
                title: 'Normal Hour 2',
                dataField: 'NORMAL_HOUR2_CLOSE'
            },
            {
                title: 'Night Hour',
                dataField: 'NIGHT_HOUR_CLOSE'
            },
            {
                title: 'Total Units',
                dataField: 'TOTAL_CLOSE'
            },
           
          ]
        },
      ]
    },
   
 ];
 */

},   
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_BANKING_DETAILS_RPT',
  moduleName: CRM_BILLING,
};


export const BankingDetails :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection controls={BankdetailsGridSection} title={'Banking Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
