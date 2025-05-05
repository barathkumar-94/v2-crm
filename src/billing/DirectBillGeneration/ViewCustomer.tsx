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
import { CRM_MASTER, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../common/constants';
import { PPAHelp } from '../../master/PPA/PPAHelp';
import { AssetMasterHelp } from '../../master/Assets/assetMasterHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CustomerAccountHelp } from '../../master/CustomerAccount/CustomerAccountHelp';
import { CustomerAccountPPAHelp } from '../../master/CustomerAccount/CustomerAccountPPAHelp';


const actionInputs = [
    'customercode','customername','industry','ownership','creditrating','parentcustomer','website',
    'annualRevenue','currency','noofEmployees','crn','status',
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
        type: ControlType.DISPLAY,
        name: 'customercode',
        label: 'Customer Code',
        required:true,
      //  maxLength:80,
    

      },
      
    {
    type: ControlType.DISPLAY,
    name: 'customername',
    label: 'Customer Name',
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'industry',
    label: 'Industry',
    masterField:'industry',
    disable:true,
    required:true,
  },
  {
    type: ControlType.COMBOBOX,
    name: 'ownership',
    label: 'Ownership',
    masterField:'ownership',
    disable:true,
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'creditrating',
    label: 'Credit Rating',
   
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.DISPLAY,
    name: 'parentcustomer',
    label: 'Parent Customer',
    // maxLength:80,
    // event: onEnterEventParent,
    // help: {
    //   panelTitle: 'Help On Customer Account',
    //   componentName: 'CustomerAccountHelp',
    //   receiveParams: [{parentField: 'parentcustomer', childField: 'CUSTOMER_CODE'},
    //             ],
    //   event: onEnterEventParent
    // }
  },
  {
    type: ControlType.DISPLAY,
    name: 'website',
    label: 'Website',
   // maxLength: 200, 
  },
  {
    type: ControlType.DISPLAY,
    name: 'annualRevenue',
    label: 'Annual Revenue',
  },
  {
    type: ControlType.DISPLAY,
    name: 'currency',
    label: 'Currency',
  },
  {
    type: ControlType.DISPLAY,
    name: 'noofEmployees',
    label: '# of Employees',
    hidden:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'crn',
    label: 'CRN',
   // maxLength:80,
  },

];

const companyAddresssection: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'addresstype',
    label: 'Address Type',
  },
  {
    type: ControlType.DISPLAY,
    name: 'address',
    label: 'Address',
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'city',
    label: 'City',


  },
  {
    type: ControlType. COMBOBOX,disable:true,
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
    type: ControlType. COMBOBOX,disable:true,
    name: 'district',
    label: 'District',
    masterField:'district',
  },
  {
    type: ControlType.DISPLAY,
    name: 'pincode',
    label: 'Pincode',
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'country',
    label: 'Country',
  },
];

const primarycontactSection: IControlDefinition[] = [
    {
    type: ControlType. COMBOBOX,disable:true,
    name: 'title',
    label: 'Title',
    masterField:'title',
    required:true,
  },
  {
    type: ControlType.DISPLAY,
    name: 'firstName',
    label: 'First Name',
    required:true,
 
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastName',
    label: 'Last Name',
  

  },
  {
    type: ControlType.DISPLAY,
    name: 'mobile',
    label: 'Mobile',
    required:true,
   // maxLength:10,
 
  },
  {
    type: ControlType.DISPLAY,
    name: 'phone',
    label: 'Phone',
    //maxLength:10,
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'email',
    label: 'Email',
    required:true,
   // inputType :"email",
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'department',
    label: 'Department',
   // maxLength:80

  },
  {
    type: ControlType.DISPLAY,
    name: 'designation',
    label: 'Designation',
   // maxLength:80
  },
];

const addtionaldetailsSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'addtionaldetailgrid',
      isPrimeReactTable: true,
      excelExport:false,
      pageSize:7,
      editorProps:{
        isEditable:true,
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
          cellEditor: TableCellEditorType. COMBOBOX,
       
          cellEditorParams: {
            required:true,
            disable:true,
          masterField: 'TITLE',
        }
        },
        {
          title: 'First Name',
          dataField: 'FIRST_NAME', 
        },
        {
          title: 'Last Name',
          dataField: 'LAST_NAME',
        },
        {
          title: 'Mobile',
          dataField: 'MOBILE',

        },
        {
          title: 'Phone',
          dataField: 'PHONE',
        },
        {
          title: 'Email',
          dataField: 'EMAIL', 
        },
        {
          title: 'Department',
          dataField: 'DEPARTMENT',
        },
        {
          title: 'Designation',
          dataField: 'DESIGNATION',
        },
        {
            title: 'Address Type',
            dataField: 'ADDRESS_TYPE',
            cellEditor: TableCellEditorType. COMBOBOX,
            cellEditorParams:{
                masterField:'ADDRESS_TYPE',
                disable:true,
            }
        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
          },
          {
            title: 'City',
            dataField: 'CITY',
          },
        {
          title: 'State',
          dataField: 'STATE',
          cellEditor: TableCellEditorType. COMBOBOX,
          cellEditorParams:{
            masterField:'STATE',
            disable:true,
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
            cellEditor: TableCellEditorType. COMBOBOX,
            cellEditorParams:{
              commaSeparatedOptionsField:'DISTRICT_MASTER',
              disable:true,
            }          
        },
          {
            title: 'Pincode',
            dataField: 'PINCODE',
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
      excelExport:false,
      pageSize:7,
    //   editorProps:{
    //     isEditable:true,
    //   },
      columns: [
        {
          title: 'Key',
          dataField: 'KEY',
          hidden:true
        },
        {
          title: 'Service Point ID',
          dataField: 'SERVICE_POINT_ID',
        },
        {
          title: 'DISCOM',
          dataField: 'DISCOM', 
          cellEditor: TableCellEditorType. COMBOBOX,
          cellEditorParams: {
            required:true,
            disable:true,
          masterField: 'DISCOM',
        }
 
        },
        {
          title: 'Voltage Level',
          dataField: 'VOLTAGE_LEVEL',
          cellEditor: TableCellEditorType. COMBOBOX,
          cellEditorParams: {
            required:true,
            disable:true,
          masterField: 'VOLTAGE_LEVEL',
        }
        },
        {
            title: 'Address',
            dataField: 'ADDRESS',
          },
          {
            title: 'City',
            dataField: 'CITY',
          },
        {
          title: 'State',
          dataField: 'STATE',
          cellEditor: TableCellEditorType. COMBOBOX,
          cellEditorParams: {
            required:true,
            masterField: 'STATE',
            disable:true,
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
            cellEditor: TableCellEditorType. COMBOBOX,
            cellEditorParams:{
              commaSeparatedOptionsField:'DISTRICT_MASTER',
              disable:true,
            }          
        },
          {
            title: 'Pincode',
            dataField: 'PINCODE',
          },
          {
            title: 'Country',
            dataField: 'COUNTRY',
          },
          {
            title: 'Active',
            dataField: 'STATUS',
            cellEditor: TableCellEditorType. COMBOBOX,
            cellEditorParams: {
              required:true,
              masterField: 'ACTIVE',
              disable:true,
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
      excelExport:false,
      pageSize:7,
    //   editorProps:{
    //     isEditable:true,
    //   },
      columns: [
        {
          title: 'Key',
          dataField: 'KEY',
          hidden:true
        },
        {
          title: 'PPA #',
          dataField: 'ppa',
       
        
      
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
        {
            title: 'Asset Id',
            dataField: 'assetID',
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
          },
          {
            title: 'Effective From',
            dataField: 'effective_from',
          },  
          {
            title: 'Effective To',
            dataField: 'effective_to',
          },
  
      ],
    },
  ];

  const dailygenerationSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'dailygenerationgrid',
      isPrimeReactTable: true,
      excelExport:false,
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
      excelExport:false,
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
      excelExport:false,
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
        //  cellEditor: .DISPLAY
        },
      ],
    },
  ];

  const AgreementSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'agreementgrid',
      isPrimeReactTable: true,
      excelExport:false,
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
      excelExport:false,
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
        type: ControlType.DISPLAY,
        name: 'notes',
        column: 10,  
       
        // multiLine :true,
        // multiLineRowLength:4 
},
]   

  const attachmentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'attachmentgrid',
      isPrimeReactTable: true,
      excelExport:false,
      pageSize:7,
    //   editorProps:{
    //     isEditable:true,
    //   },
      columns: [
        {
          title: 'Upload Document',
          dataField: 'UPLOAD_DOC',
        //   cellRenderer: TableCellRendererType.FILE_UPLOADER,
        //   cellRendererParams:{
        //     maximumAllowedFileSizeInMB: 10,
        //     allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
        //     originalFileNameField:'file_name'
        //   } ,         
          },
          {
            title: 'File Name',
            dataField: 'file_name',         
          },
        {
          title: 'Remarks',
          dataField: 'REMARKS', 
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

export const ViewCustomer:React.FC<IPageBaseProps> = (props) => {
    // const {code} = usePageQueryParam();

    // const initialData: IRFData = {
    //     customercode:code,
    //   };


  return (
    <RetinaFormBuilder initialValues={props} onLoadEventParams={onLoadEventParams} >

    {/* <RetinaFormBuilder   scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt> */}
      
      <ScrollabeContainer hasHeader={false}>
        <RFSection  controls={generalSection} title={'Customer Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={companyAddresssection} title={'Company Address'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={primarycontactSection}  title={'Primary Contact Details'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={addtionaldetailsSection} title={'Additional Contact Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={consumerdetailsSection} title={'Consumer Service Points'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={assetdetailsSection} title={'Asset Mapping'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFTabs>
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
        </RFTabs>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      {/* <RFFooter buttons={actionBarButtons} metaData={DataSection}/> */}
    </RetinaFormBuilder>
  );
};
