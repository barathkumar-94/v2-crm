import * as React from 'react';


import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFScreenToolbar,
  RFSection,
  IRFData,
  IControlDefinition,
  IRFEventParams,
  RFActionBar,
  WithConfiguratorPageContainer,
  TableCellEditorType,
  usePageQueryParam,
  RFTabs,
  RFTabItem,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { NOTIFICATION_LEVEL } from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CRM_ENERGY_ACCOUNTING, DATE_TIME_FORMAT } from '../../common/constants';


const onEnterEvent: IRFEventParams = {
    input: ['consumerbulkuploadgrid'],
    moduleName: CRM_ENERGY_ACCOUNTING,
    serviceName: 'ONENTER_DAILY_BULK_UPLOAD_MST',
  };

const actionInputs = ['consumerbulkuploadgrid','generationyear','generationPeriod','date'];


const generalSection: IControlDefinition[] = [
  {
      type: ControlType.COMBOBOX,
      name: 'generationyear',
      label: 'Generation Year',
      masterField: 'generationyear',
      required: true,
      event: {
        serviceName: 'RCRM_GENERATION_YEAR_ONCHANGE',
        moduleName: CRM_ENERGY_ACCOUNTING,
        input: ['generationyear']
      }
    },
  
  
    {
      type: ControlType.COMBOBOX,
      name: 'generationPeriod',
      label: 'Generation Period',
      masterField: 'generationPeriod',
      required: true,
    },


    {
      type: ControlType.DATEPICKER,
      name: 'date',
      label: 'Request Date',
      required: true,
  
  
    },
  


];


const componentTableSection: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'consumerbulkuploadgrid',
        isPrimeReactTable: true,
            editorProps: {
          isEditable: true,
          enableBulkUpload:true,
          bulkUploadTemplateFileName:"Consumer_Demand_Planning_Template.xls"
        },
        columns: [
            // {
            //     title: 'ID',
            //     dataField: 'ENTRY_ID',
                
            //   },
            {
              title: 'Customer Code',
              dataField: 'CUST_CODE',
              
            },
            {
              title: 'Customer Name',
              dataField: 'CUST_NAME',
            },
            {
              title: 'HTSC #',
              dataField: 'HTSC',
              
            },
           
            {
              title: 'PPA #',
              dataField: 'PPA',  
              
          },
            
            // {
            //   title: 'Generation Year',
            //   dataField: 'GENERATION_YEAR',
              
            // },
            // {
            //   title: 'Generation Period',
            //   dataField: 'GENERATION_PERIOD',
              
            // },
            // {
            //   title: 'Request Date',
            //   dataField: 'REQUEST_DATE',
              
            // },
            {
              title: 'UOM',
              dataField: 'UOM',
              
            },
            {
              title: 'C1',
              dataField: 'TOD_C1'
              
            },
            {
                title: 'C2',
                dataField: 'TOD_C2'
                
            },
            {
                title: 'C3',
                dataField: 'TOD_C3'
                
              },
              {
                title: 'C4',
                dataField: 'TOD_C4'
                
              },
              {
                title: 'C5',
                dataField: 'TOD_C5'
                
              }
          ],
      },
];

const actionBarButtons: IControlDefinition[] = [
    
  
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_SAVE_CONSUMER_DEMAND_PLAN_BULK_UPLOAD_MST',
        moduleName: CRM_ENERGY_ACCOUNTING,
        input: [...actionInputs]
      },
    }
  
  ];

const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_INIT_CONSUMER_ENERGY_BULK',
   moduleName: CRM_ENERGY_ACCOUNTING,
   // input: searchInputs,
 };
 


export const ConsumerBulkUpload:React.FC<IPageBaseProps> = (props) => {
    return (
      <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'}>
        {/* <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/> */}
        <RFCRMToolbar hasBackButton />
        <ScrollabeContainer hasHeader={true}>
          {/* <RFSection  controls={searchSection} columns={6} /> */}
          {/* <RFSection controls={tileSection} columns={3} transparent /> */}
          <RFSection controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
          <RFSection controls={componentTableSection} title={'Consumer Demand Planning Bulk Upload'} columns={1} className={'table-absolute-toolbar'}/>
        </ScrollabeContainer>
        <RFFooter buttons={actionBarButtons} />
      </RetinaFormBuilder>
    );
  };

