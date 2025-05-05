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
import { bankingDetailsTableColumn } from './TableColumns';
import { processResponseToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';


const UpdateHeaderSection: IControlDefinition[] = [
   
    {
        type: ControlType.COMBOBOX,
        name: 'generationyear',
        label: 'Generation Year',
        masterField: 'generationyear',
        required: true,
        event: {
          serviceName: 'RCRM_BANK_DETAILS_UPLOAD_GENERATION_YEAR_ONCHANGE',
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
        name: 'site',
        label: 'Site',
        masterField: 'site',
        required: true,
      }
  
     
  ];


const componentTableSection: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'bankingDetails',
        isPrimeReactTable: true,
        editorProps: {
            isEditable: true,
            hideRowDuplicate: true,
            enableBulkUpload: true,
            bulkUploadTemplateFileName: "Bulk_upload_Banking_Details.xls"
        },


        columns: [
            {
                groupHeaderName: 'Banking Details',
                children: [
                    // {
                    //     title: 'Generation Year',
                    //     dataField: 'GENERATION_YEAR',

                    // },
                    // {
                    //     title: 'Generation Period',
                    //     dataField: 'GENERATION_PERIOD',

                    // },
                    // {
                    //     title: 'Site',
                    //     dataField: 'SITE',

                    // },
                    {
                        title: 'Service Number',
                        dataField: 'SERVICE_NUMBER',

                    },
                    {
                        title: 'Asset ID',
                        dataField: 'ASSET_ID',

                    },
                    // {
                    //     title: 'Asset Name',
                    //     dataField: 'ASSET_NAME'

                    // },
                ],
            },    
                    
                    {
                        groupHeaderName: 'Return Banking Details',
                        children: [
                            {
                                title: 'C1',
                                dataField: 'RB_TOD_CODE_1',
                                dataType:'number'

                            },
                            {
                                title: 'C2',
                                dataField: 'RB_TOD_CODE_2',
                                dataType:'number'

                            },
                            {
                                title: 'C3',
                                dataField: 'RB_TOD_CODE_3',
                                dataType:'number'
                            },
                            {
                                title: 'C4',
                                dataField: 'RB_TOD_CODE_4',
                                dataType:'number'

                            },
                            {
                                title: 'C5',
                                dataField: 'RB_TOD_CODE_5',
                                dataType:'number'

                            },

                        ]
                    },
                
            
        ]




    }];

const actionInputs = ['generationyear','generationPeriod','site','bankingDetails'];


const actionBarButtons: IControlDefinition[] = [


    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',
       
    event:{ 
      closeModal:true,   
      serviceName:'RCRM_BULK_UPLOAD_SAVE_BANKING_DETAILS',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input: [...actionInputs,],
      processResponse:(response,pageData)=>processResponseToMergeCoumnDefWithDynamicColumn(response,
        [
          {tableName:'BankingDetails',columnDetails:bankingDetailsTableColumn}
        ])
    }
    }
]

const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_BULK_UPDATE_BANKING_DETAILS_INIT',
    moduleName: CRM_ENERGY_ACCOUNTING,
    input: ['generationPeriod', 'site','generationyear'],
  };

export const BulkUploadBankingDetails: React.FC<IPageBaseProps> = (props) => {

    const initialData={
      ...props
    }

    return (
        <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} >
            <ScrollabeContainer hasHeader={true}>
          <RFSection  controls={UpdateHeaderSection}  columns={6} className={'section-header-bg-primary'} /> 
                <RFSection controls={componentTableSection}  columns={1} className={'section-header-bg-primary'} />
            </ScrollabeContainer>
            <RFFooter buttons={actionBarButtons} />
        </RetinaFormBuilder>
    );
}
