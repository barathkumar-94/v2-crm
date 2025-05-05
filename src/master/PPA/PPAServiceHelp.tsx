import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
  TableCellRendererType,
  RFTabs,
  RFTabItem,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, CRM_TRANSACTION, DATE_FORMAT, DATE_TIME_FORMAT } from '../../common/constants';
import { PPAHelp } from '../PPA/PPAHelp';
import { AssetMasterHelp } from '../Assets/assetMasterHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';




const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'customercode',
        label: 'Customer Code',
        hidden:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'servicePointId',
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
          input:['CUSTOMER_CODE','servicePointId'],
        },
      },
   
];


  const consumerdetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'consumerservicegrid',
      isHelpTable: true,
      columns: [
        {
            title: 'Customer Code',
            dataField: 'CUSTOMER_CODE',
            hidden:true
        },
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

export const PPAServiceHelp:React.FC<IPageBaseProps> = (props) => {
    //console.log('props', props);

  return (
    <RetinaFormBuilder initialValues={props} scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams}  >
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={false}>
        <RFSection  controls={generalSection} title={'Search Criteria'} columns={6} />
        <RFSection  controls={consumerdetailsSection}  columns={1} className={'table-absolute-toolbar'}/>   
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
