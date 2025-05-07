import React, { useState } from 'react'
import { IPageBaseProps } from '../common/objects'
import { FileIcon, UploadIcon } from './Icons'
import { ControlType, IControlDefinition, IRFEventParams, RetinaFormBuilder } from '@retina360-ai/core-ui-library-v2'
import { CRM_TRANSACTION } from '../common/constants'
import { RFCRMToolbar } from '../common/components/toolbar'

const ProjectSummary: React.FC<IPageBaseProps> = (props) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const toolbarControls: IControlDefinition[] = [
      {
        type: ControlType.BUTTON,
        name: 'managebtn',
        isPrimary: true,
        label: 'Create Project',
        event: {
          linkTo: '/createProject',
        },
      },
    ];

    const onLoadEventParams: IRFEventParams = {
        serviceName: 'RCRM_OPPORTUNITY_INIT_SUM',
        moduleName: CRM_TRANSACTION,
        input: [''],
    };

    

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setUploadedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };

    return (
        <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
            <RFCRMToolbar toolbarControls={toolbarControls} />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="project_summary_list_item">
                            <div className="col-md-3 p-0">
                                <div className="detail_panel">
                                    <div className="project_pic">
                                        <p>CA</p>
                                    </div>
                                    <div className="content_panel">
                                        <h3 className='project_name'>Contract analysis</h3>
                                        <span className='project_id'>PID01</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="desc_panel">
                                    <label>Description</label>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque pulvinar faucibus. Etiam congue aliquet convallis. Suspendisse potenti.</p>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="action_panel">
                                    <label htmlFor="file-upload" className="btn_upload">
                                        <span className='mr-2'>
                                            <UploadIcon />
                                        </span>
                                        Upload
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                    <p className='file_count'>{uploadedFiles.length} Files added</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RetinaFormBuilder>
    )
}

export default ProjectSummary