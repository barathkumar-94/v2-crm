import React, { useState } from 'react';
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

    const handleSuggestionClick = (suggestion: string) => {
        console.log(`Suggestion clicked: ${suggestion}`);
        // Add your logic here, e.g., navigate or display more details
    };

    const onLoadEventParams: IRFEventParams = {
        serviceName: 'RCRM_OPPORTUNITY_INIT_SUM',
        moduleName: CRM_TRANSACTION,
        input: [''],
    };

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
                                    <h3>Selected Files</h3>
                                </div>
                                <div className="left_panel_body pr-3">
                                    <ul className='file_preview_list'>
                                        <li className='file_preview'>
                                            <span className='mr-1'>
                                                <FileIcon />
                                            </span>
                                            <h6>analysis_file_1.docx</h6>
                                            <button className='close_btn'>X</button>
                                        </li>
                                        <li className='file_preview'>
                                            <span className='mr-1'>
                                                <FileIcon />
                                            </span>
                                            <h6>analysis_file_2.docx</h6>
                                            <button className='close_btn'>X</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 px-0">
                        <div className="chat_panel">
                            <div className="convo_section"></div>
                            <div className="input_panel">
                                <input type="text" />
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
        </RetinaFormBuilder>
    );
};

export default GPT;