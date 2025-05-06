import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { IRFEventParams, RetinaFormBuilder } from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../common/objects';
import { CRM_TRANSACTION } from '../common/constants';
import { RFCRMToolbar } from '../common/components/toolbar';
import { FileIcon, SendIcon } from './Icons';

const GPT: React.FC<IPageBaseProps> = (props) => {
    const [suggestions, setSuggestions] = useState([
        "Highlight Line-by-Line Differences",
        "Ignore Whitespace or Formatting Changes",
        "Summarize Changes",
        "Syntax-Aware Comparison",
        "Search Within Differences",
        "Side-by-Side Diff View",
        "Export Comparison Report",
        "Highlight Matching Blocks",
        "Version-Aware Comparison",
        "Interactive Merge Suggestions"
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // State to store selected files

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSuggestionClick = (suggestion: string) => {
        console.log(`Suggestion clicked: ${suggestion}`);
        // Add your logic here, e.g., navigate or display more details
    };

    const onLoadEventParams: IRFEventParams = {
        serviceName: 'RCRM_OPPORTUNITY_INIT_SUM',
        moduleName: CRM_TRANSACTION,
        input: [''],
    };

    const handleFilePlaceholderClick = () => {
        console.log('File placeholder clicked');
        toggleModal(); // Open the modal
    };

    const handleFileSelection = () => {
        const checkboxes = document.querySelectorAll('.uploaded_file_list input[type="checkbox"]:checked');
        const selected = Array.from(checkboxes).map((checkbox) => (checkbox as HTMLInputElement).id);
        setSelectedFiles(selected); // Update selected files
        toggleModal(); // Close the modal
    };

    const fileList = Array.from({ length: 12 }, (_, index) => ({
        id: `file${index + 1}`,
        name: `File_${index + 1}.pdf`,
    }));

    return (
        <RetinaFormBuilder scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
            <RFCRMToolbar />
            <div className="container-fluid" style={{ height: 'calc(100% - 27px)' }}>
                <div className="row h-100">
                    <div className="col-md-4 pr-0">
                        <div className="left_panel h-100">
                            <div className="left_panel_list">
                                <div className="left_panel_header">
                                    <h3>Project Details</h3>
                                </div>
                                <div className="left_panel_body">
                                    <div className="project_details pr-3">
                                        <div className="detail_panel shadow-sm">
                                            <h6 className="detail_label">Project Description</h6>
                                            <p className="detail_value">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ipsum et est sollicitudin ornare. Morbi non ex dictum, cursus sapien id, euismod tortor. Fusce ut libero dui.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="left_panel_list">
                                <div className="left_panel_header">
                                    <h3>Select Uploaded Files</h3>
                                </div>
                                <div className="left_panel_body pr-3">
                                    <ul className='file_preview_list'>
                                        {selectedFiles.length > 0 ? (
                                            selectedFiles.map((fileId) => {
                                                const file = fileList.find((f) => f.id === fileId);
                                                return (
                                                    <li key={fileId} className='file_preview'>
                                                        <span className='mr-2'><FileIcon /></span>
                                                        <h6 className='m-0'>{file?.name}</h6>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <li className='file_placeholder' onClick={handleFilePlaceholderClick}>
                                                <FileIcon />
                                                <p className='m-0'>No files were selected</p>
                                                <p className='m-0'>Please select the files from uploaded file</p>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 px-0">
                        <div className="chat_panel">
                            <div className="convo_section"></div>
                            <div className="input_panel">
                                <input type="text"  placeholder='Enter your queries'/>
                                <button className='chat_button'>
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pl-0">
                        <div className="right_panel">
                            <div className="right_panel_header">
                                <h3>Suggestions</h3>
                            </div>

                            <ul className='suggesion_list'>
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className='suggesion_item'
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <h6>{suggestion}</h6>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <Modal isOpen={isModalOpen} toggle={toggleModal} centered className='gpt_modal'>
                <ModalHeader toggle={toggleModal}>File Selection</ModalHeader>
                <ModalBody>
                    <ul className='uploaded_file_list'>
                        {fileList.map((file) => (
                            <li key={file.id} className="checkbox_card">
                                <input type="checkbox" id={file.id} />
                                <label className='p-2' htmlFor={file.id}>
                                    <span><FileIcon /></span>
                                    <span className='file_name'>{file.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-2 select_btn' onClick={handleFileSelection}>select files</Button>
                </ModalFooter>
            </Modal>
        </RetinaFormBuilder>
    );
};

export default GPT;