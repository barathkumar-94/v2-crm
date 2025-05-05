import {IQueryAPIResponse} from '@retina360-ai/core-ui-library-v2';
import {
  ControlType,
  IControlDefinition,
  IRFEventParams,
  RetinaFormBuilder,
  RFSection,
  ScrollabeContainer,
  TableCellRendererType,
  TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import {useFormikContext} from 'formik';
import {camelCase, Dictionary, groupBy, keys, startCase, uniq} from 'lodash';
import * as React from 'react';
import {RFCRMToolbar} from '../../common/components/toolbar';
import {CRM_TRANSACTION} from '../../common/constants';
import {IPageBaseProps} from '../../common/objects';

//just to avoid the dynamic header overwriting the api header data
const headerControlPrefix = '_$_';

const getHeaderKey = (label: string) => `${headerControlPrefix}${label}`;

const parseJson=(jsonString:string)=>{
  let obj:Dictionary<string>={};
  if(!jsonString){
    return obj;
  }
  
  return JSON.parse(jsonString.replace('\n','\\n'));
}

const processResponse = (response: IQueryAPIResponse): IQueryAPIResponse => {
  let logs: any[] = Array.isArray(response.data.logs) ? response.data.logs : [];
  let headerDetails: any[] = Array.isArray(response.data.headerDetails) ? response.data.headerDetails : [];

  //group by table name
  let groupedByTable = groupBy(logs, (x) => x.table_name);

  //merge the data_values field values to the parent obj...
  let tableData = keys(groupedByTable).reduce((acc, key) => {
    let values = groupedByTable[key];
    acc[key] = values.map((x) => ({...x, ...parseJson(x.data_values)}));
    return acc;
  }, {} as Dictionary<any[]>);

  //header data
  let headerData = headerDetails.reduce((acc, dt) => {
    acc[getHeaderKey(dt.label)] = dt.value;
    return acc;
  }, {} as Dictionary<string>);

  return {
    ...response,
    data: {
      ...response.data,
      ...tableData,
      header: {
        ...response.data.header,
        ...headerData,
      },
    },
  };
};

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_INIT_AUDIT_LOG',
  moduleName: CRM_TRANSACTION,
  input: [],
  processResponse: processResponse,
};

const searchInputs = ['COMPONENT','KEY','FROM_DATE','TO_DATE'];

const HdrSection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    label: 'Component',
    name: 'COMPONENT',
    required: true,
    masterField: 'COMPONENT',
    event: {
      serviceName: 'ONCHANGE_COMPONENT_AUDIT',
      moduleName: CRM_TRANSACTION,
      input: ['COMPONENT'],
      processResponse: processResponse,
    },
  },
  {
    type: ControlType.COMBOBOX,
    label: 'Key',
    name: 'KEY',
    required: true,
    masterField: 'KEY',
    // event: {
    //   serviceName: 'ONCHANGE_KEY_AUDIT',
    //   moduleName: CRM_TRANSACTION,
    //   input: ['COMPONENT', 'KEY'],
    //   processResponse: processResponse,
    // },
  },
  {
    type: ControlType.DATEPICKER,
    label: 'From Date',
    name: 'FROM_DATE',
    required: true,

    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'TO_DATE'
    }
  },
  {
    type: ControlType.DATEPICKER,
    label: 'To Date',
    name: 'TO_DATE',
    required: true,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'FROM_DATE'
    }
  },

  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    className:'widget-title',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_SEARCH_AUDIT_LOG',
      input: searchInputs,
      processResponse: processResponse,
    },
  },

];

export const AuditLog: React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder
      scrollKey={props.scrollKey}
      onLoadEventParams={onLoadEventParams}
      isSimulation={false}
      simulationDataFileName={'auditLog.json'}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={HdrSection} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <TableContainer />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};

const TableContainer: React.FC = () => {
  const {values} = useFormikContext<any>();
  const {logs, headerDetails} = values;

  //dynamically build the table definition based on the data
  const tableControls = React.useMemo((): IControlDefinition[] => {
    if (!Array.isArray(logs)) {
      return [];
    }

    let controls: IControlDefinition[] = [];
    let groupedByTable = groupBy(logs, (x) => x.table_name);

    keys(groupedByTable).forEach((tableName) => {
      let values = groupedByTable[tableName];
      let columnNames: string[] = [];
      values.forEach((x) => {
        columnNames.push(...keys(parseJson(x.data_values)));
      });

      let columns: TableColDef[] = [];
      uniq(columnNames).forEach((x) => {
        columns.push({
          title: startCase(camelCase(x)),
          dataField: x,
        });
      });

      controls.push({
        type: ControlType.TABLE,
        name: tableName,
        isPrimeReactTable: true,
        title: tableName,
        columns: [

          {
            title: 'Audit Id',
            dataField: 'audit_id',
            hidden: true,
          },
          {
            title: 'Key',
            dataField: 'KEY_VALUE',
          },
          {
            title: 'Action',
            dataField: 'ACTION',
          },
          {
            title: 'Audit By',
            dataField: 'AUDITED_BY',
          },
          {
            title: 'Audit Date',
            dataField: 'AUDITED_DATE',
            cellRenderer: TableCellRendererType.TEXT,
            cellRendererParams: {
              format: 'YYYY-MM-DD HH:mm',
            },
          },
          ...columns,
        ],
      });
    });

    return controls;
  }, [logs]);

  //dynamically build the header controls based on the data
  const headerControls = React.useMemo((): IControlDefinition[] => {
    if (!Array.isArray(headerDetails)) {
      return [];
    }

    let controls = headerDetails.map(
      (dt): IControlDefinition => ({
        type: ControlType.DISPLAY,
        name: getHeaderKey(dt.label),
        label: dt.label,
      })
    );

    return controls;
  }, [headerDetails]);

  return (
    <>
      {headerControls.length > 0 && (
        <RFSection controls={headerControls} className={'section-header-bg-primary'} collapse={false} />
      )}
      {tableControls.length > 0 && (
        <RFSection controls={tableControls} columns={1} className={'section-header-bg-primary'} collapse={false} />
      )}
    </>
  );
};
