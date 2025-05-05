import * as React from 'react';

import {
  ControlType,
  IControlDefinition,
  IRFEventParams,
  RetinaFormBuilder,
  RFSection,
  RFTabItem,
  RFTabs,
  ScrollabeContainer,
  TableCellRendererType,
  TableColDef
} from '@retina360-ai/core-ui-library-v2';
import { Dictionary } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_ENERGY_ACCOUNTING, DATE_FORMAT, HH_MM } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const dailymeterReadingColumnDetail: Dictionary<TableColDef[]> = {
  General: [
    {
      title: 'ID',
      dataField: 'ID',
    },
    {
      title: 'Site ',
      dataField: 'SITE',
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
      title: 'Transaction Date',
      dataField: 'TRANSACTION_DATE',
      cellRenderer: TableCellRendererType.TEXT,
      cellRendererParams: {
        format: DATE_FORMAT,
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
  'Daily Export Reading Details': [
    {
      title: 'MF',
      dataField: 'MF_EX',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_EX',
    },
    {
      title: 'Last Reading Date',
      dataField: 'LAST_READING_DATE_EX',
      cellRenderer: TableCellRendererType.TEXT,
      cellRendererParams: {
        format: DATE_FORMAT,
      },
    },
    {
      title: 'Last Reading Time',
      dataField: 'LAST_READING_TIME_EX',
      cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_EX',
    },
    {
      title: 'Current Reading Date',
      dataField: 'CURRENT_READING_DATE_EX',
      cellRenderer: TableCellRendererType.TEXT,
      cellRendererParams: {
        format: DATE_FORMAT,
      },
    },
    {
      title: 'Current Reading Time',
      dataField: 'CURRENT_READING_TIME_EX',
      cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EX',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EX',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EX',
    },
  ],
  'Daily Import Reading Details': [
    {
      title: 'MF',
      dataField: 'MF_IM',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_IM',
    },
    {
      title: 'Last Reading Date',
      dataField: 'LAST_READING_DATE_IM',
      cellRenderer: TableCellRendererType.TEXT,
      cellRendererParams: {
        format: DATE_FORMAT,
      },
    },
    {
      title: 'Last Reading Time',
      dataField: 'LAST_READING_TIME_IM',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_IM',
    },
    {
      title: 'Current Reading Date',
      dataField: 'CURRENT_READING_DATE_IM',
      cellRenderer: TableCellRendererType.TEXT,
      cellRendererParams: {
        format: DATE_FORMAT,
      },
    },
    {
      title: 'Current Reading Time',
      dataField: 'CURRENT_READING_TIME_IM',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IM',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IM',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IM',
    },
  ],
  'Daily Net Energy': [
    {
      title: 'Net Energy',
      dataField: 'DAILY_NET_READING',
    },
    {
      title: 'UOM',
      dataField: 'DAILY_UOM',
    },
  ],
};

const customerShareColumnDetail: Dictionary<TableColDef[]> = {
  General: [
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
  'Export Reading Details': [
    {
      title: 'MF',
      dataField: 'MF_EX',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_EX',
    },
    {
      title: 'Last Reading Date',
      dataField: 'LAST_READING_DATE_EX',
      cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
    },
    {
      title: 'Last Reading Time',
      dataField: 'LAST_READING_TIME_EX',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_EX',
    },
    {
      title: 'Current Reading Date',
      dataField: 'CURRENT_READING_DATE_EX',
      cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
    },
    {
      title: 'Current Reading Time',
      dataField: 'CURRENT_READING_TIME_EX',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EX',
    },

    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EX',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EX',
    },
  ],
  'Import Reading Details': [
    {
      title: 'MF',
      dataField: 'MF_IM',
    },
    {
      title: 'Last Reading',
      dataField: 'LAST_READING_IM',
    },
    {
      title: 'Last Reading Date',
      dataField: 'LAST_READING_DATE_IM',
      cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
    },
    {
      title: 'Last Reading Time',
      dataField: 'LAST_READING_TIME_IM',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Current Reading',
      dataField: 'CURRENT_READING_IM',
    },
    {
      title: 'Current Reading Date',
      dataField: 'CURRENT_READING_DATE_IM',
      cellRenderer:TableCellRendererType.TEXT,
    cellRendererParams:{
      format:DATE_FORMAT
    }
    },
    {
      title: 'Current Reading Time',
      dataField: 'CURRENT_READING_TIME_IM',
      cellRenderer:TableCellRendererType.TEXT,
      cellRendererParams:{
           format:HH_MM
        }
    },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IM',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IM',
    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IM',
    },
  ],
  'Daily Net Energy': [
    {
      title: 'Net Energy',
      dataField: 'DAILY_NET_READING',
    },
    {
      title: 'UOM',
      dataField: 'DAILY_UOM',
    },
  ],
};

const dailymeterReading: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'dailymeterreading',
      isPrimeReactTable: true,
      isDynamicColumn:true,
      pivotProps: {
        indexVariable: ['ID','SITE','METER_ID','METER_TYPE','ASSET_ID','ASSET_NAME','CAPACITY','UOM','TRANSACTION_DATE','TRANSACTION_TIME','MF_EX','LAST_READING_EX','LAST_READING_DATE_EX','LAST_READING_TIME_EX','CURRENT_READING_EX','CURRENT_READING_DATE_EX','CURRENT_READING_TIME_EX','NET_READING_EX','POWER_FACTOR_EX','VOLTAGE_EX','MF_IM','LAST_READING_IM','LAST_READING_DATE_IM','LAST_READING_TIME_IM','CURRENT_READING_IM','CURRENT_READING_DATE_IM','CURRENT_READING_TIME_IM','NET_READING_IM','POWER_FACTOR_IM','VOLTAGE_IM','DAILY_NET_READING','DAILY_UOM'],
        columnVariable: ['HEADING', 'TOD'],
      },
      columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(dailymeterReadingColumnDetail)
    },
  ];

  const customerTableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'dailyCustomersharegrid',
      isPrimeReactTable: true,
      isDynamicColumn:true,
      pivotProps: {
        indexVariable: ['ID','CUSTOMER_NAME','PPA','PER_SHARE','SITE','METER_ID','METER_TYPE','ASSET_ID','ASSET_NAME','CAPACITY','UOM','TRANSACTION_DATE','TRANSACTION_TIME','MF_EX','LAST_READING_EX','LAST_READING_DATE_EX','LAST_READING_TIME_EX','CURRENT_READING_EX','CURRENT_READING_DATE_EX','CURRENT_READING_TIME_EX','NET_READING_EX','POWER_FACTOR_EX','VOLTAGE_EX','MF_IM','LAST_READING_IM','LAST_READING_DATE_IM','LAST_READING_TIME_IM','CURRENT_READING_IM','CURRENT_READING_DATE_IM','CURRENT_READING_TIME_IM','NET_READING_IM','POWER_FACTOR_IM','VOLTAGE_IM','DAILY_NET_READING','DAILY_UOM'],
        columnVariable: ['HEADING', 'TOD'],
      },
      columns:  UpdateColumnsToMergeCoumnDefWithDynamicColumn(customerShareColumnDetail)
    }
  ];
  
const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_DAILY_METER_READING_INIT',
  moduleName: CRM_ENERGY_ACCOUNTING,
  processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
    [
      {tableName:'dailymeterreading',columnDetails:dailymeterReadingColumnDetail},
      {tableName:'dailyCustomersharegrid',columnDetails:customerShareColumnDetail}
    ])
};

export const DailyMeterReadingRecon:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
      <RFTabs>
      <RFTabItem headerText='Daily Meter Reading Recon'>
        <RFSection  controls={dailymeterReading} columns={1} className={'table-absolute-toolbar'}/>
        </RFTabItem>
       
        <RFTabItem headerText='Customer Share'>
        <RFSection controls={customerTableSection}  columns={1} className={'table-absolute-toolbar'}/>
        </RFTabItem>
        </RFTabs>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
