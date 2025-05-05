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
import { TableColumn } from './GroupCaptiveTableColumn';
import { processResponseToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';


const UpdateHeaderSection: IControlDefinition[] = [

    {
        type: ControlType.DISPLAY,
        name: 'generationPeriod',
        label: 'Generation Period',
        hidden: true,
    },
    {
        type: ControlType.DISPLAY,
        name: 'site',
        label: 'Site',
        hidden: true,
    },
    {
        type: ControlType.DISPLAY,
        name: 'Asset Category',
        label: 'category',
        hidden: true,
    },
    {
        type: ControlType.DISPLAY,
        name: 'Entry Id',
        label: 'id',
        hidden: true,
    },
    {
        type: ControlType.DISPLAY,
        name: 'Generation Year',
        label: 'generationyear',
        hidden: true,
    }
];


const componentTableSection: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'allocationDetails',
        isPrimeReactTable: true,
        editorProps: {
            isEditable: true,
            hideRowDuplicate: true,
            enableBulkUpload: true,
            hideAdd:true,
            hideDelete:true,
            bulkUploadTemplateFileName: "Group_Captive_Allocation_Details.xls"
        },
        columns: [
            {
                title: 'HTSC #',
                dataField: 'HTSC_NO',
            },
            {
                title: 'C1',
                dataField: 'TOD_CODE_1',
                dataType:'number',
            },
            {
                title: 'C2',
                dataField: 'TOD_CODE_2',
                dataType:'number'
            },
            {
                title: 'C3',
                dataField: 'TOD_CODE_3',
                dataType:'number'
            },
            {
                title: 'C4',
                dataField: 'TOD_CODE_4',
                dataType:'number'
            },
            {
                title: 'C5',
                dataField: 'TOD_CODE_5',
                dataType:'number'
            }
        ]
    }];

const actionInputs = ['generationyear','generationPeriod', 'site', 'allocationDetails', 'category','id'];


const actionBarButtons: IControlDefinition[] = [


    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',

        event: {
            closeModal: true,
            serviceName: 'GC_MANUAL_ALLOCATION_DETAILS_SAVE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: [...actionInputs,],
            processResponse: (response, pageData) => processResponseToMergeCoumnDefWithDynamicColumn(response,
                [
                    { tableName: 'manualSolar', columnDetails: TableColumn }
                ])
        }
    }
]

const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_MANUAL_ALLOCATION_DETAILS_INIT',
    moduleName: CRM_ENERGY_ACCOUNTING,
    input: ['generationPeriod', 'site', 'category','id','generationyear'],
};

export const GroupCaptiveUploadAllocation: React.FC<IPageBaseProps> = (props) => {

    const initialData = {
        ...props
    }

    return (
        <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} >
            <ScrollabeContainer hasHeader={true}>
                {/* <RFSection  controls={UpdateHeaderSection}  columns={2} className={'section-header-bg-primary'} /> */}
                <RFSection controls={componentTableSection} columns={1} className={'section-header-bg-primary'} />
            </ScrollabeContainer>
            <RFFooter buttons={actionBarButtons} />
        </RetinaFormBuilder>
    );
}
