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
import { CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { PPAHelp } from '../PPA/PPAHelp';
import { AssetMasterHelp } from '../Assets/assetMasterHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';




const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'CUSTOMER_CODE',
        label: 'Customer Code',
        hidden:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'servicePoint',
        label: 'Service Point ID',
      },
      {
        type: ControlType.BUTTON,
        name: 'searchBtn',
        label: 'Search',
        isPrimary: true,
        event: {
          moduleName: CRM_MASTER,
          serviceName: 'RCRM_LOI_SERIVCE_SEARCH',
          input:['CUSTOMER_CODE','servicePoint'],
        },
      },
   
];


  const consumerdetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'consumerservicegrid',
      isHelpTable: true,
      pageSize:5,
      columns: [
        {
          title: 'Service Point ID',
          dataField: 'SERVICE_POINT_ID',
        },
        {
          title: 'DISCOM',
          dataField: 'DISCOM', 

 
        },
        {
          title: 'Voltage Level',
          dataField: 'VOLTAGE_LEVEL',

        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
          },
          {
            title: 'City',
            dataField: 'CITY',
            hidden:true
          },
        {
          title: 'State',
          dataField: 'STATE',
          hidden:true
        },
        {
            title: 'District',
            dataField: 'DISTRICT',
            hidden:true
          
        },
          {
            title: 'Pincode',
            dataField: 'PINCODE',
            hidden:true

          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
             hidden:true
          },
  
      ],
    },
  ];



const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_LOI_SERVICE_INIT',
  moduleName: CRM_TRANSACTION,
  input : ['CUSTOMER_CODE']

};

export const LOIServiceHelp:React.FC<IPageBaseProps> = (props) => {
    //console.log('props', props);

  return (
    <RetinaFormBuilder initialValues={props} scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams}  >
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={generalSection} title={'Search Criteria'} columns={6} />
        <RFSection  controls={consumerdetailsSection}  columns={1} className={'table-absolute-toolbar'}/>   
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
