import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { DatePickerMode } from '@retina360-ai/core-ui-library-v2';
import { CRM_MASTER, CRM_TRANSACTION } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';




const searchSection: IControlDefinition[] = [
    {
        type: ControlType.COMBOBOX,
        name: 'generationtype',
        label: 'Generation Type',
        masterField:'generationtype'
    },
  {
    type: ControlType.COMBOBOX,
    name: 'tarifftype',
    label: 'Tariff Type',
    masterField:'tarifftype'
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_TRANSACTION,
      serviceName: 'RCRM_LOI_TARIFF_SEARCH',
      input:['tarifftype','generationtype','State'],
    },
  },
  
];
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'tarrifgridsummary',
    isHelpTable: true,
    pageSize:5,
    columns: [
      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
      },
      {
        title: 'Tariff Type',
        dataField: 'TARIFF_TYPE',
    
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
        title: 'Base Rate',
        dataField: 'RATE',
      },
      {
        title: 'Remarks',
        dataField: 'REMARKS',
        },
    ]
  
    },

    ];
    




const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_LOI_TARIFF_INIT',
  moduleName: CRM_TRANSACTION,
input:['GENERATION_TYPE','TARIFF_TYPE','State']
    
};

export const PPATariffHelp:React.FC<IPageBaseProps> = (props) => {
 


  return (
    <RetinaFormBuilder initialValues={props} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} >
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} title={'Search Criteria'} columns={6} />
        <RFSection  controls={tableSection}  columns={1} className={'table-absolute-toolbar'}/>       
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};

