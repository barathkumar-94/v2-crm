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
import { processResponseToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','site','assetid'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
    event :{
      serviceName:'RCRM_REPORT_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear'],
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    masterField:'generationperiod',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    required:true,
    event :{
      serviceName:'RCRM_REPORT_SITE_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['site']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset Id',
    masterField:'assetid',
    required:true
  },
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_WTG_WISE_STATEMENT_SEARCH',
      input: PrintInputs,
      processResponse:(response)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'WTGWiseReportGrid',columnDetails:cols}
        ]),
      downloadFile:{
        jasperReportTemplate:'WTGWiseStatement',
        fileName :'WTGWiseStatement.pdf',
        input :['guid']
      }
    },
  },
];


const WTGwisestatementsect1: IControlDefinition[] = [
  {
    type: ControlType.HIDDEN,
   name: 'ASSET_NAME',
    label:'Asset Name'
},
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'DISCOM',
        prefixText:''
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'CITY',
        prefixText:''
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'GENERATION_MONTH',
        prefixText:''
    },
  
];

const WTGwisestatementsect2: IControlDefinition[] = [
  {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'COMPANY_NAME',
        prefixText:'Company Name: '
    },

    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'M_FACTOR',
        prefixText:'M-Factor: '
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'INJECTION_VOLTAGE',
        prefixText:'Injection Voltage: '
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'CONNECTED_LOAD',
        prefixText:'Connected Load: '
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'OLD_HTSC_NO',
        prefixText:'WEG Old HT SC.No: '
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'NEW_HTSC_NO',
        prefixText:'New HTSC Number: '
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'FR_DATE',
        prefixText:'FR Date: ',
        format:DATE_FORMAT
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'IR_DATE',
        prefixText:'IR Date: ',
        format:DATE_FORMAT

    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'M-Factor',
        prefixText:' '
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'LINE_LOSS_PER',
        prefixText:'10(1) Line Loss: '
    },


];


 const cols : Dictionary<TableColDef[]> = {
  '': [
  // {
  //         title: 'S.No',
  //         dataField: 'SNO',
  // },
  {
          title: '',
          dataField: 'HEADING',
  },

  ]
}

const WTGWiseReportSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'WTGWiseReportGrid',
    title: '',
    isPrimeReactTable: true,
    isDynamicColumn:true,
    column: 12,
    pageSize: 7,
    pivotProps: {
      indexVariable: ['S_NO','HEADING'],
      columnVariable: ['TOD_NAME'],
    },
    columns: [
      {
        dataField:'S_NO',
        applyToDynamicColumns:(title,dataField)=>dataField=='S_NO',
        hidden:true
      }
    ]
  },
];


const WTGwisestatementsect3: IControlDefinition[] = [
    {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'TOTAL_EXPORT',
          prefixText:'Total Export (Peak + Night + Remaining): '
      },
  
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'TOTAL_LOSSES_UNIT',
          prefixText:'Total 10(1) Losses in Units: '
      },
      {
          type: ControlType.LABEL,
          isStatic:false, 
          name: 'EXPORT_DEDUCTION',
          prefixText:'Export Units after deduction of Line Loss: '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'TOTAL_IMPORT',
          prefixText:'Total Import (Peak + Night + Remaining): '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'NET_GENRATION',
          prefixText:'Net Generation: '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'PER_NET_EXPORT',
          prefixText:'10% of Net Export: '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'POWER_FACTOR',
          prefixText:'Power Factor (Import Mode): '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'RKVAH_PENALTY_25_UNIT',
          prefixText:'RKVAH Penalty 25 Ps/Unit(In Rupees): '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'RKVAH_PENALTY_50_UNIT',
          prefixText:'RKVAH Penalty 50 Ps/Unit(In Rupees): '
      },
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'WIND_FARM',
          prefixText:'Wind Farm Meter Reading Charges: '
      },
  
      {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'System Operating Charges and Wheeling Charges Should be collected at your end as per TNERC Order.No.6 dated 13.04.2018',
        label:'System Operating Charges and Wheeling Charges Should be collected at your end as per TNERC Order.No.6 dated 13.04.2018'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Lr.NO.SE/PEDC/PLD/DFC/AO/REV/AS/F.WHT/JAS/Adj/2018/dt.01/10/2024',
        label: 'Lr.NO.SE/PEDC/PLD/DFC/AO/REV/AS/F.WHT/JAS/Adj/2018/dt.01/10/2024'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'TO:',
        label: 'TO:'
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name:'ADDRESS',
        prefixText: ''
    },
     {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'AccountsOfficer(Revenue)',
        label: 'AccountsOfficer(Revenue)'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'For Superintending Engineer/PEDC/Palladam',
        label: 'For Superintending Engineer/PEDC/Palladam'
    },
  ];
  


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_WTG_WISE_STATEMENT_INIT',
  moduleName: CRM_BILLING,
};


export const WTGWiseReport
 :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      {({values}) => (
        <>
          <RFCRMToolbar />
          <ScrollabeContainer hasHeader={true}>
          <RFSection controls={PrintSection} columns={6} />
          {values.ASSET_NAME && <RFSection controls={WTGwisestatementsect1} columns={1} />}
            {values.ASSET_NAME &&<RFSection controls={WTGwisestatementsect2} columns={2} />}
            <RFSection controls={WTGWiseReportSection} columns={1} />
            {values.ASSET_NAME &&<RFSection controls={WTGwisestatementsect3} columns={1} />}
          </ScrollabeContainer>
        </>
      )}
    </RetinaFormBuilder>
  );
};
