import { IQueryAPIResponse } from '@retina360-ai/core-ui-library-v2';
import { getValidArray } from '@retina360-ai/core-ui-library-v2';
import { ITableDynamicColumnProps, TableColDef } from '@retina360-ai/core-ui-library-v2';
import { Dictionary, flattenDeep, keys, mapKeys } from 'lodash';

interface ITableInfo {
  tableName: string;
  columnDetails: Dictionary<TableColDef[]>;
}

/**
 * assigning the applyToDynamicColumns function to column definition...
 * @param tableDetails
 */
export const UpdateColumnsToMergeCoumnDefWithDynamicColumn = (
  tableDetails: Dictionary<TableColDef[]>
): TableColDef[] => {
  let updatedColumns = keys(tableDetails).map((sectionName) => {
    let columns = tableDetails[sectionName];
    let updatedColumns = columns.map(
      (column): TableColDef => ({
        ...column,
        applyToDynamicColumns: (title, dataField, pivotColumnType) => {
          //console.log(title, dataField, `('${sectionName}', '${column.dataField}')`);
          //return title == column.title && dataField === `('${sectionName}', '${column.dataField}')`;
          return title === column.dataField;
        },
      })
    );
    return updatedColumns;
  });

  return flattenDeep(updatedColumns);
};

/**
 * find the column definition that matches the column from all column definitions
 * @param columnName
 * @example "(' ', 'METER_TYPE')"
 * @param allColumnDetails
 * {
 * "General":[{title: 'Site ',dataField: 'SITE'}, {title: 'Meter Type',dataField: 'METER_TYPE'}],
 * 'Daily Export Reading Details':[{title: 'MF',dataField: 'MF_EX'}]
 * }
 * @returns
 * [{title: 'Meter Type',dataField: 'METER_TYPE'}, 'General']
 */
const getColumnInfo = (columnName: string, allColumnDetails: Dictionary<TableColDef[]>): [TableColDef, string] => {
  let matchColumn: TableColDef = null;
  let matchSectionName: string = null;

  const sectionNames = keys(allColumnDetails);

  for (let sectionName of sectionNames) {
    let columns = allColumnDetails[sectionName];
    let column = columns.find((column) => columnName.includes(`'${column.dataField}'`));
    if (column) {
      matchColumn = column;
      matchSectionName = sectionName;
      break;
    }
  }

  return [matchColumn, matchSectionName];
};

/**
 * process table...
 * in table_columns => add headerGroupName.. ie, replace "(' ', 'METER_ID')" to "('General', Meter ID)"
 * in table data => add headerGroupName... since in column data field we append the headerGroupName we need to modify the data fields also...
 * @example data from api
 * {(' ', 'ASSET_ID'): "ADNR235",(' ', 'ASSET_NAME'): "ADNR235",('5_$$_TOD Net Reading', '99_$$_TOD Net Reading-kWh'): 41074955}
 * @example output of this function
 * {('General', 'ASSET_ID'): "ADNR235",('General', 'ASSET_NAME'): "ADNR235",('5_$$_TOD Net Reading', '99_$$_TOD Net Reading-kWh'): 41074955}
 * @param response
 * @param table
 */
const processTable = (response: IQueryAPIResponse, table: ITableInfo): Dictionary<any[]> => {
  const {tableName, columnDetails} = table;
  let newColumnMapper: Dictionary<string> = {};

  let tableData: any[] = getValidArray(response.data[tableName]);
  let tableColumns: ITableDynamicColumnProps[] = getValidArray(response.data[`${tableName}_columns`]);

  //renaming the columns
  let updatedColumns = tableColumns.map((x) => {
    let [columnInfo, sectionName] = getColumnInfo(x.columnName, columnDetails);
    if (columnInfo && sectionName) {
      //replace "(' ', 'METER_ID')" to "('General', Meter ID)"
      let newColumn = x.columnName.replace(' ', sectionName); //.replace(`'${columnInfo.dataField}'`, columnInfo.title as string);
      newColumnMapper[x.columnName] = newColumn;
      return {...x, columnName: newColumn};
    }
    return x;
  });

  //renaming the data fields
  let updatedTableData = tableData.map((rowData) => {
    let newRowData = mapKeys(rowData, (value, key) => {
      return newColumnMapper[key] ?? key;
    });
    return newRowData;
  });

  return {
    [tableName]: updatedTableData,
    [`${tableName}_columns`]: updatedColumns,
  };
};

export const processResponseToMergeCoumnDefWithDynamicColumn = (
  response: IQueryAPIResponse,
  tables: ITableInfo[]
): IQueryAPIResponse => {
  let tableData = tables.reduce((acc, table) => {
    let data = processTable(response, table);
    return {...acc, ...data};
  }, {} as Dictionary<any[]>);

  return {
    ...response,
    data: {
      ...response.data,
      ...tableData,
    },
  };
};
