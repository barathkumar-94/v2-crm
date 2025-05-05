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


const componentTableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'bulkuploadJMRmetergrid',
      isPrimeReactTable: true,
          editorProps: {
        isEditable: true,
        hideRowDuplicate:true,
        enableBulkUpload:true,
        bulkUploadTemplateFileName:"Bulk_upload_JMR_Entry.xls"
      },
      columns: [
        {
            groupHeaderName: 'General',
            children: [
        {
         title: 'ID',
         dataField: 'ENTRY_ID',
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
            title: 'Generation Year',
            dataField: 'GENERATION_YEAR',
        },
        {
            title: 'Generation Month',
            dataField: 'GENERATION_MONTH',
        },
        {
            title: 'Date',
            dataField: 'DATE',
        },
        {
            title: 'Time',
            dataField: 'TIME',
        },
    ],
},
        {
            groupHeaderName: 'Export Reading Details - KWH',
            children: [
        {
            title: 'Current Reading',
            dataField: 'EXPORT_CURRENT_READING_KWH',
        },
    ],
},
{
    groupHeaderName: 'Export Reading Details - KVARH',
    children: [
        {
            title: 'Current Reading',
            dataField: 'EXPORT_CURRENT_READING_KVARH',
        },
    ],
},
{
    groupHeaderName: 'Import Reading Details - KWH',
    children: [
        {
            title: 'Current Reading',
            dataField: 'IMPORT_CURRENT_READING_KWH',
        },
    ],
},
{
    groupHeaderName: 'Import Reading Details - KVARH',
    children: [
        {
            title: 'Current Reading(KVARH)',
            dataField: 'IMPORT_CURRENT_READING_KVARH',
        },
    ],
},
{
    groupHeaderName: 'Export Reading Details - KWH (Current Reading)',
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
    groupHeaderName: 'Import Reading Details - KWH (Current Reading)',
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

const actionInputs = ['bulkuploadJMRmetergrid'];


  const actionBarButtons: IControlDefinition[] = [


    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_BULK_UPLOAD_JMR_ENTRY_MST',
        moduleName: CRM_ENERGY_ACCOUNTING,
         input: [...actionInputs],
      },
    }
]

export const BulkUploadJMREntry: React.FC<IPageBaseProps> = (props) => {
    const { id } = usePageQueryParam();
  
    const initialData: IRFData = {
      id: id,
  
    };

return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
        
        <RFSection controls={componentTableSection} title={'Bulk Upload JMR Entry'} columns={1} className={'section-header-bg-primary'}  />
        </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
}
