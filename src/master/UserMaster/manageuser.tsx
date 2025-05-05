import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { usermasterHelp } from './usermasterHelp';
import { CRM_USER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['userid', 'firstname', 'lastname','mobile','phone','email','organization','department','designation','status','profilephoto','password', 'enableEmailOTP'];

const onEnterEvent: IRFEventParams = {
  input: ['userid'],
  moduleName: CRM_USER,
  serviceName: 'ONENTER_USER_MST',
};

const helpComponents = {
  usermasterHelp: usermasterHelp
};


const searchSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'userid',
        label: 'User ID',
        required:true,
        maxLength:20,
        //Commented to show the password field on add and hide the same on edit
    //     event: onEnterEvent,
    // help: {
    //   panelTitle: 'Help On User Master',
    //   componentName: 'usermasterHelp',
    //   receiveParams: [{parentField: 'userid', childField: 'USER_ID'},
    //                   {parentField: 'firstname', childField: 'FIRST_NAME'},
    //                   {parentField: 'lastname', childField: 'LAST_NAME'},
    //                   {parentField: 'mobile', childField: 'MOBILE'},
    //                   {parentField: 'phone', childField: 'PHONE'},
    //                   {parentField: 'email', childField: 'EMAIL'},
    //                   {parentField: 'organization', childField: 'ORGANIZATION'},
    //                   {parentField: 'department', childField: 'DEPARTMENT'},
    //                   {parentField: 'designation', childField: 'DESIGNATION'},
    //                   {parentField: 'status', childField: 'STATUS'}],
    //   event: onEnterEvent
    // }
      },
      {
        type: ControlType.TEXTBOX,
        name: 'firstname',
        label: 'First Name',
        maxLength:100,
        required:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'lastname',
        label: 'Last Name',
        maxLength:100,
        required:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'mobile',
        label: 'Mobile',
        inputType:"number",
        maxLength:10,
        required:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'phone',
        label: 'Phone',
        maxLength:10,

        inputType:"number",

      },
      { 
        type: ControlType.DISPLAY,
        name: 'status',
        label: 'Status',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'email',
        label: 'Email',
        inputType:"email",
        maxLength:100,
        required:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'password',
        label: 'Password',
        inputType:'password',
        maxLength:200,
        required: true,
        hidden:(pageData)=>pageData.queryId,
        passwordPolicyValidation:{
          enable:true
        }
      },
      {
        type: ControlType.TEXTBOX,
        name: 'organization',
        label: 'Organization',
        required:true,
        maxLength:100,

      },
      {
        type: ControlType.TEXTBOX,
        name: 'department',
        label: 'Department',
        maxLength:100,

        //required:true
      },
      {
        type: ControlType.TEXTBOX,
        name: 'designation',
        label: 'Designation',
        maxLength:100,
        //required:true
      },     
      {
        type: ControlType.FILE_UPLOADER,
        name: 'profilephoto',
        label: 'Profile Photo',
        maximumAllowedFileSizeInMB: 10,
        allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
        className:'user-profile-file-upload',
        isUploadOnChange:true,
        isEditable:true,
        showFileDownloadButton:true,
        downloadFileConfig:{
          input:['profilephoto']  
        },
        //column:4
      },
      {
        type: ControlType.CHECKBOX,
        name: 'enableEmailOTP',
        label: 'Enable Multi-Factor Authentication (Email OTP) for Login',
        className:'mt-3',
        column:12
      },
];

//userName
const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      hidden:(pageData)=>pageData.queryId,
      event: {
        getEventProps:(pageData)=>{
          return {
            serviceName: 'CREATE_USER_MST',
            moduleName: CRM_USER,
            input: [...actionInputs],
            api: '/UserManagement/Users/Provision/',
            apiParams: {
              rollbackService: 'ROLLBACK_USERMST',
              userNameField:'userid',
              firstNameField:'firstname',
              lastNameField:'lastname',
              isTemporaryPassword:true,
              userAttributes:{enableEmailOTP:[pageData.enableEmailOTP ? 'YES' : 'NO']}
            }
          }
        }
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
      getEventProps:(pageData)=>{
        return {
        serviceName: 'ACTIVATE_USER_MST',
        moduleName: CRM_USER,
        input: [...actionInputs],
        api: '/UserManagement/ActivateUser/',
        apiParams: {
              userNameField:'userid',
              firstNameField:'firstname',
              lastNameField:'lastname',
              userAttributes:{enableEmailOTP:[pageData.enableEmailOTP ? 'YES' : 'NO']}
          }
        }
       }
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_USER_MST',
        moduleName: CRM_USER,
        input: [...actionInputs],
        api: '/UserManagement/DeActivateUser/',
        apiParams: {
              userNameField:'userid'
        }
      },
    },
  ];
export const DataSection: IControlDefinition[] = [
    
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
      format:DATE_TIME_FORMAT

    },
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
      format:DATE_TIME_FORMAT

    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_USER_MST',
  moduleName: CRM_USER,
    input: ['userid']
};

export const ManageUser:React.FC<IPageBaseProps> = (props) => {
    const {id} = usePageQueryParam();

    const initialData: IRFData = {
      userid: id,
      queryId:id
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
