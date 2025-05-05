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
        type: ControlType.COMBOBOX,
        name: 'state',
        label: 'State',
        masterField: 'state',
        required: true,
        event: {
            serviceName: 'RCRM_STATE_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['state']
          }
      },

      {
        type: ControlType.COMBOBOX,
        name: 'site',
        label: 'Site',
        masterField: 'site',
        required: true,
      },
      
      
      {
        type: ControlType.DATEPICKER,
        name: 'date',
        label: 'Date',
        required: true,
    
    
      },
      {
        type: ControlType.TIMEPICKER,
        name: 'time',
        label: 'Time',
        required: true
      },


];

const componentTableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'bulkuploadmonthlymetergrid',
      isPrimeReactTable: true,
          editorProps: {
        isEditable: true,
        hideRowDuplicate:true,
        enableBulkUpload:true,
        bulkUploadTemplateFileName:"Bulk_upload_Monthly_Meter_Entry.xls"
      },
      columns: [
        

        // {
        //  title: 'ID',
        //  dataField: 'ENTRY_ID',
        // },        
       
        // {
        //   title: 'Site Name',
        //   dataField: 'SITE_NAME',
        // },

        {
            title: 'Asset ID',
            dataField: 'ASSET_ID',
        },

        {
            title: 'Meter Type',
            dataField: 'METER_TYPE',
        },

        // {
        //     title: 'Generation Year',
        //     dataField: 'GENERATION_YEAR',
        // },
        // {
        //     title: 'Generation Month',
        //     dataField: 'GENERATION_MONTH',
        // },
        // {
        //     title: 'Date',
        //     dataField: 'DATE',
        // },
        // {
        //     title: 'Time',
        //     dataField: 'TIME',
        // },
       
    
        {
            title: 'Current Reading(Import - KWH)',
            dataField: 'IMPORT_CURRENT_READING_KWH',
        },
        {
            title: 'Import-TOD1(R1)',
            dataField: 'IMPORT_TOD1',
        },
        {
            title: 'Import-TOD2(R2)',
            dataField: 'IMPORT_TOD2',
        },
        {
            title: 'Import-TOD3(R3)',
            dataField: 'IMPORT_TOD3',
        },
        {
            title: 'Import-TOD4(R4)',
            dataField: 'IMPORT_TOD4',
        },
        {
            title: 'Import-TOD5(R5)',
            dataField: 'IMPORT_TOD5',
        },
        {
            title: 'Current Reading(Export - KWH)',
            dataField: 'EXPORT_CURRENT_READING_KWH',
        },
        {
            title: 'Export-TOD1(R1)',
            dataField: 'EXPORT_TOD1',
        },
        {
            title: 'Export-TOD2(R2)',
            dataField: 'EXPORT_TOD2',
        },
        {
            title: 'Export-TOD3(R3)',
            dataField: 'EXPORT_TOD3',
        },
        {
            title: 'Export-TOD4(R4)',
            dataField: 'EXPORT_TOD4',
        },
        {
            title: 'Export-TOD5(R5)',
            dataField: 'EXPORT_TOD5',
        },

        {
            title: 'KVAH Import',
            dataField: 'KVAH_IMPORT',
        },

        {
            title: 'KVAH Export',
            dataField: 'KVAH_EXPORT',
        },


        {
          title: 'Current Reading(Import - KVARH)',
          dataField: 'IMPORT_CURRENT_READING_KVARH',
        },


        {
            title: 'Current Reading(Export - KVARH)',
            dataField: 'EXPORT_CURRENT_READING_KVARH',
        },

        
        

        {
            title: 'Line Loss',
            dataField: 'LINELOSS',
        },

        {
            title: 'Other Charges',
            dataField: 'OTHER_CHARGES',
        },

        {
            title: 'Meter Charges',
            dataField: 'METER_CHARGES',
        },

      
        
        
],
},
];

const actionInputs = ['generationyear','generationPeriod','state','site','date','time','bulkuploadmonthlymetergrid'];


  const actionBarButtons: IControlDefinition[] = [


    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_BULK_UPLOAD_MONTHLY_METER_ENTRY_MST',
        moduleName: CRM_ENERGY_ACCOUNTING,
         input: [...actionInputs],
      },
    }
]


const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_INIT_MONTHLY_METER_BULK_UPLOAD',
     moduleName: CRM_ENERGY_ACCOUNTING,
 };

export const BulkUploadMonthlyEntry: React.FC<IPageBaseProps> = (props) => {
    const { id } = usePageQueryParam();
  
    const initialData: IRFData = {
      id: id,
  
    };

return (
    <RetinaFormBuilder initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton />
      <ScrollabeContainer hasHeader={true}>
      <RFSection controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
        <RFSection controls={componentTableSection} title={'Bulk Upload Monthly Meter Entry'} columns={1} className={'section-header-bg-primary'}  />
        </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
}
