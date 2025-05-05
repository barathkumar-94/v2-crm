import {
  ControlType,
  IControlDefinition,
  IRFEventParams,
  RetinaFormBuilder,
  RFSection,
  ScrollabeContainer,
  TableCellEditorType,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import * as React from 'react';
import {IPageBaseProps} from '../../common/objects';
import {CRM_ENERGY_ACCOUNTING} from '../../common/constants';
import { RFFooter } from '../../common/components/footer';
import { processResponseToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';
import { bankingDetailsTableColumn } from './TableColumns';


const UpdateHeaderSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'GenerationYear',
    label: 'Generation Year'
  },
  {
    type: ControlType.DISPLAY,
    name: 'generationPeriod',
    label: 'Generation Period',
  },
  {
    type: ControlType.DISPLAY,
    name: 'Site',
    label: 'Site',
	},
  {
    type: ControlType.DISPLAY,
    name: 'ASSET_ID',
    label: 'Asset ID',
    
	},

   
];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'bankingDetails',
    isPrimeReactTable:true,
    columns: [
      {
        title: 'TOD',
        dataField: 'TOD',
      },
      {
        title: 'OPENING BANKING UNITS',
        dataField: 'OPEN_BANKING_UNITS',
        
      },
      {
        title: 'RETURN BANKING UNITS',
        dataField: 'RETURN_BANKING_UNITS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          inputType: "number"
        }
      },
    ],
  },
];

const buttonSection:IControlDefinition[]=[
  {
    type:ControlType.BUTTON,
    name:'saveBtn',
    label:'Save',
    isPrimary:true,
    event:{
      closeModal:true,
      serviceName:'RCRM_UPDATE_SAVE_BANKING_DETAILS',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationyear', 'generationPeriod', 'site', 'ASSET_ID','bankingDetails'],
      processResponse:(response,pageData)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'BankingDetails',columnDetails:bankingDetailsTableColumn}
        ])
    }
  }
]

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_UPDATE_BANKING_DETAILS_INIT',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['generationyear', 'generationPeriod', 'site', 'ASSET_ID'],
};

export const UpdateBankingDetails: React.FC = (props) => {

  const initialData={
    ...props
  }

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn'}>
      <ScrollabeContainer hasHeader={false}>
      <RFSection  controls={UpdateHeaderSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={tableSection} columns={1} transparent />
      </ScrollabeContainer>
      <RFFooter buttons={buttonSection}/>
    </RetinaFormBuilder>
  );
};
