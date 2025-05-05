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
    input: ['dailybulkuploadgrid'],
    moduleName: CRM_ENERGY_ACCOUNTING,
    serviceName: 'ONENTER_DAILY_BULK_UPLOAD_MST',
  };

  const actionInputs = ['dailybulkuploadgrid'];

// const searchSection: IControlDefinition[] = [
//   {
//     type: ControlType.TEXTBOX,
//     name: 'id',
//     label: 'ID',
//     required: true,
//     event: onEnterEvent,
//     help: {
//       panelTitle: 'Help On Daily Meter',
//       componentName: 'DailyMeterHelp',
//       receiveParams: [
//         { parentField: 'id', childField: 'dailymeter_id' },
//       ],
//       event: onEnterEvent
//     }
//   },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'site',
//     label: 'Site',
//     required: true,
//     masterField: 'site',
//     event: {
//       serviceName: 'RCRM_DAILY_METER_ONCHANGE_SITE',
//       moduleName: CRM_ENERGY_ACCOUNTING,
//       input: ['site']
//     }

//   },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'assetid',
//     label: 'Asset ID',
//     required: true,
//     event: {
//       serviceName: 'RCRM_DAILYMETER_ONCHANGE_ASSET',
//       moduleName: CRM_ENERGY_ACCOUNTING,
//       input: ['assetid']
//     }
//   },
//   {
//     type: ControlType.DISPLAY,
//     name: 'assetname',
//     label: 'Asset Name',
//   },
//   {
//     type: ControlType.DISPLAY,
//     name: 'assettype',
//     label: 'Asset Type',
//   },
//   {
//     type: ControlType.DISPLAY,
//     name: 'status',
//     label: 'Status',
//   },
//   {
//     type: ControlType.COMBOBOX,
//     name: 'metertype',
//     label: 'Meter Type',
//     masterField: 'metertype',
//     required: true,
//     event: {
//       serviceName: 'RCRM_DAILY_METER_ONCHANGE_METER',
//       moduleName: CRM_ENERGY_ACCOUNTING,
//       input: ['metertype', 'assetid']
//     }
//   },
  
//   {
//     type: ControlType.DISPLAY,
//     name: 'meterid',
//     label: 'Meter ID',
//   },
// ];

const componentTableSection: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'dailybulkuploadgrid',
        isPrimeReactTable: true,
            editorProps: {
          isEditable: true,
          hideRowDuplicate:true,
          enableBulkUpload:true,
          bulkUploadTemplateFileName:"Daily_Meter_Entry_Template.xls"
        },
        columns: [ 
            {
                groupHeaderName: 'General',
                children: [
            {
                title: 'ID',
                dataField: 'ID_DAILY',
            },       
           
            {
              title: 'Site Name',
              dataField: 'SITE_NAME',
            },
     
            {
                title: 'Asset ID',
                dataField: 'ASSET_ID',
            },
     
            {
                title: 'Meter Type',
                dataField: 'METER_TYPE',
            },
     
           
            {
                title: 'Date',
                dataField: 'DATE',
            },
            {
                title: 'Time',
                dataField: 'TIME',
            },
            {
                title: 'UOM',
                dataField: 'UOM',
            },
        ],
             },
            {
                groupHeaderName: 'Export Reading Details',
                children: [
            {
                title: 'Current Reading',
                dataField: 'EXPORT_CURRENT_READING',
            },
        ],
    },
    {
        groupHeaderName: 'Import Reading Details',
        children: [
            {
                title: 'Current Reading',
                dataField: 'IMPORT_CURRENT_READING',
            },
        ],
    },
   
    {
        groupHeaderName: 'Export Reading Details -(Current Reading)',
        children: [
            {
                title: 'TOD1(R1)',
                dataField: 'EXPORT_TOD1',
            },
            {
                title: 'TOD2(R2)',
                dataField: 'EXPORT_TOD2',
            },
            {
                title: 'TOD2(R3)',
                dataField: 'EXPORT_TOD3',
            },
            {
                title: 'TOD2(R4)',
                dataField: 'EXPORT_TOD4',
            },
            {
                title: 'TOD2(R5)',
                dataField: 'EXPORT_TOD5',
            },
       
        ],
    },
    {
        groupHeaderName: 'Import Reading Details -(Current Reading)',
        children: [
            {
                title: 'TOD1(R1)',
                dataField: 'IMPORT_TOD1',
            },
            {
                title: 'TOD2(R2)',
                dataField: 'IMPORT_TOD2',
            },
            {
                title: 'TOD2(R3)',
                dataField: 'IMPORT_TOD3',
            },
            {
                title: 'TOD2(R4)',
                dataField: 'IMPORT_TOD4',
            },
            {
                title: 'TOD2(R5)',
                dataField: 'IMPORT_TOD5',
            },
       
        ]
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
        serviceName: 'RCRM_SAVE_DAILYMETER_BULK_UPLOAD_MST',
        moduleName: CRM_ENERGY_ACCOUNTING,
        input: [...actionInputs]
      },
    }
  
  ];

const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_INIT_DAILYMETER_SUM',
   moduleName: CRM_ENERGY_ACCOUNTING,
   // input: searchInputs,
 };
 


export const DailyBulkUpload:React.FC<IPageBaseProps> = (props) => {
    return (
      <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'}>
        {/* <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/> */}
        <RFCRMToolbar hasBackButton />
        <ScrollabeContainer hasHeader={true}>
          {/* <RFSection  controls={searchSection} columns={6} /> */}
          {/* <RFSection controls={tileSection} columns={3} transparent /> */}
          <RFSection controls={componentTableSection} title={'Daily Meter Entry Bulk Upload'} columns={1} className={'table-absolute-toolbar'}/>
        </ScrollabeContainer>
        <RFFooter buttons={actionBarButtons} />
      </RetinaFormBuilder>
    );
  };

