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
  TableCellEditorType,
  TableCellRendererType,
  RFTabs,
  RFTabItem,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CustomerAccountHelp } from './CustomerAccountHelp';
import { CRM_MASTER, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { PPAHelp } from '../PPA/PPAHelp';
import { AssetMasterHelp } from '../Assets/assetMasterHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CustomerAccountPPAHelp } from './CustomerAccountPPAHelp';


const actionInputs = [
    'customercode','customername','industry','ownership','creditrating','parentcustomer','website',
    'annualRevenue','currency','noofEmployees','crn','status','pan','gst',
    'addresstype','address','city','state','district','pincode','country',
    'title','firstName','lastName', 'mobile', 'phone', 'email', 'department', 'designation',
    'addtionaldetailgrid','consumerservicegrid','assetdetailsgrid','dailygenerationgrid','monthlygenerationgrid',
    'monthlyconsumptiongrid','agreementgrid','paymentgrid','notes','attachmentgrid'];

    const onEnterEvent: IRFEventParams = {
        input: ['customercode','parentcustomer'],
          moduleName: CRM_MASTER,
        serviceName: 'RCRM_CUSTOMER_ACCOUNT_ONENTER_MST',
      };

      const onEnterEventParent: IRFEventParams = {
        input: ['parentcustomer'],
        moduleName: CRM_MASTER,
        serviceName: 'RCRM_PARENT_CUSTOMER_ACCOUNT_ONENTER_MST',
      };
      
      const helpComponents = {
        CustomerAccountHelp: CustomerAccountHelp,
        CustomerAccountPPAHelp :CustomerAccountPPAHelp,
        AssetMasterHelp : AssetMasterHelp,
      };

const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'customercode',
        label: 'Customer Code',
        required:true,
        maxLength:80,
        event: onEnterEvent,
    help: {
      panelTitle: 'Help On Customer Account',
      componentName: 'CustomerAccountHelp',
      receiveParams: [{parentField: 'customercode', childField: 'CUSTOMER_CODE'},
                      {parentField: 'customername', childField: 'CUSTOMER_NAME'},
                      {parentField: 'industry', childField: 'INDUSTRY'},
                      {parentField: 'ownership', childField: 'OWNERSHIP'},
                      {parentField: 'status', childField: 'STATUS'},
                ],
      event: onEnterEvent
    }
      },
      
    {
    type: ControlType.TEXTBOX,
    name: 'customername',
    label: 'Customer Name',
    required:true,
    maxLength:100 
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField:'industry',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'ownership',
    label: 'Ownership',
    masterField:'ownership',
    required:true,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'creditrating',
    label: 'Credit Rating',
    maxLength:80
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'pan',
    label: 'PAN',
    maxLength:10
  },
  {
    type: ControlType.TEXTBOX,
    name: 'gst',
    label: 'GST',
    maxLength:15,
  },
  {
    type: ControlType.TEXTBOX,
    name: 'parentcustomer',
    label: 'Parent Customer',
    maxLength:80,
    event: onEnterEventParent,
    help: {
      panelTitle: 'Help On Customer Account',
      componentName: 'CustomerAccountHelp',
      receiveParams: [{parentField: 'parentcustomer', childField: 'CUSTOMER_CODE'},
                ],
      event: onEnterEventParent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'website',
    label: 'Website',
    maxLength: 200, 
  },
  {
    type: ControlType.TEXTBOX,
    name: 'annualRevenue',
    label: 'Annual Revenue',
    inputType:'number'
  },
  {
    type: ControlType.DISPLAY,
    name: 'currency',
    label: 'Currency',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'noofEmployees',
    label: '# of Employees',
    inputType:'number',
    hidden:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'crn',
    label: 'CIN',
    maxLength:80,
  },

];

const companyAddresssection: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'addresstype',
    label: 'Address Type',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'address',
    label: 'Address',
    maxLength:400
  },
  {
    type: ControlType.TEXTBOX,
    name: 'city',
    label: 'City',
    maxLength:100,

  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    //required:true,
    masterField:'state',
      event :{
        serviceName:'ONCHANGE_STATE',
        moduleName :CRM_MASTER,
        input:['state'],
        
        },
       
  },
  {
    type: ControlType.COMBOBOX,
    name: 'district',
    label: 'District',
    masterField:'district',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'pincode',
    label: 'Pincode',
    inputType:"number",
    maxLength:6
  },
  {
    type: ControlType.DISPLAY,
    name: 'country',
    label: 'Country',
  },
];

const primarycontactSection: IControlDefinition[] = [
    {
    type: ControlType.COMBOBOX,
    name: 'title',
    label: 'Title',
    masterField:'title',
    required:true,
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
    inputType :"email",
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

const addtionaldetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'addtionaldetailgrid',
      isPrimeReactTable: true,
      pageSize:7,
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
          dataField: 'FIRST_NAME', 
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:100
          }
 
        },
        {
          title: 'Last Name',
          dataField: 'LAST_NAME',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            maxLength:100
          }
        },
        {
          title: 'Mobile',
          dataField: 'MOBILE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:10,
            inputType:"number"
          }

        },
        {
          title: 'Phone',
          dataField: 'PHONE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            maxLength:10,
            inputType:"number"
          }
        },
        {
          title: 'Email',
          dataField: 'EMAIL',          
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:
          {
            required:true,
            inputType:"email",
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
            cellEditorParams:{
                masterField:'ADDRESS_TYPE'
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
          cellEditorParams:{
            masterField:'STATE',
            event :{
              serviceName:'ONCHANGE_STATE_DTL',
              moduleName :CRM_MASTER,
              input:['STATE',]
              },
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
            cellEditorParams:{
              inputType:'number',
              maxLength: 6
            }
          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
          },
  
      ],
    },
  ];

  const consumerdetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'consumerservicegrid',
      isPrimeReactTable: true,
      pageSize:7,
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
          title: 'Service Point ID',
          dataField: 'SERVICE_POINT_ID',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:80
          }
        },
        {
          title: 'DISCOM',
          dataField: 'DISCOM', 
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
          masterField: 'DISCOM',
        }
 
        },
        {
          title: 'Voltage Level',
          dataField: 'VOLTAGE_LEVEL',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
          masterField: 'VOLTAGE_LEVEL',
        }
        },
        {
          title:'Permitted MD -Sanction Demand (kVA)',
          dataField:'PERMITTED_MD',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            required:true,
            inputType:"number",
           }
        },
        {
          title:'T&D Loss%',
          dataField:'TD_LOSS',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
            required:true,
            inputType:"number",
           }
        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:400
            }
          },
          {
            title: 'City',
            dataField: 'CITY',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:100
            }
          },
        {
          title: 'State',
          dataField: 'STATE',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams: {
            required:true,
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
                required:true,
              inputType:"number",
              maxLength:6
            }
          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
          },
          {
            title: 'Active',
            dataField: 'STATUS',
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'ACTIVE',
            }
          }
      ],
    },
  ];

  const assetdetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'assetdetailsgrid',
      isPrimeReactTable: true,
      pageSize:7,
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
          title: 'PPA #',
          dataField: 'ppa',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:150,
          event:{
            input:[{field:'ppa', source:'rowData'},{field:'customercode', source:'pageData'}],
              
           // input: ['ppa', 'customercode'],
            moduleName: CRM_MASTER,
            serviceName: 'RCRM_CUSTOMER_PPA_ONENTER',
          },
          onBlurEvent: {
            input:[{field:'ppa', source:'rowData'},{field:'customercode', source:'pageData'}],
               //  input: ['ppa', 'customercode'],
              moduleName: CRM_MASTER,
              serviceName: 'RCRM_CUSTOMER_PPA_ONENTER',
            }, 
        help: {
        panelTitle: 'Help On PPA',
        componentName: 'CustomerAccountPPAHelp',
        sendParams:[{parentField: 'customercode', childField: 'CUSTOMER', parentSource:'page'},],
        receiveParams: [{parentField: 'ppa', childField: 'PPA'},
                        {parentField: 'cod', childField: 'COD_DATE'},
                        {parentField: 'site', childField: 'SITE'},
        ],
        event :{
          serviceName:'RCRM_CUSTOMER_ACCOUNT_PPA_ONCHANGE',
          moduleName :CRM_MASTER,
          input:['ppa']
          },
          
          
        },
      },
        },

        {
          title: 'customercode',
          dataField: 'customercode',
          hidden:true
        },
        {
          title: 'COD',
          dataField: 'cod', 
          cellRendererParams:{
            format:DATE_FORMAT
          }
          
        },
        {
          title: 'Site Name',
          dataField: 'site',
        },
        // {
        //   title: 'HTSC',
        //   dataField: 'htsc',
        //   cellEditor: TableCellEditorType.COMBOBOX,
        //     cellEditorParams: {
        //       masterField: 'htsc',
        //     }
        // },
        {
          title: 'HTSC',
          dataField: 'HTSC',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams:{
            commaSeparatedOptionsField:'HTSC_MASTER'
          }     
      },
        {
            title: 'Asset Id',
            dataField: 'assetID',
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              maxLength:100,
              event:{
                input: ['assetID'],
                moduleName: CRM_MASTER,
                serviceName: 'RCRM_ASSET_MAPPING_ONENTER_MST',
              } ,
              help: {
                panelTitle: 'Help On Asset Master',
                componentName: 'AssetMasterHelp',
                receiveParams: [{parentField: 'assetID', childField: 'ASSET_ID'},
                                {parentField: 'assetname', childField: 'ASSET_NAME'},
                               {parentField: 'assetType', childField: 'ASSET_TYPE'},,
                               {parentField: 'capacity', childField: 'CAPACITY'},
                               {parentField: 'uom', childField: 'UOM'},
                               {parentField: 'site', childField: 'SITE'},
                            ],
            event: {
                input: ['assetID'],
                moduleName: CRM_MASTER,
                serviceName: 'RCRM_ASSET_MAPPING_ONENTER_MST',
              } 
            },
          },
        },
        {
            title: 'Asset Name',
            dataField: 'assetname',
        },
        {
          title: 'Asset Type',
          dataField: 'assetType',
        },
        {
            title: 'Capacity',
            dataField: 'capacity',      
        },
          {
            title: 'UOM',
            dataField: 'uom',
          },
          {
            title: '% Of Share',
            dataField: 'per_share',
            
            // cellEditor: TableCellEditorType.TEXTBOX,
            // cellEditorParams:{
            //   required:true,
            //   inputType:'number',
            //   maxLength:5,
            // }
          },

          {
            title: 'MW Share',
            dataField: 'mw_share',
            
            cellEditor: TableCellEditorType.TEXTBOX,
            cellEditorParams:{
              required:true,
              inputType:'number',
              maxLength:5,
            }
          },
          {
            title: 'Open Access From',
            dataField: 'effective_from',
            cellEditor: TableCellEditorType.DATE_PICKER,
            cellEditorParams:{
              required:true
            }
          },  
          {
            title: 'Open Access To',
            dataField: 'effective_to',
            cellEditor: TableCellEditorType.DATE_PICKER,
            cellEditorParams:{
              required:true
            }
          },
  
      ],
    },
  ];

  const dailygenerationSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'dailygenerationgrid',
      isPrimeReactTable: true,
      pageSize:7,
      columns: [
        {
          groupHeaderName: 'General',
          children: [
            {
              title: 'ID',
              dataField: 'ID',
            },
            {
              title: 'PPA ',
              dataField: 'PPA',
            },
            {
              title: '% of Share',
              dataField: 'PER_SHARE',
            },
            {
              title: 'Site',
              dataField: 'SITE',
            },
            {
              title: 'Meter ID',
              dataField: 'METER_ID',
            },
            {
              title: 'Meter Type',
              dataField: 'METER_TYPE',
            },
            {
              title: 'Asset ID',
              dataField: 'ASSET_ID',
            },
            {
              title: 'Asset Name',
              dataField: 'ASSET_NAME',
            },
            {
              title: 'Capacity',
              dataField: 'CAPACITY',
            },
            {
              title: 'UOM',
              dataField: 'UOM',
            },
            {
              title: 'Taken By',
              dataField: 'TAKEN_BY',
            },
            {
              title: 'Transaction Date',
              dataField: 'TRANSACTION_DATE',
              dataType:'dateTime',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:DATE_FORMAT,
              },
            },
            {
              title: 'Transaction Time',
              dataField: 'TRANSACTION_TIME',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:HH_MM
              }
            },
          ],
        },
        {
          groupHeaderName: 'Daily Export Reading Details',
          children: [
            {
              title: 'MF',
              dataField: 'MF_EX',
            },
            {
              title: 'Last Reading',
              dataField: 'LAST_READING_EX',
            },
            {
              title: 'Last Reading Date',
              dataField: 'LAST_READING_DATE_EX',
              dataType:'dateTime',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:DATE_FORMAT,
              },
            },
            {
              title: 'Last Reading Time',
              dataField: 'LAST_READING_TIME_EX',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:HH_MM
              }
            },
            {
              title: 'Current Reading',
              dataField: 'CURRENT_READING_EX',
            },
            {
              title: 'Current Reading Date',
              dataField: 'CURRENT_READING_DATE_EX',
              dataType:'dateTime',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:DATE_FORMAT,
              },
            },
            {
              title: 'Current Reading Time',
              dataField: 'CURRENT_READING_TIME_EX',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:HH_MM
              }
            },
            {
              title: 'Net Reading',
              dataField: 'NET_READING_EX',
            },
            {
              title: 'UOM',
              dataField: 'UOM_EX',
            },
            {
              title: 'Power Factor',
              dataField: 'POWER_FACTOR_EX',
            },
            {
              title: 'Voltage',
              dataField: 'VOLTAGE_EX',
            },
          ],
        },
        {
          groupHeaderName: 'Daily Import Reading Details',
          children: [
            {
              title: 'MF',
              dataField: 'MF_IM',
            },
            {
              title: 'Last Reading',
              dataField: 'LAST_READING_IM',
            },
            {
              title: 'Last Reading Date',
              dataField: 'LAST_READING_DATE_IM',
              dataType:'dateTime',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:DATE_FORMAT,
              },
            },
            {
              title: 'Last Reading Time',
              dataField: 'LAST_READING_TIME_IM',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:HH_MM
              }
            },
            {
              title: 'Current Reading',
              dataField: 'CURRENT_READING_IM',
            },
            {
              title: 'Current Reading Date',
              dataField: 'CURRENT_READING_DATE_IM',
              dataType:'dateTime',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:DATE_FORMAT,
              },
            },
            {
              title: 'Current Reading Time',
              dataField: 'CURRENT_READING_TIME_IM',
              cellRenderer:TableCellRendererType.TEXT,
              cellRendererParams:{
                format:HH_MM
              }
            },
            {
              title: 'Net Reading',
              dataField: 'NET_READING_IM',
            },
            {
              title: 'UOM',
              dataField: 'UOM_IM',
            },
            {
              title: 'Power Factor',
              dataField: 'POWER_FACTOR_IM',
            },
            {
              title: 'Voltage',
              dataField: 'VOLTAGE_IM',
            },
          ],
        },
        {
          groupHeaderName: 'Daily Net Reading',
          children: [
            {
              title: 'Net Reading',
              dataField: 'DAILY_NET_READING',
            },
            {
              title: 'UOM',
              dataField: 'DAILY_UOM',
            },
          ],
        },
        {
          groupHeaderName: 'TOD - Export Reading Details',
          children: [
            {
              title: 'Q1',
              dataField: 'Q1_EX',
            },
            {
              title: 'Q2',
              dataField: 'Q2_EX',
            },
            {
              title: 'Q3',
              dataField: 'Q3_EX',
            },
            {
              title: 'Q4',
              dataField: 'Q4_EX',
            },
            {
              title: 'Q5',
              dataField: 'Q5_EX',
            },
            {
              title: 'Total Net Reading',
              dataField: 'TOTAL_NET_EX',
            },
          ],
        },
        {
          groupHeaderName: 'TOD - Import Reading Details',
          children: [
            {
              title: 'Q1',
              dataField: 'Q1_IM',
            },
            {
              title: 'Q2',
              dataField: 'Q2_IM',
            },
            {
              title: 'Q3',
              dataField: 'Q3_IM',
            },
            {
              title: 'Q4',
              dataField: 'Q4_IM',
            },
            {
              title: 'Q5',
              dataField: 'Q5_IM',
            },
            {
              title: 'Total Net Reading',
              dataField: 'TOTAL_NET_IM',
            },
          ],
        },
        {
          groupHeaderName: 'TOD Net Reading',
          children: [
            {
              title: 'Net Reading',
              dataField: 'TOD_NET_READING',
            
            },
            {
              title: 'UOM',
              dataField: 'TOD_UOM',
            },
          ],
        },
      ],
    },
  ];

  const monthlygenerationSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'monthlygenerationgrid',
      isPrimeReactTable: true,
      pageSize:7,
      columns: [
        {
          groupHeaderName: 'General',
          children: [
            {
              title: 'ID',
              dataField: 'ID',
            },
            {
              title: 'PPA ',
              dataField: 'PPA',
            },
            {
              title: '% of Share',
              dataField: 'PER_SHARE',
            },
            {
              title: 'Site',
              dataField: 'SITE',
            },
            {
              title: 'Meter ID',
              dataField: 'METER_ID',
            },
            {
              title: 'Meter Type',
              dataField: 'METER_TYPE',
            },
            {
              title: 'Asset ID',
              dataField: 'ASSET_ID',
            },
            {
              title: 'Asset Name',
              dataField: 'ASSET_NAME',
            },
            {
              title: 'Capacity',
              dataField: 'CAPACITY',
            },
            {
              title: 'UOM',
              dataField: 'UOM',
            },
            {
              title: 'Taken By',
              dataField: 'TAKEN_BY',
            },
            {
              title: 'Generation Period',
              dataField: 'GENERATION_PERIOD',
            },
          ],
        },
        {
          groupHeaderName: 'Export  (KWH) Details',
          children: [
            {
              title: 'MF',
              dataField: 'MF_EX_KWH',
            },
            {
              title: 'Last Reading',
              dataField: 'LAST_READING_EX_KWH',
            },
            {
              title: 'Current Reading',
              dataField: 'CURRENT_READING_EX_KWH',
            },
            {
              title: 'Net Reading',
              dataField: 'NET_READING_EX_KWH',
            },
            {
              title: 'UOM',
              dataField: 'UOM_EX_KWH',
            },
            {
              title: 'Power Factor',
              dataField: 'POWER_FACTOR_EX_KWH',
            },
            {
              title: 'Voltage',
              dataField: 'VOLTAGE_EX_KWH',
            },
          ],
        },
        {
          groupHeaderName: 'Export Reading Details - KVARH',
          children: [
            {
              title: 'MF',
              dataField: 'MF_EX_KVH',
            },
            {
              title: 'Last Reading',
              dataField: 'LAST_READING_EX_KVH',
            },
            {
              title: 'Current Reading',
              dataField: 'CURRENT_READING_EX_KVH',
            },
            {
              title: 'Net Reading',
              dataField: 'NET_READING_EX_KVH',
            },
            {
              title: 'UOM',
              dataField: 'UOM_EX_KVH',
            },
            {
              title: 'Power Factor',
              dataField: 'POWER_FACTOR_EX_KVH',
            },
            {
              title: 'Voltage',
              dataField: 'VOLTAGE_EX_KVH',
            },
          ],
        },
        {
          groupHeaderName: 'Import Reading Details(KWH)',
          children: [
            {
              title: 'MF',
              dataField: 'MF_IM_KWH',
            },
            {
              title: 'Last Reading',
              dataField: 'LAST_READING_IM_KWH',
            },
            {
              title: 'Current Reading',
              dataField: 'CURRENT_READING_IM_KWH',
            },
            {
              title: 'Net Reading',
              dataField: 'NET_READING_IM_KWH',
            },
            {
              title: 'UOM',
              dataField: 'UOM_IM_KWH',
            },
            {
              title: 'Power Factor',
              dataField: 'POWER_FACTOR_IM_KWH',
            },
            {
              title: 'Voltage',
              dataField: 'VOLTAGE_IM_KWH',
            },
          ],
        },
        {
          groupHeaderName: 'Import Reading Details - KVARH',
          children: [
            {
              title: 'MF',
              dataField: 'MF_IM_KVH',
            },
            {
              title: 'Last Reading',
              dataField: 'LAST_READING_IM_KVH',
            },
            {
              title: 'Current Reading',
              dataField: 'CURRENT_READING_IM_KVH',
            },
            {
              title: 'Net Reading',
              dataField: 'NET_READING_IM_KVH',
            },
            {
              title: 'UOM',
              dataField: 'UOM_IM_KVH',
            },
            {
              title: 'Power Factor',
              dataField: 'POWER_FACTOR_IM_KVH',
            },
            {
              title: 'Voltage',
              dataField: 'VOLTAGE_IM_KVH',
            },
          ],
        },
        {
          groupHeaderName: 'Monthly Net Reading',
          children: [
            {
              title: 'Generation at Controller (KWH)',
              dataField: 'GEN_CONTROL_MONTH_KWH',
            },
            {
              title: 'Net Reading in KWH',
              dataField: 'MONTHLY_NET_READING_KWH',
            },
            {
              title: 'Net Reading in KVARH',
              dataField: 'MONTHLY_UOM_KVH',
            },
          ],
        },
        {
          groupHeaderName: 'TOD - Export Reading Details',
          children: [
            {
              title: 'Q1',
              dataField: 'Q1_EX',
            },
            {
              title: 'Q2',
              dataField: 'Q2_EX',
            },
            {
              title: 'Q3',
              dataField: 'Q3_EX',
            },
            {
              title: 'Q4',
              dataField: 'Q4_EX',
            },
            {
              title: 'Q5',
              dataField: 'Q5_EX',
            },
            {
              title: 'Total Net Reading',
              dataField: 'TOTAL_NET_EX',
            },
          ],
        },
        {
          groupHeaderName: 'TOD - Import Reading Details',
          children: [
            {
              title: 'Q1',
              dataField: 'Q1_IM',
            },
            {
              title: 'Q2',
              dataField: 'Q2_IM',
            },
            {
              title: 'Q3',
              dataField: 'Q3_IM',
            },
            {
              title: 'Q4',
              dataField: 'Q4_IM',
            },
            {
              title: 'Q5',
              dataField: 'Q5_IM',
            },
            {
              title: 'Total Net Reading',
              dataField: 'TOTAL_NET_IM',
            },
          ],
        },
        {
          groupHeaderName: 'TOD Net Reading',
          children: [
            {
              title: 'Net Reading',
              dataField: 'TOD_NET_READING',
            },
            {
              title: 'UOM',
              dataField: 'TOD_UOM',
            },
          ],
        },
      ],
    },
  ];

  const monthlyconsumptionSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'monthlyconsumptiongrid',
      isPrimeReactTable: true,
      pageSize:7,
      columns: [
        {
          title: 'HTSC ',
          dataField: 'HTSC',
        },
        {
          title: 'Generation Period',
          dataField: 'GENERATION_PERIOD',
        },
        {
          title: 'Last Reading (kWh)',
          dataField: 'LAST_READING',
        },
        {
          title: 'Last Reading Date',
          dataField: 'LAST_READING_DATE',             
           dataType:'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },

        },
        {
          title: 'Last Reading Time',
          dataField: 'LAST_READING_TIME',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
                format:HH_MM
            }
        },
        {
          title: 'Current Reading (kWh)',
          dataField: 'CURRENT_READING',
        },
        {
          title: 'Current Reading Date',
          dataField: 'CURRENT_READING_DATE',
          dataType:'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },
        },
        {
          title: 'Current Reading Time',
          dataField: 'CURRENT_READING_TIME',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
                format:HH_MM
          }
        },
        {
          title: 'Net Reading (kWh)',
          dataField: 'NET_READING',
        //  cellEditor: .TEXTBOX
        },
      ],
    },
  ];

  const AgreementSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'agreementgrid',
      isPrimeReactTable: true,
      pageSize:7,
      columns: [
        {
          title: 'PPA #',
          dataField: 'PPA_NO',
        },
        {
          title: 'Agreement #',
          dataField: 'AGREEMENT',
        },
        {
          title: 'Agreement Date',
          dataField: 'AGREEMENT_DATE',
          dataType :'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },
        },
        {
          title: 'Title',
          dataField: 'TITLE',
        },
        {
          title: 'Agreement Type',
          dataField: 'AGREEMENT_TYPE',
        },
        {
          title: 'Effective Start Date',
          dataField: 'EFFECTIVE_START_DATE',
          dataType :'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },
        },
        {
          title: 'Effective End Date',
          dataField: 'EFFECTIVE_END_DATE',
          dataType :'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },
        },
      ],
    },
  ];

  const paymentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'paymentgrid',
      isPrimeReactTable: true,
      pageSize:7,
      columns: [
        {
          title: 'PPA #',
          dataField: 'PPA_NO',
        },
        {
          title: 'Payment Security Code',
          dataField: 'PAYMENT_SECURITY_CODE',
        },
        {
          title: 'Payment Security Name',
          dataField: 'PAYMENT_SECURITY_NAME',
      
        },
        {
          title: 'Beneficiary Name',
          dataField: 'BENEFICIARY_NAME',
        },
        {
          title: 'Issuing Bank',
          dataField: 'ISSUING_BANK',
        },
        {
          title: 'Amount',
          dataField: 'AMOUNT',
        },
        {
          title: 'Currency',
          dataField: 'CURRENCY',
        },
        {
          title: 'Instrument Type',
          dataField: 'INSTRUMENT_TYPE',
        },
        {
          title: 'Instrument Category',
          dataField: 'INSTRUMENT_CATEGORY',
        },
        {
          title: 'Instrument',
          dataField: 'INSTRUMENT',
        },
        {
          title: 'Date of Issue',
          dataField: 'DATE_OF_ISSUE',
          dataType :'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },
        },
        {
          title: 'Date of Expiry',
          dataField: 'DATE_OF_EXPIRY',
          dataType :'dateTime',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
            format:DATE_FORMAT,
          },
        },
        
  
      ],
    },
  ];

  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4 
},
]   

  const attachmentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'attachmentgrid',
      isPrimeReactTable: true,
      pageSize:7,
      editorProps:{
        isEditable:true,
      },
      columns: [
        {
          title: 'Upload Document',
          dataField: 'UPLOAD_DOC',
          cellRenderer: TableCellRendererType.FILE_UPLOADER,
          cellRendererParams:{
            maximumAllowedFileSizeInMB: 10,
            allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
            originalFileNameField:'file_name'
          } ,         
          },
          {
            title: 'File Name',
            dataField: 'file_name',         
          },
        {
          title: 'Remarks',
          dataField: 'REMARKS', 
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams: {
           maxLength:400,
        },
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
          serviceName: 'RCRM_CUSTOMER_ACCOUNT_CREATE_MST',
          moduleName: CRM_MASTER,
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'activate',
        label: 'Activate',
        event: {
          serviceName: 'RCRM_CUSTOMER_ACCOUNT_ACTIVATE_MST',
          moduleName: CRM_MASTER,
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'inactivate',
        label: 'Inactivate',
        event: {
          serviceName: 'RCRM_CUSTOMER_ACCOUNT_INACTIVIATE_MST',
          moduleName: CRM_MASTER,
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
  serviceName: 'RCRM_CUSTOMER_ACCOUNT_INIT_MST',
  moduleName: CRM_MASTER,
    input: ['customercode']
};

export const ManageCustomerAccount:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
        customercode:code,
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={companyAddresssection} title={'Company Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={primarycontactSection}  title={'Primary Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={addtionaldetailsSection} title={'Additional Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={consumerdetailsSection} title={'Consumer Service Points'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={assetdetailsSection} title={'Asset Mapping'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        {/* <RFTabs>
        <RFTabItem headerText='Daily Generation Report - Generator End'>
        <RFSection  controls={dailygenerationSection} columns={1} className={'table-absolute-toolbar no-table-theme'}/>
        </RFTabItem>
        <RFTabItem  headerText='Monthly Generation Report - Generator End'>
        <RFSection  controls={monthlygenerationSection}  columns={1} className={'table-absolute-toolbar no-table-theme'}/>
        </RFTabItem>
        <RFTabItem  headerText='Monthly Consumption Report - Customer End'>
        <RFSection  controls={monthlyconsumptionSection}  columns={1} className={'table-absolute-toolbar no-table-theme'}/>
        </RFTabItem>
        </RFTabs>
        <RFTabs>
        <RFTabItem headerText='Agreement'>
        <RFSection  controls={AgreementSection}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>
        <RFTabItem headerText='Payment Security'>
        <RFSection  controls={paymentSection} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>
        </RFTabs> */}
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
