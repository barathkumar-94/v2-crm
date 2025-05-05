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
import { truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_ENERGY_ACCOUNTING, DATE_FORMAT } from '../../common/constants';

const searchInputs = ['bill','BillStatus','BillCategory','BillType','FinancialYear','BillingPeriod','GenerationPeriod','SBU','Scheme','Customer','HTSC','finalBillSummarygrid'];




const FourwayAnalysisGridSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'fourwayanalysisgrid',
    isPrimeReactTable: true,
    pageSize:7,
    columns: [
      {
        groupHeaderName: 'Generation in kWh',
        children: [
          {
            title: 'S.No',
            dataField: 'SNO',
            hidden:true,
          },
          {
            title: 'Site Name',
            dataField: 'SITE',
          },
          {
            title: 'DISCOM',
            dataField: 'GEN_DISCOM',
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
            title: 'Asset Type',
            dataField: 'ASSET_TYPE',
          },
          {
            title: 'Asset Capacity',
            dataField: 'ASSET_CAPACITY',
          },
          {
            title: 'Meter Type',
            dataField: 'METER_TYPE',
          },
          {
            title: 'Meter Make',
            dataField: 'METER_MAKE',
          },
          {
            title: 'Meter ID',
            dataField: 'METER_ID',
          },
          {
            title: 'Generation Year',
            dataField: 'GENERATION_YEAR',
          },
          {
            title: 'Generation Month',
            dataField: 'GENERATION_MONTH',
          },
          {
            title: 'Net Generation',
            dataField: 'NET_GENERATION',
          },
        ],
      },
      {
        groupHeaderName: 'Injection in kWh',
        children: [
          {
            title: 'Line Loss%',
            dataField: 'LINE_LOSS_INJECTION',
          },
          {
            title: 'Loss Value',
            dataField: 'LOSS_VALUE_INJECTION',
          },  
          {
            title: 'Net Injection',
            dataField: 'NET_INJECTION',
          },
        ],
      },
      {
        groupHeaderName: 'Transmission in kWh',
        children: [
          {
            title: 'Line Loss%',
            dataField: 'LINE_LOSS_TRANSMISSION',
          },
          {
            title: 'Loss Value',
            dataField: 'LOSS_VALUE_TRANSMISSION',
          },  
          {
            title: 'Net Transmission',
            dataField: 'NET_TRANSMISSION',
          },
        ],
      },
      {
        groupHeaderName: 'Consumption',
        children: [
          {
            title: 'Consumer Name',
            dataField: 'CONSUMER_NAME',
          },
          {
            title: 'Consumer HTSC #',
            dataField: 'CONSUMER_HTSC',
          },
          {
            title: 'DISCOM',
            dataField: 'CON_DISCOM',
          },
          {
            title: 'Voltage Level',
            dataField: 'VOLTAGE_LEVEL',
          },
          {
            title: 'Consumption in kWh',
            dataField: 'CONSUMPTION_KWH',
          },
        ],
      },
      {
        groupHeaderName: 'Units Recon',
        children: [
          {
            title: 'Excess/Short',
            dataField: 'EXCESS_SHORT',
          },
        ],
      },
      // {
      //   groupHeaderName: 'Bill Collection',
      //   children: [
      //     {
      //       title: 'Receipt Reference',
      //       dataField: 'RECEIPT_REFERENCE',
      //     },
      //     {
      //       title: 'Receipt Date',
      //       dataField: 'RECEIPT_DATE',
      //     },
      //   ],
      // },
      ],
  },
];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_FOUR_WAY_ANALYSIS_INIT',
  moduleName: CRM_ENERGY_ACCOUNTING,
};
 
export const FourwayAnalysis:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      {/* <RFCRMToolbar filterControls={searchSection}/> */}
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={FourwayAnalysisGridSection} columns={1} title={'Search Results'} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};

