import {
    ControlType, IControlDefinition,
    IRFEventParams, RetinaFormBuilder,
    RFScreenToolbar, RFSection, ScrollabeContainer, WithConfiguratorPageContainer,
    TableCellRendererType,
    TableCellEditorType,
    usePageQueryParam,
    IRFData
} from '@retina360-ai/core-ui-library-v2';
import * as React from 'react';
import styled from 'styled-components';
import { RFCRMToolbar } from '../common/components/toolbar';
import { CRM_MASTER } from '../common/constants';


const onEnterEvent: IRFEventParams = {
    serviceName: 'INIT_MANAGE_PROJECT',
    moduleName: CRM_MASTER,
    input: ['PRJ_ID']
};

const Inputs = ['PRJ_ID', 'PRJ_DESC'];


const Project_Details: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'PRJ_ID',
        label: 'Project ID',
    },
    {
        type: ControlType.TEXTBOX,
        name: 'PRJ_DESC',
        label: 'Project Desc.',

    },
    {
        type: ControlType.FILE_UPLOADER,
        name: 'UPLOAD_FILE',
        label: 'Upload Files',
        required: true,


    },

];

const FileDtlGrid: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'FileDetails',
        isPrimeReactTable: true,
        exportFileName: 'File Details',
        editorProps: {
            isEditable: true,
        },
        columns: [

            {
                title: 'Upload Document',
                dataField: 'UPLOAD_DOCUMENT',
                cellRenderer: TableCellRendererType.FILE_UPLOADER,
                cellRendererParams: {
                    maximumAllowedFileSizeInMB: 10,
                    allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
                    originalFileNameField: 'file_name'
                },

            },
            {
                title: 'Document Name',
                dataField: 'FILE_NAME',
                cellEditor: TableCellEditorType.TEXTBOX,
            },
            {
                title: 'Remarks',
                dataField: 'REMARKS',
                cellEditor: TableCellEditorType.TEXTBOX,

            },
        ],
    },

];

interface IManageProjectProps {
    PRJ_ID?: string;
}

const ManageProject: React.FC<IManageProjectProps> = (props) => {
    const { PRJ_ID } = usePageQueryParam();

    const initialData: IRFData = {
        PRJ_ID: PRJ_ID ?? null
    };

    return (
        <StyleContainer>
            <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onEnterEvent} showValidationSummaryInDialog >
                <RFCRMToolbar hasBackButton />
                <ScrollabeContainer hasHeader={true} >
                    <RFSection controls={Project_Details} columns={6} />
                    <RFSection title={'File Details'} controls={FileDtlGrid} columns={1} collapse={false} />
                </ScrollabeContainer>
            </RetinaFormBuilder>
        </StyleContainer>
    );

};

export default ManageProject;

const StyleContainer = styled.div`
  .center-align {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 300px;
  }

  .footer {
    background-color: #f3f3f3;
    z-index: 999;
    text-align: center;
    padding: 10px 0;
    position: sticky;
    bottom: 70px;
    left: 0;
}
  `;