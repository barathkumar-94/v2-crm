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
      serviceName:'RCRM_SECL1CG_ONCHANGE',
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
      serviceName: 'RCRM_SECL1CG_SEARCH',
      input: PrintInputs,
    },
  },
];


const FROMsection: IControlDefinition[] = [
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'From',
        label:'From'
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
        name: 'Er.K.Tamilsekaran M.E, M.C.A',
        label:'Er.K.Tamilsekaran M.E, M.C.A'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'The Superintending Engineer',
        label:'The Superintending Engineer,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'The Superintending Engineer',
        label:'The Superintending Engineer ,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '1.Krishnagiri EDC 2. Coimbatore Metro EDC',
        label:'1.Krishnagiri EDC 2. Coimbatore Metro EDC'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam Electricity Distribution Circle',
        label:'Palladam Electricity Distribution Circle,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '3. Coimbatore North EDC 4. Erode EDC',
        label:'3. Coimbatore North EDC 4. Erode EDC'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'TANGEDCO',
        label:'TANGEDCO,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '5. Chennai North EDC 6. Tuticorin EDC',
        label:'5. Chennai North EDC 6. Tuticorin EDC,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam',
        label:'Palladam.,'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '7.Vellore EDC 8. Perambalur EDC 9. Chengalpattu EDC',
        label:'7.Vellore EDC 8. Perambalur EDC 9. Chengalpattu EDC'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam',
        label:'',
        //hidden:true
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '10. Madurai EDC 11. Villupuram EDC 12.Udumalpet EDC',
        label:'10. Madurai EDC 11. Villupuram EDC 12.Udumalpet EDC'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam',
        label:'',
        //hidden:true
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '13. Virudhunagar EDC 14. Sivagangai EDC',
        label:'13. Virudhunagar EDC 14. Sivagangai EDC'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam',
        label:'',
        //hidden:true
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '15. Cuddalore EDC 16. Chennai West EDC 17. Tirupur EDC',
        label:'15. Cuddalore EDC 16. Chennai West EDC 17. Tirupur EDC'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Palladam',
        label:'',
       // hidden:true
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: '18.Dindugal EDC 19. Kancheepuram EDC',
        label:'18.Dindugal EDC 19. Kancheepuram EDC'
    }
  
];

const LRNOsection: IControlDefinition[] = [
  {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'LR_NO',
        label:'Lr.No: SE/PEDC/PDM/AO/REV/HT/AS/WFHT. Sc.Nos:039244392186 to 039244392212 M/s. Watsun Infrabuild Private Limited/D____________2018/Dated____________'
    },
];

const Subjectsection: IControlDefinition[] = [

    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Subject',
        label:'Subject:'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Electricity',
        label:'Electricity - SE/PEDC/WindFarm New HT.Sc.Nos: 039244392186 to 039244392212 ( Old HTSc No: UVA 01, UVA 02, UVA 03, UVA 04, UVA 05, UVA 06, UVA 07, UVA 08, UVA 09, UVA 10, UVA 11, UVA 12, UVA 13, UVA 14, UVA 15, UVA 16, UVA 17, UVA 18, UVA 19, UVA 20, UVA 21, UVA 22, UVA 23, UVA 24, UVA 25, UVA 26, UVA 27 ) M/s Watsun Infrabuild Private Limited , Wind Energy Generation Units for the month of August 2024 and Wheeling of Wind Energy Unit adjustments for August 2024 in your HTSc-Allotment-Reg'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Ref',
        label:'Ref:'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'LR_NO_STATEMENT',
        label:'1.Lr No: CE/NCES/SE/Solar/EE/WFP/AEE3/F.M/s Watsun infrabuild Pvt Ltd /D.193/18 Dt:06.07.2018'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Ref',
        label:''
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Company_STATEMENT',
        label:'	2.Company Letter Dated : 12.09.2024'
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Ref',
        label:''
    },
    {
        type: ControlType.LABEL,
        isStatic:true,
        name: 'Ref_STATEMENT',
        label:'With reference to the above subject, I would inform that the wind Energy generated by M/s.Watsun Infrabuild Private Limited from their Wind Farm New HT.Sc.Nos: 039244392186 to 039244392212 ( Old HTSc No: UVA 01, UVA 02, UVA 03, UVA 04, UVA 05, UVA 06, UVA 07, UVA 08, UVA 09, UVA 10, UVA 11, UVA 12, UVA 13, UVA 14, UVA 15, UVA 16, UVA 17, UVA 18, UVA 19, UVA 20, UVA 21, UVA 22, UVA 23, UVA 24, UVA 25, UVA 26, UVA 27 ) month of August 2024 is alloted for Wheeling adjustment aganist below HT Services consumption as noted each in slot wise along with recovery of System Operating Charges, RKVAH penality amount and Metering Charges.'
    },
    
];


const SECL1CGGridSection: IControlDefinition[] = [

  {
    type: ControlType.TABLE,
    name: 'SECL1CGGrid',
    isPrimeReactTable: true, 
    column:12,
    columns: [

      {
        title: 'Peak Hr 1 Units (6 AM to 9 AM)',
        dataField: 'PEAK_HR1',

      },
      {
        title: 'Peak Hr 2 Units (6 PM to 9 PM)',
        dataField: 'PEAK_HR2',
      },
      {
        title: 'Peak Hr 3 Units (9 PM to 10 PM)',
        dataField: 'PEAK_HR3',
      },
      {
        title: 'Other Peak Hour Units (5 AM to 6 AM & 9 AM to 6 PM)',
        dataField: 'OTHER_PEAK',
      },
      {
        title: 'Night Hr Units (10 PM to 5 AM)',
        dataField: 'NIGHT_HR',
      },
      {
        title: 'Total Units',
        dataField: 'TOTAL_UNITS',
      },
         
    
        {
          title: 'Metering Charges in Rupees',
          dataField: 'METER_CH',
       },
   
        {
            title: 'Kvarh Penality in Rupees',
            dataField: 'KVARH_PENALTY',
        },
        {
            title: 'System Operating Charges in Rupees',
            dataField: 'SYS_OPERATING'
        },
        {
            title: 'Scheduling Charges in Rupees',
            dataField: 'SCH_CH',
        },
        {
            title: 'Transmission Charges in Rupees',
            dataField: 'TRANS_CH',
         },
         {
            title: 'Import KWH Penality in Rupees',
            dataField: 'IMP_KWH',
         },
         {
            title: 'E.Tax',
            dataField: 'ETAX',
         },
         {
            title: 'Other_Charge',
            dataField: 'OTHER_CH',
         },
         {
            title: 'Total Charges in Rupees',
            dataField: 'TOTAL_CH',
         }
       

      ],
      
    },
    
    
];

// const WTGwisestatementsect3: IControlDefinition[] = [
//     {
//           type: ControlType.LABEL,
//           isStatic:true,
//           name: 'M/S Watsun Infrabuild Private Limited',
//           label:'Total Export (Peak + Night + Remaining)'
//       },
  
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'Total 10(1) Losses in Units'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'Export Units after deduction of Line Loss'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'Total Import (Peak + Night + Remaining)'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'Net Generation'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'10% of Net Export'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'Power Factor (Import Mode)'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'RKVAH Penalty 25 Ps/Unit(In Rupees)	'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'RKVAH Penalty 50 Ps/Unit(In Rupees)	'
//       },
//       {
//           type: ControlType.LABEL,
//           isStatic:false,
//           name: 'M-Factor',
//           prefixText:'Wind Farm Meter Reading Charges	'
//       },
  
//       {
//         type: ControlType.LABEL,
//         isStatic:true,
//         name: 'System Operating Charges and Wheeling Charges Should be collected at your end as per TNERC Order.No.6 dated 13.04.2018',
//         label:'System Operating Charges and Wheeling Charges Should be collected at your end as per TNERC Order.No.6 dated 13.04.2018'
//     },
//     {
//         type: ControlType.LABEL,
//         isStatic:true,
//         name: 'Lr.NO.SE/PEDC/PLD/DFC/AO/REV/AS/F.WHT/JAS/Adj/2018/dt.01/10/2024',
//         label: 'Lr.NO.SE/PEDC/PLD/DFC/AO/REV/AS/F.WHT/JAS/Adj/2018/dt.01/10/2024'
//     },
//     {
//         type: ControlType.LABEL,
//         isStatic:true,
//         name: 'TO:',
//         label: 'TO:'
//     },
//     {
//         type: ControlType.LABEL,
//         isStatic:true,
//         name: 'Adjusted to HT.Sc.No.301, 396 ,222 & 23 of Krishnagiri EDC / 333 & 144, Coimbatore of EDC (Metro)/486,494,145 & 529 of Coimbatore EDC(North)/237,425 & 205 of Erode EDC /1203 of Vellore EDC/ 1395,2040,1640,1766,1688,1396 &1411 Chennai EDC (North)/ 106 & 227 Tuticorin EDC/ 53 of Perambalur EDC,678,625,589,955,341,891,427,550,1243,259,964,908,767,548,275,475,992 ,424 ,195,902 & 319 Chengalpattu EDC/146 of Madurai EDC/ 9 ,36 of Villupuram EDC / 128 of Uumalpet EDC /65,292 & 82 of Virudhunagar /70 of Sivagangai EDC / 65,83 126, & 64 of Cuddalore EDC / 1311 ,1150,1620,1496 & 1739 of Chennai EDC (West)/ 254 of Tirupur EDC173 of Dindugal / 297 of Kancheepuram EDC',
//         label: 'Adjusted to HT.Sc.No.301, 396 ,222 & 23 of Krishnagiri EDC / 333 & 144, Coimbatore of EDC (Metro)/486,494,145 & 529 of Coimbatore EDC(North)/237,425 & 205 of Erode EDC /1203 of Vellore EDC/ 1395,2040,1640,1766,1688,1396 &1411 Chennai EDC (North)/ 106 & 227 Tuticorin EDC/ 53 of Perambalur EDC,678,625,589,955,341,891,427,550,1243,259,964,908,767,548,275,475,992 ,424 ,195,902 & 319 Chengalpattu EDC/146 of Madurai EDC/ 9 ,36 of Villupuram EDC / 128 of Uumalpet EDC /65,292 & 82 of Virudhunagar /70 of Sivagangai EDC / 65,83 126, & 64 of Cuddalore EDC / 1311 ,1150,1620,1496 & 1739 of Chennai EDC (West)/ 254 of Tirupur EDC173 of Dindugal / 297 of Kancheepuram EDC'
//     },
//      {
//         type: ControlType.LABEL,
//         isStatic:true,
//         name: 'AccountsOfficer(Revenue)',
//         label: 'AccountsOfficer(Revenue)'
//     },
//     {
//         type: ControlType.LABEL,
//         isStatic:true,
//         name: 'For Superintending Engineer/PEDC/Palladam',
//         label: 'For Superintending Engineer/PEDC/Palladam'
//     },
//   ];
  


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_SECL1GC_REPORT_INIT',
  moduleName: CRM_BILLING,
};


export const SECL1CG:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={PrintSection} columns={6} /> 
        <RFSection  controls={FROMsection} columns={2} /> 
        <RFSection  controls={LRNOsection} columns={1} /> 
         <RFSection controls={Subjectsection} columns={2} /> 
        <RFSection controls={SECL1CGGridSection} columns={12} className={'table-absolute-toolbar'}/>
       
      </ScrollabeContainer>
      
    </RetinaFormBuilder>
  );
};
