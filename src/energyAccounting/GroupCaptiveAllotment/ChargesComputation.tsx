import * as React from 'react';

import {
    ScrollabeContainer,
    ControlType,
    RetinaFormBuilder,
    RFSection,
    IControlDefinition,
    IRFEventParams,
    TableCellEditorType,
    TableColDef,
    TableCellRendererType
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CRM_ENERGY_ACCOUNTING, DATE_TIME_FORMAT } from '../../common/constants';
import { processResponseToMergeCoumnDefWithDynamicColumn, UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const actionInputs = ['generationyear', 'generationPeriod', 'site', 'CHARGE_DETAILS'];

const GeneralSection: IControlDefinition[] = [
    {
        type: ControlType.COMBOBOX,
        name: 'generationyear',
        label: 'Generation Year',
        masterField: 'generationyear',
        event: {
            serviceName: 'RCRM_BANK_DETAILS_GENERATION_YEAR_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['generationyear']
        }
    },
    {
        type: ControlType.COMBOBOX,
        name: 'generationPeriod',
        label: 'Generation Period',
        masterField: 'generationPeriod',
        event: {
            serviceName: 'RCRM_BANK_DETAILS_GENERATION_PERIOD_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['generationPeriod']
        }
    },
    {
        type: ControlType.COMBOBOX,
        name: 'site',
        label: 'Site',
        masterField: 'site',
        required: true,
        event: {
            serviceName: 'RCRM_CHARGES_COMPUTATION_SITE_ONCHANGE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: ['generationyear', 'generationPeriod', 'site']
        }
    },

];

const tableSection: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'CHARGE_DETAILS',
        title: '',
        isPrimeReactTable: true,
        column: 12,
        pageSize: 7,
        editorProps: {
            isEditable: false
        },
        columns: [
            {
                title: 'Asset Id',
                dataField: 'ASSET_ID',
                // cellEditor: TableCellEditorType.TEXTBOX,
            },

            {
                title: 'Service Number',
                dataField: 'SERVICE_NUMBER',
                // cellEditor: TableCellEditorType.TEXTBOX,
            },
            {
                title: 'Asset Name',
                dataField: 'ASSET_NAME',
                // cellEditor: TableCellEditorType.TEXTBOX,
            },
            {
                title: 'Category',
                dataField: 'CATEGORY',
                // cellEditor: TableCellEditorType.TEXTBOX,
            },
            {
                groupHeaderName: 'Meter Charges',
                children: [
                    {
                        title: 'TCD',
                        dataField: 'METER_CHARGES_TCD',
                        cellEditor: TableCellEditorType.COMBOBOX,
                        cellEditorParams: {
                            required: true,
                            masterField: 'METER_CHARGES_TCD'
                        }
                    },

                    {
                        title: 'Meter Charges',
                        dataField: 'METER_CHARGES'
                    }
                ],
            },

            {
                groupHeaderName: 'Transmission Charges',
                children: [
                    {
                        title: 'TCD',
                        dataField: 'TRANSMISSION_CHARGES_TCD',
                        cellEditor: TableCellEditorType.COMBOBOX,
                        cellEditorParams: {
                            required: true,
                            masterField: 'TRANSMISSION_CHARGES_TCD'
                        }
                    },
                    {
                        title: 'Transmission Charges',
                        dataField: 'TRANSMISSION_CHARGES'
                    },
                ],
            },
            {
                groupHeaderName: 'System Operating Charges',
                children: [
                    {
                        title: 'TCD',
                        dataField: 'SYS_OP_CHARGES_TCD',
                        cellEditor: TableCellEditorType.COMBOBOX,
                        cellEditorParams: {
                            required: true,
                            masterField: 'SYS_OP_CHARGES_TCD'
                        }
                    },
                    {
                        title: 'System Operating Charges',
                        dataField: 'SYS_OP_CHARGES'
                    },
                ],
            },
            {
                groupHeaderName: 'Scheduling Charges',
                children: [
                    {
                        title: 'TCD',
                        dataField: 'SCHEDULING_CHARGES_TCD',
                        cellEditor: TableCellEditorType.COMBOBOX,
                        cellEditorParams: {
                            required: true,
                            masterField: 'SCHEDULING_CHARGES_TCD'
                        }
                    },
                    {
                        title: 'Scheduling Charges',
                        dataField: 'SCHEDULING_CHARGES'
                    }
                ],
            }
        ]
    }
];


const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_BANKING_DETAIL_INIT',
    moduleName: CRM_ENERGY_ACCOUNTING,
    input: actionInputs,
};
const actionBarButtons: IControlDefinition[] = [


    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'Save',
        label: 'Save',
        event: {
            serviceName: 'RCRM_CHARGES_COMPUTATION_SAVE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: [...actionInputs],
        },
    },
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'Calculate',
        label: 'Compute Charges',
        event: {
            serviceName: 'RCRM_CHARGES_COMPUTATION_CALCULATE',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: [...actionInputs],
        },
    },

    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'Adjust',
        label: 'Adjust Charges',
        event: {
            serviceName: 'RCRM_CHARGES_COMPUTATION_ADJUST',
            moduleName: CRM_ENERGY_ACCOUNTING,
            input: [...actionInputs],
        },
    }
];


export const ChargesComputation: React.FC<IPageBaseProps> = (props) => {
    return (
        <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
            <RFCRMToolbar hasBackButton />
            <ScrollabeContainer hasHeader={true}>
                <RFSection controls={GeneralSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false} />
                <RFSection controls={tableSection} title={'Charges Details'} columns={1} className={'section-header-bg-primary'} collapse={false} />
            </ScrollabeContainer>
            <RFFooter buttons={actionBarButtons} />
        </RetinaFormBuilder>
    );
};
