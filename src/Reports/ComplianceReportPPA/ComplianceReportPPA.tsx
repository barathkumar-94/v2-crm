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
  RFTabs,
  RFTabItem,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['PowerProducer','Scheme','Site'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'PowerProducer',
    label: 'Power Producer',
    required:true,
    masterField:'PowerProducer',
    event :{
      serviceName:'RCRM_COMPLIANCE_PPA_POWERPRODUCER_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['PowerProducer']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'Scheme',
    label: 'Scheme',
    required:true,
    masterField:'Scheme'
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Site',
    label: 'Site',
    required:true,
    masterField:'Site'
  },
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_COMPLIANCE_PPA_SEARCH',
      input: PrintInputs,
    },
  },
];





const CompliancePPAGeneral: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CompliancePPAGeneralGrid',
    isPrimeReactTable: true, 
    column: 12,
    pageSize: 7,
    columns: [
      {
        title: 'PPA #',
        dataField: 'PPA_NO',
      },

      {
        title: 'PPA Date',
        dataField: 'PPA_DATE',
      },

      {
        title: 'Amendment #',
        dataField: 'AMENDMENT_NO',
      },

      {
        title: 'Title',
        dataField: 'TITLE',
      },

      {
        title: 'PPA Value',
        dataField: 'PPA_VALUE',
      },

      {
        title: 'PPA Status',
        dataField: 'PPA_STATUS',
      },

      {
        title: 'Workflow Status',
        dataField: 'WORKFLOW_STATUS',
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
        title: 'COD',
        dataField: 'COD',
      },
      {
        title: 'Grace Days',
        dataField: 'GRACE_DAYS',
      },
      {
        title: 'Opportunity Code',
        dataField: 'OPPORTUNITY_CODE',
      },
      {
        title: 'Description',
        dataField: 'OPPO_DESCRIPTION',
      },

      {
        title: 'Opportunity Owner',
        dataField: 'OPPORTUNITY_OWNER',
      },

      {
        title: 'Business Plan Code',
        dataField: 'BUSINESS_PLAN_CODE',
      },

      {
        title: 'Description',
        dataField: 'BUSINESS_DESCRIPTION',
      },

      {
        title: 'Site Name',
        dataField: 'SITE_NAME',
      },

      {
        title: 'Customer Account',
        dataField: 'CUSTOMER_ACCOUNT',
      },

      {
        title: 'Customer Name',
        dataField: 'CUSTOMER_NAME',
      },
      {
        title: 'Address',
        dataField: 'ADDRESS',
      },
      {
        title: 'Industry',
        dataField: 'INDUSTRY',
      },
      {
        title: 'Terms of PPA',
        dataField: 'TERMS_OF_PPA',
      },
      {
        title: 'PPA Duration',
        dataField: 'PPA_DURATION',
      },
      {
        title: 'Commencement Date',
        dataField: 'COMMENCEMENT_DATE',
      },
      {
        title: 'Effective To',
        dataField: 'EFFECTIVE',
      },
      {
        title: 'Lock-in Period',
        dataField: 'LOCK_IN_PERIOD',
      },
      {
        title: 'Lock-in Duration',
        dataField: 'LOCK_IN_DURATION',
      },
      {
        title: 'Term of SHA',
        dataField: 'TERM_OF_SHA',
      },
      {
        title: 'SHA Duration',
        dataField: 'SHA_DURATION',
      },
      {
        title: 'Commencement Date',
        dataField: 'SHA_COMMENCEMENT_DATE',
      },
      {
        title: 'Effective To',
        dataField: 'SHA_EFFECTIVE_TO',
      },
      {
        title: 'Lock-in Period',
        dataField: 'SHA_LOCK_IN_PERIOD',
      },

      {
        title: 'Lock-in Duration',
        dataField: 'SHA_LOCK_IN_DURATION',
      },

      {
        title: 'Total Equity Share of Company',
        dataField: 'TOTAL_EQUITY_SHARE_OF_COMPANY',
      },

      {
        title: 'Total Equity Share of Consumer',
        dataField: 'TOTAL_EQUITY_SHARE_CONSUMER',
      },

      {
        title: 'Shareholding in Company%',
        dataField: 'SHAREHOLDING_IN_COMPANY',
      },

      {
        title: 'Shareholding in Energy Allotment %',
        dataField: 'SHAREHOLDING_IN_ENERGY_ALLOTMENT',
      },

      {
        title: 'Per Unit Investment (INR)',
        dataField: 'PER_UNIT_INVESTMENT',
      },

      {
        title: 'UOM',
        dataField: 'UOM',
      },

      {
        title: 'Equity Investment',
        dataField: 'EQUITY_INVESTMENT',
      },

      {
        title: 'INR In',
        dataField: 'INR_IN',
      },

      {
        title: 'Billing Frequency',
        dataField: 'BILLING_FREQUENCY',
      },

      {
        title: 'Pay Term',
        dataField: 'PAY_TERM',
      },

      {
        title: 'Pay Term Description',
        dataField: 'PAY_TERM_DESCRIPTION',
      },

      {
        title: 'Due Days',
        dataField: 'DUE_DAYS',
      },

      {
        title: 'Penalty Type',
        dataField: 'PENALTY_TYPE',
      },

      {
        title: 'Penalty',
        dataField: 'PENALTY',
      },

      {
        title: 'Grace Days',
        dataField: 'GRACE_DAYS',
      },

      {
        title: 'Rebate Type',
        dataField: 'REBATE_TYPE',
      },

      {
        title: 'Rebate Days',
        dataField: 'REBATE_DAYS',
      },

      {
        title: 'Rebate',
        dataField: 'REBATE',
      },
      {
        title: 'Contracted Energy',
        dataField: 'CONTRACTED_ENERGY',
      },

      {
        title: 'UOM',
        dataField: 'CONTRACTED_ENERGY_UOM',
      },

      {
        title: 'Minimum Supply%',
        dataField: 'MINIMUM_SUPPLY',
      },

      {
        title: 'Overall Supply%',
        dataField: 'OVERALL_SUPPLY',
      },

      {
        title: 'Peak Supply%',
        dataField: 'PEAK_SUPPLY',
      },

      {
        title: 'Minimum Offtake %',
        dataField: 'MINIMUM_OFFTAKE',
      },
      {
        title: 'Overall Offtake%',
        dataField: 'OVERALL_OFFTAKE',
      },

      {
        title: 'Peak Offtake%',
        dataField: 'PEAK_OFFTAKE',
      },

      {
        title: 'Notes',
        dataField: 'NOTES',
      },

      {
        title: 'Remarks',
        dataField: 'REMARKS',
      },

      
      

      ]
    },
   
 ];


 const CompliancePPATariffDetails: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'CompliancePPATariffGrid',
      isPrimeReactTable: true, 
      column: 12,
      pageSize: 7,
      columns: [

        {
            title: 'PPA #',
            dataField: 'PPA_NO',
        },

        {
            title: 'HTSC',
            dataField: 'HTSC',
        },

        {
            title: 'Generation Type',
            dataField: 'GENERATION_TYPE',
        },

        {
            title: 'Tariff Type',
            dataField: 'TARIFF_TYPE',
        },

        
        {
            title: 'Group',
            dataField: 'GROUP',
        },

        {
            title: 'Tariff ID',
            dataField: 'TARIFF_ID',
        },

        {
            title: 'Tariff Description',
            dataField: 'TARIFF_DESCRIPTION',
        },

        {
            title: 'UOM',
            dataField: 'UOM',
        },
        {
            title: 'PPA Rate',
            dataField: 'PPA_RATE',
        },

        {
            title: 'DISCOM Tariff Esclation Sharing%',
            dataField: 'DISCOM_TARIFF_ESCALATION_SHARING',
        },

        {
            title: 'OA Charges Esclation Sharing%',
            dataField: 'OA_CHARGES_ESCALATION_SHARING',
        },

        {
            title: 'Discount Value',
            dataField: 'DISCOUNT_VALUE',
        },

        {
            title: 'Contracted Quantum - Annual',
            dataField: 'CONTRACTED_QUANTUM_ANNUAL',
        },

        {
            title: 'UOM',
            dataField: 'CONTRACTED_QUANTUM_ANNUAL_UOM',
        },
        {
            title: 'Units',
            dataField: 'UNITS_KWH',
        },



      ]
    },
   
 ];

 const CompliancePPAQuantumProducer: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'CompliancePPAQuantumProducerGrid',
      isPrimeReactTable: true, 
      column: 12,
      pageSize: 7,
      columns: [

        {
            title: 'PPA #',
            dataField: 'PPA_NO',
        },

        {
            title: 'Month',
            dataField: 'MONTH',
        },

        {
            title: 'Month Type',
            dataField: 'MONTH_TYPE',
        },

        {
            title: 'UOM',
            dataField: 'UOM',
        },

        {
            title: 'Quantum',
            dataField: 'QUANTUM',
        },
        ]
    },
   
];


const CompliancePPAQuantumConsumer: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'CompliancePPAQuantumconsumerGrid',
      isPrimeReactTable: true, 
      column: 12,
      pageSize: 7,
      columns: [

        {
            title: 'PPA #',
            dataField: 'PPA_NO',
        },

        {
            title: 'Month',
            dataField: 'MONTH',
        },

        {
            title: 'Month Type',
            dataField: 'MONTH_TYPE',
        },

        {
            title: 'UOM',
            dataField: 'UOM',
        },

        {
            title: 'Quantum',
            dataField: 'QUANTUM',
        },
        ]
    },
   
];


const CompliancePPAOpenAccess: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'CompliancePPAOpenAccessGrid',
      isPrimeReactTable: true, 
      column: 12,
      pageSize: 7,
      columns: [

        {
            title: 'PPA #',
            dataField: 'PPA_NO',
        },

        {
            title: 'Generation Type',
            dataField: 'GENERATION_TYPE',
        },

        {
            title: 'TCD Code',
            dataField: 'TCD_CODE',
        },

        {
            title: 'Description',
            dataField: 'DESCRIPTION',
        },

        {
            title: 'TCD Type',
            dataField: 'TCD_TYPE',
        },
        {
            title: 'UOM',
            dataField: 'UOM',
        },
        {
            title: 'Value',
            dataField: 'VALUE',
        },
        {
            title: '% of Share',
            dataField: 'PER_OF_SHARE',
        },
    
        ]
    },
   
];



const CompliancePPADISCOMTariffTOD: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'CompliancePPADISCOMTariffTODGrid',
      isPrimeReactTable: true, 
      column: 12,
      pageSize: 7,
      columns: [

        {
            title: 'PPA #',
            dataField: 'PPA_NO',
        },

        {
            title: 'TOD Name',
            dataField: 'TOD_NAME',
        },

        {
            title: 'From Time',
            dataField: 'FROM_TIME',
        },

        {
            title: 'To Time',
            dataField: 'DESCRIPTION',
        },

        {
            title: 'Hrs',
            dataField: 'HRS',
        },
        {
            title: 'Base Tariff Rate',
            dataField: 'BASE_TARIFF_RATE',
        },
        {
            title: 'Factor',
            dataField: 'FACOR',
        },
        {
            title: 'TOD Rate',
            dataField: 'TOD_RATE',
        },

        {
            title: 'Value',
            dataField: 'VALUE',
        },
    
        ]
    },
   
];


const CompliancePPADISCOMTariffTCD: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'CompliancePPADISCOMTariffTCDGrid',
      isPrimeReactTable: true, 
      column: 12,
      pageSize: 7,
      columns: [

        {
            title: 'PPA #',
            dataField: 'PPA_NO',
        },

        {
            title: 'TCD Code',
            dataField: 'TCD_CODE',
        },

        {
            title: 'Description',
            dataField: 'DESCRIPTION',
        },

        {
            title: 'TCD Type',
            dataField: 'TCD_TYPE',
        },
        {
            title: 'UOM',
            dataField: 'UOM',
        },
        {
            title: 'Value',
            dataField: 'VALUE',
        },
        {
            title: '% of Share',
            dataField: 'PER_OF_SHARE',
        },
    
        ]
    },
   
];






  



const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_INIT_COMPLIANCE_PPA',
   moduleName: CRM_BILLING,
};


export const CompliancePPA :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFTabs>

<RFTabItem headerText='General' alwaysRender>
      <RFSection controls={CompliancePPAGeneral} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem> 

<RFTabItem headerText='Tariff Details' alwaysRender>
      <RFSection controls={CompliancePPATariffDetails} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem>

<RFTabItem headerText='Quantum of Energy(Producer)' alwaysRender>
      <RFSection controls={CompliancePPAQuantumProducer} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem>

<RFTabItem headerText='Quantum of Energy(Consumer)' alwaysRender>
      <RFSection controls={CompliancePPAQuantumConsumer} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem>

<RFTabItem headerText='Open Access Charges' alwaysRender>
      <RFSection controls={CompliancePPAOpenAccess} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem>

<RFTabItem headerText='DISCOM Tariff - TOD' alwaysRender>
      <RFSection controls={CompliancePPADISCOMTariffTOD} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem>

<RFTabItem headerText='DISCOM Charges' alwaysRender>
      <RFSection controls={CompliancePPADISCOMTariffTCD} columns={6} className={'section-header-bg-primary'} collapse={false} />
</RFTabItem>


</RFTabs>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
