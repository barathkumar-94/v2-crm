import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { DATE_TIME_FORMAT } from '../../common/constants';

const actionInputs = ['companyCode', 'companyName', 'cin', 'pan','gst', 'addressType', 'address', 
'city', 'state', 'district','village','taluk', 'pincode', 'country', 'currency',
'title','firstName','lastName','mobile','phone','email','department','designation','additionalContactDetails'];

const DetailsSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'companyCode',
    label: 'Company Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'companyName',
    label: 'Company Name',
    required:true,
    maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'cin',
    label: 'CIN',
    required:true,
    maxLength:21
  },
  {
    type: ControlType.TEXTBOX,
    name: 'pan',
    label: 'PAN',
    required:true,
    maxLength:10,
    isTransformToUpperCase:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'gst',
    label: 'GST',
    required:true,
    maxLength:15,
    isTransformToUpperCase:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'addressType',
    label: 'Address Type',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'address',
    label: 'Address',
    multiLine:true,
    multiLineRowLength:3,
    maxLength:400
  },
  {
    type: ControlType.TEXTBOX,
    name: 'city',
    label: 'City',
    required:true,
    maxLength:100
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField:'state',
    required:true,
    event :{
    serviceName:'ONCHANGE_STATE',
    moduleName :'CRM_Master',
    input:['state']
    }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'district',
    label: 'District',
    masterField:'district'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'village',
    label: 'Village',
    maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'taluk',
    label: 'Taluk',
    maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'pincode',
    label: 'Pincode',
    required:true,
    inputType:"number",
    maxLength:6
  },
  {
    type: ControlType.DISPLAY,
    name: 'country',
    label: 'Country'
  },
  {
    type: ControlType.DISPLAY,
    name: 'currency',
    label: 'Currency',
    },
];

const contactSection: IControlDefinition[] = [
    {
      type: ControlType.COMBOBOX,
      name: 'title',
      label: 'Title',
      masterField:'title',
      required:true
    },
    {
      type: ControlType.TEXTBOX,
      name: 'firstName',
      label: 'First Name',
      required:true,
      maxLength:100
    },
    {
      type: ControlType.TEXTBOX,
      name: 'lastName',
      label: 'Last Name',
      maxLength:100
    //  required:true
    },
    {
      type: ControlType.TEXTBOX,
      name: 'mobile',
      label: 'Mobile',
      required:true,
      maxLength:10,
      inputType:"number"
    },
    {
      type: ControlType.TEXTBOX,
      name: 'phone',
      label: 'Phone',
      maxLength:10,
      inputType:"number"
    },
    {
      type: ControlType.TEXTBOX,
      name: 'email',
      label: 'Email',
      required:true,
      inputType:"email",
      maxLength:80
    },
    {
      type: ControlType.TEXTBOX,
      name: 'department',
      label: 'Department',
      maxLength:80
    },
    {
      type: ControlType.TEXTBOX,
      name: 'designation',
      label: 'Designation',
      maxLength:80
    },

  ];
  const tableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'additionalContactDetails',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
        hideAdd:false,
        hideDelete:false,
        resetFieldsOnRowDuplicate:['KEY']
    },
      columns: [
        {
          title: 'Key',
          dataField: 'KEY',
          hidden:true
        },
        {
          title: 'Title',
          dataField: 'TITLE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'TITLE',
            required:true
          }
        },
        {
          title: 'Company code',
          dataField: 'COMPANY_CODE',
          hidden:true,
        },
        {
            title: 'First Name',
            dataField: 'FIRSTNAME',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:100
            }
        },
        {
          title: 'Last Name',
          dataField: 'LASTNAME',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            maxLength:100
          }
        },
        {
            title: 'Mobile',
            dataField: 'MOBILE',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:
            {
              inputType:"number",
              maxLength:10,
              required:true
            }
        },
       {
          title: 'Phone',
          dataField: 'PHONE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            inputType:"number",
            maxLength:10,
          }
        },
        {
            title: 'Email',
            dataField: 'EMAIL',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:
            {
              inputType:"email",
              required:true,
              maxLength:80
            }
        },
       {
          title: 'Department',
          dataField: 'DEPARTMENT',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            maxLength:80
          }
        },
        {
          title: 'Designation',
          dataField: 'DESIGNATION',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            maxLength:80
          }
        },
        {
            title: 'Address Type',
            dataField: 'ADDRESS_TYPE',
            cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            masterField: 'ADDRESS_TYPE',
          }
        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              maxLength:400
            }
        },
        {
            title: 'City',
            dataField: 'CITY',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              maxLength:100
            }
        },
        {
            title: 'State',
            dataField: 'STATE',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              masterField: 'STATE',
              event :{
                serviceName:'ONCHANGE_STATE_DTL',
                moduleName :'CRM_Master',
                input:['STATE']
                }
            }
    

        },
        {
            title: 'District',
            dataField: 'DISTRICT',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
              commaSeparatedOptionsField:'DISTRICT_MASTER'
            }     
        },
        {
            title: 'Pincode',
            dataField: 'PINCODE',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:
            {
              inputType:"number",
              maxLength:6
            }
        },
        ] 
    }    
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'SAVE_COMPANY_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
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
   serviceName: 'INIT_COMPANY_MST',
  moduleName: 'CRM_Master',
  input: actionInputs,
};

export const ManageCompany:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={DetailsSection} title={'Company Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={contactSection} title={'Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={tableSection} title={'Additional Contact Detailes (Multiple)'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
