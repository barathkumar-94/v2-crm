
import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { sbuHelp } from './sbuHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import React from 'react';
 
 
const actionInputs = ['sbucode', 'sbuname', 'cin', 'pan', 'bank_gst','status','address','city','reg_company_name',
'pincode','country','contactDetails','schemeDetail','sitmappinggrid','addtional_addressgrid','state','district'
,'hsn_code','pan_no','ifsc_code','acccount_type','account_no','branch_name','bank_name','hsn_code_sbu_section','sbu_section_gst'];
 
const onEnterEvent: IRFEventParams = {
  input: ['sbucode'],
  moduleName: 'CRM_Master',
  serviceName: 'ONENTER_SBU_MST',
};
 
const helpComponents = {
  sbuHelp: sbuHelp
};
 
const sbuDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'sbucode',
    label: 'SBU Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Manage SBU',
      componentName: 'sbuHelp',
      receiveParams: [{parentField: 'sbucode', childField: 'SBU_CODE'},
                      {parentField: 'sbuname', childField: 'SBU_NAME'},
                      {parentField: 'state', childField: 'STATE'},
                      {parentField: 'status', childField: 'STATUS'},
                      ],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sbuname',
    label: 'SBU Name',
    required:true,
    maxLength:100,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'reg_company_name',
    label: 'Registered Company Name',
    required:true,
    maxLength:120,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'cin',
    label: 'CIN',
    required: true,
    maxLength:21
  },
  {
    type: ControlType.TEXTBOX,
    name: 'pan',
    label: 'PAN',
    required: true,
    maxLength:10,
    isTransformToUpperCase:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'sbu_section_gst',
    label: 'GST',
    maxLength:15,
    required: true,
    isTransformToUpperCase:true
  },

  {
    type: ControlType.TEXTBOX,
    name: 'hsn_code_sbu_section',
    label: 'HSN Code',
    required:true,
    maxLength:80,
  },
 
];
 
const registeredOfficeAddress: IControlDefinition[] = [
    {
      type: ControlType.TEXTBOX,
      name: 'address',
      label: 'Address',
      required:true,
      maxLength:400,
    },
    {
      type: ControlType.TEXTBOX,
      name: 'city',
      label: 'City',
      required:true,
      maxLength:100,
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
      masterField: 'district',
    },
    {
      type: ControlType.TEXTBOX,
      name: 'pincode',
      label: 'Pincode',
      inputType:'number',
      maxLength :6,
      required:true
    },
    {
      type: ControlType.DISPLAY,
      name: 'country',
      label: 'Country',
    },
  ];
 
  const BankDetails: IControlDefinition[] = [
    {
      type: ControlType.TEXTBOX,
      name: 'bank_name',
      label: 'Bank Name',
      required:true,
      maxLength:80,
    },
    {
      type: ControlType.TEXTBOX,
      name: 'branch_name',
      label: 'Branch Name',
      required:true,
      maxLength:100,
    },
   
    {
      type: ControlType.TEXTBOX,
      name: 'account_no',
      label: 'Account #',
      required:true,
      inputType:"number",
      maxLength:18
    },

    {
      type: ControlType.TEXTBOX,
      name: 'acccount_type',
      label: 'Account Type',
      required:true,
      maxLength:100,
    },
    
    {
      type: ControlType.TEXTBOX,
      name: 'ifsc_code',
      label: 'IFSC Code',
      required:true,
      maxLength:11
    },
    {
      type: ControlType.TEXTBOX,
      name: 'pan_no',
      label: 'PAN',
    //  required:true,
      maxLength:10,
      isTransformToUpperCase:true
    },
 
    {
      type: ControlType.TEXTBOX,
      name: 'bank_gst',
      label: 'GST ',
      //required:true,
      maxLength:15,
      isTransformToUpperCase:true
    },
    {
      type: ControlType.TEXTBOX,
      name: 'hsn_code',
      label: 'HSN Code ',

      //required:true

   
      maxLength:80

    },
  ];
 
  const contactDetailstableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'contactDetails',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
        hideAdd:false,
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
            required:true,
            masterField: 'TITLE',
            
          }
        
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
           // required:true,
            maxLength:100
          }
        },
        {
            title: 'Mobile',
            dataField: 'MOBILE',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              required:true,
              inputType:"number",
              maxLength:10
            }
        },
       {
          title: 'Phone',
          dataField: 'PHONE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            inputType:"number",
            maxLength:10
          }
        },
   
        {
          title: 'Email',
          dataField: 'EMAIL',
          cellEditor: TableCellEditorType.TEXTBOX,          
          cellEditorParams: {
            required:true,
            inputType:'email',
            maxLength:80,
          }
        },
       {
          title: 'Department',
          dataField: 'DEPARTMENT',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            maxLength:80,
          }
        },
        {
            title: 'Designation',
            dataField: 'DESIGNATION',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams: {
              maxLength:80,
            }
          },
    ],
 
    },
]
 
const additionalAddressDetailstableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'addtional_addressgrid',
    isPrimeReactTable: true,
    column: 12,
    editorProps:{
      isEditable:true,
      hideAdd:false,
      resetFieldsOnRowDuplicate:['KEY']
  },
    columns: [
      {
        title: 'Key',
        dataField: 'KEY', 
        hidden:true
      },
      {
        title: 'Address Type',
        dataField: 'AddressType',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
       //   required:true,
          masterField: 'AddressType',
        }
      },
      {
        title: 'Address',
        dataField: 'addtional_address',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {

        //  required:true

        
          maxLength:400

        }
    },
      {
          title: 'City',
          dataField: 'addtional_city',
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
        dataField: 'additional_pincode',
        cellEditor: TableCellEditorType.TEXTBOX,          
        cellEditorParams: {
         // required:true,
          inputType:'number',
           maxLength :6,
        },
      },
     {
        title: 'Country',
        dataField: 'additional_country',
      },
    ],
  },
];
 
 
// const additionalAddressDetails: IControlDefinition[] = [
//   {
//     type: ControlType.TEXTBOX,
//     name: 'addtional_address',
//     label: 'Address',
//     required:true
//   },
//   {
//     type: ControlType.TEXTBOX,
//     name: 'addtional_city',
//     label: 'City',
//     required:true
//   },
 
//   {
//     type: ControlType.COMBOBOX,
//     name: 'additional_state',
//     label: 'State',
//     masterField:'state',
//     required:true,
//     event :{
//     serviceName:'ONCHANGE_STATE',
//     moduleName :'CRM_Master',
//     input:['state']
//     }
//   },
 
 
//   {
//     type: ControlType.COMBOBOX,
//     name: 'additional_district',
//     label: 'District',
//     masterField: 'district',
//   },
//   {
//     type: ControlType.TEXTBOX,
//     name: 'additional_pincode',
//     label: 'Pincode',
//     inputType:'number',
//     maxLength :6,
//     required:true
//   },
//   {
//     type: ControlType.DISPLAY,
//     name: 'additional_country',
//     label: 'Country',
//   },
// ];
 
const schemeDetailtableSection: IControlDefinition[] = [
    {
        type: ControlType.TABLE,
        name: 'schemeDetail',
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
            title: 'Scheme Name',
            dataField: 'schemename',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
            required:true,
            masterField: 'schemename',
            }
        },
        {
            title: 'Effective From',
            dataField: 'effectivefrom',
            cellEditor: TableCellEditorType.DATE_PICKER,
            cellEditorParams:{
              required:true,
            }
        },
        {
            title: 'Effective To',
            dataField: 'effectiveto',
            cellEditor: TableCellEditorType.DATE_PICKER,
            cellEditorParams:{
              required:true,
            }
        },
        {
          title: 'Active',
          dataField: 'ACTIVE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
            masterField: 'ACTIVE',
          }
        }
    ],
},
]  
 
 
const SiteMappingSection: IControlDefinition[] = [
  {
      type: ControlType.TABLE,
      name: 'sitmappinggrid',
      isPrimeReactTable: true,
      editorProps:{
      isEditable:true,
      resetFieldsOnRowDuplicate:['KEY']
  },
      columns: [
        {
          title: 'Key',
          dataField: 'KEY',
          hidden:true
        },
      {
          title: 'Site Name',
          dataField: 'sitename',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
          masterField: 'sitename',
          }
      },
      {
        title: 'Allocated Capacity in MW',
        dataField: 'allocated_Capacity',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required:true,
          inputType:"number",
       
        }
    },
    {
      title: 'Active',
      dataField: 'ACTIVE',
      cellEditor: TableCellEditorType.COMBOBOX,
      cellEditorParams: {
        required:true,
        masterField: 'ACTIVE',
      }
    }
  ],
},
]  
const actionBarButtons: IControlDefinition[] = [
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'create',
        label: 'Create',
        event: {
          serviceName: 'CREATE_SBU_MST',
          moduleName: 'CRM_Master',
          input: [...actionInputs],
        },
      },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'ACTIVATE_SBU_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_SBU_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
  ]
 const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
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
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    }
  ];
 
  const onLoadEventParams: IRFEventParams = {
    serviceName: 'INIT_SBU_MST',
    moduleName: 'CRM_Master',
      input: ['sbucode']
     // input: ['']
  };
 
  export const ManageSBU:React.FC<IPageBaseProps> = (props) => {
      const {code} = usePageQueryParam();
 
      const initialData: IRFData = {
        sbucode: code
        };
 
 
    return (
      <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
        <RFCRMToolbar hasBackButton/>
        <ScrollabeContainer hasHeader={true}>
          <RFSection  controls={sbuDetailsSection} title={'SBU Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection   controls={registeredOfficeAddress} title={'Registered Office Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection   controls={BankDetails} title={'Bank Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection controls={contactDetailstableSection} title={'Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection   controls={additionalAddressDetailstableSection} title={'Additional Address Deatils'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection controls={schemeDetailtableSection} title={'Scheme Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
          <RFSection controls={SiteMappingSection} title={'Site Mapping'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </ScrollabeContainer>
        <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
      </RetinaFormBuilder>
    );
  };