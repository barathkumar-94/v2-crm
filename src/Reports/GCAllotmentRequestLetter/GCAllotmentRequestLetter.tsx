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

const PrintInputs = ['generationyear','generationperiod','site','assetid'];
 
const PrintSection: IControlDefinition[] = [
 
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    event :{
      serviceName:'RCRM_GC_ALLOTMENT_YEAR_ONCHANGE',
      moduleName :CRM_BILLING,
      input:['generationyear']
      }
  },
  
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    masterField:'generationperiod'
  },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'site',
//     label: 'Site',
//     masterField:'site',
//     event :{
//       serviceName:'RCRM_REPORT_SITE_ONCHANGE',
//       moduleName :CRM_BILLING,
//       input:['site']
//       }
//   },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'assetid',
//     label: 'Asset Id',
//     masterField:'assetid'
//   },
  {
    type: ControlType.BUTTON,
    name: 'SearchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName:CRM_BILLING,
      serviceName: 'RCRM_GC_ALLOTMENT_SEARCH',
      input: PrintInputs,
    },
  },
];




const WTGwisestatementsect1: IControlDefinition[] = [
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Date: 12.09.2024',
        label:'Date: 12.09.2024'
        
    },
   
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'To',
        label:'To'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'The Superintending Engineer,',
        label:'The Superintending Engineer,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'TANGEDCO',
        label:'TANGEDCO'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam Electricity Distribution Circle,',
        label:'Palladam Electricity Distribution Circle,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam.',
        label:'Palladam.'
    },
  
];

const WTGwisestatementsect2: IControlDefinition[] = [
  {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Sub: Elecy – Windmill Generation Details of our Windfarm New HT.Sc. Nos: 039244392186 to 039244392212 (Old Htsc No: UVA 01, UVA 02, UVA 03, UVA 04, UVA 05, UVA 06, UVA 07, UVA',
        label:'Sub: Elecy – Windmill Generation Details of our Windfarm New HT.Sc. Nos: 039244392186 to 039244392212 (Old Htsc No: UVA 01, UVA 02, UVA 03, UVA 04, UVA 05, UVA 06, UVA 07, UVA'
    },

    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '08, UVA 09, UVA 10, UVA 11, UVA 12, UVA 13, UVA 14, UVA 15, UVA 16, UVA 17, UVA 18, UVA 19, UVA 20, UVA 21, UVA 22, UVA 23, UVA 24, UVA 25, UVA 26, UVA 27) of AUGUST Month,',
        prefixText:'08, UVA 09, UVA 10, UVA 11, UVA 12, UVA 13, UVA 14, UVA 15, UVA 16, UVA 17, UVA 18, UVA 19, UVA 20, UVA 21, UVA 22, UVA 23, UVA 24, UVA 25, UVA 26, UVA 27) of AUGUST Month,'
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'commissioned before April 2018 - Monthly Allotment Regarding',
        prefixText:'commissioned before April 2018 - Monthly Allotment Regarding'
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '',
        prefixText:''
    },

    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '',
        prefixText:''
    },

    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'Ref:',
        prefixText:'Ref:'
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '',
        prefixText:''
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '1. Lr. No: SE/PEDC/PDM/DFC/AO/REV/AS/F.WHT/JAS/Adj/2018/Dt: 03.10.2024',
        prefixText:'1. Lr. No: SE/PEDC/PDM/DFC/AO/REV/AS/F.WHT/JAS/Adj/2018/Dt: 03.10.2024'
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '2. Lr. No: CE/NCES/SE/Solar/EE/WFP/AEE3/F.M/s Watsun Infrabuild Pvt Ltd/D.241/18, Dt: 13.08.2018',
        prefixText:'2. Lr. No: CE/NCES/SE/Solar/EE/WFP/AEE3/F.M/s Watsun Infrabuild Pvt Ltd/D.241/18, Dt: 13.08.2018'
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: '',
        prefixText:''
    },
    {
        type: ControlType.LABEL,
        isStatic:false,
        name: 'This is reference to your letter cited in ref 01, We herewith furnish the net generated units from our above mentioned HTSC windmills of Palladam EDC for the Month of August 2024',
        prefixText:'This is reference to your letter cited in ref 01, We herewith furnish the net generated units from our above mentioned HTSC windmills of Palladam EDC for the Month of August 2024'
    },
    

];

    const MonthlyKVARHGridSection: IControlDefinition[] = [

  {
    type: ControlType.TABLE,
    name: 'GCAllotmentGrid',
    isPrimeReactTable: true, 
    column:12,
    columns: [

      {
        title: 'Peak Hr 1 Units (6 AM to 9 AM)',
        dataField: 'GCALLOTMENT_P1',
        dataType:"number",

      },
      {
        title: 'Peak Hr 2 Units (6 PM to 9 PM)',
        dataField: 'GCALLOTMENT_P2',
        dataType:"number",
      },
      {
        title: 'Peak Hr 3 Units (9 PM to 10 PM)',
        dataField: 'GCALLOTMENT_P3',
        dataType:"number",
      },
      {
        title: 'Other Peak Hour Units (5 AM to 6 AM & 9 AM to 6 PM)',
        dataField: 'GCALLOTMENT_OTHER',
        dataType:"number",
      },
      {
        title: 'Night Hr Units (10 PM to 5 AM)',
        dataField: 'GCALLOTMENT_NIGHT',
        dataType:"number",
      },
      {
        title: 'Total',
        dataField: 'GCALLOTMENT_TOTAL',
        dataType:"number",
      },
         
    
        
       

      ],
      
    },
    
    
];

const WTGwisestatementsect3: IControlDefinition[] = [
    {
          type: ControlType.LABEL,
          isStatic:true,
          name: 'We hereby submit the request for adjustment of generation from each WTG to the respective HTSC Nos. of Consumer as per Annexure - II. A summary statement of adjustment for the',
          label:'We hereby submit the request for adjustment of generation from each WTG to the respective HTSC Nos. of Consumer as per Annexure - II. A summary statement of adjustment for the'
      },
  
      {
          type: ControlType.LABEL,
          isStatic:false,
          name: 'total generation from all WTGs to HTSC Nos of Consumer is also attached for your reference in Annexure - I.',
          prefixText:'total generation from all WTGs to HTSC Nos of Consumer is also attached for your reference in Annexure - I.'
      },
      
  ];
  


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_GC_ALLOTMENT_INIT',
  moduleName: CRM_BILLING,
};


export const GCAllotmentRequestLetter
 :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
       <RFSection  controls={WTGwisestatementsect1} columns={1} /> 
        <RFSection  controls={WTGwisestatementsect2} columns={1} /> 
        
        <RFSection controls={MonthlyKVARHGridSection} columns={12} className={'table-absolute-toolbar'}/>
        <RFSection  controls={WTGwisestatementsect3} columns={1} /> 
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
