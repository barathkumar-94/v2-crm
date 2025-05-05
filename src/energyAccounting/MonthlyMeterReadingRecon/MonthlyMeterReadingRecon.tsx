import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
  TableCellRendererType,
  RFTabs,
  RFTabItem,
  TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_ENERGY_ACCOUNTING, CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { Dictionary } from 'lodash';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const monthlycols : Dictionary<TableColDef[]> = {
  
  General: [
    { 
      title: 'ID',
      dataField: 'ID',
    },
    {
      title: 'Site',
      dataField: 'SITE',
    },
    {
      title: 'Asset ID',
      dataField: 'ASSET_ID',
    },
    {
      title: 'Asset Name',
      dataField: 'ASSET_NAME',
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
      title: 'Meter ID',
      dataField: 'METER_ID',
    },
    {
      title: 'Meter Type',
      dataField: 'METER_TYPE',
    },
    {
      title: 'Generation Period',
      dataField: 'GENERATION_PERIOD',
    },
    {
      title: 'Transaction Date',
      dataField: 'TRANSACTION_DATE',
      dataType :'dateTime',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
        format:DATE_FORMAT,
      },
    },
    {
      title: 'Transaction Time',
      dataField: 'TRANSACTION_TIME',
      cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
    },
                          
  ],
  'Export Reading Details - kWh': [
    {
      title: 'MF',
      dataField: 'MF_EX_KWH',
    },    
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_EX_KWH',
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_EX_KWH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EX_KWH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EX_KWH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EX_KWH',
    },
  ],
  'Export Reading Details - kVArh': [
    {
      title: 'MF',
      dataField: 'MF_EX_KVH',
    },
    {
      title: 'Last Reading(Lead)',
      dataField: 'LAST_READING_EX_KVH',
    },
    {
      title: 'Current Reading(Lead)',
      dataField: 'CURRENT_READING_EX_KVH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EX_KVH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EX_KVH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EX_KVH',
    },
  ],
  'Import Reading Details - kWh': [
    {
      title: 'MF',
      dataField: 'MF_IM_KWH',
    },
    {
      title: 'Last Reading(Lag)',
      dataField: 'LAST_READING_IM_KWH',
    },
    {
      title: 'Current Reading(Lag)',
      dataField: 'CURRENT_READING_IM_KWH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IM_KWH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IM_KWH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IM_KWH',
    },
  ],
  'Import Reading Details - kVArh': [
    {
      title: 'MF',
      dataField: 'MF_IM_KVH',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_IM_KVH',
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_IM_KVH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IM_KVH',
    },

    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IM_KVH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IM_KVH',
    },
  ],
  'Monthly Net Energy': [
    {
      title: 'Net Energy in kWh',
      dataField: 'MONTHLY_NET_READING_KWH',
    },
    {
      title: 'Net Energy in kVArh',
      dataField: 'MONTHLY_NET_READING_KVARH',
    },
    {
      title: 'Net kVAh',
      dataField: 'NET_KVAH',
    },
  ]}

const monthlyCustomer: Dictionary<TableColDef[]> = {
  'General': [
    {
      title: 'ID',
      dataField: 'ID',
    },
    {
      title: 'Customer Name',
      dataField: 'CUSTOMER_NAME',
    },
    {
        title: 'PPA #',
        dataField: 'PPA',
    },
    {
        title: '% of Share',
        dataField: 'PER_SHARE',
    },
    {
      title: 'Site',
      dataField: 'SITE',
    },
    {
      title: 'Asset ID',
      dataField: 'ASSET_ID',
    },
    {
      title: 'Asset Name',
      dataField: 'ASSET_NAME',
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
      title: 'Meter ID',
      dataField: 'METER_ID',
    },
    {
      title: 'Meter Type',
      dataField: 'METER_TYPE',
    },
    {
      title: 'Generation Period',
      dataField: 'GENERATION_PERIOD',
    },
    {
      title: 'Transaction Date',
      dataField: 'TRANSACTION_DATE',
      cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
    },
    {
      title: 'Transaction Time',
      dataField: 'TRANSACTION_TIME',
      cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
    },
  ],
  'Export Reading Details - kWh': [
    {
      title: 'MF',
      dataField: 'MF_EX_KWH',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_EX_KWH',
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_EX_KWH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EX_KWH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EX_KWH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EX_KWH',
    },
  ],
  'Export Reading Details - kVArh': [
    {
      title: 'MF',
      dataField: 'MF_EX_KVH',
    },
    {
      title: 'Last Reading(Lead)',
      dataField: 'LAST_READING_EX_KVH',
    },
    {
      title: 'Current Reading(Lead)',
      dataField: 'CURRENT_READING_EX_KVH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EX_KVH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EX_KVH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EX_KVH',
    },
  ],
  'Import Reading Details - kWh': [
    {
      title: 'MF',
      dataField: 'MF_IM_KWH',
    },
    {
      title: 'Last Reading(Lag)',
      dataField: 'LAST_READING_IM_KWH',
    },
    {
      title: 'Current Reading(Lag)',
      dataField: 'CURRENT_READING_IM_KWH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IM_KWH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IM_KWH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IM_KWH',
    },
  ],
  'Import Reading Details - kVArh': [
    {
      title: 'MF',
      dataField: 'MF_IM_KVH',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_IM_KVH',
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_IM_KVH',
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IM_KVH',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IM_KVH',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IM_KVH',
    },
  ],
  'Monthly Net Energy': [
    {
      title: 'Net Energy in kWh',
      dataField: 'MONTHLY_NET_READING_KWH',
    },
    {
      title: 'Net Energy in kVARh',
      dataField: 'MONTHLY_UOM_KVH',
    },
    {
      title: 'Net kVAh',
      dataField: 'NET_KVAH',
    },  
  ],
}
const tableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'monthlygenerationgrid',
      isPrimeReactTable: true,
      isDynamicColumn:true,
      pageSize:10,
      pivotProps: {
        indexVariable: ['ID','SITE','METER_ID','METER_TYPE','ASSET_ID','ASSET_NAME','CAPACITY','UOM','GENERATION_PERIOD','TRANSACTION_DATE','TRANSACTION_TIME','MF_EX_KWH','LAST_READING_EX_KWH','CURRENT_READING_EX_KWH','NET_READING_EX_KWH','POWER_FACTOR_EX_KWH','VOLTAGE_EX_KWH','MF_EX_KVH','LAST_READING_EX_KVH','CURRENT_READING_EX_KVH','NET_READING_EX_KVH','POWER_FACTOR_EX_KVH','VOLTAGE_EX_KVH','MF_IM_KWH','LAST_READING_IM_KWH','CURRENT_READING_IM_KWH','NET_READING_IM_KWH','POWER_FACTOR_IM_KWH','VOLTAGE_IM_KWH','MF_IM_KVH','LAST_READING_IM_KVH','CURRENT_READING_IM_KVH','NET_READING_IM_KVH','POWER_FACTOR_IM_KVH','VOLTAGE_IM_KVH',
          'MONTHLY_NET_READING_KWH','MONTHLY_NET_READING_KVARH','NET_KVAH'],
        columnVariable: ['HEADING', 'TOD'],
      },
      columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(monthlycols)      
    },
  ];

  const CustomettableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'monthlyCustomersharegrid',
      isPrimeReactTable: true,
      isDynamicColumn:true,
      pageSize:10,
      pivotProps: {
        indexVariable: ['ID','SITE','METER_ID','METER_TYPE','ASSET_ID','ASSET_NAME','CAPACITY','UOM','GENERATION_PERIOD','TRANSACTION_DATE','TRANSACTION_TIME','MF_EX_KWH','LAST_READING_EX_KWH','CURRENT_READING_EX_KWH','NET_READING_EX_KWH','POWER_FACTOR_EX_KWH','VOLTAGE_EX_KWH','MF_EX_KVH','LAST_READING_EX_KVH','CURRENT_READING_EX_KVH','NET_READING_EX_KVH','POWER_FACTOR_EX_KVH','VOLTAGE_EX_KVH','MF_IM_KWH','LAST_READING_IM_KWH','CURRENT_READING_IM_KWH','NET_READING_IM_KWH','POWER_FACTOR_IM_KWH','VOLTAGE_IM_KWH','MF_IM_KVH','LAST_READING_IM_KVH','CURRENT_READING_IM_KVH','NET_READING_IM_KVH','POWER_FACTOR_IM_KVH','VOLTAGE_IM_KVH',
          'MONTHLY_NET_READING_KWH','MONTHLY_NET_READING_KVARH','NET_KVAH','CUSTOMER_NAME','PPA','PER_SHARE'],
        columnVariable: ['HEADING', 'TOD'],
      },
      columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(monthlyCustomer)   
    },
  ];

  // const toolbarControls: IControlDefinition[] = [
  //   {
  //     type: ControlType.BUTTON,
  //     name: 'managebtn',
  //     isPrimary: true,
  //     label: 'View Report',
  //     event: {
  //       linkTo: '/ManageLOI',
  //     },
  //   },
  // ]; 
  const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_MONTLY_METER_READING_INIT',
   moduleName: CRM_ENERGY_ACCOUNTING,
   processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
     [
       {tableName:'monthlygenerationgrid',columnDetails:monthlycols},
       {tableName:'monthlyCustomersharegrid',columnDetails:monthlyCustomer}
     ])
 };
 
 export const MonthlyMeterReadingRecon:React.FC<IPageBaseProps> = (props) => {
   return (
     <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
       <RFCRMToolbar   />
       <ScrollabeContainer hasHeader={true}>
       <RFTabs>
        <RFTabItem headerText='Monthly'>
        <RFSection controls={tableSection}  columns={1} className={'table-absolute-toolbar'}/>
        </RFTabItem>
        <RFTabItem headerText='Customer Share'>
        <RFSection controls={CustomettableSection}  columns={1} className={'table-absolute-toolbar'}/>
        </RFTabItem>
        </RFTabs>       </ScrollabeContainer>
     </RetinaFormBuilder>
   );
 };
 