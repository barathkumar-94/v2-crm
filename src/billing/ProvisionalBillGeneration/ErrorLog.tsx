import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  usePageQueryParam,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_BILLING, CRM_ENERGY_ACCOUNTING, CRM_MASTER, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';


const tableSection: IControlDefinition[] = [
  
  
  {
    type: ControlType.TABLE,
    name: 'errorLog',
    isPrimeReactTable: true,
    columns: [
      {
        title: 'Batch Id',
        dataField: 'ID',
        
      },
      {
        title: 'Batch Status',
        dataField: 'BATCH_STATUS',
        
      },
      {
        title: 'Processed Date',
        dataField: 'PROCESSED_DATE',
         
      },
      {
        title: 'Processed Time',
        dataField: 'PROCESSED_TIME',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
    },
      
      {
        title: 'Financial Year',
        dataField: 'FINANCIAL_YEAR',
        
      },
      {
        title: 'Billing Period',
        dataField: 'BILLING_PERIOD',
         
      },
      {
        title: 'Generation Period',
        dataField: 'GENERATION_PERIOD',
        
      },
      {
        title: 'PPA #',
        dataField: 'PPA',
        
      },
      {
        title: 'SBU',
        dataField: 'SBU',
        
      },
      {
        title: 'Scheme',
        dataField: 'SCHEME',
        
      },
      {
        title: 'Customer',
        dataField: 'CUSTOMER',
        
      },
      {
        title: 'HTSC #',
        dataField: 'HT_SC',
        
      },
      {
        title: 'Error Description',
        dataField: 'ERROR_DESCRIPTION',
      },
    ],
  },
];

// const toolbarControls: IControlDefinition[] = [
//     {
//       type: ControlType.BUTTON,
//       name: 'managebtn',
//       isPrimary: true,
//     //   iconName:'Circleplus',
//       label: 'Provisional Bill Generation',
//       event: {
//         linkTo: '/ProvisionalBillGeneration',
        
//       },
//     },
//   ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_ERROR_LOG_PROVISIONAL_BILL',
  moduleName: CRM_BILLING,
  input: ['ID']
};



export const ProvisionalErrorLog:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();
 
 
    const initialData: IRFData = {
        ID:code
  
      };
  return (
    <RetinaFormBuilder  initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
       <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={tableSection} title={'Error Log'} columns={1} className={'table-absolute-toolbar'} collapse ={false}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
